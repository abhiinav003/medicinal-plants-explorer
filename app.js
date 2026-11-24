/* =========================================
MEDICINAL PLANTS EXPLORER
COMPLETE UPDATED APP.JS
========================================= */

"use strict";

const MODEL_URL =
"https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = null;
let cameraStream = null;
let speechUtterance = null;

/* =========================================
PLANT DATABASE
========================================= */

const PLANTS = [

{
name: "Mint",
aliases: ["mint", "pudina"],
scientific: "Mentha",
emoji: "🌿",
overview: "Mint is an aromatic herb widely used in food and traditional practices.",
characteristics: "It has green leaves, a refreshing aroma and a spreading growth habit.",
origin: "Mint species are native to different regions of Europe, Asia and Africa.",
uses: [
"Used as a flavouring ingredient in food and beverages.",
"Commonly used to prepare chutneys and herbal drinks.",
"Studied for its aromatic compounds."
],
facts: [
"Mint belongs to the Lamiaceae family.",
"It grows well in suitable moist conditions.",
"Many varieties of mint exist."
]
},

{
name: "Turmeric",
aliases: ["turmeric", "haldi"],
scientific: "Curcuma longa",
emoji: "🟡",
overview: "Turmeric is a flowering plant known for its yellow-orange rhizome.",
characteristics: "It has broad green leaves and underground rhizomes.",
origin: "Native to the Indian subcontinent and Southeast Asia.",
uses: [
"Used as a spice and natural food colouring.",
"Used in traditional cultural practices.",
"Curcumin is one of its widely studied compounds."
],
facts: [
"Turmeric belongs to the ginger family.",
"Its rhizome is commonly dried and powdered.",
"It is an important crop in India."
]
},

{
name: "Tulsi",
aliases: ["tulsi", "holy basil"],
scientific: "Ocimum tenuiflorum",
emoji: "🌱",
overview: "Tulsi is an aromatic plant widely respected in Indian traditions.",
characteristics: "It has aromatic leaves and small flowers.",
origin: "Native to the Indian subcontinent and Southeast Asia.",
uses: [
"Used in traditional Indian practices.",
"Leaves are used in herbal preparations.",
"Also grown as an ornamental and cultural plant."
],
facts: [
"Tulsi belongs to the mint family.",
"It attracts certain pollinating insects.",
"Different varieties of Tulsi are grown."
]
},

{
name: "Neem",
aliases: ["neem"],
scientific: "Azadirachta indica",
emoji: "🌳",
overview: "Neem is a well-known evergreen tree found widely in tropical regions.",
characteristics: "It has compound leaves and a spreading crown.",
origin: "Native to the Indian subcontinent.",
uses: [
"Traditionally used in several cultural practices.",
"Neem extracts are studied for agricultural applications.",
"Neem oil is used in some commercial products."
],
facts: [
"Neem can tolerate dry conditions.",
"It is an important shade tree.",
"Different parts of the tree have been studied."
]
},

{
name: "Garlic",
aliases: ["garlic", "lahsun"],
scientific: "Allium sativum",
emoji: "🧄",
overview: "Garlic is a bulb-forming plant commonly grown as a food crop.",
characteristics: "It has narrow leaves and underground bulbs made of cloves.",
origin: "Central Asia is commonly recognised as its origin.",
uses: [
"Used as a flavouring ingredient.",
"An important ingredient in many cuisines.",
"Its sulphur-containing compounds are studied by researchers."
],
facts: [
"Garlic belongs to the Amaryllis family.",
"Each bulb contains several cloves.",
"It is propagated using individual cloves."
]
},

{
name: "Curry Leaf",
aliases: ["curry leaf", "curry leaves", "kadi patta"],
scientific: "Murraya koenigii",
emoji: "🍃",
overview: "Curry leaf is an aromatic plant used in South Asian cooking.",
characteristics: "It has small, shiny and aromatic leaflets.",
origin: "Native to the Indian subcontinent.",
uses: [
"Used to flavour curries and other dishes.",
"Commonly added during tempering.",
"Also grown in home gardens."
],
facts: [
"It belongs to the Rutaceae family.",
"Its leaves have a distinctive aroma.",
"It can grow into a small tree."
]
},

{
name: "Rosemary",
aliases: ["rosemary"],
scientific: "Salvia rosmarinus",
emoji: "🌿",
overview: "Rosemary is an aromatic evergreen shrub.",
characteristics: "It has narrow, needle-like leaves.",
origin: "Native to the Mediterranean region.",
uses: [
"Used as a culinary herb.",
"Used in fragrance products.",
"Its aromatic compounds are studied."
],
facts: [
"Rosemary belongs to the mint family.",
"It is adapted to Mediterranean climates.",
"It can be grown as an ornamental shrub."
]
},

{
name: "Lavender",
aliases: ["lavender"],
scientific: "Lavandula",
emoji: "💜",
overview: "Lavender is a flowering aromatic plant known for its fragrance.",
characteristics: "It has narrow leaves and purple flower spikes in many varieties.",
origin: "Native to regions around the Mediterranean.",
uses: [
"Used in perfumes and fragrance products.",
"Used as an ornamental garden plant.",
"Its essential oil is used in fragrance research."
],
facts: [
"Lavender attracts pollinators.",
"It belongs to the mint family.",
"There are many lavender species."
]
},

{
name: "Chamomile",
aliases: ["chamomile"],
scientific: "Matricaria chamomilla",
emoji: "🌼",
overview: "Chamomile is a flowering herb with daisy-like flowers.",
characteristics: "It has small white petals surrounding a yellow centre.",
origin: "Native to Europe and parts of western Asia.",
uses: [
"Flowers are used in herbal tea preparations.",
"Used in fragrance and cosmetic products.",
"Studied for its natural plant compounds."
],
facts: [
"It belongs to the daisy family.",
"Its flowers attract insects.",
"It is an annual herb."
]
},

{
name: "Amla",
aliases: ["amla", "aamla", "indian gooseberry"],
scientific: "Phyllanthus emblica",
emoji: "🟢",
overview: "Amla is a fruit-bearing tree known for its green fruits.",
characteristics: "It has small leaves arranged along branchlets and round fruits.",
origin: "Native to tropical parts of Asia, including India.",
uses: [
"Fruits are used in food products.",
"Used in traditional Indian preparations.",
"It is known for its vitamin C content."
],
facts: [
"Amla is also called Indian gooseberry.",
"It is an important fruit crop.",
"Its fruits have a sour and astringent taste."
]
},

{
name: "Brahmi",
aliases: ["brahmi"],
scientific: "Bacopa monnieri",
emoji: "🌱",
overview: "Brahmi is a small creeping herb found in wet environments.",
characteristics: "It has small succulent leaves and tiny flowers.",
origin: "Found in tropical and subtropical regions.",
uses: [
"Known in traditional Indian botanical practices.",
"Studied for its plant compounds.",
"Sometimes grown in aquatic and moist gardens."
],
facts: [
"It can grow in wet soil.",
"It is a creeping plant.",
"It belongs to the Plantaginaceae family."
]
},

{
name: "Moringa",
aliases: ["moringa", "drumstick"],
scientific: "Moringa oleifera",
emoji: "🌳",
overview: "Moringa is a fast-growing tree valued as a food plant.",
characteristics: "It has compound leaves and long seed pods.",
origin: "Native to the Indian subcontinent.",
uses: [
"Leaves are used as food.",
"Seed pods are used in cooking.",
"It is cultivated in tropical regions."
],
facts: [
"It is also called the drumstick tree.",
"Its leaves contain various nutrients.",
"It can grow in dry tropical climates."
]
},

{
name: "Lemongrass",
aliases: ["lemongrass", "lemon grass"],
scientific: "Cymbopogon citratus",
emoji: "🌾",
overview: "Lemongrass is a tropical grass with a lemon-like fragrance.",
characteristics: "It grows in clumps with long, narrow leaves.",
origin: "Native to tropical regions of Asia.",
uses: [
"Used in food and beverages.",
"Used in fragrance products.",
"Contains aromatic essential oils."
],
facts: [
"It belongs to the grass family.",
"It is widely grown in tropical climates.",
"Its leaves have a citrus-like aroma."
]
},

{
name: "Eucalyptus",
aliases: ["eucalyptus"],
scientific: "Eucalyptus",
emoji: "🌳",
overview: "Eucalyptus is a large group of trees and shrubs.",
characteristics: "Many species have aromatic leaves and peeling bark.",
origin: "Most species are native to Australia.",
uses: [
"Some species are cultivated for timber.",
"Leaves contain aromatic oils.",
"Trees are used in landscaping and forestry."
],
facts: [
"Many eucalyptus species grow rapidly.",
"They are important in Australian ecosystems.",
"Koalas feed on leaves of certain species."
]
},

{
name: "Cinnamon",
aliases: ["cinnamon", "dalchini"],
scientific: "Cinnamomum verum",
emoji: "🪵",
overview: "Cinnamon is a spice obtained from the inner bark of certain trees.",
characteristics: "Its dried bark forms fragrant brown sticks.",
origin: "Ceylon cinnamon is native to Sri Lanka.",
uses: [
"Used as a spice in food.",
"Used in baked products and beverages.",
"It contains naturally occurring aromatic compounds."
],
facts: [
"Cinnamon comes from tree bark.",
"It is used in many cuisines.",
"Different types of cinnamon exist."
]
},

{
name: "Clove",
aliases: ["clove", "cloves", "laung"],
scientific: "Syzygium aromaticum",
emoji: "🌺",
overview: "Clove is an aromatic spice obtained from dried flower buds.",
characteristics: "It has small reddish-brown nail-shaped dried buds.",
origin: "Native to the Maluku Islands of Indonesia.",
uses: [
"Used as a culinary spice.",
"Used in fragrance products.",
"Contains the aromatic compound eugenol."
],
facts: [
"Cloves are harvested before flowers open.",
"They are dried before use.",
"Clove trees are evergreen."
]
},

{
name: "Hibiscus",
aliases: ["hibiscus", "gudhal"],
scientific: "Hibiscus rosa-sinensis",
emoji: "🌺",
overview: "Hibiscus is a flowering shrub known for its colourful flowers.",
characteristics: "It has large flowers and glossy green leaves.",
origin: "Its exact native origin is uncertain; it is widely cultivated in tropical regions.",
uses: [
"Commonly grown as an ornamental plant.",
"Some hibiscus species are used in beverages.",
"Flowers are used in cultural decorations."
],
facts: [
"It attracts pollinators.",
"It belongs to the mallow family.",
"Flowers can be red, yellow, pink or other colours."
]
},

{
name: "Gotu Kola",
aliases: ["gotu kola", "centella"],
scientific: "Centella asiatica",
emoji: "🍀",
overview: "Gotu Kola is a small creeping herb found in moist environments.",
characteristics: "It has rounded leaves with scalloped edges.",
origin: "Native to wetlands across parts of Asia.",
uses: [
"Known in traditional botanical practices.",
"Studied for its plant compounds.",
"Used in some cosmetic products."
],
facts: [
"It grows in moist places.",
"It is a creeping herb.",
"It belongs to the Apiaceae family."
]
},

{
name: "Aloe Vera",
aliases: ["aloe vera", "aloe"],
scientific: "Aloe vera",
emoji: "🌵",
overview: "Aloe vera is a succulent plant with thick, fleshy leaves.",
characteristics: "Its leaves contain a clear inner gel.",
origin: "Its exact origin is uncertain, but it is associated with the Arabian Peninsula.",
uses: [
"Used in cosmetic and personal-care products.",
"Gel is used as an ingredient in some products.",
"It is grown as an ornamental succulent."
],
facts: [
"It stores water in its leaves.",
"It is adapted to dry conditions.",
"It belongs to the Asphodelaceae family."
]
}

];

