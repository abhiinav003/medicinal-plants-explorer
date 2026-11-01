// ======================================
// MEDICINAL PLANTS EXPLORER
// DOGS & CATS TESTING VERSION
// PREMIUM BOTANICAL FEATURES
// ======================================

// MODEL CONFIGURATION

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/ZPH5tuVS8/";

let model = null;
let selectedImage = null;
let predictedCategory = "";
let imageObjectURL = null;
let currentInformation = "";

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
const informationBox = document.getElementById("information");

const copyBtn = document.getElementById("copy");
const copyStatus = document.getElementById("copyStatus");
const removeBtn = document.getElementById("remove");
const openChatGPTBtn = document.getElementById("openChatGPT");

// ======================================
// INFORMATION LIBRARY
// ======================================

const informationLibrary = {

  CATS: `
# 🐈 CATS

## 1. Overview

Cats are small, domesticated mammals belonging to the family Felidae. They are commonly kept as pets and are known for their independent, curious, and playful nature.

## 2. Key Characteristics

- Cats have four legs and a flexible body.
- They have sharp claws and teeth.
- They possess excellent low-light vision.
- They have sensitive hearing.
- Their whiskers help them sense their surroundings.
- They communicate through sounds and body language.
- They are naturally agile and good climbers.

## 3. Uses and Importance

- Cats are popular companion animals.
- They can help control rodents such as mice.
- They are important members of many households.
- They provide companionship and enjoyment.
- They contribute to human-animal relationships.

## 4. Origin and History

Domestic cats are descended primarily from the African wildcat. Their relationship with humans developed thousands of years ago, particularly alongside early agricultural communities.

## 5. Five Interesting Facts

1. Cats spend a large part of their day sleeping.
2. Each cat has a unique nose pattern.
3. Cats use their whiskers to sense nearby objects.
4. A group of cats is sometimes called a clowder.
5. Cats can rotate their ears to detect sounds.
`,

  DOGS: `
# 🐕 DOGS

## 1. Overview

Dogs are domesticated mammals belonging to the family Canidae. They are among the earliest animals domesticated by humans and are widely known for their loyalty, intelligence, and social behaviour.

## 2. Key Characteristics

- Dogs have four legs and a strong sense of smell.
- They have an excellent sense of hearing.
- They communicate through barking and body language.
- They come in many breeds, shapes, and sizes.
- They are social animals.
- They can learn commands and tasks through training.
- They have a well-developed sense of smell.

## 3. Uses and Importance

- Dogs are popular companion animals.
- Some dogs assist people with disabilities.
- Some are trained for search and rescue work.
- Some help in detecting certain substances.
- Herding dogs assist in managing livestock.
- Guard dogs can help protect property.
- They provide companionship to people.

## 4. Origin and History

Dogs descended from ancient wolf populations. Their domestication began at least 15,000 years ago, and possibly earlier. Over generations, humans bred dogs for companionship and different working roles.

## 5. Five Interesting Facts

1. Dogs have an extremely powerful sense of smell.
2. Every dog's nose pattern is unique.
3. Dogs communicate using body language and sounds.
4. Different dog breeds have different abilities.
5. Dogs can learn many words and commands.
`

};

// ======================================
// INFORMATION DISPLAY
// ======================================

function displayInformation(text) {

  const lines = text.trim().split("\n");

  let html = "";
  let inList = false;
  let inOrderedList = false;

  lines.forEach(line => {

    const trimmed = line.trim();

    if (!trimmed) return;

    if (trimmed.startsWith("# ")) {

      if (inList) {
        html += "</ul>";
        inList = false;
      }

      if (inOrderedList) {
        html += "</ol>";
        inOrderedList = false;
      }

      html += `<h2>${trimmed.substring(2)}</h2>`;

    } else if (trimmed.startsWith("## ")) {

      if (inList) {
        html += "</ul>";
        inList = false;
      }

      if (inOrderedList) {
        html += "</ol>";
        inOrderedList = false;
      }

      html += `<h3>${trimmed.substring(3)}</h3>`;

    } else if (trimmed.startsWith("- ")) {

      if (inOrderedList) {
        html += "</ol>";
        inOrderedList = false;
      }

      if (!inList) {
        html += "<ul>";
        inList = true;
      }

      html += `<li>${trimmed.substring(2)}</li>`;

    } else if (/^\d+\.\s/.test(trimmed)) {

      if (inList) {
        html += "</ul>";
        inList = false;
      }

      if (!inOrderedList) {
        html += "<ol>";
        inOrderedList = true;
      }

      html += `<li>${trimmed.replace(/^\d+\.\s/, "")}</li>`;

    } else {

      if (inList) {
        html += "</ul>";
        inList = false;
      }

      if (inOrderedList) {
        html += "</ol>";
        inOrderedList = false;
      }

      html += `<p>${trimmed}</p>`;

    }

  });

  if (inList) html += "</ul>";
  if (inOrderedList) html += "</ol>";

  informationBox.innerHTML = html;

}

