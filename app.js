// ==========================================
// MEDICINAL PLANTS EXPLORER
// Image Classification + Information + Voice
// ==========================================

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/ZPH5tuVS8/";

// ==========================================
// INFORMATION LIBRARY
// ==========================================

const informationLibrary = {
  CATS: `
CATS

1. Overview
Cats are small, domesticated mammals commonly kept as pets. They belong to the family Felidae.

2. Key Characteristics
- Cats have sharp claws and teeth.
- They have excellent night vision.
- They possess flexible bodies and good balance.
- They use whiskers to sense their surroundings.
- They are known for their grooming behavior.

3. Uses and Importance
- Cats are popular companion animals.
- They help control certain rodent populations.
- They provide companionship to humans.

4. Origin and History
Domestic cats are believed to have descended from the African wildcat. Their relationship with humans began thousands of years ago.

5. Five Interesting Facts
1. Cats spend many hours sleeping.
2. Each cat has a unique nose pattern.
3. Cats use whiskers to sense nearby objects.
4. A group of cats is sometimes called a clowder.
5. Cats can rotate their ears to detect sounds.
`,

  DOGS: `
DOGS

1. Overview
Dogs are domesticated mammals belonging to the family Canidae. They are known for their intelligence and close relationship with humans.

2. Key Characteristics
- Dogs have a strong sense of smell.
- They have an excellent sense of hearing.
- They communicate through barking and body language.
- They come in many breeds and sizes.
- They are social animals.

3. Uses and Importance
- Dogs are kept as companion animals.
- They help in search and rescue operations.
- Some dogs assist people with disabilities.
- They can help with herding and guarding.
- Trained dogs can detect certain substances.

4. Origin and History
Dogs descended from ancient wolf populations. Their domestication began tens of thousands of years ago.

5. Five Interesting Facts
1. Dogs have a powerful sense of smell.
2. Every dog's nose-print is unique.
3. Dogs can understand many human gestures.
4. Puppies are born with their eyes closed.
5. Dogs use their tails and ears to communicate.
`
};

// ==========================================
// HTML ELEMENTS
// ==========================================

const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const previewBox = document.getElementById("previewBox");
const fileStatus = document.getElementById("fileStatus");

const classifyBtn = document.getElementById("classify");
const predictions = document.getElementById("predictions");
const modelStatus = document.getElementById("modelStatus");
const categoryStatus = document.getElementById("categoryStatus");

const askBtn = document.getElementById("ask");
const promptBox = document.getElementById("promptBox");
const copyBtn = document.getElementById("copy");
const copyStatus = document.getElementById("copyStatus");
const removeBtn = document.getElementById("remove");

// ==========================================
// CLEAN UP OLD PAUSE AND RESUME BUTTONS
// ==========================================

document.getElementById("pauseSpeech")?.remove();
document.getElementById("resumeSpeech")?.remove();

// Remove an older dynamically-created control panel.
document.getElementById("speechControls")?.remove();

// ==========================================
// CREATE STOP BUTTON ONLY
// ==========================================

const speechControls = document.createElement("div");

speechControls.id = "speechControls";
speechControls.style.display = "none";
speechControls.style.marginTop = "15px";

speechControls.innerHTML = `
  <button id="stopSpeech" type="button">Stop</button>
  <p id="speechStatus" style="margin-top:10px;"></p>
`;

promptBox.insertAdjacentElement("afterend", speechControls);

const stopSpeechBtn = document.getElementById("stopSpeech");
const speechStatus = document.getElementById("speechStatus");

// ==========================================
// VARIABLES
// ==========================================

let model = null;
let predictedCategory = "";

let speechChunks = [];
let currentChunk = 0;
let speechSession = 0;

// ==========================================
// SPEECH FUNCTIONS
// ==========================================

function splitIntoChunks(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(sentence => sentence.length > 0);
}

