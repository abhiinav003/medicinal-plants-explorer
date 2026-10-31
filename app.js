// ======================================
// MEDICINAL PLANTS EXPLORER - APP.JS
// Built-in Information System
// Fixed Teachable Machine Model
// With Text-to-Speech Voice Feature
// ======================================

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/ZPH5tuVS8/";

let model = null;
let selectedImage = null;
let predictedCategory = "";

// ======================================
// HTML ELEMENTS
// ======================================

const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const previewBox = document.getElementById("previewBox");
const fileStatus = document.getElementById("fileStatus");

const classifyBtn = document.getElementById("classify");
const predictionsBox = document.getElementById("predictions");

const modelStatus = document.getElementById("modelStatus");

const categoryStatus = document.getElementById("categoryStatus");
const askBtn = document.getElementById("ask");
const promptBox = document.getElementById("promptBox");

const copyBtn = document.getElementById("copy");
const copyStatus = document.getElementById("copyStatus");
const removeBtn = document.getElementById("remove");

// ======================================
// BUILT-IN INFORMATION LIBRARY
// ======================================

const informationLibrary = {

  CATS: `
# CATS

## 1. Overview
Cats are small, domesticated mammals belonging to the
family Felidae. They are commonly kept as pets and are
known for their independent and curious nature.

## 2. Key Characteristics
- Cats have four legs and a flexible body.
- They have sharp claws and teeth.
- They possess excellent night vision.
- They have sensitive hearing.
- Their whiskers help them sense their surroundings.
- They communicate through sounds and body language.

## 3. Uses and Importance
- Cats are popular companion animals.
- They can help control rodents such as mice.
- They are important members of many households.
- They contribute to human companionship and enjoyment.

## 4. Origin and History
Domestic cats are descended primarily from the African
wildcat. Their relationship with humans developed
thousands of years ago, particularly alongside early
agricultural communities.

## 5. Five Interesting Facts
1. Cats spend a large part of their day sleeping.
2. Each cat has a unique nose pattern.
3. Cats use their whiskers to sense nearby objects.
4. A group of cats is sometimes called a clowder.
5. Cats can rotate their ears to detect sounds.
`,

  DOGS: `
# DOGS

## 1. Overview
Dogs are domesticated mammals belonging to the family
Canidae. They are among the earliest animals domesticated
by humans and are widely known for their loyalty and
social behaviour.

## 2. Key Characteristics
- Dogs have four legs and a strong sense of smell.
- They have an excellent sense of hearing.
- They communicate through barking and body language.
- They come in many breeds, shapes and sizes.
- They are social animals.
- They can learn commands and tasks through training.

## 3. Uses and Importance
- Dogs are popular companion animals.
- Some dogs assist people with disabilities.
- Some are trained for search and rescue work.
- Some help in detecting certain substances.
- Herding dogs assist in managing livestock.
- Guard dogs can help protect property.

## 4. Origin and History
Dogs descended from ancient wolf populations.
Their domestication began at least 15,000 years ago,
and possibly earlier. Over generations, humans bred
dogs for companionship and different working roles.

## 5. Five Interesting Facts
1. Dogs have an extremely powerful sense of smell.
2. Every dog's nose pattern is unique.
3. Dogs communicate using body language and sounds.
4. Different dog breeds have different abilities.
5. Dogs can learn many words and commands.
`

};

// ======================================
// TEXT-TO-SPEECH VOICE CONTROLS
// ======================================

const speechControls = document.createElement("div");

speechControls.id = "speechControls";
speechControls.hidden = true;

speechControls.style.marginTop = "15px";
speechControls.style.display = "flex";
speechControls.style.flexWrap = "wrap";
speechControls.style.gap = "10px";

speechControls.innerHTML = `
  <button type="button" id="speakPause">Pause</button>
  <button type="button" id="speakResume">Resume</button>
  <button type="button" id="speakStop">Stop</button>
  <p id="speechStatus" aria-live="polite" style="width:100%;"></p>
`;