// ======================================
// DARK MODE
// ======================================

function setupTheme() {

  const header = document.querySelector("header");

  if (!header) return;

  const themeButton = document.createElement("button");

  themeButton.id = "themeToggle";
  themeButton.type = "button";

  header.appendChild(themeButton);

  function applyTheme(theme) {

    document.documentElement.dataset.theme = theme;

    themeButton.textContent =
      theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

    try {
      localStorage.setItem("plantExplorerTheme", theme);
    } catch (error) {
      console.warn("Theme preference could not be saved.");
    }

  }

  let savedTheme = "light";

  try {
    savedTheme =
      localStorage.getItem("plantExplorerTheme") || "light";
  } catch (error) {
    console.warn("Theme preference could not be loaded.");
  }

  applyTheme(savedTheme);

  themeButton.addEventListener("click", function () {

    const currentTheme =
      document.documentElement.dataset.theme;

    applyTheme(currentTheme === "dark" ? "light" : "dark");

  });

}

// ======================================
// VOICE CONTROLS
// ======================================

const speechControls = document.createElement("div");

speechControls.className = "speech-controls";
speechControls.hidden = true;

speechControls.innerHTML = `
  <button type="button" id="speakPause">⏸ Pause</button>
  <button type="button" id="speakResume">▶ Resume</button>
  <button type="button" id="speakStop">⏹ Stop</button>
  <p id="speechStatus" aria-live="polite"></p>
`;

if (promptBox && promptBox.parentElement) {
  promptBox.insertAdjacentElement("afterend", speechControls);
}

const pauseSpeechBtn = document.getElementById("speakPause");
const resumeSpeechBtn = document.getElementById("speakResume");
const stopSpeechBtn = document.getElementById("speakStop");
const speechStatus = document.getElementById("speechStatus");

// STOP SPEECH

function stopSpeech() {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  speechControls.hidden = true;
  speechStatus.textContent = "";

}

// SPEAK INFORMATION

function speakInformation(text) {

  if (!("speechSynthesis" in window)) {
    speechStatus.textContent =
      "Voice reading is not supported in this browser.";
    return;
  }

  window.speechSynthesis.cancel();

  const cleanText = text
    .replace(/^#+\s*/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/[-•]/g, "")
    .replace(/^\d+\.\s*/gm, "");

  const utterance = new SpeechSynthesisUtterance(cleanText);

  utterance.lang = "en-US";
  utterance.rate = 0.9;
  utterance.pitch = 1;

  utterance.onstart = () => {
    speechStatus.textContent = "🔊 Reading information...";
  };

  utterance.onend = () => {
    speechStatus.textContent = "Reading completed.";
  };

  utterance.onerror = () => {
    speechStatus.textContent = "Unable to play voice.";
  };

  speechControls.hidden = false;
  speechStatus.textContent = "Preparing voice...";

  window.speechSynthesis.speak(utterance);

}

pauseSpeechBtn.addEventListener("click", () => {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.pause();
    speechStatus.textContent = "Speech paused.";
  }

});

resumeSpeechBtn.addEventListener("click", () => {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.resume();
    speechStatus.textContent = "Resuming speech...";
  }

});

stopSpeechBtn.addEventListener("click", stopSpeech);

// ======================================
// LOAD TEACHABLE MACHINE MODEL
// ======================================

async function loadModel() {

  try {

    modelStatus.textContent = "Connecting to the model...";
    classifyBtn.disabled = true;

    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    modelStatus.textContent =
      "Model connected successfully! Ready to classify.";

    classifyBtn.disabled = !selectedImage;

  } catch (error) {

    console.error("Model loading error:", error);

    modelStatus.textContent =
      "Unable to connect to the model. Please refresh the page.";

    classifyBtn.disabled = true;

  }

}

// ======================================
// SELECT IMAGE
// ======================================

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
  currentInformation = "";

  if (imageObjectURL) {
    URL.revokeObjectURL(imageObjectURL);
  }

  imageObjectURL = URL.createObjectURL(file);

  fileStatus.textContent = "Picture selected: " + file.name;

  askBtn.hidden = true;
  askBtn.disabled = true;

  classifyBtn.disabled = true;

  predictionsBox.innerHTML = "";
  predictionsBox.hidden = true;

  categoryStatus.textContent =
    "Image selected. Ready to classify.";

  promptBox.hidden = true;
  informationBox.innerHTML = "";

  copyBtn.hidden = true;
  copyStatus.textContent = "";

  preview.onload = () => {

    previewBox.hidden = false;
    classifyBtn.disabled = !model;

  };

  preview.onerror = () => {

    fileStatus.textContent = "Unable to display this image.";
    classifyBtn.disabled = true;

  };

  preview.src = imageObjectURL;

});

