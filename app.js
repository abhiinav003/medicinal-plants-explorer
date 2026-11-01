/* =========================================
   MEDICINAL PLANTS EXPLORER
   Complete JavaScript
========================================= */

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = null;
let currentPlant = null;
let speechUtterance = null;


/* =========================================
   PLANT INFORMATION
========================================= */

const plantInformation = {
    "Mint": {
        scientific: "Mentha",
        overview: "Mint is an aromatic herb known for its refreshing smell and cooling taste.",
        characteristics: "Mint has green, fragrant leaves and grows quickly in suitable conditions.",
        uses: "Mint is commonly used in food, drinks, toothpaste and traditional preparations.",
        origin: "Mint species are native to different regions of Europe, Asia and Africa.",
        facts: [
            "Mint belongs to the Lamiaceae family.",
            "Its leaves contain aromatic oils.",
            "Mint is commonly used to prepare herbal tea."
        ]
    },

    "Turmeric": {
        scientific: "Curcuma longa",
        overview: "Turmeric is a tropical plant known for its yellow-orange rhizome.",
        characteristics: "It has broad green leaves and grows from underground rhizomes.",
        uses: "Turmeric is widely used as a spice, food coloring and in traditional preparations.",
        origin: "Turmeric originated in South Asia, particularly the Indian subcontinent.",
        facts: [
            "Turmeric belongs to the ginger family.",
            "Curcumin gives turmeric its yellow color.",
            "Its rhizome is commonly dried and powdered."
        ]
    },

    "Tulsi": {
        scientific: "Ocimum tenuiflorum",
        overview: "Tulsi is an aromatic herb widely valued in Indian culture and traditional practices.",
        characteristics: "It has fragrant leaves, small flowers and a branching growth habit.",
        uses: "Tulsi leaves are used in herbal teas and traditional preparations.",
        origin: "Tulsi is native to the Indian subcontinent and nearby tropical regions.",
        facts: [
            "Tulsi is also called holy basil.",
            "It belongs to the mint family.",
            "It is commonly grown in Indian homes."
        ]
    },

    "Neem": {
        scientific: "Azadirachta indica",
        overview: "Neem is an evergreen tree known for its bitter leaves and traditional uses.",
        characteristics: "It has compound leaves, small white flowers and a spreading crown.",
        uses: "Neem is used in traditional preparations, soaps and some agricultural products.",
        origin: "Neem is native to the Indian subcontinent.",
        facts: [
            "Neem can tolerate dry conditions.",
            "Its leaves have a naturally bitter taste.",
            "Neem is commonly planted for shade."
        ]
    },

    "Garlic": {
        scientific: "Allium sativum",
        overview: "Garlic is a bulbous plant commonly used as a food ingredient.",
        characteristics: "It grows underground bulbs made up of several cloves.",
        uses: "Garlic is widely used in cooking and traditional food preparations.",
        origin: "Garlic has a long history of cultivation in Central Asia.",
        facts: [
            "Each garlic bulb contains several cloves.",
            "Garlic belongs to the Amaryllis family.",
            "Its strong smell comes from sulfur compounds."
        ]
    },

    "Curry": {
        scientific: "Murraya koenigii",
        overview: "Curry leaf is an aromatic plant widely used in Indian cooking.",
        characteristics: "It has compound leaves with many small, fragrant leaflets.",
        uses: "Its leaves are commonly added to curries, dals and other dishes.",
        origin: "It is native to the Indian subcontinent.",
        facts: [
            "Curry leaves are different from curry powder.",
            "The plant can grow as a small tree.",
            "Its leaves have a distinctive aroma."
        ]
    },

    "Rosemary": {
        scientific: "Salvia rosmarinus",
        overview: "Rosemary is an aromatic evergreen herb.",
        characteristics: "It has narrow, needle-like leaves and small flowers.",
        uses: "Rosemary is used in cooking, fragrances and traditional preparations.",
        origin: "It is native to the Mediterranean region.",
        facts: [
            "Rosemary belongs to the mint family.",
            "Its leaves have a strong aroma.",
            "It is often used to season food."
        ]
    },

    "Lavender": {
        scientific: "Lavandula",
        overview: "Lavender is a fragrant flowering plant known for its purple flowers.",
        characteristics: "It has narrow leaves and clusters of small flowers.",
        uses: "Lavender is used in fragrances, soaps and decorative gardens.",
        origin: "Many lavender species are native to the Mediterranean region.",
        facts: [
            "Lavender belongs to the mint family.",
            "Its flowers attract pollinators.",
            "Lavender oil is used in perfumes."
        ]
    },

    "Chamomile": {
        scientific: "Matricaria chamomilla",
        overview: "Chamomile is a flowering herb traditionally used to prepare herbal tea.",
        characteristics: "It has small daisy-like flowers with white petals and yellow centers.",
        uses: "Its dried flowers are commonly used in herbal tea and fragrances.",
        origin: "Chamomile species are native to Europe and parts of Asia.",
        facts: [
            "Chamomile flowers resemble small daisies.",
            "It belongs to the Asteraceae family.",
            "Its flowers are commonly dried for tea."
        ]
    },

    "Aamla": {
        scientific: "Phyllanthus emblica",
        overview: "Amla is a fruit-bearing tree known for its sour, vitamin C-rich fruit.",
        characteristics: "It has small leaves and round, greenish-yellow fruits.",
        uses: "Amla is used in food, pickles and traditional preparations.",
        origin: "It is native to tropical and subtropical parts of Asia.",
        facts: [
            "Amla is also called Indian gooseberry.",
            "Its fruit has a sour and astringent taste.",
            "It is used in many Indian food preparations."
        ]
    },

    "Brahmi": {
        scientific: "Bacopa monnieri",
        overview: "Brahmi is a creeping herb traditionally used in Ayurvedic practices.",
        characteristics: "It has small, fleshy leaves and delicate white or pale flowers.",
        uses: "It is used in traditional preparations and botanical studies.",
        origin: "It grows in wet areas across tropical and subtropical regions.",
        facts: [
            "Brahmi often grows near water.",
            "It is a creeping plant.",
            "Its leaves are small and succulent."
        ]
    },

    "Moringa": {
        scientific: "Moringa oleifera",
        overview: "Moringa is a fast-growing tree whose leaves and pods are used as food.",
        characteristics: "It has delicate compound leaves and long seed pods.",
        uses: "Its leaves and pods are used in soups, curries and other foods.",
        origin: "Moringa is native to parts of South Asia.",
        facts: [
            "Moringa is also called the drumstick tree.",
            "Its pods are used as vegetables.",
            "It can grow in dry conditions."
        ]
    },

    "Lemongrass": {
        scientific: "Cymbopogon citratus",
        overview: "Lemongrass is an aromatic grass with a fresh citrus-like scent.",
        characteristics: "It grows in tall clumps with long, narrow leaves.",
        uses: "It is used in cooking, herbal teas and fragrances.",
        origin: "It is widely cultivated in tropical regions of Asia.",
        facts: [
            "Lemongrass belongs to the grass family.",
            "Its scent resembles lemon.",
            "It is commonly used in Southeast Asian cooking."
        ]
    },

    "Eucalyptus": {
        scientific: "Eucalyptus globulus",
        overview: "Eucalyptus is a tree known for its aromatic leaves.",
        characteristics: "Many species have smooth bark and leaves containing aromatic oils.",
        uses: "Eucalyptus is used in paper production, fragrances and some traditional products.",
        origin: "Most eucalyptus species are native to Australia.",
        facts: [
            "Eucalyptus trees are common in Australia.",
            "Some species grow very tall.",
            "Koalas eat leaves from certain eucalyptus species."
        ]
    },

    "Cinnamon": {
        scientific: "Cinnamomum verum",
        overview: "Cinnamon is an aromatic spice obtained from the inner bark of trees.",
        characteristics: "The bark dries into curled, brown sticks.",
        uses: "It is used in desserts, drinks and savory dishes.",
        origin: "True cinnamon is native to Sri Lanka.",
        facts: [
            "Cinnamon comes from tree bark.",
            "It has a warm, sweet aroma.",
            "It is sold as sticks and powder."
        ]
    },

    "Clove": {
        scientific: "Syzygium aromaticum",
        overview: "Clove is an aromatic spice made from dried flower buds.",
        characteristics: "Its dried buds are small, dark brown and nail-shaped.",
        uses: "Cloves are used in cooking, fragrances and traditional preparations.",
        origin: "Clove trees are native to the Maluku Islands of Indonesia.",
        facts: [
            "Cloves are dried flower buds.",
            "They have a strong aroma.",
            "Clove oil contains a compound called eugenol."
        ]
    },

    "Hibiscus": {
        scientific: "Hibiscus rosa-sinensis",
        overview: "Hibiscus is a flowering plant known for its large, colorful flowers.",
        characteristics: "It has broad leaves and prominent flowers in several colors.",
        uses: "It is grown in gardens and used in some teas and hair products.",
        origin: "Its exact native origin is uncertain, but it is widely cultivated in tropical regions.",
        facts: [
            "Hibiscus flowers can be red, pink, yellow or orange.",
            "It belongs to the mallow family.",
            "Some hibiscus species are used to make herbal tea."
        ]
    },

    "Gotu Kola": {
        scientific: "Centella asiatica",
        overview: "Gotu Kola is a small creeping herb found in moist environments.",
        characteristics: "It has rounded, fan-shaped leaves and thin creeping stems.",
        uses: "It is used in traditional preparations and some foods.",
        origin: "It is native to wetlands across Asia and other tropical regions.",
        facts: [
            "Gotu Kola is also called Indian pennywort.",
            "It often grows in damp places.",
            "Its leaves are rounded and fan-shaped."
        ]
    },

    "Aloevera": {
        scientific: "Aloe vera",
        overview: "Aloe vera is a succulent plant known for its thick, water-rich leaves.",
        characteristics: "Its leaves are fleshy, pointed and arranged in a rosette.",
        uses: "Aloe gel is used in cosmetics and skincare products.",
        origin: "Aloe vera is believed to have originated in the Arabian Peninsula.",
        facts: [
            "Aloe vera stores water in its leaves.",
            "It is adapted to dry environments.",
            "Its leaves contain clear gel."
        ]
    },

    "Ginger": {
        scientific: "Zingiber officinale",
        overview: "Ginger is a flowering plant whose aromatic underground rhizome is widely used.",
        characteristics: "It has narrow leaves and thick underground rhizomes.",
        uses: "Ginger is used in cooking, drinks and traditional preparations.",
        origin: "Ginger originated in Southeast Asia.",
        facts: [
            "Ginger is related to turmeric.",
            "The part commonly used is a rhizome.",
            "It is widely used in Indian cooking."
        ]
    },

    "Ashwagandha": {
        scientific: "Withania somnifera",
        overview: "Ashwagandha is a plant traditionally used in Ayurvedic preparations.",
        characteristics: "It is a small shrub with oval leaves and red-orange berries.",
        uses: "Its roots are used in traditional preparations.",
        origin: "It is native to parts of India, the Middle East and Africa.",
        facts: [
            "Ashwagandha is also called Indian ginseng.",
            "It belongs to the nightshade family.",
            "Its berries are enclosed in papery coverings."
        ]
    }
};


