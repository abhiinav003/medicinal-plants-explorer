// ============================================
// MEDICINAL PLANTS EXPLORER
// 20-CATEGORY TEACHABLE MACHINE MODEL
// ============================================

const MODEL_URL =
  "https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = false;
let currentPlant = null;

// ============================================
// PLANT INFORMATION DATABASE
// ============================================

const plantInformation = {

  "Mint": {
    scientific: "Mentha species",
    family: "Lamiaceae",
    type: "Aromatic herb",

    overview: "Mint is a widely cultivated aromatic herb valued for its refreshing smell and cooling taste. Different species grow in temperate and subtropical regions. It is commonly grown in home gardens and commercial herb farms.",

    appearance: "Mint has green, usually opposite leaves with serrated edges and a wrinkled surface. It produces small flowers in clusters and spreads through underground stems or creeping stems in many species.",

    parts: "Leaves and essential oil.",

    uses: "Mint leaves are used in chutneys, salads, sauces, teas, beverages and other dishes. Mint oil is also used in flavoring, oral-care products and fragrances.",

    facts: [
      "Mint belongs to the same family as basil and rosemary.",
      "Menthol gives peppermint its characteristic cooling sensation.",
      "Many mint varieties grow quickly and spread easily.",
      "Mint flowers attract bees and other pollinators.",
      "Different mint species have different aromas and flavors."
    ]
  },

  "Tulsi": {
    scientific: "Ocimum tenuiflorum",
    family: "Lamiaceae",
    type: "Aromatic shrub",

    overview: "Tulsi, also known as Holy Basil, is one of the most culturally important plants in India. It is commonly grown in household gardens and valued for its aromatic leaves and traditional significance.",

    appearance: "Tulsi usually grows as a small branching shrub. It has aromatic green or purplish leaves arranged in opposite pairs and produces small flowers on upright flower spikes.",

    parts: "Leaves, stems, flowers and seeds in different traditional preparations.",

    uses: "Tulsi leaves are commonly used in herbal teas and traditional household preparations. The plant is also grown for religious, cultural and ornamental purposes.",

    facts: [
      "Tulsi is native to the Indian subcontinent and nearby regions.",
      "It is commonly called Holy Basil.",
      "Its flowers attract bees and other pollinating insects.",
      "Several cultivated varieties have green or purple leaves.",
      "Tulsi is frequently grown near homes and temples in India."
    ]
  },

  "Neem": {
    scientific: "Azadirachta indica",
    family: "Meliaceae",
    type: "Evergreen or semi-evergreen tree",

    overview: "Neem is a well-known tree native to the Indian subcontinent. It is valued for its ability to grow in relatively dry conditions and for its importance in traditional practices, agriculture and everyday products.",

    appearance: "Neem is a medium-to-large tree with a broad crown. It has compound leaves containing several serrated leaflets, small white flowers and smooth olive-like fruits that turn yellow when ripe.",

    parts: "Leaves, seeds, seed oil, bark, flowers and fruits.",

    uses: "Neem-derived ingredients are used in certain soaps, shampoos, cosmetics and agricultural pest-management products. Neem seed oil is important in some botanical pesticide formulations.",

    facts: [
      "Neem is native to the Indian subcontinent.",
      "It can tolerate hot and relatively dry climates.",
      "Neem flowers are small and fragrant.",
      "Neem seeds contain compounds used in botanical pest-control products.",
      "Neem trees provide shade and support local biodiversity."
    ]
  },

  "Garlic": {
    scientific: "Allium sativum",
    family: "Amaryllidaceae",
    type: "Bulbous herb",

    overview: "Garlic is an important culinary plant cultivated in many parts of the world. Its underground bulb consists of several smaller sections called cloves. It is valued for its strong smell and distinctive flavor.",

    appearance: "Garlic has long, narrow, flat green leaves and grows from an underground bulb. The bulb contains several cloves covered by papery skin. Some varieties also produce flower stalks.",

    parts: "Bulbs and cloves. Leaves are also used in some cuisines.",

    uses: "Garlic is widely used as a seasoning in vegetables, sauces, soups, pickles and other foods. It is also used in traditional practices and food-processing industries.",

    facts: [
      "Garlic belongs to the same family as onions and leeks.",
      "Each bulb generally contains multiple cloves.",
      "Crushing garlic releases sulfur-containing compounds.",
      "Allicin contributes to the smell of freshly crushed garlic.",
      "Garlic has been cultivated and used for thousands of years."
    ]
  },

  "Curry": {
    scientific: "Murraya koenigii",
    family: "Rutaceae",
    type: "Small aromatic tree or shrub",

    overview: "The curry leaf plant is an aromatic plant widely grown in India and other parts of South Asia. Its leaves are an important ingredient in many regional cuisines.",

    appearance: "It usually grows as a small tree or shrub. It has compound leaves with many small leaflets, fragrant white flowers and small fruits that become dark purple or black when ripe.",

    parts: "Mainly the leaves. Other plant parts also have traditional uses.",

    uses: "Curry leaves are used to flavor dals, curries, chutneys, soups and vegetable dishes. They are also used in some traditional preparations and cosmetic products.",

    facts: [
      "Curry leaves are especially popular in South Indian cuisine.",
      "The plant belongs to the citrus family.",
      "Fresh leaves generally have a stronger aroma than dried leaves.",
      "Its flowers attract pollinating insects.",
      "Curry leaves are different from curry powder."
    ]
  },

  "Rosemary": {
    scientific: "Salvia rosmarinus",
    family: "Lamiaceae",
    type: "Evergreen aromatic shrub",

    overview: "Rosemary is an aromatic evergreen shrub originally native to the Mediterranean region. It is cultivated for its fragrant leaves and widely used in cooking, landscaping and fragrance production.",

    appearance: "Rosemary has narrow, needle-like leaves that are dark green on top and often lighter underneath. It produces small blue, violet, pink or white flowers and develops woody stems as it matures.",

    parts: "Leaves, flowering tops and essential oil.",

    uses: "Rosemary is used to flavor potatoes, breads, soups and roasted vegetables. Its aromatic oil is used in perfumes, soaps and personal-care products.",

    facts: [
      "Rosemary is native to the Mediterranean region.",
      "It belongs to the mint family.",
      "Its flowers attract bees.",
      "It is an evergreen plant in suitable climates.",
      "Its scientific classification was changed from Rosmarinus to Salvia."
    ]
  },

  "Lavender": {
    scientific: "Lavandula species",
    family: "Lamiaceae",
    type: "Aromatic flowering shrub",

    overview: "Lavender is a fragrant flowering plant known for its purple flower spikes and characteristic aroma. It is widely cultivated for ornamental, fragrance and essential-oil industries.",

    appearance: "Lavender has narrow, sometimes silvery-green leaves. It produces clusters of small purple, violet or blue flowers on upright stems. Many mature varieties develop a woody base.",

    parts: "Flowers, leaves and essential oil.",

    uses: "Lavender is used in perfumes, soaps, scented products, decorative arrangements and fragrance sachets. Dried flowers are also used in some culinary preparations.",

    facts: [
      "Lavender belongs to the mint family.",
      "It is associated with Mediterranean regions.",
      "Bees and butterflies visit its flowers.",
      "Lavender essential oil is obtained from its flowering parts.",
      "Several species and cultivated varieties exist."
    ]
  },

  "Chamomile": {
    scientific: "Matricaria chamomilla",
    family: "Asteraceae",
    type: "Flowering herb",

    overview: "Chamomile is a small flowering herb known for its daisy-like flowers. It has a long history of use in traditional herbal preparations and is especially popular as an herbal tea ingredient.",

    appearance: "Chamomile has finely divided, delicate leaves. It produces flowers with white petals and yellow centers. Its flower center becomes more raised as it matures.",

    parts: "Mainly the flowers.",

    uses: "Dried chamomile flowers are used to prepare herbal infusions. Chamomile extracts are also used in some cosmetics, soaps and fragrance products.",

    facts: [
      "Chamomile belongs to the sunflower family.",
      "Its flowers resemble small daisies.",
      "German chamomile is an annual herb.",
      "It has been used in traditional herbal practices for centuries.",
      "It is cultivated for herbal tea and cosmetic industries."
    ]
  },

  "Aamla": {
    scientific: "Phyllanthus emblica",
    family: "Phyllanthaceae",
    type: "Deciduous tree",

    overview: "Aamla, also known as Indian Gooseberry, is a fruit-bearing tree widely known in India. Its fruits have a sour, bitter and astringent taste and are important in traditional Indian food and herbal preparations.",

    appearance: "Aamla is a medium-sized deciduous tree. It has small, closely arranged leaves and produces round, pale green or yellow-green fruits with distinct vertical grooves.",

    parts: "Mainly fruits. Leaves, bark and seeds also have traditional uses.",

    uses: "Aamla is used in pickles, juices, preserves, candies, powders and traditional preparations. It is also an ingredient in several Ayurvedic formulations.",

    facts: [
      "Aamla is native to tropical and subtropical Asia.",
      "Its fruit is known for its high vitamin C content.",
      "It is used in the traditional Ayurvedic preparation Triphala.",
      "The fruit has a distinctive sour and astringent taste.",
      "Aamla trees are cultivated in many Indian states."
    ]
  },

  "Brahmi": {
    scientific: "Bacopa monnieri",
    family: "Plantaginaceae",
    type: "Creeping aquatic or semi-aquatic herb",

    overview: "Brahmi is a small creeping herb commonly found in wet areas, marshes and near water bodies. It is well known in Ayurveda and is also studied for its chemical constituents.",

    appearance: "Brahmi has soft creeping stems, small fleshy leaves and delicate white or pale flowers. It can grow in shallow water and moist soil.",

    parts: "Traditionally, the whole plant is used.",

    uses: "Brahmi has a significant place in Ayurvedic herbal preparations. It is also used in ornamental water gardens and botanical research.",

    facts: [
      "Brahmi is also called water hyssop.",
      "It commonly grows in wetlands.",
      "Its leaves are succulent and fleshy.",
      "It belongs to the Plantaginaceae family.",
      "It is sometimes confused with Gotu Kola, although they are different plants."
    ]
  },

  "Moringa": {
    scientific: "Moringa oleifera",
    family: "Moringaceae",
    type: "Fast-growing tree",

    overview: "Moringa, also called the Drumstick Tree, is a fast-growing tree widely cultivated in tropical and subtropical regions. In India, it is commonly known for its long, slender seed pods.",

    appearance: "Moringa has a relatively slender trunk, compound leaves with many small leaflets, fragrant creamy-white flowers and long hanging pods.",

    parts: "Leaves, flowers, pods, seeds and seed oil.",

    uses: "Moringa leaves and pods are used as vegetables. The leaves are also dried and processed into powder. Seed oil is used in some cosmetic and industrial products.",

    facts: [
      "Moringa is native to parts of the Indian subcontinent.",
      "Its young pods are commonly called drumsticks.",
      "Its leaves contain several nutrients.",
      "It can grow relatively quickly.",
      "Its seeds contain oil known as ben oil."
    ]
  },

  "Lemongrass": {
    scientific: "Cymbopogon citratus",
    family: "Poaceae",
    type: "Aromatic perennial grass",

    overview: "Lemongrass is a tall, clump-forming grass with a fresh lemon-like aroma. It is widely cultivated in tropical regions for culinary use and essential-oil production.",

    appearance: "Lemongrass forms dense clumps with long, narrow, blade-like green leaves. Its leaves have a strong lemon-like smell when crushed.",

    parts: "Leaves and lower leaf bases. Essential oil is also extracted.",

    uses: "Lemongrass is used in teas, soups, curries and other foods. Its essential oil is used in fragrances, soaps and commercial products.",

    facts: [
      "Lemongrass belongs to the grass family.",
      "Citral is an important compound responsible for its lemon-like aroma.",
      "It grows well in warm tropical climates.",
      "It is cultivated in India and Southeast Asia.",
      "Its leaves are used in herbal infusions."
    ]
  },

  "Eucalyptus": {
    scientific: "Eucalyptus species",
    family: "Myrtaceae",
    type: "Evergreen tree",

    overview: "Eucalyptus is a large group of evergreen trees and shrubs, most of which are native to Australia. Several species are cultivated in India for timber, paper production, essential oils and ornamental purposes.",

    appearance: "Many eucalyptus species have tall trunks and spreading crowns. Their leaves are often aromatic. Flowers have numerous prominent stamens, and their fruits are woody capsules.",

    parts: "Leaves and wood. Essential oil is extracted from selected species.",

    uses: "Eucalyptus wood is used in timber and paper industries. Certain species provide oil used in fragrance and commercial products.",

    facts: [
      "Most eucalyptus species are native to Australia.",
      "Some species are among the tallest flowering plants.",
      "Eucalyptus leaves are a major food source for koalas.",
      "The leaves contain aromatic oils.",
      "Eucalyptus belongs to the myrtle family."
    ]
  },

  "Cinnamon": {
    scientific: "Cinnamomum verum",
    family: "Lauraceae",
    type: "Evergreen tree",

    overview: "Cinnamon is a popular spice obtained from the inner bark of certain trees in the genus Cinnamomum. It is valued for its warm, sweet aroma and is used worldwide in food and fragrance industries.",

    appearance: "Cinnamon trees have aromatic bark, simple leathery leaves, small flowers in clusters and small berry-like fruits. The inner bark is harvested and dried to produce cinnamon.",

    parts: "Inner bark and, in some products, leaves.",

    uses: "Cinnamon is used in desserts, baked foods, curries, tea and spice mixtures. It is also used in perfumes and fragrance products.",

    facts: [
      "Cinnamon is one of the oldest known traded spices.",
      "True cinnamon is associated with Sri Lanka.",
      "The spice comes from the inner bark, not the fruit.",
      "Cinnamon sticks form as the bark dries and curls.",
      "Several Cinnamomum species are used commercially."
    ]
  },

  "Clove": {
    scientific: "Syzygium aromaticum",
    family: "Myrtaceae",
    type: "Evergreen tropical tree",

    overview: "Clove is a valuable aromatic spice obtained from the dried flower buds of a tropical evergreen tree. It is known for its strong fragrance and warm, pungent flavor.",

    appearance: "The clove tree has glossy aromatic leaves and clusters of small flowers. Flower buds are green at first and turn pinkish-red before drying. Dried buds have a characteristic nail-like shape.",

    parts: "Dried flower buds and essential oil.",

    uses: "Cloves are used in cooking, baking, spice mixtures and beverages. Clove oil is used in fragrance products and some oral-care products.",

    facts: [
      "Cloves are unopened flower buds.",
      "The clove tree is native to the Maluku Islands of Indonesia.",
      "Eugenol is a major aromatic compound in clove oil.",
      "Cloves were historically an important trade commodity.",
      "The plant belongs to the same family as eucalyptus and guava."
    ]
  },

  "Hibiscus": {
    scientific: "Hibiscus rosa-sinensis",
    family: "Malvaceae",
    type: "Flowering shrub",

    overview: "Hibiscus is a popular flowering shrub cultivated in tropical and subtropical regions. It is widely grown for its large and colorful flowers.",

    appearance: "Hibiscus has glossy green leaves with toothed edges and large showy flowers. Flowers may be red, pink, yellow, orange or white. It has a prominent central reproductive column.",

    parts: "Flowers and leaves in various traditional and cosmetic preparations.",

    uses: "Hibiscus is widely grown as an ornamental plant. Its flowers are used in decorations and some traditional preparations. Different hibiscus species are also used to make herbal beverages.",

    facts: [
      "Hibiscus belongs to the mallow family.",
      "Its flowers attract pollinators.",
      "Many varieties are cultivated for their flower colors.",
      "Hibiscus is commonly grown in Indian gardens.",
      "Hibiscus rosa-sinensis is commonly called China rose."
    ]
  },

  "Gotu Kola": {
    scientific: "Centella asiatica",
    family: "Apiaceae",
    type: "Creeping herb",

    overview: "Gotu Kola, also known as Indian Pennywort, is a small creeping plant commonly found in moist tropical and subtropical regions. It is used in traditional herbal systems and is also grown in gardens.",

    appearance: "Gotu Kola has thin creeping stems, rounded fan-shaped leaves with long stalks and small flowers arranged in clusters. It commonly grows close to the ground in moist places.",

    parts: "Leaves and aerial parts of the plant.",

    uses: "Gotu Kola has a history of use in traditional South Asian and Southeast Asian herbal preparations. It is also used in certain cosmetic products and as an edible leafy plant in some regions.",

    facts: [
      "Gotu Kola is native to tropical and subtropical regions.",
      "It belongs to the carrot family.",
      "Its leaves are rounded and fan-shaped.",
      "It commonly grows in wet and marshy locations.",
      "It is different from Brahmi (Bacopa monnieri)."
    ]
  },

  "Aloevera": {
    scientific: "Aloe vera",
    family: "Asphodelaceae",
    type: "Succulent herb",

    overview: "Aloe vera is a succulent plant known for the clear gel stored inside its thick leaves. It is cultivated in warm climates and widely used in cosmetic and personal-care industries.",

    appearance: "Aloe vera has thick fleshy leaves arranged in a rosette. Its leaves are green or gray-green with small teeth along their edges. It produces a tall flower stalk with yellow or orange flowers.",

    parts: "Mainly leaf gel. Yellow latex from the outer leaf tissues is a separate material.",

    uses: "Aloe vera gel is widely used as an ingredient in moisturizers, shampoos, soaps and other skincare products. It is also grown as an ornamental plant.",

    facts: [
      "Aloe vera stores water in its leaves.",
      "It belongs to the Asphodelaceae family.",
      "It can survive in relatively dry conditions.",
      "Its leaf contains both clear inner gel and yellow latex.",
      "Aloe vera is widely cultivated around the world."
    ]
  },

  "Ginger": {
    scientific: "Zingiber officinale",
    family: "Zingiberaceae",
    type: "Herbaceous perennial",

    overview: "Ginger is an important spice plant cultivated for its aromatic underground rhizome. It is widely used in Indian cooking, beverages, food processing and traditional preparations.",

    appearance: "Ginger has leafy green stems and long narrow leaves. It grows from an underground branching rhizome with a strong spicy aroma and taste.",

    parts: "Mainly the rhizome.",

    uses: "Ginger is used in tea, curries, soups, pickles, sweets and spice mixtures. It is also used in traditional food and herbal preparations.",

    facts: [
      "The part commonly called ginger root is actually a rhizome.",
      "Ginger belongs to the same family as turmeric and cardamom.",
      "Ginger is believed to have originated in Southeast Asia.",
      "Fresh and dried ginger have different flavor profiles.",
      "Ginger is widely cultivated in India."
    ]
  },

  "Ashwagandha": {
    scientific: "Withania somnifera",
    family: "Solanaceae",
    type: "Small perennial shrub",

    overview: "Ashwagandha is a small shrub important in traditional Ayurvedic practices. It is native to parts of Africa, the Middle East and the Indian subcontinent and grows in relatively dry environments.",

    appearance: "Ashwagandha has branching stems and oval leaves. It produces small greenish-yellow flowers and round orange-red berries enclosed in a papery covering.",

    parts: "Mainly roots. Leaves and berries are also used in some traditional preparations.",

    uses: "Ashwagandha has a long history in Ayurveda. Its roots are used in traditional herbal formulations and are also studied in modern botanical and scientific research.",

    facts: [
      "Ashwagandha belongs to the nightshade family.",
      "It is also known as winter cherry.",
      "Its botanical name is Withania somnifera.",
      "It produces small orange-red berries.",
      "It is one of the well-known plants in Indian traditional medicine."
    ]
  }
};


