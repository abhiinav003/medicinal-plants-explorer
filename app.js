/* =========================================
   MEDICINAL PLANTS EXPLORER
   Complete app.js
========================================= */

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = null;
let currentPlant = null;
let speechUtterance = null;

const plantInformation = {
    "Mint": {
        scientific: "Mentha",
        overview: "Mint is a popular aromatic herb known for its refreshing smell and cooling taste. It is widely grown in gardens and cultivated for its fragrant leaves. Different species of mint are used in food, drinks and traditional preparations.",
        characteristics: "Mint is a fast-growing herb with green, fragrant leaves that usually grow in pairs along its stems. Its stems may spread across the ground or grow upright, depending on the species. Small flowers may appear in clusters, and the leaves contain aromatic oils responsible for their distinctive smell.",
        uses: "Mint leaves are commonly added to chutneys, salads, soups, desserts and beverages. They are also used in toothpaste, mouth fresheners, chewing gum and herbal teas. Mint oil is used in some cosmetic and fragrance products.",
        origin: "Mint belongs to the Lamiaceae family. Different mint species are native to regions of Europe, Asia and Africa. The plant has been cultivated for centuries and became popular in cooking, traditional practices and gardens around the world.",
        facts: [
            "Mint belongs to the Lamiaceae, or mint, family.",
            "Its refreshing aroma comes from natural aromatic compounds.",
            "Peppermint and spearmint are two well-known types.",
            "Mint can spread quickly through underground stems.",
            "Mint leaves are commonly used to prepare herbal tea."
        ]
    },

    "Turmeric": {
        scientific: "Curcuma longa",
        overview: "Turmeric is a tropical herbaceous plant famous for its bright yellow-orange underground rhizome. It is an important spice in Indian cooking and has a long history of use in South Asian food traditions. Its characteristic color comes mainly from a natural compound called curcumin.",
        characteristics: "Turmeric grows from thick underground rhizomes and produces broad, green leaves. The plant can grow to around one meter tall under suitable conditions. Its underground stem is harvested, processed and dried.",
        uses: "Turmeric is widely used to add color, aroma and flavor to curries, rice dishes, soups and other foods. It is also used as a natural food coloring and in cosmetics and traditional preparations.",
        origin: "Turmeric is native to tropical South Asia and has been cultivated in the Indian subcontinent for a very long time. It later spread to other parts of Asia and the world through trade and cultivation.",
        facts: [
            "Turmeric belongs to the ginger family, Zingiberaceae.",
            "Its scientific name is Curcuma longa.",
            "Curcumin is the main compound responsible for its yellow color.",
            "The part commonly used is an underground rhizome.",
            "India is one of the world's major turmeric producers."
        ]
    },

    "Tulsi": {
        scientific: "Ocimum tenuiflorum",
        overview: "Tulsi, also known as holy basil, is an aromatic herb that holds an important place in Indian culture and traditional practices. It is commonly grown in home gardens and is recognized for its fragrant leaves.",
        characteristics: "Tulsi is a branching herb or small shrub with green or sometimes purplish stems. Its leaves are aromatic, usually oval-shaped and slightly toothed along the edges. It produces small flowers arranged in clusters on upright flower spikes.",
        uses: "Tulsi leaves are used in herbal teas, food preparations and traditional practices. The plant is also grown in gardens for its fragrance and cultural importance. Its essential oil is used in some fragrance and personal-care products.",
        origin: "Tulsi is native to the Indian subcontinent and nearby tropical regions of Asia. It has been cultivated in India for centuries.",
        facts: [
            "Tulsi is commonly called holy basil.",
            "It belongs to the Lamiaceae family.",
            "Its leaves have a distinctive aromatic smell.",
            "Different varieties include Rama Tulsi and Krishna Tulsi.",
            "Tulsi is commonly grown in Indian households."
        ]
    },

    "Neem": {
        scientific: "Azadirachta indica",
        overview: "Neem is an evergreen tree widely known in South Asia for its bitter leaves and many traditional uses. It is commonly planted in gardens, farms and along roads.",
        characteristics: "Neem is a medium to large evergreen tree with a spreading crown. Its leaves are compound, with several narrow leaflets arranged along a central stalk. It produces small white flowers and oval fruits that turn yellowish when ripe.",
        uses: "Neem is used in traditional preparations, soaps, shampoos, skincare products and some agricultural products. Neem seed oil is also used in certain pest-management products. The tree provides shade.",
        origin: "Neem is native to the Indian subcontinent and parts of the surrounding region. It has been cultivated for centuries and is now grown in many tropical and subtropical countries.",
        facts: [
            "Neem belongs to the mahogany family, Meliaceae.",
            "Its leaves have a naturally bitter taste.",
            "Neem can tolerate relatively dry conditions.",
            "Its seeds are a source of neem oil.",
            "Neem trees are commonly planted for shade."
        ]
    },

    "Garlic": {
        scientific: "Allium sativum",
        overview: "Garlic is a bulb-forming plant widely cultivated for its strong flavor and aroma. It is one of the most familiar ingredients in kitchens around the world. Its underground bulb is made up of several smaller sections called cloves.",
        characteristics: "Garlic grows from a bulb and produces long, narrow, flat leaves. The bulb is covered by a thin papery skin and contains several cloves. Under suitable conditions, the plant can also produce a flower stalk.",
        uses: "Garlic is used in sauces, curries, soups, pickles, seasoning mixtures and many other dishes. It is also used in food processing and traditional food preparations.",
        origin: "Garlic has a long history of cultivation in Central Asia and surrounding regions. It spread through trade and migration and became an important crop in many parts of the world.",
        facts: [
            "Garlic belongs to the Amaryllidaceae family.",
            "Each bulb usually contains several cloves.",
            "Its strong smell develops when the cloves are cut or crushed.",
            "Garlic is related to onions and leeks.",
            "It has been cultivated for thousands of years."
        ]
    },

    "Curry": {
        scientific: "Murraya koenigii",
        overview: "The curry leaf plant is an aromatic tree or shrub valued for its fragrant leaves. It is especially popular in Indian cooking, where the leaves add a distinctive flavor to many dishes.",
        characteristics: "The plant has compound leaves made up of several small, shiny leaflets arranged along a central stalk. It produces small white flowers and dark, berry-like fruits.",
        uses: "Curry leaves are commonly added to dals, curries, chutneys, vegetable dishes and seasoning mixtures. They are often added to hot oil at the beginning of cooking to release their aroma.",
        origin: "The curry leaf plant is native to the Indian subcontinent and nearby regions. It has been used in South Asian cooking for generations.",
        facts: [
            "Its scientific name is Murraya koenigii.",
            "Curry leaves are different from curry powder.",
            "The plant belongs to the Rutaceae family.",
            "Its leaves are widely used in South Indian cooking.",
            "The plant can grow into a small tree."
        ]
    },

    "Rosemary": {
        scientific: "Salvia rosmarinus",
        overview: "Rosemary is an aromatic evergreen shrub known for its strong fragrance and needle-like leaves. It is widely used as a culinary herb and is also grown in gardens.",
        characteristics: "Rosemary has narrow, firm leaves that resemble small needles. The upper surface is usually dark green, while the underside is lighter. The plant produces small blue, purple, pink or white flowers.",
        uses: "Rosemary is used to season vegetables, breads, soups and other dishes. Its extracts and oils are used in some fragrances, soaps and personal-care products.",
        origin: "Rosemary is native to the Mediterranean region. It has been cultivated for centuries and spread to many parts of the world.",
        facts: [
            "Rosemary belongs to the Lamiaceae family.",
            "Its leaves have a strong, pine-like aroma.",
            "It is an evergreen plant.",
            "Bees and other pollinators visit its flowers.",
            "Its modern scientific name is Salvia rosmarinus."
        ]
    },

    "Lavender": {
        scientific: "Lavandula",
        overview: "Lavender is a fragrant flowering plant famous for its purple flower spikes and pleasant scent. It is widely cultivated in gardens and commercial farms.",
        characteristics: "Lavender plants are usually small shrubs with narrow, gray-green leaves. Their flowers grow in clusters on upright stems and are often purple or violet, although some varieties have pink or white flowers.",
        uses: "Lavender is used in perfumes, soaps, scented candles, sachets and personal-care products. Its dried flowers are sometimes used in decorative arrangements.",
        origin: "Many lavender species are native to the Mediterranean region, the Middle East and nearby areas. The plant has been used in fragrance traditions for centuries.",
        facts: [
            "Lavender belongs to the Lamiaceae family.",
            "Its flowers are often purple or violet.",
            "Its fragrance comes from natural aromatic oils.",
            "Lavender attracts bees and other pollinators.",
            "It is widely grown for perfumes and essential oils."
        ]
    },

    "Chamomile": {
        scientific: "Matricaria chamomilla",
        overview: "Chamomile is a flowering herb known for its small daisy-like flowers. Its dried flower heads are commonly used to prepare herbal tea.",
        characteristics: "Chamomile plants have finely divided, delicate leaves and small flowers with white petals surrounding a yellow center. The plant usually grows as a low, branching herb.",
        uses: "Dried chamomile flowers are commonly used in herbal teas and are also found in some cosmetics, soaps and fragrance products.",
        origin: "Chamomile species are native to Europe and parts of western Asia. They have spread to other regions through cultivation.",
        facts: [
            "Chamomile belongs to the Asteraceae family.",
            "Its flowers resemble small daisies.",
            "The dried flower heads are commonly used for tea.",
            "It is an annual herb in many growing conditions.",
            "Chamomile is cultivated in several parts of the world."
        ]
    },

    "Aamla": {
        scientific: "Phyllanthus emblica",
        overview: "Amla, also known as Indian gooseberry, is a small to medium-sized tree that produces round, sour fruits. It is an important fruit in Indian food traditions.",
        characteristics: "The tree has small, simple leaves arranged closely along its branchlets. Its fruits are round, greenish-yellow and have distinct vertical lines. The fruit has a sour and astringent taste.",
        uses: "Amla is used to make pickles, juices, preserves, candies and dried food products. It is also used in traditional preparations and some hair-care products.",
        origin: "Amla is native to tropical and subtropical parts of Asia, including the Indian subcontinent. It has been cultivated and used in India for centuries.",
        facts: [
            "Amla is also called Indian gooseberry.",
            "Its scientific name is Phyllanthus emblica.",
            "The fruit is known for its vitamin C content.",
            "It has a naturally sour and astringent taste.",
            "Amla belongs to the Phyllanthaceae family."
        ]
    },

    "Brahmi": {
        scientific: "Bacopa monnieri",
        overview: "Brahmi is a small creeping herb traditionally used in Ayurvedic practices. It commonly grows in wet and marshy environments and is recognized by its small, fleshy leaves.",
        characteristics: "Brahmi has creeping stems that spread along the ground and may root at the nodes. Its leaves are small, thick and arranged in opposite pairs. It produces small white or pale flowers.",
        uses: "Brahmi is used in traditional Ayurvedic preparations and is also studied in botanical and scientific research. It is sometimes grown in moist gardens and containers.",
        origin: "Bacopa monnieri is found in wet tropical and subtropical areas across Asia, Africa, Australia and other regions.",
        facts: [
            "Brahmi is a creeping herb.",
            "It often grows in damp or marshy places.",
            "Its leaves are small and fleshy.",
            "Its scientific name is Bacopa monnieri.",
            "The common name Brahmi can refer to different plants in different regions."
        ]
    },

    "Moringa": {
        scientific: "Moringa oleifera",
        overview: "Moringa is a fast-growing tree widely cultivated for its edible leaves, flowers and long seed pods. It is commonly known as the drumstick tree in India.",
        characteristics: "Moringa is a small to medium-sized tree with a relatively open crown. Its leaves are compound and divided into many small leaflets. It produces pale flowers and long, narrow pods.",
        uses: "Moringa leaves are used in soups, curries and vegetable dishes. Its immature pods are commonly cooked as vegetables. The tree is also grown in home gardens and farms.",
        origin: "Moringa oleifera is native to the Indian subcontinent. It has spread to many tropical and subtropical countries.",
        facts: [
            "Moringa is commonly called the drumstick tree.",
            "Its scientific name is Moringa oleifera.",
            "Its leaves contain several nutrients.",
            "The long pods are commonly used as vegetables.",
            "Moringa belongs to the Moringaceae family."
        ]
    },

    "Lemongrass": {
        scientific: "Cymbopogon citratus",
        overview: "Lemongrass is a tropical grass known for its fresh, lemon-like aroma. It is cultivated for its fragrant leaves and is used in cooking, herbal teas and fragrance products.",
        characteristics: "Lemongrass forms clumps of long, narrow leaves with sharp edges. The leaves have a strong citrus-like scent when crushed.",
        uses: "Lemongrass is used in soups, curries, marinades and herbal teas. Its aromatic oil is used in perfumes, soaps and other fragrance products.",
        origin: "Cymbopogon citratus is associated with tropical South and Southeast Asia and is widely cultivated in warm regions.",
        facts: [
            "Lemongrass belongs to the grass family, Poaceae.",
            "Its aroma resembles lemon.",
            "It is commonly used in Southeast Asian cooking.",
            "Its leaves are long and narrow.",
            "Lemongrass oil is used in fragrance products."
        ]
    },

    "Eucalyptus": {
        scientific: "Eucalyptus globulus",
        overview: "Eucalyptus is a group of trees and shrubs best known for their aromatic leaves. Many species are evergreen and grow rapidly in suitable conditions.",
        characteristics: "Many eucalyptus trees have long, leathery leaves that contain aromatic oils. Their bark may be smooth or rough, depending on the species. Some species produce distinctive flowers and woody seed capsules.",
        uses: "Eucalyptus trees are grown for timber, pulp and paper production. Their leaves and oils are used in some fragrance, cleaning and personal-care products.",
        origin: "Most eucalyptus species are native to Australia, although some also occur naturally in nearby islands. They have been introduced and cultivated in many other parts of the world.",
        facts: [
            "Most eucalyptus species are native to Australia.",
            "Some eucalyptus trees can grow very tall.",
            "Their leaves contain aromatic oils.",
            "Koalas feed on leaves from certain eucalyptus species.",
            "Eucalyptus belongs to the Myrtaceae family."
        ]
    },

    "Cinnamon": {
        scientific: "Cinnamomum verum",
        overview: "Cinnamon is a well-known aromatic spice obtained from the inner bark of certain trees. It is valued for its warm, sweet smell and flavor.",
        characteristics: "Cinnamon comes from the inner bark of trees in the genus Cinnamomum. After harvesting and drying, the bark curls into thin, brown sticks.",
        uses: "Cinnamon is used in cakes, biscuits, desserts, hot drinks, curries and spice mixtures. It is also used in fragrances and some personal-care products.",
        origin: "True cinnamon, Cinnamomum verum, is native to Sri Lanka. Other cinnamon species are native to different parts of Asia.",
        facts: [
            "Cinnamon is obtained from the inner bark of trees.",
            "True cinnamon is scientifically called Cinnamomum verum.",
            "Cinnamon is available in sticks and powdered form.",
            "It has a warm and sweet aroma.",
            "Cinnamon has been traded for centuries."
        ]
    },

    "Clove": {
        scientific: "Syzygium aromaticum",
        overview: "Clove is a strongly aromatic spice made from the dried, unopened flower buds of a tropical evergreen tree. It is widely used in cooking, spice mixtures and fragrance products.",
        characteristics: "The clove tree is evergreen and has smooth, aromatic leaves. Its flower buds are green at first and turn pinkish or reddish before they are harvested and dried.",
        uses: "Cloves are used in curries, rice dishes, baked foods, spice mixtures and hot beverages. Clove oil is used in some fragrance and personal-care products.",
        origin: "Clove trees are native to the Maluku Islands of Indonesia, historically known as the Spice Islands.",
        facts: [
            "Cloves are dried, unopened flower buds.",
            "Their scientific name is Syzygium aromaticum.",
            "Cloves belong to the Myrtaceae family.",
            "Clove oil contains a compound called eugenol.",
            "Cloves were historically valuable in the spice trade."
        ]
    },

    "Hibiscus": {
        scientific: "Hibiscus rosa-sinensis",
        overview: "Hibiscus is a flowering shrub famous for its large, colorful flowers. It is commonly grown in tropical gardens and is popular as an ornamental plant.",
        characteristics: "Hibiscus plants have broad green leaves with toothed edges and prominent flowers. The flowers often have five petals and a long central column.",
        uses: "Hibiscus is grown in gardens, parks and homes for its attractive flowers. Certain species are used to prepare herbal teas and food products. Flowers and extracts are also ingredients in some cosmetic products.",
        origin: "Hibiscus rosa-sinensis is widely cultivated in tropical regions, and its exact original native range is uncertain.",
        facts: [
            "Hibiscus belongs to the Malvaceae family.",
            "Its flowers can have several different colors.",
            "The flower often has a prominent central column.",
            "Some hibiscus species are used to prepare herbal tea.",
            "Hibiscus is widely grown as an ornamental shrub."
        ]
    },

    "Gotu Kola": {
        scientific: "Centella asiatica",
        overview: "Gotu Kola is a small creeping herb that commonly grows in moist and tropical environments. It is also known as Indian pennywort.",
        characteristics: "Gotu Kola has thin creeping stems that spread along the ground and may develop roots at their nodes. Its leaves are rounded or fan-shaped and are carried on long stalks.",
        uses: "Gotu Kola is used in some regional foods, salads and traditional preparations. It is also studied in botanical and scientific research.",
        origin: "Centella asiatica is native to tropical and subtropical regions of Asia and other parts of the world.",
        facts: [
            "Gotu Kola is also known as Indian pennywort.",
            "Its scientific name is Centella asiatica.",
            "It has rounded or fan-shaped leaves.",
            "It commonly grows in moist environments.",
            "It belongs to the Apiaceae family."
        ]
    },

    "Aloevera": {
        scientific: "Aloe vera",
        overview: "Aloe vera is a succulent plant known for its thick, fleshy leaves that contain a clear gel. It is widely grown in warm climates and is popular in skincare and cosmetic products.",
        characteristics: "Aloe vera grows in a rosette pattern, with thick pointed leaves arranged around a central base. The leaf edges have small teeth, and the inside contains clear gel.",
        uses: "Aloe vera gel is used as an ingredient in many moisturizers, lotions, shampoos and other personal-care products. The plant is also grown as an ornamental succulent.",
        origin: "Aloe vera is believed to have originated in the Arabian Peninsula. It has been cultivated for centuries and is now grown worldwide.",
        facts: [
            "Aloe vera is a succulent plant.",
            "It stores water in its thick leaves.",
            "Its leaves contain clear inner gel.",
            "It is adapted to relatively dry environments.",
            "Aloe vera belongs to the Asphodelaceae family."
        ]
    },

    "Ginger": {
        scientific: "Zingiber officinale",
        overview: "Ginger is a tropical flowering plant cultivated mainly for its aromatic underground rhizome. It is an important ingredient in many cuisines and is commonly used fresh, dried or powdered.",
        characteristics: "The ginger plant grows from a branching underground rhizome. It produces upright leafy shoots with long, narrow leaves. The plant may also produce flower spikes under suitable growing conditions.",
        uses: "Ginger is used in curries, soups, sauces, baked foods, sweets and beverages. It is also used to prepare ginger tea and various traditional food products.",
        origin: "Ginger is believed to have originated in Southeast Asia. It spread to other regions through ancient trade and is now cultivated in many countries.",
        facts: [
            "Ginger belongs to the Zingiberaceae family.",
            "The part commonly used is an underground rhizome.",
            "Ginger is related to turmeric and cardamom.",
            "It can be used fresh, dried or powdered.",
            "Ginger has been traded for centuries."
        ]
    },

    "Ashwagandha": {
        scientific: "Withania somnifera",
        overview: "Ashwagandha is a small shrub that has a long history of use in Ayurvedic traditions. It is also known as Indian winter cherry.",
        characteristics: "Ashwagandha is a branching shrub with oval-shaped leaves and small greenish or yellowish flowers. Its fruits are round berries that turn orange-red when mature and are enclosed in papery coverings.",
        uses: "Ashwagandha roots and other plant parts are used in traditional Ayurvedic preparations and are also studied in scientific research. Herbal products can have side effects and interactions, so they should not be used without qualified medical guidance.",
        origin: "Ashwagandha is native to parts of India, the Middle East and Africa. It grows in dry and warm environments.",
        facts: [
            "Ashwagandha is also called Indian winter cherry.",
            "Its scientific name is Withania somnifera.",
            "It belongs to the Solanaceae, or nightshade, family.",
            "Its fruits are orange-red when mature.",
            "It is traditionally associated with Ayurveda."
        ]
    }
};