/* =========================================
   DOM ELEMENTS
========================================= */

const fileInput = document.getElementById("file");
const preview = document.getElementById("preview");
const previewBox = document.getElementById("previewBox");
const fileStatus = document.getElementById("fileStatus");
const classifyButton = document.getElementById("classify");
const predictionsBox = document.getElementById("predictions");
const modelStatus = document.getElementById("modelStatus");
const categoryStatus = document.getElementById("categoryStatus");
const askButton = document.getElementById("ask");
const promptBox = document.getElementById("promptBox");
const informationBox = document.getElementById("information");
const copyButton = document.getElementById("copy");
const copyStatus = document.getElementById("copyStatus");
const removeButton = document.getElementById("remove");
const chatGPTButton = document.getElementById("openChatGPT");


/* =========================================
   DAILY FEATURED PLANT
========================================= */

function setupPlantOfTheDay() {
    const plants = [
        "Mint", "Turmeric", "Tulsi", "Neem", "Aloevera",
        "Ginger", "Garlic", "Curry", "Rosemary", "Lavender",
        "Chamomile", "Aamla", "Brahmi", "Moringa",
        "Lemongrass", "Eucalyptus", "Cinnamon", "Clove",
        "Hibiscus", "Gotu Kola", "Ashwagandha"
    ];

    const today = new Date();

    const todayNumber = Math.floor(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000
    );

    const startNumber = Math.floor(Date.UTC(2026, 0, 1) / 86400000);
    const daysPassed = todayNumber - startNumber;

    const index =
        ((daysPassed % plants.length) + plants.length) % plants.length;

    const plantName = plants[index];
    const plant = plantInformation[plantName];

    const welcome = document.querySelector(".welcome-section");

    if (!welcome || !plant) return;

    // Add independent styling to prevent conflicts with style.css.
    if (!document.getElementById("dailyPlantCardStyles")) {
        const style = document.createElement("style");

        style.id = "dailyPlantCardStyles";

        style.textContent = `
            #plantOfTheDay {
                display: block !important;
                box-sizing: border-box !important;
                width: calc(100% - 36px) !important;
                max-width: 650px !important;
                margin: 35px auto !important;
                padding: 28px 25px !important;
                background: #ffffff !important;
                color: #304638 !important;
                border: 1px solid #e1eae0 !important;
                border-radius: 32px !important;
                box-shadow: 0 8px 28px rgba(40,80,50,0.10) !important;
                text-align: left !important;
                overflow: hidden !important;
                position: relative !important;
                float: none !important;
                flex: none !important;
                grid-column: 1 / -1 !important;
                min-width: 0 !important;
            }

            #plantOfTheDay .daily-plant-icon {
                font-size: 34px;
                margin-bottom: 12px;
            }

            #plantOfTheDay .daily-plant-label {
                font-size: 15px;
                font-weight: 700;
                letter-spacing: 1.2px;
                color: #718b75;
                margin: 0 0 12px;
                line-height: 1.5;
            }

            #plantOfTheDay .daily-plant-name {
                display: block;
                font-size: 30px;
                line-height: 1.25;
                font-weight: 750;
                margin: 0 0 10px;
                color: #304638;
                overflow-wrap: anywhere;
            }

            #plantOfTheDay .daily-plant-scientific {
                display: block;
                font-size: 19px;
                line-height: 1.5;
                margin: 0 0 12px;
                color: #465b4b;
                overflow-wrap: anywhere;
            }

            #plantOfTheDay .daily-plant-description {
                display: block;
                font-size: 17px;
                line-height: 1.7;
                margin: 0;
                color: #526458;
                overflow-wrap: anywhere;
            }

            body.dark-mode #plantOfTheDay {
                background: #26372d !important;
                color: #e7eee8 !important;
                border-color: #405748 !important;
            }

            body.dark-mode #plantOfTheDay .daily-plant-name,
            body.dark-mode #plantOfTheDay .daily-plant-scientific,
            body.dark-mode #plantOfTheDay .daily-plant-description {
                color: #e7eee8 !important;
            }

            @media (max-width: 480px) {
                #plantOfTheDay {
                    width: calc(100% - 36px) !important;
                    padding: 25px 22px !important;
                    margin: 28px auto !important;
                }

                #plantOfTheDay .daily-plant-name {
                    font-size: 28px;
                }

                #plantOfTheDay .daily-plant-description {
                    font-size: 16px;
                }
            }
        `;

        document.head.appendChild(style);
    }

    let card = document.getElementById("plantOfTheDay");

    if (!card) {
        card = document.createElement("section");
        card.id = "plantOfTheDay";

        welcome.insertAdjacentElement("afterend", card);
    }

    card.innerHTML = `
        <div class="daily-plant-icon">🌿</div>

        <p class="daily-plant-label">
            TODAY'S FEATURED PLANT
        </p>

        <h2 class="daily-plant-name">
            ${plantName}
        </h2>

        <p class="daily-plant-scientific">
            <em>${plant.scientific}</em>
        </p>

        <p class="daily-plant-description">
            ${plant.overview}
        </p>
    `;
}


