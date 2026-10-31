// ==========================================
// MEDICINAL PLANTS EXPLORER
// Image Classification + Information + Voice
// ==========================================

// Teachable Machine model
const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/ZPH5tuVS8/";

// ==========================================
// INFORMATION LIBRARY
// ==========================================

const informationLibrary = {
  CATS: `
CATS

Overview:
Cats are small, domesticated mammals commonly kept as pets. They belong to the family Felidae.

Key Characteristics:
- Cats have sharp claws and teeth.
- They have excellent night vision.
- They possess flexible bodies and good balance.
- They use whiskers to sense their surroundings.
- They are known for their grooming behavior.

Uses and Importance:
- Cats are popular companion animals.
- They help control certain rodent populations.
- They are valued for companionship and emotional support.

Origin and History:
Domestic cats are believed to have descended from the African wildcat. Their relationship with humans began thousands of years ago.

Five Interesting Facts:
1. Cats can rotate their ears to detect sounds.
2. They spend many hours sleeping.
3. Every cat has a unique nose-print pattern.
4. Cats use different sounds to communicate.
5. A group of cats is sometimes called a clowder.
`,

  DOGS: `
DOGS

Overview:
Dogs are domesticated mammals belonging to the family Canidae. They are known for their intelligence, loyalty, and close relationship with humans.

Key Characteristics:
- Dogs have a strong sense of smell.
- They have an excellent sense of hearing.
- They communicate through barking, body language, and scent.
- They come in many breeds, shapes, and sizes.
- They are social animals.

Uses and Importance:
- Dogs are kept as companion animals.
- They can help with search and rescue operations.
- Some dogs assist people with disabilities.
- They can work in herding and guarding.
- Trained dogs help in detecting certain substances.

Origin and History:
Dogs descended from ancient wolf populations. Their domestication began tens of thousands of years ago.

Five Interesting Facts:
1. Dogs have a much stronger sense of smell than humans.
2. Each dog's nose-print is unique.
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
// VARIABLES
// ==========================================

let model = null;
let predictedCategory = "";

let speechChunks = [];
let currentChunk = 0;
let speechSession = 0;
let isSpeechPaused = false;

// ==========================================
// CREATE VOICE CONTROL BUTTONS
// ==========================================

const speechControls = document.createElement("div");

speechControls.id = "speechControls";

speechControls.style.display = "none";
speechControls.style.gap = "10px";
speechControls.style.flexWrap = "wrap";
speechControls.style.marginTop = "15px";

speechControls.innerHTML = `
  <button id="pauseSpeech" type="button">Pause</button>
  <button id="resumeSpeech" type="button">Resume</button>
  <button id="stopSpeech" type="button">Stop</button>
`;

if (promptBox) {
  promptBox.insertAdjacentElement("afterend", speechControls);
}

const pauseSpeechBtn = document.getElementById("pauseSpeech");
const resumeSpeechBtn = document.getElementById("resumeSpeech");
const stopSpeechBtn = document.getElementById("stopSpeech");

// ==========================================
// SPEECH FUNCTIONS
// ==========================================

function splitIntoChunks(text) {
  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];

  const chunks = [];

  sentences.forEach(sentence => {
    const cleanSentence = sentence.trim();

    if (!cleanSentence) return;

    // Split very long sentences into smaller parts.
    if (cleanSentence.length > 180) {
      for (let i = 0; i < cleanSentence.length; i += 180) {
        chunks.push(cleanSentence.substring(i, i + 180));
      }
    } else {
      chunks.push(cleanSentence);
    }
  });

  return chunks;
}

function speakNextChunk(session) {
  if (session !== speechSession) return;
  if (isSpeechPaused) return;

  if (currentChunk >= speechChunks.length) {
    speechControls.style.display = "none";
    return;
  }

  const utterance = new SpeechSynthesisUtterance(
    speechChunks[currentChunk]
  );

  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;

  utterance.onend = function () {
    if (session !== speechSession || isSpeechPaused) return;

    currentChunk++;
    speakNextChunk(session);
  };

  utterance.onerror = function (event) {
    if (session !== speechSession) return;

    if (event.error !== "canceled" && event.error !== "interrupted") {
      console.log("Speech error:", event.error);
    }
  };

  window.speechSynthesis.speak(utterance);
}

function speakInformation(text) {
  if (!("speechSynthesis" in window)) {
    alert("Sorry, voice narration is not supported by this browser.");
    return;
  }

  stopSpeech();

  speechChunks = splitIntoChunks(text);
  currentChunk = 0;
  isSpeechPaused = false;

  const session = speechSession;

  speechControls.style.display = "flex";

  speakNextChunk(session);
}

function pauseSpeech() {
  if (speechChunks.length === 0 || isSpeechPaused) return;

  isSpeechPaused = true;

  // Cancel the current sentence so Resume can restart it reliably.
  window.speechSynthesis.cancel();
}

function resumeSpeech() {
  if (!isSpeechPaused || speechChunks.length === 0) return;

  isSpeechPaused = false;

  const session = speechSession;

  speakNextChunk(session);
}

function stopSpeech() {
  speechSession++;

  isSpeechPaused = false;
  speechChunks = [];
  currentChunk = 0;

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (speechControls) {
    speechControls.style.display = "none";
  }
}

// Voice button events
pauseSpeechBtn.addEventListener("click", pauseSpeech);
resumeSpeechBtn.addEventListener("click", resumeSpeech);
stopSpeechBtn.addEventListener("click", stopSpeech);

// ==========================================
// LOAD MODEL
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
    console.error(error);

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
    fileStatus.textContent = "Please select an image file.";
    return;
  }

  const reader = new FileReader();

  reader.onload = function (event) {
    preview.src = event.target.result;

    preview.onload = function () {
      previewBox.style.display = "block";
      classifyBtn.disabled = false;

      fileStatus.textContent = "Image uploaded successfully.";

      predictions.innerHTML = "";
      categoryStatus.textContent = "";

      promptBox.textContent = "";
      askBtn.disabled = true;
      copyBtn.style.display = "none";
    };
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
      const percentage = (result.probability * 100).toFixed(2);

      const item = document.createElement("p");

      item.textContent =
        result.className + " — " + percentage + "%";

      predictions.appendChild(item);
    });

    predictedCategory = results[0].className;

    categoryStatus.textContent =
      "Predicted category: " + predictedCategory;

    askBtn.disabled = false;

    promptBox.textContent = "";
    copyBtn.style.display = "none";

  } catch (error) {
    console.error(error);

    categoryStatus.textContent =
      "Classification failed. Please try again.";

  } finally {
    classifyBtn.disabled = false;
    classifyBtn.textContent = "Classify uploaded picture";
  }
});

// ==========================================
// GET INFORMATION + START NARRATION
// ==========================================

askBtn.addEventListener("click", function () {
  const category = predictedCategory.toUpperCase();

  const information = informationLibrary[category];

  if (!information) {
    promptBox.textContent =
      "Information for this category is not available yet.";

    copyBtn.style.display = "none";
    stopSpeech();
    return;
  }

  promptBox.textContent = information;

  copyBtn.style.display = "inline-block";
  copyStatus.textContent = "";

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
      "Unable to copy. Please select and copy the text manually.";
  }
});

// ==========================================
// REMOVE IMAGE AND RESET
// ==========================================

removeBtn.addEventListener("click", function () {
  stopSpeech();

  fileInput.value = "";
  preview.src = "";

  previewBox.style.display = "none";

  fileStatus.textContent = "";
  predictions.innerHTML = "";
  categoryStatus.textContent = "";

  predictedCategory = "";

  promptBox.textContent = "";
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

loadModel();