/* =========================================
   GET WEBSITE ELEMENTS
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
   Changes automatically each day.
========================================= */

function setupPlantOfTheDay() {
    const plants = Object.keys(plantInformation);
    const today = new Date();

    const todayNumber = Math.floor(
        Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86400000
    );

    const startNumber = Math.floor(Date.UTC(2026, 0, 1) / 86400000);
    const daysPassed = todayNumber - startNumber;
    const index = ((daysPassed % plants.length) + plants.length) % plants.length;

    const plantName = plants[index];
    const plant = plantInformation[plantName];
    const welcome = document.querySelector(".welcome-section");

    if (!welcome || !plant) return;

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
            }

            #plantOfTheDay .daily-plant-name {
                font-size: 30px;
                line-height: 1.25;
                font-weight: 750;
                margin: 0 0 10px;
                color: #304638;
                overflow-wrap: anywhere;
            }

            #plantOfTheDay .daily-plant-scientific {
                font-size: 19px;
                line-height: 1.5;
                margin: 0 0 12px;
                color: #465b4b;
                overflow-wrap: anywhere;
            }

            #plantOfTheDay .daily-plant-description {
                font-size: 17px;
                line-height: 1.7;
                margin: 0;
                color: #526458;
                overflow-wrap: anywhere;
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
        <p class="daily-plant-label">TODAY'S FEATURED PLANT</p>
        <h2 class="daily-plant-name">${plantName}</h2>
        <p class="daily-plant-scientific"><em>${plant.scientific}</em></p>
        <p class="daily-plant-description">${plant.overview}</p>
    `;

    card.classList.toggle(
        "dark-mode",
        document.body.classList.contains("dark-mode")
    );
}


/* =========================================
   FULL-PAGE DARK MODE
========================================= */

function setupTheme() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    let button = document.getElementById("themeToggle");

    if (!button) {
        button = document.createElement("button");
        button.id = "themeToggle";
        button.type = "button";
        header.appendChild(button);
    }

    if (!document.getElementById("fullDarkModeStyles")) {
        const style = document.createElement("style");
        style.id = "fullDarkModeStyles";

        style.textContent = `
            html.dark-mode {
                background: #17251d !important;
                color-scheme: dark;
            }

            body.dark-mode {
                background: #17251d !important;
                background-image: none !important;
                color: #e5eee7 !important;
            }

            body.dark-mode main,
            body.dark-mode .container {
                background: transparent !important;
                color: #e5eee7 !important;
            }

            body.dark-mode .welcome-section,
            body.dark-mode .upload-card,
            body.dark-mode .result-card,
            body.dark-mode .information-card,
            body.dark-mode .card {
                background: #26382e !important;
                color: #e5eee7 !important;
                border-color: #405748 !important;
            }

            body.dark-mode #plantOfTheDay {
                background: #26382e !important;
                color: #e5eee7 !important;
                border-color: #405748 !important;
            }

            body.dark-mode #plantOfTheDay * {
                color: #e5eee7 !important;
            }

            body.dark-mode h1,
            body.dark-mode h2,
            body.dark-mode h3,
            body.dark-mode h4,
            body.dark-mode p,
            body.dark-mode li,
            body.dark-mode label,
            body.dark-mode span {
                color: #e5eee7;
            }

            body.dark-mode .site-header {
                background: linear-gradient(135deg,#183c2c,#285b40) !important;
                color: #ffffff !important;
            }

            body.dark-mode .site-footer,
            body.dark-mode .note-section {
                background: #203329 !important;
                color: #dce9df !important;
                border-color: #405748 !important;
            }

            body.dark-mode input,
            body.dark-mode textarea,
            body.dark-mode select {
                background: #34483a !important;
                color: #ffffff !important;
                border-color: #607967 !important;
            }

            body.dark-mode input::placeholder,
            body.dark-mode textarea::placeholder {
                color: #c1d0c4 !important;
            }

            body.dark-mode #previewBox {
                background: #304638 !important;
            }

            body.dark-mode hr {
                border-color: #607967 !important;
            }

            body.dark-mode #modelStatus,
            body.dark-mode #fileStatus,
            body.dark-mode #categoryStatus,
            body.dark-mode #copyStatus {
                color: #c5ddca !important;
            }

            #themeToggle {
                display: block;
                margin: 15px auto 0;
                padding: 12px 22px;
                border: 1px solid rgba(255,255,255,0.35);
                border-radius: 16px;
                background: rgba(255,255,255,0.18);
                color: white;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
            }
        `;

        document.head.appendChild(style);
    }

    function applyTheme(dark) {
        document.documentElement.classList.toggle("dark-mode", dark);
        document.body.classList.toggle("dark-mode", dark);

        button.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";

        localStorage.setItem("plantExplorerDarkMode", dark ? "true" : "false");
    }

    applyTheme(localStorage.getItem("plantExplorerDarkMode") === "true");

    button.addEventListener("click", function() {
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

        modelStatus.textContent = "AI model is ready. Upload an image.";
        classifyButton.disabled = !selectedImage;

    } catch (error) {
        console.error(error);
        modelStatus.textContent = "Unable to load the AI model. Please refresh and try again.";
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
        predictions.sort((a, b) => b.probability - a.probability);

        predictionsBox.innerHTML = "";

        predictions.forEach(prediction => {
            const percentage = (prediction.probability * 100).toFixed(1);
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
        categoryStatus.textContent = "Top prediction: " + currentPlant;
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
   HORIZONTAL VOICE NARRATION CONTROLS
========================================= */

function setupSpeechControls() {
    speechSynthesis.cancel();

    const textToRead = informationBox.innerText;
    const controls = document.createElement("div");

    controls.className = "speech-controls";

    controls.style.cssText = `
        display:flex !important;
        flex-direction:row !important;
        flex-wrap:nowrap !important;
        align-items:center !important;
        justify-content:space-between !important;
        gap:8px !important;
        width:100% !important;
        max-width:100% !important;
        box-sizing:border-box !important;
        margin:25px 0 !important;
        padding:0 !important;
        clear:both !important;
    `;

    controls.innerHTML = `
        <button id="pauseButton" type="button">⏸ Pause</button>
        <button id="resumeButton" type="button">▶ Resume</button>
        <button id="stopButton" type="button">⏹ Stop</button>
    `;

    controls.querySelectorAll("button").forEach(button => {
        button.style.cssText = `
            display:flex !important;
            flex:1 1 0 !important;
            min-width:0 !important;
            width:0 !important;
            align-items:center !important;
            justify-content:center !important;
            white-space:nowrap !important;
            padding:13px 4px !important;
            margin:0 !important;
            border:none !important;
            border-radius:15px !important;
            background:linear-gradient(135deg,#39775a,#20543d) !important;
            color:white !important;
            font-size:clamp(12px,3.3vw,16px) !important;
            font-weight:700 !important;
            line-height:1.3 !important;
            cursor:pointer !important;
            box-sizing:border-box !important;
        `;
    });

    informationBox.appendChild(controls);

    document.getElementById("pauseButton").addEventListener("click", () => {
        if (speechSynthesis.speaking) speechSynthesis.pause();
    });

    document.getElementById("resumeButton").addEventListener("click", () => {
        if (speechSynthesis.paused) speechSynthesis.resume();
    });

    document.getElementById("stopButton").addEventListener("click", () => {
        speechSynthesis.cancel();
    });

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
            <p>Detailed information for this category is not available yet.</p>
            <p>Please verify the AI prediction using a reliable plant identification source.</p>
            <hr>
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
        <h2>🌿 ${plantName}</h2>

        <h3>🔬 Scientific Name</h3>
        <p><em>${plant.scientific}</em></p>

        <h3>📖 Overview</h3>
        <p>${plant.overview}</p>

        <h3>🍃 Key Characteristics</h3>
        <p>${plant.characteristics}</p>

        <h3>🌱 Uses</h3>
        <p>${plant.uses}</p>

        <h3>🌍 Origin and History</h3>
        <p>${plant.origin}</p>

        <h3>✨ Interesting Facts</h3>
        <ul>
            ${plant.facts.map(fact => `<li>${fact}</li>`).join("")}
        </ul>

        <hr>

        <p style="font-size:13px;color:#718174;margin-top:20px;line-height:1.7;">
            <strong>Educational Disclaimer:</strong>
            This information is for educational purposes only and is not medical advice.
            Plant identification may be incorrect. Do not consume or use a plant for
            treatment based only on this website. Consult a qualified healthcare
            professional before using medicinal plants.
        </p>
    `;

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
        copyStatus.textContent = "Information copied successfully.";
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

    const url = "https://chatgpt.com/?q=" + encodeURIComponent(prompt);

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