// ============================================
// HTML ELEMENTS
// ============================================

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


// ============================================
// DARK MODE
// ============================================

function setupTheme() {

  const header = document.querySelector(".site-header");

  if (!header || document.getElementById("themeToggle")) return;

  const themeBtn = document.createElement("button");

  themeBtn.id = "themeToggle";
  themeBtn.type = "button";

  themeBtn.textContent = "🌙 Dark Mode";

  header.appendChild(themeBtn);

  if (localStorage.getItem("plantTheme") === "dark") {
    document.body.classList.add("dark-mode");
    themeBtn.textContent = "☀️ Light Mode";
  }

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    const isDark =
      document.body.classList.contains("dark-mode");

    localStorage.setItem(
      "plantTheme",
      isDark ? "dark" : "light"
    );

    themeBtn.textContent =
      isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
}


// ============================================
// ACTION BUTTONS
// ============================================

function setupActionButtons() {

  if (!copyBtn || !openChatGPTBtn || !removeBtn) return;

  if (document.querySelector(".action-buttons")) return;

  const wrapper = document.createElement("div");

  wrapper.className = "action-buttons";

  copyBtn.parentNode.insertBefore(wrapper, copyBtn);

  wrapper.appendChild(copyBtn);
  wrapper.appendChild(openChatGPTBtn);
  wrapper.appendChild(removeBtn);
}


