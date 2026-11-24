/* =========================================
   MEDICINAL PLANTS EXPLORER
   TEACHABLE MACHINE AI
========================================= */

"use strict";


/* MODEL */

const MODEL_URL =
"https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = null;
let cameraStream = null;


/* PLANT INFORMATION */

const plants = {

    mint: {
        name: "Mint",
        scientific: "Mentha",
        overview: "Mint is an aromatic herb belonging to the Lamiaceae family. It is widely cultivated in gardens and used in food and beverages.",
        characteristics: [
            "Green aromatic leaves.",
            "Square-shaped stems.",
            "Small flowers.",
            "Refreshing fragrance."
        ],
        uses: "Mint leaves are traditionally used in chutneys, beverages, food preparations and herbal traditions.",
        origin: "Regions of Europe, Asia and Africa.",
        facts: [
            "Mint belongs to the Lamiaceae family.",
            "It is a fast-growing aromatic herb.",
            "There are many species of mint.",
            "Its leaves contain aromatic oils.",
            "Mint is commonly grown in home gardens."
        ]
    },

    turmeric: {
        name: "Turmeric",
        scientific: "Curcuma longa",
        overview: "Turmeric is a flowering plant belonging to the ginger family. Its underground rhizome is widely used as a spice.",
        characteristics: [
            "Broad green leaves.",
            "Underground orange-yellow rhizome.",
            "Tropical herbaceous plant.",
            "Distinctive earthy fragrance."
        ],
        uses: "Turmeric is traditionally used in cooking, colouring and cultural practices.",
        origin: "South Asia.",
        facts: [
            "Turmeric belongs to the ginger family.",
            "Its underground stem is called a rhizome.",
            "It gives food a yellow colour.",
            "It is widely used in Indian cuisine.",
            "Curcumin is one of its studied compounds."
        ]
    },

    tulsi: {
        name: "Tulsi",
        scientific: "Ocimum tenuiflorum",
        overview: "Tulsi, also called Holy Basil, is an aromatic plant that holds an important place in Indian culture and traditional botanical knowledge.",
        characteristics: [
            "Aromatic leaves.",
            "Green or purplish stems.",
            "Small flowers arranged in spikes.",
            "Pleasant fragrance."
        ],
        uses: "Tulsi is traditionally used in cultural practices, household gardens and herbal preparations.",
        origin: "Indian subcontinent and Southeast Asia.",
        facts: [
            "Tulsi is also called Holy Basil.",
            "It belongs to the mint family.",
            "It is commonly grown in Indian homes.",
            "It is an aromatic plant.",
            "It has cultural importance in India."
        ]
    },

    neem: {
        name: "Neem",
        scientific: "Azadirachta indica",
        overview: "Neem is a tropical evergreen tree known for its compound leaves and its importance in traditional Indian botanical knowledge.",
        characteristics: [
            "Compound leaves with serrated edges.",
            "Small white flowers.",
            "Rounded fruits that become yellow when ripe.",
            "Can grow into a large tree."
        ],
        uses: "Neem has a long history of traditional use and is also studied for its natural plant compounds.",
        origin: "Indian subcontinent.",
        facts: [
            "Neem is an evergreen tree.",
            "Its botanical name is Azadirachta indica.",
            "It belongs to the mahogany family.",
            "Its leaves are compound.",
            "Neem is adapted to warm climates."
        ]
    },

    garlic: {
        name: "Garlic",
        scientific: "Allium sativum",
        overview: "Garlic is a bulb-producing plant belonging to the Amaryllidaceae family. It is commonly grown as a food crop.",
        characteristics: [
            "Underground bulb made of cloves.",
            "Long narrow leaves.",
            "Strong characteristic smell.",
            "Small flowers in some varieties."
        ],
        uses: "Garlic is widely used as a flavouring ingredient in cooking and traditional food preparations.",
        origin: "Central Asia.",
        facts: [
            "Garlic belongs to the onion family.",
            "Its bulb contains several cloves.",
            "It is grown as a food crop.",
            "It has a distinctive smell.",
            "It is widely used around the world."
        ]
    },

    curry: {
        name: "Curry Leaf",
        scientific: "Murraya koenigii",
        overview: "Curry leaf is a small tropical tree whose aromatic leaves are widely used in Indian cooking.",
        characteristics: [
            "Compound leaves.",
            "Glossy green leaflets.",
            "Small white flowers.",
            "Small dark fruits."
        ],
        uses: "Its aromatic leaves are commonly used to flavour curries, soups and other dishes.",
        origin: "Indian subcontinent.",
        facts: [
            "Curry leaf is an aromatic tree.",
            "Its leaves are compound.",
            "It belongs to the Rutaceae family.",
            "Its flowers are small and white.",
            "It is common in Indian kitchens."
        ]
    },

    rosemary: {
        name: "Rosemary",
        scientific: "Salvia rosmarinus",
        overview: "Rosemary is an evergreen aromatic shrub with needle-like leaves. It is popular in gardens and cooking.",
        characteristics: [
            "Needle-like leaves.",
            "Woody stems.",
            "Blue or violet flowers.",
            "Strong aromatic fragrance."
        ],
        uses: "Rosemary is traditionally used as a culinary herb and ornamental garden plant.",
        origin: "Mediterranean region.",
        facts: [
            "Rosemary is an evergreen shrub.",
            "It belongs to the mint family.",
            "Its leaves are narrow and needle-like.",
            "It is popular in Mediterranean cooking.",
            "It attracts pollinating insects."
        ]
    },

    lavender: {
        name: "Lavender",
        scientific: "Lavandula",
        overview: "Lavender is a flowering aromatic plant known for its purple flowers and distinctive fragrance.",
        characteristics: [
            "Purple or violet flowers.",
            "Narrow leaves.",
            "Aromatic plant.",
            "Woody base in many varieties."
        ],
        uses: "Lavender is used in gardening, fragrances and traditional aromatic preparations.",
        origin: "Mediterranean region.",
        facts: [
            "Lavender belongs to the mint family.",
            "Its flowers are often purple.",
            "It attracts bees and butterflies.",
            "It is cultivated as an ornamental plant.",
            "It is known for its fragrance."
        ]
    },

    chamomile: {
        name: "Chamomile",
        scientific: "Matricaria chamomilla",
        overview: "Chamomile is a flowering herb known for its small daisy-like flowers.",
        characteristics: [
            "White petals.",
            "Yellow central flower disc.",
            "Feathery leaves.",
            "Aromatic flowers."
        ],
        uses: "Chamomile is traditionally used in herbal infusions and aromatic preparations.",
        origin: "Europe and western Asia.",
        facts: [
            "Chamomile belongs to the daisy family.",
            "Its flowers resemble small daisies.",
            "It is an annual herb.",
            "It has feathery leaves.",
            "It is grown in many regions."
        ]
    },

    aamla: {
        name: "Amla",
        scientific: "Phyllanthus emblica",
        overview: "Amla, also known as Indian gooseberry, is a small to medium-sized tree that produces greenish-yellow fruits.",
        characteristics: [
            "Small greenish-yellow fruits.",
            "Feathery-looking branchlets.",
            "Small leaves.",
            "Deciduous tree."
        ],
        uses: "Amla fruits are used in foods, pickles and traditional preparations.",
        origin: "Indian subcontinent and Southeast Asia.",
        facts: [
            "Amla is also called Indian gooseberry.",
            "Its fruit has a sour taste.",
            "It is widely grown in India.",
            "It belongs to the Phyllanthaceae family.",
            "Its fruits are used in traditional foods."
        ]
    },

    brahmi: {
        name: "Brahmi",
        scientific: "Bacopa monnieri",
        overview: "Brahmi is a small creeping herb commonly found in wet and marshy environments.",
        characteristics: [
            "Small succulent leaves.",
            "Creeping stems.",
            "Small white or pale flowers.",
            "Grows in moist environments."
        ],
        uses: "Brahmi has a history of use in traditional botanical preparations.",
        origin: "Wetlands across tropical and subtropical regions.",
        facts: [
            "Brahmi is a creeping herb.",
            "It grows well in moist soil.",
            "Its leaves are small and fleshy.",
            "It belongs to the plantain family.",
            "It is commonly found near water."
        ]
    },

    moringa: {
        name: "Moringa",
        scientific: "Moringa oleifera",
        overview: "Moringa is a fast-growing tree known for its compound leaves, pods and edible plant parts.",
        characteristics: [
            "Small rounded leaflets.",
            "Long hanging seed pods.",
            "White flowers.",
            "Fast-growing tree."
        ],
        uses: "Moringa leaves and pods are used as food in many regions.",
        origin: "Indian subcontinent.",
        facts: [
            "Moringa is also called the drumstick tree.",
            "Its pods are used as vegetables.",
            "It grows in tropical climates.",
            "Its leaves are compound.",
            "It is cultivated in many countries."
        ]
    },

    lemongrass: {
        name: "Lemongrass",
        scientific: "Cymbopogon citratus",
        overview: "Lemongrass is a tall aromatic grass known for its citrus-like fragrance.",
        characteristics: [
            "Long narrow leaves.",
            "Grass-like growth.",
            "Strong lemon-like fragrance.",
            "Forms dense clumps."
        ],
        uses: "Lemongrass is used in cooking, beverages and aromatic preparations.",
        origin: "South and Southeast Asia.",
        facts: [
            "Lemongrass is a grass.",
            "It has a citrus-like aroma.",
            "It grows in clumps.",
            "It is popular in Asian cuisine.",
            "Its leaves are long and narrow."
        ]
    },

    eucalyptus: {
        name: "Eucalyptus",
        scientific: "Eucalyptus",
        overview: "Eucalyptus is a large group of trees and shrubs, many of which are known for their aromatic leaves.",
        characteristics: [
            "Aromatic leaves.",
            "Woody trunk.",
            "Often tall-growing trees.",
            "Distinctive bark in many species."
        ],
        uses: "Eucalyptus trees are used for timber, paper production and aromatic products.",
        origin: "Australia and nearby regions.",
        facts: [
            "Many eucalyptus species are evergreen.",
            "They are native mainly to Australia.",
            "Some species grow very tall.",
            "Their leaves contain aromatic oils.",
            "They are planted in many countries."
        ]
    },

    cinnamon: {
        name: "Cinnamon",
        scientific: "Cinnamomum verum",
        overview: "Cinnamon is an aromatic evergreen tree. Its inner bark is used as a popular spice.",
        characteristics: [
            "Evergreen tree.",
            "Aromatic bark.",
            "Simple leaves.",
            "Small flowers."
        ],
        uses: "Cinnamon bark is used as a spice in food and beverages.",
        origin: "Sri Lanka and southern India.",
        facts: [
            "Cinnamon comes from tree bark.",
            "It is an important culinary spice.",
            "It has a sweet, warm fragrance.",
            "It belongs to the Lauraceae family.",
            "Cinnamon is used in many cuisines."
        ]
    },

    clove: {
        name: "Clove",
        scientific: "Syzygium aromaticum",
        overview: "Clove is an evergreen tree whose dried flower buds are used as a spice.",
        characteristics: [
            "Evergreen tree.",
            "Aromatic flower buds.",
            "Dark green leaves.",
            "Small clustered flowers."
        ],
        uses: "Cloves are widely used as a spice in food and traditional preparations.",
        origin: "Maluku Islands of Indonesia.",
        facts: [
            "Cloves are dried flower buds.",
            "They have a strong aroma.",
            "They are used in spice mixtures.",
            "The tree is evergreen.",
            "Clove belongs to the Myrtaceae family."
        ]
    },

    hibiscus: {
        name: "Hibiscus",
        scientific: "Hibiscus rosa-sinensis",
        overview: "Hibiscus is a flowering shrub famous for its large, colourful flowers.",
        characteristics: [
            "Large colourful flowers.",
            "Green leaves with toothed edges.",
            "Prominent central reproductive column.",
            "Ornamental shrub."
        ],
        uses: "Hibiscus is widely grown as an ornamental plant. Its flowers are also used in some cultural preparations.",
        origin: "Asia, with many cultivated varieties.",
        facts: [
            "Hibiscus belongs to the mallow family.",
            "Its flowers can be red, pink or yellow.",
            "It is a popular garden plant.",
            "Its flowers attract pollinators.",
            "There are many hibiscus species."
        ]
    },

    "gotu kola": {
        name: "Gotu Kola",
        scientific: "Centella asiatica",
        overview: "Gotu Kola is a small creeping herb with rounded leaves, commonly found in moist environments.",
        characteristics: [
            "Rounded kidney-shaped leaves.",
            "Creeping stems.",
            "Small flowers.",
            "Grows in moist places."
        ],
        uses: "Gotu Kola has a history of use in traditional botanical preparations.",
        origin: "Asia and other tropical regions.",
        facts: [
            "It is a creeping herb.",
            "Its leaves are rounded.",
            "It often grows in moist places.",
            "It belongs to the Apiaceae family.",
            "It is also known as Indian pennywort."
        ]
    },

    aloevera: {
        name: "Aloe Vera",
        scientific: "Aloe vera",
        overview: "Aloe vera is a succulent plant known for its thick, fleshy leaves containing a clear inner gel.",
        characteristics: [
            "Thick fleshy leaves.",
            "Serrated leaf margins.",
            "Gel-filled leaf interior.",
            "Succulent growth."
        ],
        uses: "Aloe vera is widely used in cosmetic products and traditional preparations.",
        origin: "Arabian Peninsula.",
        facts: [
            "Aloe vera is a succulent.",
            "It stores water in its leaves.",
            "It is adapted to dry conditions.",
            "Its leaves contain clear gel.",
            "It is cultivated worldwide."
        ]
    },

    ginger: {
        name: "Ginger",
        scientific: "Zingiber officinale",
        overview: "Ginger is a flowering plant whose underground rhizome is widely used as a spice.",
        characteristics: [
            "Underground aromatic rhizome.",
            "Long narrow leaves.",
            "Herbaceous growth.",
            "Green leafy shoots."
        ],
        uses: "Ginger is commonly used in cooking, beverages and traditional food preparations.",
        origin: "Southeast Asia.",
        facts: [
            "Ginger belongs to the Zingiberaceae family.",
            "Its underground stem is a rhizome.",
            "It is widely used in cooking.",
            "It is related to turmeric.",
            "It grows in tropical climates."
        ]
    },

    ashwagandha: {
        name: "Ashwagandha",
        scientific: "Withania somnifera",
        overview: "Ashwagandha is a small shrub belonging to the nightshade family and is known in traditional Indian botanical knowledge.",
        characteristics: [
            "Small greenish flowers.",
            "Oval leaves.",
            "Orange-red berries.",
            "Small woody shrub."
        ],
        uses: "Ashwagandha has a long history of use in traditional Indian preparations. Traditional use does not establish medical effectiveness.",
        origin: "Indian subcontinent and parts of Africa.",
        facts: [
            "It belongs to the nightshade family.",
            "It is a small shrub.",
            "Its fruits are orange-red.",
            "It is known in Ayurveda.",
            "Its botanical name is Withania somnifera."
        ]
    }

};