/* =========================================
   DARK MODE
========================================= */

function setupTheme() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const button = document.createElement("button");

    button.id = "themeToggle";
    button.type = "button";
    button.style.display = "block";
    button.style.margin = "15px auto 0";

    header.appendChild(button);

    function applyTheme(dark) {
        document.body.classList.toggle("dark-mode", dark);

        button.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";

        document.querySelectorAll(".card").forEach(card => {
            card.style.background = dark ? "#26372d" : "";
            card.style.color = dark ? "#e7eee8" : "";
        });

        document.body.style.background = dark ? "#17251d" : "";
        document.body.style.color = dark ? "#e7eee8" : "";

        localStorage.setItem(
            "plantExplorerDarkMode",
            dark ? "true" : "false"
        );
    }

    applyTheme(
        localStorage.getItem("plantExplorerDarkMode") === "true"
    );

    button.addEventListener("click", () => {
        applyTheme(!document.body.classList.contains("dark-mode"));
    });
}


/* =========================================
   LOAD AI MODEL
========================================= */

async function loadModel() {
    try {
        modelStatus.textContent = "Loading AI model...";

        model = await tmImage.load(
            MODEL_URL + "model.json",
            MODEL_URL + "metadata.json"
        );

        modelStatus.textContent =
            "AI model is ready. Upload an image.";

        classifyButton.disabled = !selectedImage;

    } catch (error) {
        console.error(error);

        modelStatus.textContent =
            "Unable to load the AI model. Please refresh and try again.";
    }
}