/* =========================================
LIGHT / DARK MODE
========================================= */

const themeButton =
document.getElementById("themeToggle");

function setTheme(dark) {

document.body.classList.toggle("dark", dark);  

if (themeButton) {  

    themeButton.textContent = dark  
        ? "☀️ Switch to Light Mode"  
        : "🌙 Switch to Dark Mode";  

}  

localStorage.setItem(  
    "plantTheme",  
    dark ? "dark" : "light"  
);

}

setTheme(localStorage.getItem("plantTheme") === "dark");

if (themeButton) {

themeButton.addEventListener("click", function () {  

    const isDark =  
        document.body.classList.contains("dark");  

    setTheme(!isDark);  

});

}

/* =========================================
PLANT OF THE DAY
========================================= */

function showPlantOfTheDay() {

const element =  
    document.getElementById("plantOfTheDay");  

if (!element) return;  

const now = new Date();  

const start =  
    new Date(now.getFullYear(), 0, 0);  

const day = Math.floor(  
    (now - start) / (1000 * 60 * 60 * 24)  
);  

const plant =  
    PLANTS[day % PLANTS.length];  

element.innerHTML = `  

    <div class="daily-icon">  
        ${plant.emoji}  
    </div>  

    <h3>${plant.name}</h3>  

    <p>  
        <strong>Scientific Name:</strong>  
        ${plant.scientific}  
    </p>  

    <p>${plant.overview}</p>  

`;

}

