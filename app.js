// ======================================
// MAJOR CROPS DETECTOR - APP.JS
// ======================================

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/ZPH5tuVS8/";

const WORKER_URL =
  "https://old-glade-65c0.abhiinav003.workers.dev";

let model = null;
let selectedImage = null;
let predictedCategory = "";

// HTML elements
const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const previewBox = document.getElementById("previewBox");
const classifyBtn = document.getElementById("classify");
const predictionsBox = document.getElementById("predictions");

const loadBtn = document.getElementById("load");
const modelUrlInput = document.getElementById("modelUrl");
const modelStatus = document.getElementById("modelStatus");

const categoryStatus = document.getElementById("categoryStatus");
const askBtn = document.getElementById("ask");
const promptBox = document.getElementById("promptBox");
const copyBtn = document.getElementById("copy");
const copyStatus = document.getElementById("copyStatus");
const removeBtn = document.getElementById("remove");

// Load model URL into input
if (modelUrlInput) {
  modelUrlInput.value = MODEL_URL;
}

// Load Teachable Machine model
async function loadModel() {
  try {
    if (modelStatus) {
      modelStatus.textContent = "Loading model...";
    }

    const url = modelUrlInput?.value.trim() || MODEL_URL;

    model = await tmImage.load(
      url + "model.json",
      url + "metadata.json"
    );

    if (modelStatus) {
      modelStatus.textContent = "Model loaded successfully!";
    }

  } catch (error) {
    console.error(error);

    if (modelStatus) {
      modelStatus.textContent = "Unable to load model.";
    }
  }
}

// Load model when button is clicked
if (loadBtn) {
  loadBtn.addEventListener("click", loadModel);
}

// Select image
if (fileInput) {
  fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = function (event) {
      preview.src = event.target.result;

      if (previewBox) {
        previewBox.style.display = "block";
      }

      predictionsBox.textContent = "";
      predictedCategory = "";

      if (categoryStatus) {
        categoryStatus.textContent = "Image selected.";
      }

      if (promptBox) {
        promptBox.textContent = "";
      }
    };

    reader.readAsDataURL(file);
  });
}

// Classify image
if (classifyBtn) {
  classifyBtn.addEventListener("click", async function () {
    try {
      if (!selectedImage) {
        alert("Please select an image first.");
        return;
      }

      if (!model) {
        alert("Please load the model first.");
        return;
      }

      classifyBtn.disabled = true;
      classifyBtn.textContent = "Classifying...";

      const results = await model.predict(preview);

      results.sort((a, b) => b.probability - a.probability);

      predictedCategory = results[0].className;

      predictionsBox.innerHTML = "";

      results.forEach(result => {
        const item = document.createElement("p");

        item.textContent =
          result.className + " — " +
          (result.probability * 100).toFixed(1) + "%";

        predictionsBox.appendChild(item);
      });

      if (categoryStatus) {
        categoryStatus.textContent =
          "Predicted category: " + predictedCategory;
      }

    } catch (error) {
      console.error(error);
      alert("Image classification failed.");
    } finally {
      classifyBtn.disabled = false;
      classifyBtn.textContent = "Classify Image";
    }
  });
}

// Get information from Gemini through Cloudflare Worker
if (askBtn) {
  askBtn.addEventListener("click", async function () {
    try {
      if (!predictedCategory) {
        alert("Please classify an image first.");
        return;
      }

      askBtn.disabled = true;
      askBtn.textContent = "Generating information...";

      promptBox.textContent = "Generating information. Please wait...";

      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category: predictedCategory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed.");
      }

      promptBox.textContent =
        data.answer || "No information was generated.";

    } catch (error) {
      console.error(error);

      promptBox.textContent =
        "Unable to generate information: " + error.message;

    } finally {
      askBtn.disabled = false;
      askBtn.textContent = "Generate AI Information";
    }
  });
}

// Copy generated information
if (copyBtn) {
  copyBtn.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(
        promptBox.textContent
      );

      if (copyStatus) {
        copyStatus.textContent = "Copied successfully!";
      }

    } catch (error) {
      if (copyStatus) {
        copyStatus.textContent = "Unable to copy.";
      }
    }
  });
}

// Remove selected image
if (removeBtn) {
  removeBtn.addEventListener("click", function () {
    selectedImage = null;
    predictedCategory = "";

    if (fileInput) fileInput.value = "";
    if (preview) preview.src = "";
    if (previewBox) previewBox.style.display = "none";
    if (predictionsBox) predictionsBox.textContent = "";
    if (promptBox) promptBox.textContent = "";
    if (categoryStatus) categoryStatus.textContent = "";
    if (copyStatus) copyStatus.textContent = "";
  });
}

// Automatically load model
loadModel();