/* NAME NORMALIZATION */

function normalizeName(name) {

    return name
        .toLowerCase()
        .replace(/[^a-z]/g, "");
}


function getPlant(name) {

    const key = normalizeName(name);

    const aliases = {
        curry: "curry",
        curryleaf: "curry",
        gotukola: "gotukola",
        aloevera: "aloevera",
        amla: "aamla",
        indian gooseberry: "aamla"
    };

    const finalKey = aliases[key] || key;

    return Object.values(plants).find(
        plant => normalizeName(plant.name) === finalKey
    ) || null;
}


/* MODEL LOADING */

async function loadModel() {

    const status = document.getElementById("modelStatus");

    try {

        status.textContent = "Loading AI model...";

        model = await tmImage.load(
            MODEL_URL + "model.json",
            MODEL_URL + "metadata.json"
        );

        status.textContent = "AI model loaded successfully. Ready to identify plants.";

        updateIdentifyButton();

    } catch (error) {

        console.error(error);

        status.textContent =
            "Unable to load AI model. Please refresh and try again.";

    }

}


/* DOM ELEMENTS */

const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const previewBox = document.getElementById("previewBox");
const fileStatus = document.getElementById("fileStatus");

const classifyButton = document.getElementById("classify");

const predictionsBox = document.getElementById("predictions");