/* =========================================
   IMAGE UPLOAD
========================================= */

fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        fileStatus.textContent = "Please select a valid image.";
        return;
    }

    selectedImage = file;

    const reader = new FileReader();

    reader.onload = function(e) {
        preview.src = e.target.result;
        previewBox.hidden = false;

        fileStatus.textContent = "Image selected successfully.";

        classifyButton.disabled = !model;

        predictionsBox.innerHTML = `
            <p class="empty-message">
                Tap Identify Image to classify your picture.
            </p>
        `;

        categoryStatus.textContent = "";
        askButton.hidden = true;
        promptBox.hidden = true;

        speechSynthesis.cancel();
    };

    reader.readAsDataURL(file);
});


/* =========================================
   CLASSIFY IMAGE
========================================= */

classifyButton.addEventListener("click", async function() {
    if (!model || !selectedImage) return;

    classifyButton.disabled = true;
    classifyButton.textContent = "Identifying...";

    predictionsBox.innerHTML = "<p>🔍 Analyzing your image...</p>";

    try {
        const image = new Image();
        image.src = preview.src;

        await new Promise((resolve, reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });

        const predictions = await model.predict(image);

        predictions.sort(
            (a, b) => b.probability - a.probability
        );

        predictionsBox.innerHTML = "";

        predictions.forEach(prediction => {
            const percentage =
                (prediction.probability * 100).toFixed(1);

            const row = document.createElement("div");

            row.style.margin = "12px 0";

            row.innerHTML = `
                <div style="
                    display:flex;
                    justify-content:space-between;
                    gap:10px;
                    font-weight:600;
                    margin-bottom:5px;
                ">
                    <span>${prediction.className}</span>
                    <span>${percentage}%</span>
                </div>

                <div style="
                    height:12px;
                    background:#dce8dc;
                    border-radius:20px;
                    overflow:hidden;
                ">
                    <div style="
                        height:100%;
                        width:${percentage}%;
                        background:linear-gradient(90deg,#91ad91,#477653);
                        border-radius:20px;
                    "></div>
                </div>
            `;

            predictionsBox.appendChild(row);
        });

        currentPlant = predictions[0].className;

        categoryStatus.textContent =
            "Top prediction: " + currentPlant;

        askButton.hidden = false;

    } catch (error) {
        console.error(error);

        predictionsBox.innerHTML =
            "<p>Something went wrong while identifying the image. Please try again.</p>";

    } finally {
        classifyButton.disabled = false;
        classifyButton.textContent = "Identify Image";
    }
});