showPlantOfTheDay();

/* =========================================
VOICE NARRATION
========================================= */

const speakButton =
document.getElementById("speakInformation");

const pauseButton =
document.getElementById("pauseVoice");

const resumeButton =
document.getElementById("resumeVoice");

const stopButton =
document.getElementById("stopVoice");

const voiceStatus =
document.getElementById("voiceStatus");

function stopVoice() {

if ("speechSynthesis" in window) {  

    window.speechSynthesis.cancel();  

}  

speechUtterance = null;  

if (voiceStatus) {  
    voiceStatus.textContent = "Voice stopped.";  
}

}

function speakInformation() {

const information =  
    document.getElementById("information");  

if (!information || !information.innerText.trim()) {  

    if (voiceStatus) {  
        voiceStatus.textContent =  
            "No plant information is available to read.";  
    }  

    return;  

}  

if (!("speechSynthesis" in window)) {  

    if (voiceStatus) {  
        voiceStatus.textContent =  
            "Voice narration is not supported by this browser.";  
    }  

    return;  

}  

// Stop any previous narration.  

window.speechSynthesis.cancel();  

// Read the visible plant information.  

const textToRead =  
    information.innerText  
        .replace(/\s+/g, " ")  
        .trim();  

speechUtterance =  
    new SpeechSynthesisUtterance(textToRead);  

// Voice settings.  

speechUtterance.lang = "en-IN";  
speechUtterance.rate = 0.9;  
speechUtterance.pitch = 1;  
speechUtterance.volume = 1;  

// Try to select an Indian English voice.  

const voices =  
    window.speechSynthesis.getVoices();  

const preferredVoice =  
    voices.find(voice =>  
        voice.lang.toLowerCase() === "en-in"  
    ) ||  
    voices.find(voice =>  
        voice.lang.toLowerCase().startsWith("en")  
    );  

if (preferredVoice) {  
    speechUtterance.voice = preferredVoice;  
}  

speechUtterance.onstart = function () {  

    if (voiceStatus) {  
        voiceStatus.textContent =  
            "🔊 Reading plant information...";  
    }  

};  

speechUtterance.onend = function () {  

    if (voiceStatus) {  
        voiceStatus.textContent =  
            "✅ Finished reading plant information.";  
    }  

};  

speechUtterance.onerror = function (event) {  

    if (voiceStatus) {  

        voiceStatus.textContent =  
            event.error === "canceled"  
                ? "Voice stopped."  
                : "Unable to play the voice. Please try again.";  

    }  

};  

window.speechSynthesis.speak(speechUtterance);

}