const informationSection =
    document.getElementById("informationSection");

const informationBox =
    document.getElementById("information");


/* IMAGE UPLOAD */

fileInput.addEventListener("change", function(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        fileStatus.textContent = "Please select an image file.";

        return;

    }

    stopCamera();

    const reader = new FileReader();

    reader.onload = function(e) {

        const image = new Image();

        image.onload = function() {

            selectedImage = image;

            preview.src = e.target.result;

            previewBox.hidden = false;

            fileStatus.textContent = "Image selected successfully.";

            clearPreviousResults();

            updateIdentifyButton();

        };

        image.src = e.target.result;

    };

    reader.readAsDataURL(file);

});


/* WEBCAM */

document.getElementById("startCamera")
    .addEventListener("click", async function() {

        try {

            fileInput.value = "";

            selectedImage = null;

            previewBox.hidden = true;

            stopCamera();

            cameraStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                },
                audio: false
            });

            const video = document.getElementById("cameraVideo");

            video.srcObject = cameraStream;

            document.getElementById("cameraBox").hidden = false;

            fileStatus.textContent = "Webcam started.";

            updateIdentifyButton();

        } catch (error) {

            console.error(error);

            fileStatus.textContent =
                "Unable to access webcam. Check browser permissions.";

        }

});


/* CAPTURE PHOTO */

