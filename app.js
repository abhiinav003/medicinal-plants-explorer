// ======================================
// MEDICINAL PLANTS EXPLORER
// PREMIUM BOTANICAL APP.JS
// ======================================

// ======================================
// MODEL CONFIGURATION
// ======================================

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/ZPH5tuVS8/";

let model = null;
let selectedImage = null;
let predictedCategory = "";
let imageObjectURL = null;

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
// DARK MODE
// ======================================

function setupTheme() {

  const header = document.querySelector("header");

  if (!header) return;

  const themeButton = document.createElement("button");

  themeButton.id = "themeToggle";
  themeButton.type = "button";
  themeButton.setAttribute("aria-label", "Switch theme");

  header.appendChild(themeButton);

  function applyTheme(theme) {

    document.documentElement.dataset.theme = theme;

    themeButton.textContent =
      theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";

    themeButton.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

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

    applyTheme(
      currentTheme === "dark" ? "light" : "dark"
    );

  });

}

// ======================================
// PLANT OF THE DAY
// ======================================

function setupPlantOfTheDay() {

  const main = document.querySelector("main");

  if (!main) return;

  const plantCard = document.createElement("section");

  plantCard.id = "plantOfTheDay";
  plantCard.className = "card plant-day-card";

  const plants = [
    {
      name: "Tulsi",
      scientific: "Ocimum tenuiflorum",
      fact: "Tulsi is an aromatic plant widely grown in Indian households."
    },
    {
      name: "Neem",
      scientific: "Azadirachta indica",
      fact: "Neem is an evergreen tree native to the Indian subcontinent."
    },
    {
      name: "Aloe Vera",
      scientific: "Aloe barbadensis miller",
      fact: "Aloe vera is a succulent plant known for its thick, fleshy leaves."
    },
    {
      name: "Mint",
      scientific: "Mentha",
      fact: "Mint plants are known for their refreshing aroma."
    },
    {
      name: "Turmeric",
      scientific: "Curcuma longa",
      fact: "Turmeric is a tropical plant whose rhizome is widely used as a spice."
    },
    {
      name: "Ginger",
      scientific: "Zingiber officinale",
      fact: "Ginger is a flowering plant cultivated for its aromatic rhizome."
    },
    {
      name: "Ashwagandha",
      scientific: "Withania somnifera",
      fact: "Ashwagandha is a plant native to parts of Asia and Africa."
    }
  ];

  // Select the same plant throughout each calendar day.

  const today = new Date();

  const dayNumber = Math.floor(
    Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ) / 86400000
  );

  const plant = plants[
    ((dayNumber % plants.length) + plants.length) %
    plants.length
  ];

  plantCard.innerHTML = `
    <div class="plant-day-icon">🌿</div>

    <div class="plant-day-content">
      <span class="plant-day-label">TODAY'S FEATURED PLANT</span>

      <h2>${plant.name}</h2>

      <p class="plant-scientific">
        ${plant.scientific}
      </p>

      <p>${plant.fact}</p>
    </div>
  `;

  const welcomeSection =
    main.querySelector(".welcome-section, .intro");

  if (welcomeSection) {
    welcomeSection.insertAdjacentElement(
      "afterend",
      plantCard
    );
  } else {
    main.prepend(plantCard);
  }

}

// ======================================
// IMAGE SCANNING STATUS
// ======================================

function showScanningStatus() {

  if (!categoryStatus) return;

  categoryStatus.innerHTML = `
    <span class="scanning-indicator"></span>
    Analyzing your image...
  `;

  if (classifyBtn) {
    classifyBtn.classList.add("is-scanning");
  }

}

function hideScanningStatus() {

  if (classifyBtn) {
    classifyBtn.classList.remove("is-scanning");
  }

}

// ======================================
// VOICE CONTROLS
// ======================================

const speechControls = document.createElement("div");

speechControls.id = "speechControls";
speechControls.className = "speech-controls";
speechControls.hidden = true;

speechControls.innerHTML = `
  <button type="button" id="speakPause">
    Pause
  </button>

  <button type="button" id="speakResume">
    Resume
  </button>

  <button type="button" id="speakStop">
    Stop
  </button>

  <p id="speechStatus" aria-live="polite"></p>
`;

if (promptBox && promptBox.parentElement) {
  promptBox.insertAdjacentElement(
    "afterend",
    speechControls
  );
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
// STOP SPEECH
// ======================================

function stopSpeech() {

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  speechControls.hidden = true;

  if (speechStatus) {
    speechStatus.textContent = "";
  }

}

// ======================================
// SPEAK INFORMATION
// ======================================

function speakInformation(text) {

  if (!("speechSynthesis" in window)) {

    speechControls.hidden = false;

    speechStatus.textContent =
      "Your browser does not support voice reading.";

    return;

  }

  window.speechSynthesis.cancel();

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

    speechStatus.textContent =
      "🔊 Reading information...";

  };

  utterance.onend = function () {

    speechStatus.textContent =
      "Reading completed.";

  };

  utterance.onerror = function (event) {

    speechStatus.textContent =
      "Voice error: " + event.error;

  };

  speechControls.hidden = false;

  speechStatus.textContent =
    "Preparing voice...";

  window.speechSynthesis.speak(utterance);

}