if (speakButton) {

speakButton.addEventListener(  
    "click",  
    speakInformation  
);

}

if (pauseButton) {

pauseButton.addEventListener("click", function () {  

    if (  
        "speechSynthesis" in window &&  
        window.speechSynthesis.speaking  
    ) {  

        window.speechSynthesis.pause();  

        if (voiceStatus) {  
            voiceStatus.textContent = "⏸️ Voice paused.";  
        }  

    }  

});

}

if (resumeButton) {

resumeButton.addEventListener("click", function () {  

    if (  
        "speechSynthesis" in window &&  
        window.speechSynthesis.paused  
    ) {  

        window.speechSynthesis.resume();  

        if (voiceStatus) {  
            voiceStatus.textContent =  
                "▶️ Continuing narration...";  
        }  

    }  

});

}

if (stopButton) {

stopButton.addEventListener(  
    "click",  
    stopVoice  
);

}

/* =========================================
LOAD TEACHABLE MACHINE MODEL
========================================= */

async function loadModel() {

if (model) return model;  

const status =  
    document.getElementById("modelStatus");  

try {  

    if (status) {  
        status.textContent = "Loading AI model...";  
    }  

    model = await tmImage.load(  
        MODEL_URL + "model.json",  
        MODEL_URL + "metadata.json"  
    );  

    if (status) {  
        status.textContent =  
            "AI model loaded successfully!";  
    }  

    return model;  

} catch (error) {  

    console.error(error);  

    if (status) {  
        status.textContent =  
            "Unable to load AI model. Check your internet connection.";  
    }  

    throw error;  

}

}