// ======================================
// ANIMATED CONFIDENCE GRAPHS
// ======================================

function createConfidenceBar(result, index) {

  const percentage =
    (result.probability * 100).toFixed(1);

  const item = document.createElement("div");

  item.className = "confidence-item";

  const heading = document.createElement("div");

  heading.className = "confidence-heading";

  const category = document.createElement("span");

  category.textContent = result.className;

  const value = document.createElement("strong");

  value.textContent = percentage + "%";

  heading.append(category, value);

  const track = document.createElement("div");

  track.className = "confidence-track";

  const bar = document.createElement("div");

  bar.className = "confidence-fill";

  bar.style.width = "0%";

  track.appendChild(bar);

  item.append(heading, track);

  requestAnimationFrame(() => {

    setTimeout(() => {

      bar.style.width = percentage + "%";

    }, index * 150);

  });

  return item;

}

// ======================================
// CLASSIFY IMAGE
// ======================================

classifyBtn.addEventListener("click", async function () {

  if (!selectedImage || !model) return;

  try {

    classifyBtn.disabled = true;
    classifyBtn.textContent = "Scanning Image...";

    categoryStatus.textContent =
      "Analyzing your image...";

    askBtn.hidden = true;
    askBtn.disabled = true;

    stopSpeech();

    const results = await model.predict(preview);

    results.sort((a, b) => b.probability - a.probability);

    predictedCategory =
      results[0].className.trim().toUpperCase();

    predictionsBox.innerHTML = "";
    predictionsBox.hidden = false;

    results.forEach((result, index) => {

      predictionsBox.appendChild(
        createConfidenceBar(result, index)
      );

    });

    categoryStatus.textContent =
      "Predicted category: " + predictedCategory;

    askBtn.hidden = false;
    askBtn.disabled = false;

    askBtn.textContent = "✨ Get AI Information";

  } catch (error) {

    console.error("Classification error:", error);

    categoryStatus.textContent =
      "Classification failed. Please try again.";

  } finally {

    classifyBtn.disabled = !model || !selectedImage;

    classifyBtn.textContent = "Identify Image";

  }

});

// ======================================
// GET CATEGORY INFORMATION
// ======================================

askBtn.addEventListener("click", function () {

  if (!predictedCategory) return;

  const information =
    informationLibrary[predictedCategory];

  if (!information) {

    alert("Information for this category is not available.");
    return;

  }

  stopSpeech();

  currentInformation = information;

  displayInformation(information);

  promptBox.hidden = false;

  copyBtn.hidden = false;

  copyStatus.textContent = "";

  promptBox.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  speakInformation(information);

});

// ======================================
// COPY INFORMATION
// ======================================

copyBtn.addEventListener("click", async function () {

  try {

    await navigator.clipboard.writeText(currentInformation);

    copyStatus.textContent =
      "Information copied successfully!";

  } catch (error) {

    copyStatus.textContent =
      "Unable to copy. Please try again.";

  }

});

// ======================================
// OPEN CHATGPT
// ======================================

openChatGPTBtn.addEventListener("click", function () {

  if (!predictedCategory) return;

  const prompt = `
My Teachable Machine image classifier predicted the category "${predictedCategory}".

Please provide a detailed educational explanation of this category, including:
1. Overview
2. Key characteristics
3. Uses and importance
4. Origin and history
5. Five interesting facts

Do not identify or inspect any image. Explain only the named category.
`;

  const chatGPTURL =
    "https://chatgpt.com/?q=" + encodeURIComponent(prompt);

  window.open(chatGPTURL, "_blank");

});

// ======================================
// REMOVE IMAGE
// ======================================

removeBtn.addEventListener("click", function () {

  stopSpeech();

  selectedImage = null;
  predictedCategory = "";
  currentInformation = "";

  if (imageObjectURL) {

    URL.revokeObjectURL(imageObjectURL);
    imageObjectURL = null;

  }

  fileInput.value = "";
  preview.src = "";

  previewBox.hidden = true;

  fileStatus.textContent = "No image selected.";

  predictionsBox.innerHTML = "";
  predictionsBox.hidden = true;

  promptBox.hidden = true;
  informationBox.innerHTML = "";

  categoryStatus.textContent =
    "Select an image to begin.";

  askBtn.hidden = true;
  askBtn.disabled = true;

  classifyBtn.disabled = true;

  copyBtn.hidden = true;
  copyStatus.textContent = "";

});

// ======================================
// INITIALIZE WEBSITE
// ======================================

setupTheme();
loadModel();