// ======================================
// SPEECH BUTTON EVENTS
// ======================================

pauseSpeechBtn.addEventListener("click", function () {

  window.speechSynthesis.pause();

  speechStatus.textContent = "Speech paused.";

});

resumeSpeechBtn.addEventListener("click", function () {

  window.speechSynthesis.resume();

  speechStatus.textContent = "Resuming speech...";

});

stopSpeechBtn.addEventListener("click", stopSpeech);

// ======================================
// LOAD TEACHABLE MACHINE MODEL
// ======================================

async function loadModel() {

  try {

    if (modelStatus) {
      modelStatus.textContent =
        "Connecting to the model...";
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

    if (imageObjectURL) {
      URL.revokeObjectURL(imageObjectURL);
    }

    imageObjectURL = URL.createObjectURL(file);

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
      promptBox.hidden = true;
    }

    if (informationBox) {
      informationBox.textContent = "";
    }

    if (copyBtn) {
      copyBtn.hidden = true;
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }

    preview.onload = function () {

      if (previewBox) {
        previewBox.hidden = false;
      }

    };

    preview.onerror = function () {

      if (fileStatus) {
        fileStatus.textContent =
          "Unable to display this image.";
      }

    };

    preview.src = imageObjectURL;

  });

}

// ======================================
// CONFIDENCE BAR CREATOR
// ======================================

function createConfidenceBar(result, index) {

  const percentage =
    (result.probability * 100).toFixed(1);

  const item = document.createElement("div");

  item.className = "confidence-item";

  const name = document.createElement("div");
  name.className = "confidence-heading";

  const category = document.createElement("span");
  category.textContent = result.className;

  const value = document.createElement("strong");
  value.textContent = percentage + "%";

  name.append(category, value);

  const track = document.createElement("div");
  track.className = "confidence-track";

  const bar = document.createElement("div");
  bar.className = "confidence-fill";

  bar.style.width = "0%";

  track.appendChild(bar);

  item.append(name, track);

  // Animate after the browser renders the bar.

  requestAnimationFrame(() => {

    setTimeout(() => {
      bar.style.width = percentage + "%";
    }, index * 120);

  });

  return item;

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
      classifyBtn.textContent = "Scanning Image...";

      showScanningStatus();

      if (askBtn) {
        askBtn.disabled = true;
      }

      stopSpeech();

      const results = await model.predict(preview);

      results.sort(
        (a, b) => b.probability - a.probability
      );

      predictedCategory = results[0].className;

      if (predictionsBox) {

        predictionsBox.innerHTML = "";
        predictionsBox.hidden = false;

        results.forEach((result, index) => {

          predictionsBox.appendChild(
            createConfidenceBar(result, index)
          );

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

      console.error("Classification error:", error);

      if (categoryStatus) {
        categoryStatus.textContent =
          "Classification failed. Please try again.";
      }

      alert("Image classification failed.");

    } finally {

      hideScanningStatus();

      classifyBtn.disabled = !model || !selectedImage;

      classifyBtn.textContent =
        "Classify uploaded picture";

    }

  });

}

// ======================================
// DISPLAY INFORMATION AND PLAY VOICE
// ======================================

if (askBtn) {

  askBtn.addEventListener("click", function () {

    if (!predictedCategory) {

      alert("Please classify an image first.");
      return;

    }

    stopSpeech();

    askBtn.disabled = true;
    askBtn.textContent = "Loading information...";

    const category =
      predictedCategory.trim().toUpperCase();

    const information =
      informationLibrary[category];

    if (promptBox) {
      promptBox.hidden = false;
    }

    if (informationBox) {

      informationBox.textContent = information ||
        "Information for " + predictedCategory +
        " is not available in the built-in library yet.";

    } else if (promptBox) {

      promptBox.textContent = information ||
        "Information for " + predictedCategory +
        " is not available in the built-in library yet.";

    }

    if (information) {
      speakInformation(information);
    }

    if (copyBtn) {
      copyBtn.hidden = false;
    }

    if (copyStatus) {
      copyStatus.textContent = "";
    }

    askBtn.disabled = false;

    askBtn.textContent =
      "Get Information";

  });

}

// ======================================
// COPY INFORMATION
// ======================================

if (copyBtn) {

  copyBtn.addEventListener("click", async function () {

    const textToCopy = informationBox
      ? informationBox.textContent
      : promptBox.textContent;

    try {

      await navigator.clipboard.writeText(textToCopy);

      if (copyStatus) {
        copyStatus.textContent =
          "Copied successfully!";
      }

    } catch (error) {

      if (copyStatus) {
        copyStatus.textContent =
          "Unable to copy. Please try again.";
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

    if (imageObjectURL) {
      URL.revokeObjectURL(imageObjectURL);
      imageObjectURL = null;
    }

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
        "No image selected.";
    }

    if (predictionsBox) {
      predictionsBox.innerHTML = "";
      predictionsBox.hidden = true;
    }

    if (promptBox) {
      promptBox.hidden = true;
    }

    if (informationBox) {
      informationBox.textContent = "";
    }

    if (categoryStatus) {
      categoryStatus.textContent =
        "Select an image to begin.";
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
// INITIALIZE WEBSITE
// ======================================

setupTheme();
setupPlantOfTheDay();
loadModel();