/* =========================================
IMAGE UPLOAD
========================================= */

const fileInput =
document.getElementById("file");

const preview =
document.getElementById("preview");

const previewBox =
document.getElementById("previewBox");

if (fileInput) {

fileInput.addEventListener("change", function (event) {  

    const file = event.target.files[0];  

    if (!file) return;  

    if (!file.type.startsWith("image/")) {  

        alert("Please select an image file.");  

        fileInput.value = "";  

        return;  

    }  

    const reader = new FileReader();  

    reader.onload = function (e) {  

        const image = new Image();  

        image.onload = function () {  

            selectedImage = image;  

            if (preview) {  
                preview.src = e.target.result;  
            }  

            if (previewBox) {  
                previewBox.style.display = "block";  
            }  

        };  

        image.onerror = function () {  

            alert("Unable to open this image. Please choose another.");  

        };  

        image.src = e.target.result;  

    };  

    reader.readAsDataURL(file);  

    stopCamera();  

});

}

/* =========================================
REMOVE SELECTED IMAGE
========================================= */

const removeButton =
document.getElementById("remove");

if (removeButton) {

removeButton.addEventListener("click", function () {  

    selectedImage = null;  

    stopVoice();  

    if (preview) {  
        preview.src = "";  
    }  

    if (previewBox) {  
        previewBox.style.display = "none";  
    }  

    if (fileInput) {  
        fileInput.value = "";  
    }  

    const predictions =  
        document.getElementById("predictions");  

    if (predictions) {  
        predictions.innerHTML = "";  
    }  

    const informationSection =  
        document.getElementById("informationSection");  

    if (informationSection) {  
        informationSection.style.display = "none";  
    }  

    const categoryStatus =  
        document.getElementById("categoryStatus");  

    if (categoryStatus) {  
        categoryStatus.textContent = "";  
    }  

});

}

/* =========================================
WEBCAM
========================================= */

const startCameraButton =
document.getElementById("startCamera");

const cameraBox =
document.getElementById("cameraBox");

const cameraVideo =
document.getElementById("cameraVideo");

const cameraCanvas =
document.getElementById("cameraCanvas");

const captureButton =
document.getElementById("capturePhoto");

const stopCameraButton =
document.getElementById("stopCamera");