if (promptBox) {
  promptBox.insertAdjacentElement("afterend", speechControls);
}

const pauseSpeechBtn =
  document.getElementById("speakPause");

const resumeSpeechBtn =
  document.getElementById("speakResume");

const stopSpeechBtn =
  document.getElementById("speakStop");

const speechStatus =
  document.getElementById("speechStatus");

// ======================================
// STOP VOICE
// ======================================

function stopSpeech() {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  speechControls.hidden = true;

  speechStatus.textContent = "";

}

// ======================================
// READ INFORMATION ALOUD
// ======================================

function speakInformation(text) {

  if (!("speechSynthesis" in window)) {

    speechControls.hidden = false;

    speechStatus.textContent =
      "Voice reading is not supported by this browser.";

    return;

  }

  stopSpeech();

  const cleanText = text
    .replace(/^#+\s*/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/[-•]/g, "");

  const utterance =
    new SpeechSynthesisUtterance(cleanText);

  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = function () {
    speechStatus.textContent = "Reading information...";
  };

  utterance.onend = function () {
    speechStatus.textContent = "Reading completed.";
  };

  utterance.onerror = function (event) {

    if (event.error !== "canceled" &&
        event.error !== "interrupted") {

      speechStatus.textContent =
        "Unable to play the voice.";

    }

  };

  speechControls.hidden = false;

  window.speechSynthesis.speak(utterance);

}

// ======================================
// PAUSE, RESUME AND STOP BUTTONS
// ======================================

pauseSpeechBtn.addEventListener("click", function () {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.pause();
    speechStatus.textContent = "Paused.";
  }

});

resumeSpeechBtn.addEventListener("click", function () {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.resume();
    speechStatus.textContent = "Reading information...";
  }

});

stopSpeechBtn.addEventListener("click", stopSpeech);

// ======================================
// AUTOMATICALLY LOAD FIXED MODEL
// ======================================

async function loadModel() {

  try {

    if (modelStatus) {
      modelStatus.textContent = "Connecting to the model...";
    }

    if (classifyBtn) {
      classifyBtn.disabled = true;
    }

    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    if (modelStatus) {
      modelStatus.textContent =
        "Model connected successfully! Ready to classify.";
    }

    if (classifyBtn) {
      classifyBtn.disabled = !selectedImage;
    }

  } catch (error) {

    console.error("Model loading error:", error);

    model = null;

    if (modelStatus) {
      modelStatus.textContent =
        "Unable to connect to the model. Please refresh the page.";
    }

    if (classifyBtn) {
      classifyBtn.disabled = true;
    }

  }

}

// ======================================
// SELECT AND PREVIEW IMAGE
// ======================================

if (fileInput) {

  fileInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Please select a valid image.");

      fileInput.value = "";
      return;

    }

    stopSpeech();

    selectedImage = file;
    predictedCategory = "";

    if (fileStatus) {
      fileStatus.textContent =
        "Picture selected: " + file.name;
    }

    if (classifyBtn) {
      classifyBtn.disabled = !model;
    }

    if (askBtn) {
      askBtn.disabled = true;
    }

    if (predictionsBox) {
      predictionsBox.innerHTML = "";
      predictionsBox.hidden = true;
    }

    if (categoryStatus) {
      categoryStatus.textContent =
        "Image selected. Ready to classify.";
    }

    if (promptBox) {
      promptBox.textContent = "";
      promptBox.hidden = true;
    }

    if (copyBtn) {
      copyBtn.hidden = true;
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }

    const reader = new FileReader();

    reader.onload = function (event) {

      preview.src = event.target.result;

      if (previewBox) {
        previewBox.hidden = false;
      }

    };

    reader.onerror = function () {

      if (fileStatus) {
        fileStatus.textContent =
          "Unable to read this image.";
      }

    };

    reader.readAsDataURL(file);

  });

}