document.getElementById("capturePhoto")
    .addEventListener("click", function() {

        const video = document.getElementById("cameraVideo");

        const canvas = document.getElementById("cameraCanvas");

        if (!video.videoWidth) {

            fileStatus.textContent = "Camera is not ready yet.";

            return;

        }

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        context.drawImage(video, 0, 0);

        const image = new Image();

        image.onload = function() {

            selectedImage = image;

            preview.src = canvas.toDataURL("image/png");

            previewBox.hidden = false;

            fileStatus.textContent = "Photo captured successfully.";

            clearPreviousResults();

            stopCamera();

            updateIdentifyButton();

        };

        image.src = canvas.toDataURL("image/png");

});


/* STOP CAMERA */

document.getElementById("stopCamera")
    .addEventListener("click", stopCamera);


function stopCamera() {

    if (cameraStream) {

        cameraStream.getTracks().forEach(track => track.stop());

        cameraStream = null;

    }

    document.getElementById("cameraBox").hidden = true;

    document.getElementById("cameraVideo").srcObject = null;

}


/* REMOVE IMAGE */

document.getElementById("remove")
    .addEventListener("click", function() {

        selectedImage = null;

        fileInput.value = "";

        preview.src = "";

        previewBox.hidden = true;

        fileStatus.textContent = "";

        clearPreviousResults();

        updateIdentifyButton();

});