/* =========================================
   AUTOMATIC SPEECH NARRATION
========================================= */

function setupSpeechControls() {
    speechSynthesis.cancel();

    // Capture information before adding speech controls.
    const textToRead = informationBox.innerText;

    const controls = document.createElement("div");

    controls.className = "speech-controls";
    controls.style.margin = "20px 0";

    controls.innerHTML = `
        <h3>🔊 Voice Narration</h3>

        <button id="pauseButton" type="button">
            ⏸ Pause
        </button>

        <button id="resumeButton" type="button">
            ▶️ Resume
        </button>

        <button id="stopButton" type="button">
            ⏹ Stop
        </button>
    `;

    informationBox.appendChild(controls);

    document.getElementById("pauseButton").addEventListener("click", () => {
        if (speechSynthesis.speaking) {
            speechSynthesis.pause();
        }
    });

    document.getElementById("resumeButton").addEventListener("click", () => {
        if (speechSynthesis.paused) {
            speechSynthesis.resume();
        }
    });

    document.getElementById("stopButton").addEventListener("click", () => {
        speechSynthesis.cancel();
    });

    // Automatically start narration.
    speechUtterance = new SpeechSynthesisUtterance(textToRead);

    speechUtterance.lang = "en-IN";
    speechUtterance.rate = 0.9;

    speechSynthesis.speak(speechUtterance);
}