// ============================================
// LOAD MODEL
// ============================================

async function loadModel() {

  try {

    modelStatus.textContent =
      "Loading medicinal plants model...";

    model = await tmImage.load(
      MODEL_URL + "model.json",
      MODEL_URL + "metadata.json"
    );

    modelStatus.textContent =
      "✅ Medicinal plants model loaded successfully!";

    classifyBtn.disabled = !selectedImage;

  } catch (error) {

    console.error("Model loading error:", error);

    modelStatus.textContent =
      "❌ Model could not load. Please refresh the website.";

    classifyBtn.disabled = true;
  }
}


// ============================================
// IMAGE UPLOAD
// ============================================

fileInput.addEventListener("change", (event) => {

  const file = event.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {

    fileStatus.textContent =
      "Please select a valid image.";

    return;
  }

  selectedImage = true;

  const reader = new FileReader();

  reader.onload = (e) => {

    preview.src = e.target.result;

    previewBox.hidden = false;

    fileStatus.textContent =
      "Image uploaded successfully.";

    predictionsBox.innerHTML = "";

    categoryStatus.textContent = "";

    promptBox.hidden = true;

    askBtn.hidden = true;

    classifyBtn.disabled = !model;
  };

  reader.readAsDataURL(file);
});


// ============================================
// CONFIDENCE BARS
// ============================================