/* BUTTON STATE */

function updateIdentifyButton() {

    classifyButton.disabled = !(model && selectedImage);

}


/* CLEAR OLD RESULTS */

function clearPreviousResults() {

    predictionsBox.innerHTML = "";

    informationBox.innerHTML = "";

    informationSection.hidden = true;

    document.getElementById("categoryStatus").textContent = "";

}


/* IDENTIFY PLANT */

classifyButton.addEventListener("click", identifyPlant);


async function identifyPlant() {

    if (!model || !selectedImage) return;

    classifyButton.disabled = true;

    classifyButton.textContent = "Identifying...";

    predictionsBox.innerHTML = "";

    informationSection.hidden = true;

    document.getElementById("categoryStatus").textContent =
        "Analysing your photograph...";

    try {

        const results = await model.predict(selectedImage);

        results.sort((a, b) => b.probability - a.probability);

        showPredictions(results);

        const best = results[0];

        const confidence = best.probability;

        const plant = getPlant(best.className);

        if (confidence < 0.65) {

            document.getElementById("categoryStatus").textContent =
                "The AI is not sufficiently confident. Try a clearer photograph.";

        } else if (!plant) {

            document.getElementById("categoryStatus").textContent =
                "The model detected: " + best.className +
                ". Botanical information is not available for this label.";

        } else {

            document.getElementById("categoryStatus").textContent =
                "Plant identified: " + plant.name;

            showInformation(plant);

        }

    } catch (error) {

        console.error(error);

        document.getElementById("categoryStatus").textContent =
            "Identification failed. Please try again.";

    }

    classifyButton.textContent = "Identify Plant with AI";

    updateIdentifyButton();

}