async function startCamera() {

try {  

    if (  
        !navigator.mediaDevices ||  
        !navigator.mediaDevices.getUserMedia  
    ) {  

        alert("Your browser does not support webcam access.");  

        return;  

    }  

    cameraStream =  
        await navigator.mediaDevices.getUserMedia({  

            video: {  
                facingMode: "environment"  
            },  

            audio: false  

        });  

    cameraVideo.srcObject = cameraStream;  

    await cameraVideo.play();  

    cameraBox.style.display = "block";  

} catch (error) {  

    console.error(error);  

    alert(  
        "Camera could not be opened. Please allow camera permission."  
    );  

}

}

function stopCamera() {

if (cameraStream) {  

    cameraStream.getTracks().forEach(track => {  
        track.stop();  
    });  

    cameraStream = null;  

}  

if (cameraVideo) {  
    cameraVideo.srcObject = null;  
}  

if (cameraBox) {  
    cameraBox.style.display = "none";  
}

}

if (startCameraButton) {

startCameraButton.addEventListener(  
    "click",  
    startCamera  
);

}

if (stopCameraButton) {

stopCameraButton.addEventListener(  
    "click",  
    stopCamera  
);

}

if (captureButton) {

captureButton.addEventListener("click", function () {  

    if (!cameraVideo || !cameraCanvas) return;  

    const width = cameraVideo.videoWidth;  
    const height = cameraVideo.videoHeight;  

    if (!width || !height) {  

        alert("Camera is not ready yet.");  

        return;  

    }  

    cameraCanvas.width = width;  
    cameraCanvas.height = height;  

    const context =  
        cameraCanvas.getContext("2d");  

    context.drawImage(  
        cameraVideo,  
        0,  
        0,  
        width,  
        height  
    );  

    const imageData =  
        cameraCanvas.toDataURL("image/png");  

    const image = new Image();  

    image.onload = function () {  

        selectedImage = image;  

        if (preview) {  
            preview.src = imageData;  
        }  

        if (previewBox) {  
            previewBox.style.display = "block";  
        }  

    };  

    image.src = imageData;  

    stopCamera();  

});

}

/* =========================================
MATCH AI CLASS WITH PLANT
========================================= */

function normalize(text) {

return String(text)  
    .toLowerCase()  
    .replace(/[^a-z0-9]/g, "");

}

function findPlant(className) {

const target = normalize(className);  

// First, look for an exact match.  

const exactMatch = PLANTS.find(plant => {  

    const names = [  
        plant.name,  
        plant.scientific,  
        ...plant.aliases  
    ];  

    return names.some(name =>  
        normalize(name) === target  
    );  

});  

if (exactMatch) return exactMatch;  

// Then try a carefully limited partial match.  

return PLANTS.find(plant => {  

    const names = [  
        plant.name,  
        plant.scientific,  
        ...plant.aliases  
    ];  

    return names.some(name => {  

        const normalizedName = normalize(name);  

        return normalizedName.length >= 5 &&  
            target.length >= 5 &&  
            (  
                target.includes(normalizedName) ||  
                normalizedName.includes(target)  
            );  

    });  

});

}

/* =========================================
DISPLAY PLANT INFORMATION
========================================= */