/* =========================================
   DISPLAY PLANT INFORMATION
========================================= */

function displayPlantInformation(plantName) {
    const plant = plantInformation[plantName];

    speechSynthesis.cancel();

    promptBox.hidden = false;

    if (!plant) {
        informationBox.innerHTML = `
            <h2>${plantName}</h2>

            <p>
                Detailed information for this category is not available yet.
            </p>

            <p>
                Please verify the AI prediction using a reliable plant identification source.
            </p>

            <p>
                <strong>Educational Disclaimer:</strong>
                This website provides general information only, not medical advice.
                Plant identification may be incorrect. Consult a qualified healthcare
                professional before using any plant for health purposes.
            </p>
        `;

        setupSpeechControls();
        return;
    }

    informationBox.innerHTML = `
        <h2>${plantName}</h2>

        <h3>🌱 Scientific Name</h3>
        <p><em>${plant.scientific}</em></p>

        <h3>📖 Overview</h3>
        <p>${plant.overview}</p>

        <h3>🍃 Key Characteristics</h3>
        <p>${plant.characteristics}</p>

        <h3>🌿 Uses</h3>
        <p>${plant.uses}</p>

        <h3>🌍 Origin and History</h3>
        <p>${plant.origin}</p>

        <h3>✨ Interesting Facts</h3>

        <ul>
            ${plant.facts.map(fact => `<li>${fact}</li>`).join("")}
        </ul>

        <hr>

        <p style="font-size:13px;color:#718174;margin-top:20px;">
            <strong>Educational Disclaimer:</strong>
            This information is for educational purposes only and is not medical advice.
            Plant identification may be incorrect. Do not consume or use a plant for
            treatment based only on this website. Consult a qualified healthcare
            professional before using medicinal plants.
        </p>
    `;

    // Start reading automatically when information appears.
    setupSpeechControls();

    promptBox.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


/* =========================================
   GET INFORMATION BUTTON
========================================= */

askButton.addEventListener("click", function() {
    if (!currentPlant) return;

    displayPlantInformation(currentPlant);
});


/* =========================================
   COPY INFORMATION
========================================= */

copyButton.addEventListener("click", async function() {
    const text = informationBox.innerText;

    try {
        await navigator.clipboard.writeText(text);

        copyStatus.textContent =
            "Information copied successfully.";

    } catch (error) {
        copyStatus.textContent =
            "Copy is unavailable in this browser. Please select and copy the text manually.";
    }
});


/* =========================================
   OPEN IN CHATGPT
========================================= */

chatGPTButton.addEventListener("click", function() {
    const text = informationBox.innerText;

    const prompt =
        "Explain the following medicinal plant category in a clear educational way. " +
        "Do not give treatment, dosage, or self-medication instructions.\n\n" +
        text;

    const url =
        "https://chatgpt.com/?q=" + encodeURIComponent(prompt);

    window.open(url, "_blank");
});


/* =========================================
   REMOVE IMAGE AND RESET
========================================= */

removeButton.addEventListener("click", function() {
    speechSynthesis.cancel();

    fileInput.value = "";
    selectedImage = null;
    currentPlant = null;

    preview.src = "";
    previewBox.hidden = true;

    fileStatus.textContent = "";
    categoryStatus.textContent = "";
    copyStatus.textContent = "";

    classifyButton.disabled = !model;

    predictionsBox.innerHTML = `
        <p class="empty-message">
            Your classification results will appear here.
        </p>
    `;

    askButton.hidden = true;
    promptBox.hidden = true;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


/* =========================================
   INITIALIZE WEBSITE
========================================= */

function initializeWebsite() {
    setupTheme();
    setupPlantOfTheDay();
    loadModel();
}

initializeWebsite();