function speakNextChunk(session) {
  if (session !== speechSession) return;

  if (currentChunk >= speechChunks.length) {
    speechStatus.textContent = "Reading completed.";
    speechControls.style.display = "none";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(
    speechChunks[currentChunk]
  );

  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onstart = function () {
    if (session === speechSession) {
      speechStatus.textContent = "Reading information...";
    }
  };

  utterance.onend = function () {
    if (session !== speechSession) return;

    currentChunk++;
    speakNextChunk(session);
  };

  utterance.onerror = function (event) {
    if (session !== speechSession) return;

    if (
      event.error !== "canceled" &&
      event.error !== "interrupted"
    ) {
      speechStatus.textContent = "Voice playback error.";
    }
  };

  window.speechSynthesis.speak(utterance);
}

function speakInformation(text) {
  if (!("speechSynthesis" in window)) {
    alert("Voice narration is not supported by this browser.");
    return;
  }

  stopSpeech();

  speechChunks = splitIntoChunks(text);
  currentChunk = 0;

  const session = speechSession;

  speechControls.style.display = "block";
  speechStatus.textContent = "Starting narration...";

  speakNextChunk(session);
}

function stopSpeech() {
  speechSession++;

  speechChunks = [];
  currentChunk = 0;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (speechControls) {
    speechControls.style.display = "none";
  }
}

stopSpeechBtn.addEventListener("click", stopSpeech);

// ==========================================
// LOAD AI MODEL
// ==========================================

async function loadModel() {
  try {
    modelStatus.textContent = "Loading AI model...";

    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    modelStatus.textContent = "AI model loaded successfully.";
    classifyBtn.disabled = false;

  } catch (error) {
    console.error("Model loading error:", error);

    modelStatus.textContent =
      "Unable to connect to the model. Please refresh the page.";
  }
}

// ==========================================
// IMAGE UPLOAD
// ==========================================

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  stopSpeech();

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    fileStatus.textContent = "Please select a valid image.";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    preview.onload = function () {

      // Make the image preview visible.
      previewBox.hidden = false;
      previewBox.style.display = "";

      fileStatus.textContent = "Image uploaded successfully.";

      classifyBtn.disabled = false;

      predictions.innerHTML = "";
      categoryStatus.textContent = "";

      promptBox.textContent = "";
      promptBox.hidden = true;

      askBtn.disabled = true;
      copyBtn.style.display = "none";
    };

    preview.onerror = function () {
      fileStatus.textContent = "Unable to display this image.";
    };

    preview.src = event.target.result;
  };

  reader.readAsDataURL(file);
});

// ==========================================
// CLASSIFY IMAGE
// ==========================================

classifyBtn.addEventListener("click", async function () {
  if (!model || !preview.src) {
    alert("Please upload an image first.");
    return;
  }

  try {
    stopSpeech();

    classifyBtn.disabled = true;
    classifyBtn.textContent = "Classifying...";

    const results = await model.predict(preview);

    results.sort((a, b) => b.probability - a.probability);

    predictions.innerHTML = "";

    results.forEach(result => {
      const item = document.createElement("p");

      item.textContent =
        result.className + " — " +
        (result.probability * 100).toFixed(2) + "%";

      predictions.appendChild(item);
    });

    predictedCategory = results[0].className;

    categoryStatus.textContent =
      "Predicted category: " + predictedCategory;

    askBtn.disabled = false;

    promptBox.textContent = "";
    promptBox.hidden = true;

    copyBtn.style.display = "none";

  } catch (error) {
    console.error("Classification error:", error);

    categoryStatus.textContent =
      "Classification failed. Please try again.";

  } finally {
    classifyBtn.disabled = false;
    classifyBtn.textContent = "Classify uploaded picture";
  }
});

// ==========================================
// GENERATE INFORMATION + VOICE
// ==========================================

askBtn.addEventListener("click", function () {
  const category = predictedCategory.toUpperCase();

  const information = informationLibrary[category];

  if (!information) {
    promptBox.hidden = false;
    promptBox.textContent =
      "Information for this category is not available yet.";

    copyBtn.style.display = "none";

    stopSpeech();
    return;
  }

  // Make the information box visible.
  promptBox.hidden = false;
  promptBox.style.display = "";

  // Display written information.
  promptBox.textContent = information;

  copyBtn.style.display = "inline-block";
  copyStatus.textContent = "";

  // Start voice narration.
  speakInformation(information);
});

// ==========================================
// COPY INFORMATION
// ==========================================

copyBtn.addEventListener("click", async function () {
  try {
    await navigator.clipboard.writeText(promptBox.textContent);

    copyStatus.textContent = "Information copied successfully.";

  } catch (error) {
    copyStatus.textContent =
      "Unable to copy. Please copy the text manually.";
  }
});

// ==========================================
// REMOVE IMAGE AND RESET
// ==========================================

removeBtn.addEventListener("click", function () {
  stopSpeech();

  fileInput.value = "";
  preview.src = "";

  previewBox.hidden = true;

  fileStatus.textContent = "";
  predictions.innerHTML = "";
  categoryStatus.textContent = "";

  predictedCategory = "";

  promptBox.textContent = "";
  promptBox.hidden = true;

  copyBtn.style.display = "none";
  copyStatus.textContent = "";

  askBtn.disabled = true;
  classifyBtn.disabled = true;
});

// ==========================================
// START APPLICATION
// ==========================================

classifyBtn.disabled = true;
askBtn.disabled = true;

promptBox.hidden = true;

loadModel();