// ======================================
// CLASSIFY IMAGE
// ======================================

if (classifyBtn) {

  classifyBtn.addEventListener("click", async function () {

    try {

      if (!selectedImage) {
        alert("Please select an image first.");
        return;
      }

      if (!model) {
        alert("The model is still loading. Please wait.");
        return;
      }

      classifyBtn.disabled = true;
      classifyBtn.textContent = "Classifying...";

      const results = await model.predict(preview);

      results.sort(
        (a, b) => b.probability - a.probability
      );

      predictedCategory = results[0].className;

      if (predictionsBox) {

        predictionsBox.innerHTML = "";
        predictionsBox.hidden = false;

        results.forEach(result => {

          const item = document.createElement("p");

          item.textContent =
            result.className + " — " +
            (result.probability * 100).toFixed(1) + "%";

          predictionsBox.appendChild(item);

        });

      }

      if (categoryStatus) {

        categoryStatus.textContent =
          "Predicted category: " + predictedCategory;

      }

      if (askBtn) {
        askBtn.disabled = false;
      }

    } catch (error) {

      console.error(error);

      alert("Image classification failed.");

    } finally {

      classifyBtn.disabled = !model || !selectedImage;

      classifyBtn.textContent =
        "Classify uploaded picture";

    }

  });

}

// ======================================
// DISPLAY INFORMATION AND START VOICE
// ======================================

if (askBtn) {

  askBtn.addEventListener("click", function () {

    if (!predictedCategory) {

      alert("Please classify an image first.");
      return;

    }

    askBtn.disabled = true;
    askBtn.textContent = "Loading information...";

    if (promptBox) {

      promptBox.hidden = false;

      const category =
        predictedCategory.trim().toUpperCase();

      const information =
        informationLibrary[category];

      if (information) {

        promptBox.textContent = information;

        // Automatically read the information aloud.
        speakInformation(information);

      } else {

        promptBox.textContent =
          "Information for " + predictedCategory +
          " is not available in the built-in library yet.";

        stopSpeech();

      }

    }

    if (copyBtn) {
      copyBtn.hidden = false;
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }

    askBtn.disabled = false;

    askBtn.textContent =
      "Get information about this category";

  });

}

// ======================================
// COPY INFORMATION
// ======================================

if (copyBtn) {

  copyBtn.addEventListener("click", async function () {

    try {

      await navigator.clipboard.writeText(
        promptBox.textContent
      );

      if (copyStatus) {
        copyStatus.textContent =
          "Copied successfully!";
      }

    } catch (error) {

      if (copyStatus) {
        copyStatus.textContent =
          "Unable to copy.";
      }

    }

  });

}

// ======================================
// REMOVE SELECTED IMAGE
// ======================================

if (removeBtn) {

  removeBtn.addEventListener("click", function () {

    stopSpeech();

    selectedImage = null;
    predictedCategory = "";

    if (fileInput) {
      fileInput.value = "";
    }

    if (preview) {
      preview.src = "";
    }

    if (previewBox) {
      previewBox.hidden = true;
    }

    if (fileStatus) {
      fileStatus.textContent =
        "No picture selected yet.";
    }

    if (predictionsBox) {
      predictionsBox.innerHTML = "";
      predictionsBox.hidden = true;
    }

    if (promptBox) {
      promptBox.textContent = "";
      promptBox.hidden = true;
    }

    if (categoryStatus) {
      categoryStatus.textContent =
        "First select a picture and classify the picture.";
    }

    if (askBtn) {
      askBtn.disabled = true;
    }

    if (classifyBtn) {
      classifyBtn.disabled = true;
    }

    if (copyBtn) {
      copyBtn.hidden = true;
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }

  });

}

// ======================================
// LOAD MODEL WHEN WEBSITE OPENS
// ======================================

loadModel();