function displayPredictions(predictions) {

  predictionsBox.innerHTML = "";

  const sorted = [...predictions].sort(
    (a, b) => b.probability - a.probability
  );

  sorted.forEach((prediction) => {

    const percentage =
      (prediction.probability * 100).toFixed(1);

    const item = document.createElement("div");

    item.className = "confidence-item";

    const label = document.createElement("div");

    label.className = "confidence-label";

    const name = document.createElement("span");

    name.textContent = prediction.className;

    const score = document.createElement("span");

    score.textContent = percentage + "%";

    label.appendChild(name);
    label.appendChild(score);

    const track = document.createElement("div");

    track.className = "confidence-track";

    const fill = document.createElement("div");

    fill.className = "confidence-fill";

    fill.style.width = "0%";

    track.appendChild(fill);

    item.appendChild(label);
    item.appendChild(track);

    predictionsBox.appendChild(item);

    requestAnimationFrame(() => {

      fill.style.width = percentage + "%";

    });

  });

  return sorted;
}


// ============================================
// DISPLAY PLANT INFORMATION
// ============================================

function displayPlantInformation(plantName) {

  const info = plantInformation[plantName];

  informationBox.innerHTML = "";

  if (!info) {

    informationBox.textContent =
      "Information for this plant is not available.";

    promptBox.hidden = false;

    return;
  }

  const heading = document.createElement("h2");

  heading.textContent = plantName;

  informationBox.appendChild(heading);


  function addSection(title, text) {

    const titleElement = document.createElement("h3");

    titleElement.textContent = title;

    const paragraph = document.createElement("p");

    paragraph.textContent = text;

    informationBox.appendChild(titleElement);

    informationBox.appendChild(paragraph);
  }


  addSection("Scientific Name", info.scientific);

  addSection("Family", info.family);

  addSection("Plant Type", info.type);

  addSection("Overview", info.overview);

  addSection("Appearance and Characteristics", info.appearance);

  addSection("Parts Used", info.parts);

  addSection("Traditional Importance and Common Uses", info.uses);


  const factsHeading = document.createElement("h3");

  factsHeading.textContent = "Five Interesting Facts";

  informationBox.appendChild(factsHeading);

  const list = document.createElement("ol");

  info.facts.forEach((fact) => {

    const item = document.createElement("li");

    item.textContent = fact;

    list.appendChild(item);

  });

  informationBox.appendChild(list);


  const note = document.createElement("p");

  note.textContent =
    "Educational information only. Traditional uses do not establish that a plant treats or cures a disease. Some plants and concentrated extracts can cause side effects or interact with medicines. Do not use plants as treatments without advice from a qualified healthcare professional.";

  informationBox.appendChild(note);

  promptBox.hidden = false;
}