/* SHOW PREDICTIONS */

function showPredictions(results) {

    predictionsBox.innerHTML = "<h3>AI Prediction Results</h3>";

    results.forEach(result => {

        const percentage =
            (result.probability * 100).toFixed(1);

        const row = document.createElement("div");

        row.className = "prediction-row";

        row.innerHTML = `
            <div class="prediction-label">
                <span>${escapeHTML(result.className)}</span>
                <strong>${percentage}%</strong>
            </div>

            <div class="prediction-track">
                <div class="prediction-fill"
                     style="width:${percentage}%">
                </div>
            </div>
        `;

        predictionsBox.appendChild(row);

    });

}


/* SAFE HTML */

function escapeHTML(text) {

    return String(text).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);

}


/* SHOW PLANT INFORMATION */

function showInformation(plant) {

    informationSection.hidden = false;

    const characteristics = plant.characteristics
        .map(item => `<li>${escapeHTML(item)}</li>`)
        .join("");

    const facts = plant.facts
        .map(item => `<li>${escapeHTML(item)}</li>`)
        .join("");

    informationBox.innerHTML = `

        <h2 class="plant-title">
            ${escapeHTML(plant.name)}
        </h2>

        <p class="scientific-name">
            ${escapeHTML(plant.scientific)}
        </p>

        <div class="info-block">

            <h3>🌿 Overview</h3>

            <p>${escapeHTML(plant.overview)}</p>

        </div>


        <div class="info-block">

            <h3>🍃 Characteristics</h3>

            <ul>${characteristics}</ul>

        </div>


        <div class="info-block">

            <h3>📚 Traditional and General Uses</h3>

            <p>${escapeHTML(plant.uses)}</p>

        </div>


        <div class="info-block">

            <h3>🌍 Origin</h3>

            <p>${escapeHTML(plant.origin)}</p>

        </div>


        <div class="info-block">

            <h3>⭐ Interesting Facts</h3>

            <ul>${facts}</ul>

        </div>

    `;

    informationSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* COPY INFORMATION */

document.getElementById("copy")
    .addEventListener("click", async function() {

        if (!informationBox.innerText.trim()) return;

        try {

            await navigator.clipboard.writeText(
                informationBox.innerText
            );

            document.getElementById("copyStatus").textContent =
                "Information copied successfully!";

        } catch (error) {

            document.getElementById("copyStatus").textContent =
                "Copy unavailable in this browser.";

        }

});


/* PLANT OF THE DAY */

function showPlantOfTheDay() {

    const allPlants = Object.values(plants);

    const today = new Date();

    const dayNumber = Math.floor(
        Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ) / 86400000
    );

    const index = ((dayNumber % allPlants.length) + allPlants.length)
        % allPlants.length;

    const plant = allPlants[index];

    const dailyBox = document.getElementById("plantOfTheDay");

    dailyBox.innerHTML = `

        <div class="daily-emoji">🌿</div>

        <h3>${escapeHTML(plant.name)}</h3>

        <p class="scientific-name">
            ${escapeHTML(plant.scientific)}
        </p>

        <p>${escapeHTML(plant.overview)}</p>

        <p style="margin-top:12px">
            <strong>Did you know?</strong>
            ${escapeHTML(plant.facts[0])}
        </p>

    `;

}


/* INITIALIZE */

async function initialize() {

    showPlantOfTheDay();

    await loadModel();

}

initialize();