function displayPlant(plant) {

const section =  
    document.getElementById("informationSection");  

const information =  
    document.getElementById("information");  

if (!section || !information) return;  

// Stop previous plant narration.  

if ("speechSynthesis" in window) {  
    window.speechSynthesis.cancel();  
}  

speechUtterance = null;  

if (voiceStatus) {  
    voiceStatus.textContent = "";  
}  

if (!plant) {  

    section.style.display = "block";  

    information.innerHTML = `  

        <h2>Plant Information</h2>  

        <p>  
            No matching plant information was found.  
            Please check the Teachable Machine class labels.  
        </p>  

    `;  

    section.scrollIntoView({  
        behavior: "smooth",  
        block: "start"  
    });  

    return;  

}  

information.innerHTML = `  

    <h2>${plant.emoji} ${plant.name}</h2>  

    <h3>Scientific Name</h3>  

    <p><em>${plant.scientific}</em></p>  

    <h3>Overview</h3>  

    <p>${plant.overview}</p>  

    <h3>Characteristics</h3>  

    <p>${plant.characteristics}</p>  

    <h3>Origin</h3>  

    <p>${plant.origin}</p>  

    <h3>Traditional and Common Uses</h3>  

    <ul>  
        ${plant.uses.map(use =>  
            `<li>${use}</li>`  
        ).join("")}  
    </ul>  

    <h3>Interesting Facts</h3>  

    <ul>  
        ${plant.facts.map(fact =>  
            `<li>${fact}</li>`  
        ).join("")}  
    </ul>  

    <div class="info-note">  

        <strong>Educational Note:</strong>  

        This information is provided for botanical  
        learning. It is not medical advice or a  
        recommendation to use plants for treating  
        health conditions.  

    </div>  

`;  

section.style.display = "block";  

section.scrollIntoView({  
    behavior: "smooth",  
    block: "start"  
});

}

/* =========================================
AI CLASSIFICATION
========================================= */

const classifyButton =
document.getElementById("classify");

if (classifyButton) {

classifyButton.addEventListener("click", async function () {  

    const status =  
        document.getElementById("categoryStatus");  

    const predictionArea =  
        document.getElementById("predictions");  

    if (!selectedImage) {  

        alert(  
            "Please upload an image or capture a photo first."  
        );  

        return;  

    }  

    try {  

        classifyButton.disabled = true;  

        if (status) {  
            status.textContent =  
                "Analysing your plant image...";  
        }  

        if (predictionArea) {  
            predictionArea.innerHTML = "";  
        }  

        const ai = await loadModel();  

        const results =  
            await ai.predict(selectedImage);  

        results.sort(  
            (a, b) => b.probability - a.probability  
        );  

        if (!results.length) {  

            throw new Error("No predictions returned.");  

        }  

        const best = results[0];  

        const confidence =  
            best.probability * 100;  

        if (predictionArea) {  

            predictionArea.innerHTML = `  

                <h3>AI Predictions</h3>  

                ${results.map(result => {  

                    const percent =  
                        (result.probability * 100).toFixed(1);  

                    return `  

                        <div class="prediction-item">  

                            <strong>  
                                ${result.className}  
                            </strong>  

                            <span style="float:right">  
                                ${percent}%  
                            </span>  

                            <div class="prediction-bar">  

                                <div  
                                    class="prediction-fill"  
                                    style="width:${percent}%">  
                                </div>  

                            </div>  

                        </div>  

                    `;  

                }).join("")}  

            `;  

        }  

        if (confidence < 50) {  

            if (status) {  

                status.textContent =  
                    "The AI is uncertain. Please try a clearer plant image.";  

            }  

            displayPlant(null);  

            return;  

        }  

        if (status) {  

            status.textContent =  
                "Identification result: " + best.className;  

        }  

        const plant =  
            findPlant(best.className);  

        displayPlant(plant);  

    } catch (error) {  

        console.error(error);  

        if (status) {  

            status.textContent =  
                "Identification failed. Please try again.";  

        }  

    } finally {  

        classifyButton.disabled = false;  

    }  

});

}

/* =========================================
COPY PLANT INFORMATION
========================================= */

const copyButton =
document.getElementById("copy");

if (copyButton) {

copyButton.addEventListener("click", async function () {  

    const information =  
        document.getElementById("information");  

    const copyStatus =  
        document.getElementById("copyStatus");  

    if (  
        !information ||  
        !information.innerText.trim()  
    ) {  

        return;  

    }  

    try {  

        await navigator.clipboard.writeText(  
            information.innerText  
        );  

        if (copyStatus) {  

            copyStatus.textContent =  
                "Plant information copied successfully!";  

        }  

    } catch (error) {  

        if (copyStatus) {  

            copyStatus.textContent =  
                "Copy is not available in this browser.";  

        }  

    }  

});

}

/* =========================================
END OF APP.JS
========================================= */