// ============================================
// CLASSIFY IMAGE
// ============================================

classifyBtn.addEventListener("click", async () => {

  if (!model || !selectedImage) return;

  try {

    classifyBtn.disabled = true;

    classifyBtn.textContent = "Scanning...";

    predictionsBox.innerHTML =
      "<p>🔍 Analyzing your plant image...</p>";

    categoryStatus.textContent = "";

    promptBox.hidden = true;

    askBtn.hidden = true;

    const predictions = await model.predict(preview);

    const sorted = displayPredictions(predictions);

    currentPlant = sorted[0].className;

    categoryStatus.textContent =
      "Predicted Plant: " + currentPlant;

    askBtn.hidden = false;

  } catch (error) {

    console.error("Classification error:", error);

    predictionsBox.textContent =
      "Unable to classify this image. Please try again.";

  } finally {

    classifyBtn.disabled = false;

    classifyBtn.textContent = "Identify Plant";

  }

});


// ============================================
// SHOW PLANT INFORMATION
// ============================================

askBtn.addEventListener("click", () => {

  if (!currentPlant) return;

  displayPlantInformation(currentPlant);

  speakInformation();

});


// ============================================
// COPY INFORMATION
// ============================================

copyBtn.addEventListener("click", async () => {

  try {

    await navigator.clipboard.writeText(
      informationBox.innerText
    );

    copyStatus.textContent =
      "✅ Information copied successfully!";

  } catch (error) {

    copyStatus.textContent =
      "Copy failed. Please copy manually.";

  }

});


// ============================================
// OPEN CHATGPT
// ============================================

openChatGPTBtn.addEventListener("click", () => {

  const text =
    "Explain this medicinal plant in more detail using the following educational information:\n\n" +
    informationBox.innerText +
    "\n\nAvoid unsupported medical claims.";

  const url =
    "https://chatgpt.com/?q=" + encodeURIComponent(text);

  window.open(url, "_blank");

});


// ============================================
// REMOVE IMAGE
// ============================================

removeBtn.addEventListener("click", () => {

  fileInput.value = "";

  preview.src = "";

  selectedImage = false;

  currentPlant = null;

  previewBox.hidden = true;

  promptBox.hidden = true;

  askBtn.hidden = true;

  predictionsBox.innerHTML = "";

  categoryStatus.textContent = "";

  fileStatus.textContent = "";

  copyStatus.textContent = "";

  classifyBtn.disabled = true;

});


// ============================================
// VOICE NARRATION
// ============================================

function speakInformation() {

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(
    informationBox.innerText
  );

  speech.rate = 0.95;

  speech.pitch = 1;

  window.speechSynthesis.speak(speech);

}


// ============================================
// INITIALIZE WEBSITE
// ============================================

setupTheme();

setupActionButtons();

loadModel();
