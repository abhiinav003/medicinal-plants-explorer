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
const fileStatus = document.getElementById("fileStatus");

const classifyBtn = document.getElementById("classify");
const predictionsBox = document.getElementById("predictions");

const loadBtn = document.getElementById("load");
const modelUrlInput = document.getElementById("modelUrl");
const modelStatus = document.getElementById("modelStatus");

const categoryStatus = document.getElementById("categoryStatus");
const askBtn = document.getElementById("ask");
const promptBox = document.getElementById("promptBox");
const focusInput = document.getElementById("focus");

const copyBtn = document.getElementById("copy");
const copyStatus = document.getElementById("copyStatus");
const removeBtn = document.getElementById("remove");

// Load model URL into input
if (modelUrlInput) {
  modelUrlInput.value = MODEL_URL;
}

// ======================================
// LOAD TEACHABLE MACHINE MODEL
// ======================================

async function loadModel() {
  try {
    if (modelStatus) {
      modelStatus.textContent = "Loading model...";
    }

    if (loadBtn) {
      loadBtn.disabled = true;
    }

    const url = modelUrlInput?.value.trim() || MODEL_URL;

    model = await tmImage.load(
      url + "model.json",
      url + "metadata.json"
    );

    if (modelStatus) {
      modelStatus.textContent = "Model loaded successfully!";
    }

    if (classifyBtn) {
      classifyBtn.disabled = !selectedImage;
    }

  } catch (error) {
    console.error(error);

    model = null;

    if (modelStatus) {
      modelStatus.textContent = "Unable to load model. Check the model URL.";
    }

    if (classifyBtn) {
      classifyBtn.disabled = true;
    }

  } finally {
    if (loadBtn) {
      loadBtn.disabled = false;
    }
  }
}

// Load model when button is clicked
if (loadBtn) {
  loadBtn.addEventListener("click", loadModel);
}

// ======================================
// SELECT AND PREVIEW IMAGE
// ======================================

if (fileInput) {
  fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");

      fileInput.value = "";
      return;
    }

    selectedImage = file;
    predictedCategory = "";

    if (fileStatus) {
      fileStatus.textContent = "Picture selected: " + file.name;
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
      categoryStatus.textContent = "Image selected. Ready to classify.";
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
        fileStatus.textContent = "Unable to read this image.";
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
        alert("Please load the model first.");
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
      classifyBtn.textContent = "Classify uploaded picture";
    }
  });
}

// ======================================
// GET INFORMATION FROM GEMINI
// THROUGH CLOUDFLARE WORKER
// ======================================

if (askBtn) {
  askBtn.addEventListener("click", async function () {
    try {
      if (!predictedCategory) {
        alert("Please classify an image first.");
        return;
      }

      askBtn.disabled = true;
      askBtn.textContent = "Generating information...";

      if (promptBox) {
        promptBox.hidden = false;
        promptBox.textContent = "Generating information. Please wait...";
      }

      const response = await fetch(WORKER_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          category: predictedCategory,
          focus: focusInput?.value || ""
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed.");
      }

      if (promptBox) {
        promptBox.textContent =
          data.answer || "No information was generated.";
      }

      if (copyBtn) {
        copyBtn.hidden = false;
      }

    } catch (error) {
      console.error(error);

      if (promptBox) {
        promptBox.hidden = false;
        promptBox.textContent =
          "Unable to generate information: " + error.message;
      }

    } finally {
      askBtn.disabled = false;
      askBtn.textContent = "Get information about this category";
    }
  });
}

// ======================================
// COPY GENERATED INFORMATION
// ======================================

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

// ======================================
// REMOVE SELECTED IMAGE
// ======================================

if (removeBtn) {
  removeBtn.addEventListener("click", function () {
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
      fileStatus.textContent = "No picture selected yet.";
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
        "First select a picture, connect your model, and classify the picture.";
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
// AUTOMATICALLY LOAD MODEL
// ======================================

loadModel();
