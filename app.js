const $ = id => document.getElementById(id);

let model = null;
let file = null;
let predicted = "";
let confidence = 0;

const preview = $("preview");

$("file").onchange = e => {
  file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Choose an image.");
    return;
  }

  const r = new FileReader();

  r.onload = () => {
    preview.src = r.result;
    $("previewBox").hidden = false;
    $("classify").disabled = !model;
    $("predictions").hidden = true;
    $("promptBox").hidden = true;
    predicted = "";
    confidence = 0;
    $("ask").disabled = true;
    $("categoryStatus").textContent =
      "Classify this picture to get its Teachable Machine category.";
  };

  r.readAsDataURL(file);
};

$("remove").onclick = () => {
  file = null;
  $("file").value = "";
  preview.removeAttribute("src");
  $("previewBox").hidden = true;
  $("classify").disabled = true;
  $("predictions").hidden = true;
  $("promptBox").hidden = true;
  $("ask").disabled = true;
  predicted = "";
  confidence = 0;
};

$("load").onclick = async () => {
  let u = $("modelUrl").value.trim();

  if (!u) {
    $("modelStatus").textContent =
      "Paste your exported Teachable Machine model URL.";
    return;
  }

  if (!u.endsWith("/")) u += "/";

  $("modelStatus").textContent = "Loading model…";

  try {
    model = await tmImage.load(
      u + "model.json",
      u + "metadata.json"
    );

    $("modelStatus").textContent =
      `Model connected · ${model.getTotalClasses()} trained categories.`;

    $("classify").disabled = !file;

  } catch (err) {
    model = null;
    $("modelStatus").textContent =
      "Could not load model. Check your exported TensorFlow.js model URL.";
  }
};

$("classify").onclick = async () => {
  if (!model || !file) return;

  $("classify").disabled = true;
  $("modelStatus").textContent =
    "Classifying with your custom model…";

  try {
    const results = await model.predict(preview, false);

    results.sort((a, b) => b.probability - a.probability);

    predicted = results[0].className;
    confidence = results[0].probability;

    $("predictions").innerHTML =
      "<b>Teachable Machine results</b><br>" +
      results.slice(0, 5).map(x =>
        `${escapeHtml(x.className)}: ${(x.probability * 100).toFixed(1)}%`
      ).join("<br>");

    $("predictions").hidden = false;

    $("categoryStatus").innerHTML =
      `Predicted category: <b>${escapeHtml(predicted)}</b> ` +
      `(${(confidence * 100).toFixed(1)}% confidence).`;

    $("ask").disabled = false;
    $("promptBox").hidden = true;

    $("modelStatus").textContent =
      "Classification complete. This label comes from your trained classes.";

  } catch (err) {
    $("modelStatus").textContent =
      "Classification failed. Try another picture or reload the model.";
  } finally {
    $("classify").disabled = !model || !file;
  }
};

$("ask").onclick = () => {
  if (!predicted) return;

  const prompt =
    `My custom Teachable Machine image classifier predicted this category: “${predicted}” (confidence: ${(confidence * 100).toFixed(1)}%).\n\n` +
    `Do NOT inspect, identify, or make a new prediction about any image. Explain ONLY the category named above. ${$("focus").value} ` +
    `If the category name is ambiguous, explain the likely meaning and state the uncertainty. Do not claim that you verified the uploaded picture.`;

  $("prompt").value = prompt;

  $("openChatGPT").href =
    "https://chatgpt.com/?q=" + encodeURIComponent(prompt);

  $("promptBox").hidden = false;
};

$("copy").onclick = async () => {
  try {
    await navigator.clipboard.writeText($("prompt").value);

    $("copyStatus").textContent =
      "Copied. The prompt contains only the predicted category, not your photo.";

  } catch (err) {
    $("prompt").select();
    document.execCommand("copy");

    $("copyStatus").textContent =
      "Prompt selected/copied. Paste it into ChatGPT.";
  }
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}
