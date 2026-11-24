/* =========================================
   MEDICINAL PLANTS EXPLORER
   COMPLETE APPLICATION
========================================= */

const MODEL_URL =
"https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = null;
let currentPlant = null;
let cameraStream = null;
let speechUtterance = null;
let storyTimer = null;

/* =========================================
   PLANT INFORMATION
========================================= */

const plantInformation = {

"Mint":{
scientific:"Mentha",
overview:"Mint is a popular aromatic herb known for its refreshing smell and cooling taste. It is widely grown in gardens and cultivated for its fragrant leaves.",
characteristics:"Mint has green fragrant leaves, usually arranged in opposite pairs. It may spread through underground stems and produces small flowers.",
uses:"Mint is commonly used in chutneys, salads, soups, desserts, beverages, toothpaste and fragrance products.",
origin:"Different mint species are native to regions of Europe, Asia and Africa.",
facts:["Mint belongs to the Lamiaceae family.","Its aroma comes from natural aromatic compounds.","Peppermint and spearmint are well-known types.","Mint can spread through underground stems.","Mint leaves are commonly used in herbal tea."]
},

"Turmeric":{
scientific:"Curcuma longa",
overview:"Turmeric is a tropical herb famous for its yellow-orange underground rhizome. It is an important spice in Indian cooking.",
characteristics:"It produces broad green leaves and thick underground rhizomes. The plant may grow around one metre tall.",
uses:"Turmeric is used in curries, rice dishes, soups, food colouring and some cosmetic products.",
origin:"Turmeric is native to tropical South Asia.",
facts:["It belongs to the ginger family.","Its scientific name is Curcuma longa.","Curcumin gives turmeric its yellow colour.","The commonly used part is an underground rhizome.","India is a major turmeric producer."]
},

"Tulsi":{
scientific:"Ocimum tenuiflorum",
overview:"Tulsi, also called holy basil, is an aromatic herb important in Indian culture and traditional practices.",
characteristics:"It has branching stems, fragrant oval leaves and small flowers arranged on upright flower spikes.",
uses:"Tulsi is used in herbal teas, food preparations, gardens and fragrance products.",
origin:"Tulsi is native to the Indian subcontinent and nearby tropical regions.",
facts:["Tulsi is commonly called holy basil.","It belongs to the Lamiaceae family.","Its leaves have an aromatic smell.","Rama and Krishna Tulsi are known varieties.","It is commonly grown in Indian households."]
},

"Neem":{
scientific:"Azadirachta indica",
overview:"Neem is an evergreen tree widely known in South Asia. It is commonly planted in gardens, farms and along roads.",
characteristics:"Neem has a spreading crown and compound leaves with many narrow leaflets. It produces small white flowers and oval fruits.",
uses:"Neem is used in soaps, shampoos, skincare products and some agricultural products. The tree also provides shade.",
origin:"Neem is native to the Indian subcontinent and surrounding regions.",
facts:["Neem belongs to the Meliaceae family.","Its leaves have a bitter taste.","Neem can tolerate relatively dry conditions.","Its seeds are a source of neem oil.","Neem trees are commonly planted for shade."]
},

"Garlic":{
scientific:"Allium sativum",
overview:"Garlic is a bulb-forming plant cultivated for its strong flavour and aroma.",
characteristics:"It grows from an underground bulb containing several cloves and produces long narrow leaves.",
uses:"Garlic is used in curries, soups, sauces, pickles and seasoning mixtures.",
origin:"Garlic has a long history of cultivation in Central Asia and surrounding regions.",
facts:["Garlic belongs to the Amaryllidaceae family.","A bulb contains several cloves.","Its smell develops when cloves are crushed.","Garlic is related to onions and leeks.","It has been cultivated for thousands of years."]
},

"Curry":{
scientific:"Murraya koenigii",
overview:"The curry leaf plant is an aromatic tree or shrub valued for its fragrant leaves.",
characteristics:"It has compound leaves with several small leaflets, white flowers and dark berry-like fruits.",
uses:"Curry leaves are used in dals, curries, chutneys and seasoning mixtures.",
origin:"The plant is native to the Indian subcontinent and nearby regions.",
facts:["Its scientific name is Murraya koenigii.","Curry leaves are different from curry powder.","It belongs to the Rutaceae family.","Its leaves are popular in South Indian cooking.","It can grow into a small tree."]
},

"Rosemary":{
scientific:"Salvia rosmarinus",
overview:"Rosemary is an aromatic evergreen shrub known for its strong fragrance and needle-like leaves.",
characteristics:"It has narrow firm leaves and small blue, purple, pink or white flowers.",
uses:"Rosemary is used in cooking, fragrances, soaps and personal-care products.",
origin:"Rosemary is native to the Mediterranean region.",
facts:["Rosemary belongs to the Lamiaceae family.","Its leaves have a pine-like aroma.","It is evergreen.","Bees visit its flowers.","Its modern scientific name is Salvia rosmarinus."]
},

"Lavender":{
scientific:"Lavandula",
overview:"Lavender is a fragrant flowering plant famous for its purple flower spikes.",
characteristics:"It usually has narrow grey-green leaves and clusters of purple or violet flowers.",
uses:"Lavender is used in perfumes, soaps, scented candles and decorative arrangements.",
origin:"Many lavender species are native to the Mediterranean region and nearby areas.",
facts:["Lavender belongs to the Lamiaceae family.","Its flowers are often purple.","Its fragrance comes from natural oils.","It attracts pollinators.","It is cultivated for fragrance products."]
},

"Chamomile":{
scientific:"Matricaria chamomilla",
overview:"Chamomile is a flowering herb known for its small daisy-like flowers.",
characteristics:"It has delicate divided leaves and flowers with white petals around a yellow centre.",
uses:"Dried flower heads are commonly used in herbal teas and some cosmetic products.",
origin:"Chamomile species are native to Europe and parts of western Asia.",
facts:["Chamomile belongs to the Asteraceae family.","Its flowers resemble small daisies.","Its dried flower heads are used for tea.","It is an annual herb in many conditions.","It is cultivated in several regions."]
},

"Aamla":{
scientific:"Phyllanthus emblica",
overview:"Amla, also called Indian gooseberry, is a tree that produces round sour fruits.",
characteristics:"It has small leaves arranged along branchlets and round greenish-yellow fruits.",
uses:"Amla is used in pickles, juices, preserves, candies and some hair-care products.",
origin:"Amla is native to tropical and subtropical Asia, including India.",
facts:["Amla is also called Indian gooseberry.","Its scientific name is Phyllanthus emblica.","Its fruit contains vitamin C.","It has a sour taste.","It belongs to the Phyllanthaceae family."]
},

"Brahmi":{
scientific:"Bacopa monnieri",
overview:"Brahmi is a small creeping herb often found in wet and marshy environments.",
characteristics:"It has creeping stems, small fleshy leaves and tiny pale flowers.",
uses:"Brahmi is used in traditional preparations and botanical research.",
origin:"It occurs in tropical and subtropical areas across several continents.",
facts:["Brahmi is a creeping herb.","It often grows in damp places.","Its leaves are small and fleshy.","Its scientific name is Bacopa monnieri.","The common name Brahmi can refer to different plants."]
},

"Moringa":{
scientific:"Moringa oleifera",
overview:"Moringa is a fast-growing tree known as the drumstick tree.",
characteristics:"It has compound leaves with small leaflets, pale flowers and long seed pods.",
uses:"Its leaves and immature pods are used in various vegetable dishes.",
origin:"Moringa is native to the Indian subcontinent.",
facts:["It is called the drumstick tree.","Its scientific name is Moringa oleifera.","Its leaves contain nutrients.","Its long pods are used as vegetables.","It belongs to the Moringaceae family."]
},

"Lemongrass":{
scientific:"Cymbopogon citratus",
overview:"Lemongrass is a tropical grass known for its fresh lemon-like aroma.",
characteristics:"It forms clumps of long narrow leaves with sharp edges.",
uses:"It is used in soups, curries, teas and fragrance products.",
origin:"It is associated with tropical South and Southeast Asia.",
facts:["It belongs to the Poaceae family.","Its aroma resembles lemon.","It is used in Southeast Asian cooking.","Its leaves are long and narrow.","Its oil is used in fragrance products."]
},

"Eucalyptus":{
scientific:"Eucalyptus globulus",
overview:"Eucalyptus is a group of trees and shrubs known for their aromatic leaves.",
characteristics:"Many species have long leathery leaves, distinctive bark and woody seed capsules.",
uses:"Eucalyptus trees are grown for timber, paper and some fragrance products.",
origin:"Most eucalyptus species are native to Australia.",
facts:["Most species are native to Australia.","Some eucalyptus trees grow very tall.","Their leaves contain aromatic oils.","Koalas feed on certain eucalyptus leaves.","It belongs to the Myrtaceae family."]
},

"Cinnamon":{
scientific:"Cinnamomum verum",
overview:"Cinnamon is an aromatic spice obtained from the inner bark of certain trees.",
characteristics:"Its inner bark is harvested and dried into curled sticks.",
uses:"It is used in desserts, drinks, curries and spice mixtures.",
origin:"True cinnamon is native to Sri Lanka.",
facts:["Cinnamon comes from inner bark.","True cinnamon is Cinnamomum verum.","It is sold as sticks and powder.","It has a warm aroma.","It has been traded for centuries."]
},

"Clove":{
scientific:"Syzygium aromaticum",
overview:"Clove is a spice made from the dried unopened flower buds of a tropical tree.",
characteristics:"The tree has aromatic leaves. Its flower buds change colour before harvesting.",
uses:"Cloves are used in curries, rice dishes, baked foods and fragrance products.",
origin:"Clove trees are native to the Maluku Islands of Indonesia.",
facts:["Cloves are dried flower buds.","Its scientific name is Syzygium aromaticum.","It belongs to the Myrtaceae family.","Clove oil contains eugenol.","Cloves were historically valuable in trade."]
},

"Hibiscus":{
scientific:"Hibiscus rosa-sinensis",
overview:"Hibiscus is a flowering shrub famous for its large colourful flowers.",
characteristics:"It has broad green leaves and prominent flowers with five petals and a central column.",
uses:"It is grown in gardens and used in certain food and cosmetic products.",
origin:"It is widely cultivated in tropical regions; its exact original native range is uncertain.",
facts:["Hibiscus belongs to the Malvaceae family.","Its flowers have different colours.","It has a prominent central column.","Some species are used for herbal tea.","It is widely grown as an ornamental plant."]
},

"Gotu Kola":{
scientific:"Centella asiatica",
overview:"Gotu Kola is a small creeping herb also known as Indian pennywort.",
characteristics:"It has thin creeping stems and rounded or fan-shaped leaves on long stalks.",
uses:"It is used in some regional foods and traditional preparations.",
origin:"It occurs in tropical and subtropical regions of Asia and elsewhere.",
facts:["It is also called Indian pennywort.","Its scientific name is Centella asiatica.","Its leaves are fan-shaped.","It commonly grows in moist environments.","It belongs to the Apiaceae family."]
},

"Aloevera":{
scientific:"Aloe vera",
overview:"Aloe vera is a succulent plant known for its thick leaves containing clear gel.",
characteristics:"It grows in a rosette pattern, with pointed fleshy leaves and small teeth along their edges.",
uses:"Its gel is used as an ingredient in some moisturizers, lotions and personal-care products.",
origin:"It is believed to have originated in the Arabian Peninsula.",
facts:["Aloe vera is a succulent.","It stores water in thick leaves.","Its leaves contain clear inner gel.","It is adapted to dry environments.","It belongs to the Asphodelaceae family."]
},

"Ginger":{
scientific:"Zingiber officinale",
overview:"Ginger is a tropical flowering plant cultivated mainly for its aromatic underground rhizome.",
characteristics:"It has branching underground rhizomes and upright leafy shoots.",
uses:"It is used in curries, soups, sauces, sweets and beverages.",
origin:"Ginger is believed to have originated in Southeast Asia.",
facts:["It belongs to the Zingiberaceae family.","The commonly used part is a rhizome.","It is related to turmeric.","It can be used fresh or dried.","It has been traded for centuries."]
},

"Ashwagandha":{
scientific:"Withania somnifera",
overview:"Ashwagandha is a small shrub with a long history in Ayurvedic traditions.",
characteristics:"It has oval leaves, small greenish flowers and orange-red berries enclosed in papery coverings.",
uses:"Its roots and other plant parts appear in traditional preparations and scientific research. This is educational information, not a recommendation to use the plant.",
origin:"It is native to parts of India, the Middle East and Africa.",
facts:["It is also called Indian winter cherry.","Its scientific name is Withania somnifera.","It belongs to the Solanaceae family.","Its fruits are orange-red when mature.","It is associated with Ayurveda."]
}

};

/* =========================================
   PLANT ALIASES
========================================= */

function normalizePlantName(label) {

    const name = String(label || "").trim().toLowerCase();

    const aliases = {
        "mint":"Mint",
        "turmeric":"Turmeric",
        "tulsi":"Tulsi",
        "holy basil":"Tulsi",
        "neem":"Neem",
        "garlic":"Garlic",
        "curry":"Curry",
        "curry leaves":"Curry",
        "curry leaf":"Curry",
        "rosemary":"Rosemary",
        "lavender":"Lavender",
        "chamomile":"Chamomile",
        "aamla":"Aamla",
        "amla":"Aamla",
        "indian gooseberry":"Aamla",
        "brahmi":"Brahmi",
        "moringa":"Moringa",
        "drumstick":"Moringa",
        "lemongrass":"Lemongrass",
        "lemon grass":"Lemongrass",
        "eucalyptus":"Eucalyptus",
        "cinnamon":"Cinnamon",
        "clove":"Clove",
        "hibiscus":"Hibiscus",
        "gotu kola":"Gotu Kola",
        "gotukola":"Gotu Kola",
        "aloevera":"Aloevera",
        "aloe vera":"Aloevera",
        "ginger":"Ginger",
        "ashwagandha":"Ashwagandha"
    };

    return aliases[name] || null;
}

/* =========================================
   STORY DATA
   UNIQUE HEALTH EDUCATION TOPICS
========================================= */

const storyData = {

"Mint":{
topic:"Mint and digestive-health education",
condition:"Digestive discomfort",
problem:"A student is learning about digestive discomfort and why it can happen.",
traditional:"Mint has a history of use in traditional food and herbal practices. Its fragrant leaves are commonly used in meals and refreshing drinks.",
after:"The student learns about balanced food habits and why persistent digestive symptoms should be discussed with a healthcare professional.",
note:"Traditional use does not prove that mint treats digestive disorders."
},

"Turmeric":{
topic:"Turmeric and skin-health education",
condition:"Skin irritation",
problem:"A person notices a skin concern and wants to understand traditional plant knowledge.",
traditional:"Turmeric has a long history in Indian food and cultural practices, including some traditional skin-care practices.",
after:"The person learns that skin concerns can have different causes and that reliable medical advice is important.",
note:"Turmeric is not established as a treatment for skin diseases."
},

"Tulsi":{
topic:"Tulsi and respiratory-health education",
condition:"Cough and cold",
problem:"A student learns about common respiratory illnesses and why people sometimes develop a cough or cold.",
traditional:"Tulsi is mentioned in several traditional Indian practices and is commonly used in household herbal preparations.",
after:"The student learns about respiratory health and the importance of appropriate medical care when symptoms are serious or persistent.",
note:"Traditional use does not establish that Tulsi cures respiratory infections."
},

"Neem":{
topic:"Neem and traditional skin-care knowledge",
condition:"Chickenpox",
problem:"A person has chickenpox and their family is learning about the illness and how it spreads.",
traditional:"Neem has a history of use in South Asian traditional practices, including some skin-care traditions.",
after:"The family learns that chickenpox requires appropriate healthcare guidance and that preventing its spread involves established public-health measures.",
note:"Neem is not proven to cure chickenpox, prevent its spread or stop it from worsening. It should not replace medical care."
},

"Garlic":{
topic:"Garlic and heart-health education",
condition:"Heart-health awareness",
problem:"A student is learning why maintaining heart health is important.",
traditional:"Garlic has a long history in food traditions and has also been investigated in scientific research.",
after:"The student learns about balanced nutrition, physical activity and regular medical check-ups.",
note:"Garlic is food, not a replacement for prescribed heart medication or medical treatment."
},

"Curry":{
topic:"Curry leaves and digestive-health awareness",
condition:"Digestive discomfort",
problem:"A student is learning about digestion and the importance of a balanced diet.",
traditional:"Curry leaves are widely used in Indian food traditions and appear in some traditional preparations.",
after:"The student learns about healthy eating habits and when digestive symptoms should be discussed with a healthcare professional.",
note:"Traditional use does not establish that curry leaves treat digestive disorders."
},

"Rosemary":{
topic:"Rosemary and memory research",
condition:"Memory and concentration",
problem:"A student is finding it difficult to concentrate while studying.",
traditional:"Rosemary has a history of culinary and fragrance use. Researchers have also investigated its aromatic compounds.",
after:"The student learns about sleep, study habits and the many factors that influence concentration.",
note:"Rosemary is not a proven treatment for memory problems."
},

"Lavender":{
topic:"Lavender and relaxation traditions",
condition:"Stress",
problem:"A student feels stressed because of school responsibilities.",
traditional:"Lavender has a long history in fragrance traditions and is used in some relaxation-related products.",
after:"The student learns about healthy ways of managing stress, including rest, supportive conversations and appropriate help.",
note:"Lavender fragrance is not a substitute for mental-health care."
},

"Chamomile":{
topic:"Chamomile and traditional tea culture",
condition:"Sleep difficulties",
problem:"A student is learning about the importance of healthy sleep.",
traditional:"Chamomile flowers have a history of use in herbal tea traditions.",
after:"The student learns about regular sleep routines and the importance of seeking help for persistent sleep difficulties.",
note:"Traditional tea use does not establish that chamomile treats sleep disorders."
},

"Aamla":{
topic:"Amla and nutritional health",
condition:"Vitamin C awareness",
problem:"A student is learning why vitamin C is an important nutrient.",
traditional:"Amla is a fruit containing vitamin C and is used in many Indian food traditions.",
after:"The student learns about varied diets and different food sources of essential nutrients.",
note:"Amla is a food, not a substitute for professional diagnosis or treatment of a deficiency."
},

"Brahmi":{
topic:"Brahmi and memory-related research",
condition:"Memory concerns",
problem:"A student is researching why memory and learning are important.",
traditional:"Brahmi has a history in traditional Indian botanical knowledge and has also been studied by researchers.",
after:"The student learns about memory, sleep, learning habits and the importance of checking scientific evidence.",
note:"Traditional use does not establish that Brahmi treats memory disorders."
},

"Moringa":{
topic:"Moringa and nutritional awareness",
condition:"Nutritional health",
problem:"A student is learning how a balanced diet supports normal growth and health.",
traditional:"Moringa leaves and pods are used as vegetables and contribute nutrients to meals.",
after:"The student learns why a varied diet is important and why nutritional concerns should be assessed properly.",
note:"Moringa is a food plant, not a replacement for treatment of nutritional deficiencies."
},

"Lemongrass":{
topic:"Lemongrass and digestive-health traditions",
condition:"Digestive discomfort",
problem:"A person is learning about digestion and different food traditions.",
traditional:"Lemongrass is used in several regional food traditions and is known for its lemon-like aroma.",
after:"The person learns about balanced eating and when persistent digestive symptoms need medical attention.",
note:"Traditional use does not prove that lemongrass treats digestive disorders."
},

"Eucalyptus":{
topic:"Eucalyptus and respiratory-health education",
condition:"Breathing difficulties",
problem:"A student learns why breathing problems should be taken seriously.",
traditional:"Eucalyptus leaves are known for aromatic compounds and have a history of use in some traditional practices.",
after:"The student learns that breathing difficulties require appropriate healthcare rather than relying on plant products.",
note:"Eucalyptus oil can be hazardous if misused. This story does not recommend consuming or applying it."
},

"Cinnamon":{
topic:"Cinnamon and blood-sugar awareness",
condition:"Diabetes awareness",
problem:"A student is learning about blood sugar and why the body needs to regulate it.",
traditional:"Cinnamon is a widely used spice and has also been investigated in scientific research related to blood sugar.",
after:"The student learns about diabetes awareness and the importance of professional medical care.",
note:"Cinnamon is not a replacement for prescribed diabetes medication or treatment."
},

"Clove":{
topic:"Clove and dental-health awareness",
condition:"Toothache",
problem:"A person experiences tooth discomfort and learns why dental problems should not be ignored.",
traditional:"Clove has a history in food and traditional practices. Its aromatic compound eugenol has been studied in dentistry.",
after:"The person learns why a dentist should assess persistent tooth pain and identify its cause.",
note:"Clove oil can irritate tissues and should not be used as a substitute for dental care."
},

"Hibiscus":{
topic:"Hibiscus and skin-health education",
condition:"Skin irritation",
problem:"A student is learning that skin irritation can have many different causes.",
traditional:"Hibiscus is used in some traditional personal-care practices and is widely grown for its flowers.",
after:"The student learns about skin care and why persistent or severe irritation needs professional advice.",
note:"Traditional use does not establish that hibiscus treats skin diseases."
},

"Gotu Kola":{
topic:"Gotu Kola and traditional botanical knowledge",
condition:"Skin-health awareness",
problem:"A student is exploring plants mentioned in traditional skin-care practices.",
traditional:"Gotu Kola appears in some regional food traditions and traditional botanical preparations.",
after:"The student learns to distinguish traditional plant knowledge from proven medical treatments.",
note:"Traditional use is not proof that Gotu Kola treats skin conditions."
},

"Aloevera":{
topic:"Aloe vera and personal-care products",
condition:"Skin-care awareness",
problem:"A student is learning about ingredients used in personal-care products.",
traditional:"Aloe vera gel is used as an ingredient in some moisturizers and personal-care products.",
after:"The student learns that skin irritation can have different causes and that appropriate care matters.",
note:"This story does not recommend applying aloe to injuries or skin conditions."
},

"Ginger":{
topic:"Ginger and nausea research",
condition:"Nausea",
problem:"A student is learning about nausea and the different reasons people can experience it.",
traditional:"Ginger is widely used in food traditions and has also been studied in relation to nausea.",
after:"The student learns that persistent nausea can have different causes and may require professional assessment.",
note:"Ginger is not a replacement for medical evaluation or treatment."
},

"Ashwagandha":{
topic:"Ashwagandha and stress research",
condition:"Stress and sleep difficulties",
problem:"A student is learning about stress and the importance of healthy sleep.",
traditional:"Ashwagandha has a long history in Ayurveda and is also being studied by modern researchers.",
after:"The student learns about healthy sleep habits, stress management and the importance of discussing health concerns with a professional.",
note:"Ashwagandha products can have risks and interactions. This story does not recommend taking them."
}

};

/* =========================================
   ENVIRONMENTAL DATA
========================================= */

const disappearanceData = {};

Object.keys(plantInformation).forEach(plant => {

    disappearanceData[plant] = {
        preview:"Explore how the disappearance of this plant could affect nature and people.",

        details:
        plant + " is part of plant diversity and has ecological, cultural or agricultural importance. " +
        "Its disappearance could affect the people, organisms and industries that depend on it. " +
        "The actual effects would depend on the location and the surrounding ecosystem."
    };

});

/* =========================================
   BOTANICAL ANATOMY DATA
========================================= */

const anatomyData = {

"Mint":[
["Leaves","🌿","The opposite green leaves contain aromatic glands."],
["Stem","🌱","The soft stem supports the leaves and may spread along the ground."],
["Roots","🌱","Roots absorb water and minerals and anchor the plant."],
["Flowers","🌸","Small flowers grow in clusters and attract visiting insects."]
],

"Turmeric":[
["Leaves","🍃","Broad leaves grow above the ground and capture sunlight."],
["Rhizome","🟠","The thick underground stem stores food and produces new shoots."],
["Roots","🌱","Roots grow from the underground rhizome and absorb water."],
["Flowers","🌼","Flower structures grow on a separate flowering shoot."]
],

"Tulsi":[
["Leaves","🌿","Aromatic leaves grow in opposite pairs."],
["Stem","🌱","The branching stem supports leaves and flowers."],
["Roots","🌱","Roots anchor the plant and absorb water."],
["Flower spike","🌸","Small flowers are arranged along upright spikes."]
],

"Neem":[
["Leaflets","🍃","Many narrow leaflets form a compound leaf."],
["Branch","🌳","Branches support the crown and spread outward."],
["Trunk","🪵","The woody trunk supports the tree."],
["Fruit","🫒","The tree produces oval fruits containing seeds."]
],

"Garlic":[
["Leaves","🌿","Long narrow leaves grow above the ground."],
["Bulb","🧄","The underground bulb contains several cloves."],
["Cloves","🧄","Individual sections of the bulb can develop into new plants."],
["Roots","🌱","Fibrous roots grow from the base of the bulb."]
],

"Curry":[
["Leaflets","🍃","Several small leaflets form one compound leaf."],
["Stem","🌱","The woody stem supports the leaves."],
["Roots","🌱","Roots absorb water and minerals."],
["Flowers","🌼","Small white flowers grow in clusters."]
],

"Rosemary":[
["Leaves","🌿","Narrow leaves contain aromatic glands."],
["Stem","🌱","Woody stems support the evergreen shrub."],
["Roots","🌱","Roots anchor the shrub in the soil."],
["Flowers","🌸","Small flowers may be blue, pink, purple or white."]
],

"Lavender":[
["Leaves","🌿","Narrow grey-green leaves grow along the stems."],
["Stem","🌱","Upright stems support the flower spikes."],
["Roots","🌱","Roots anchor the plant and absorb water."],
["Flower spike","💜","Clusters of small flowers form an upright spike."]
],

"Chamomile":[
["Leaves","🌿","Finely divided leaves grow along branching stems."],
["Stem","🌱","The branching stem supports the flowers."],
["Roots","🌱","Roots absorb water and minerals."],
["Flower head","🌼","White ray florets surround a yellow central disc."]
],

"Aamla":[
["Leaves","🍃","Small leaves grow closely along branchlets."],
["Branches","🌳","Branches support the tree crown."],
["Trunk","🪵","The woody trunk provides structural support."],
["Fruit","🟢","Round fruits contain seeds."]
],

"Brahmi":[
["Leaves","🌿","Small fleshy leaves grow in opposite pairs."],
["Creeping stem","🌱","The stem spreads across the ground."],
["Roots","🌱","Roots may develop at stem nodes."],
["Flowers","🌸","Small pale flowers grow near the leaves."]
],

"Moringa":[
["Leaflets","🍃","Many small leaflets form compound leaves."],
["Trunk","🌳","The trunk supports the tree."],
["Roots","🌱","Roots anchor the tree and absorb water."],
["Seed pod","🥒","Long pods develop from flowers and contain seeds."]
],

"Lemongrass":[
["Leaf blades","🌿","Long narrow leaves capture sunlight."],
["Leaf base","🌱","Overlapping leaf bases form a dense clump."],
["Roots","🌱","Fibrous roots anchor the grass."],
["Stem base","🌾","The short basal stem produces new leaves."]
],

"Eucalyptus":[
["Leaves","🍃","Leathery leaves contain aromatic oils."],
["Bark","🪵","The outer bark protects the woody trunk."],
["Trunk","🌳","The trunk supports the tree crown."],
["Seed capsules","🟤","Woody capsules contain seeds."]
],

"Cinnamon":[
["Leaves","🍃","The tree has simple green leaves."],
["Outer bark","🪵","The outer bark protects the trunk."],
["Inner bark","🟤","The inner bark is harvested to produce cinnamon."],
["Trunk","🌳","The woody trunk supports the tree."]
],

"Clove":[
["Leaves","🍃","Aromatic leaves grow on the evergreen tree."],
["Branch","🌳","Branches support leaves and flower clusters."],
["Flower buds","🌺","The unopened flower buds are harvested and dried as cloves."],
["Roots","🌱","Roots anchor the tree and absorb water."]
],

"Hibiscus":[
["Leaves","🍃","Broad leaves capture sunlight."],
["Stem","🌱","The stem supports leaves and flowers."],
["Flower","🌺","Large flowers contain petals and reproductive structures."],
["Roots","🌱","Roots anchor the shrub and absorb water."]
],

"Gotu Kola":[
["Leaves","🍃","Rounded or fan-shaped leaves grow on long stalks."],
["Stolon","🌱","Creeping stems spread across the ground."],
["Roots","🌱","Roots may form at nodes along the creeping stems."],
["Flowers","🌸","Small flowers grow close to the leaves."]
],

"Aloevera":[
["Leaf","🌵","Thick fleshy leaves store water."],
["Leaf gel","💧","The clear inner leaf tissue is commonly called aloe gel."],
["Leaf skin","🌵","The outer green layer protects the leaf."],
["Roots","🌱","Roots anchor the succulent in the soil."]
],

"Ginger":[
["Leaves","🌿","Long narrow leaves grow from upright shoots."],
["Rhizome","🫚","The branching underground stem stores food."],
["Roots","🌱","Roots grow from the rhizome and absorb water."],
["Shoot","🌱","New above-ground stems develop from the rhizome."]
],

"Ashwagandha":[
["Leaves","🍃","Oval leaves grow along branching stems."],
["Stem","🌱","The branching stem supports the shrub."],
["Roots","🌱","The plant has a main root system."],
["Fruit","🟠","Small berries develop inside papery coverings."]
]

};

/* =========================================
   PLANT EMOJIS
========================================= */

const plantEmojis = {

"Mint":"🌿",
"Turmeric":"🟠",
"Tulsi":"🌱",
"Neem":"🌳",
"Garlic":"🧄",
"Curry":"🍃",
"Rosemary":"🌿",
"Lavender":"💜",
"Chamomile":"🌼",
"Aamla":"🟢",
"Brahmi":"🌱",
"Moringa":"🌳",
"Lemongrass":"🌾",
"Eucalyptus":"🌳",
"Cinnamon":"🪵",
"Clove":"🌺",
"Hibiscus":"🌺",
"Gotu Kola":"🍃",
"Aloevera":"🌵",
"Ginger":"🫚",
"Ashwagandha":"🌿"

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

const discoverySection = document.getElementById("discoverySection");

const disappearancePlant = document.getElementById("disappearancePlant");
const disappearancePreview = document.getElementById("disappearancePreview");

const xrayPlant = document.getElementById("xrayPlant");
const xrayPreview = document.getElementById("xrayPreview");

const storyPlant = document.getElementById("storyPlant");
const storyPreview = document.getElementById("storyPreview");

const discoveryModal = document.getElementById("discoveryModal");
const modalContent = document.getElementById("modalContent");

const cameraVideo = document.getElementById("cameraVideo");
const cameraBox = document.getElementById("cameraBox");
const cameraCanvas = document.getElementById("cameraCanvas");

/* =========================================
   SAFE SPEECH CONTROL
========================================= */

function stopSpeech() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }

}

/* =========================================
   STOP CAMERA
========================================= */

function stopCamera() {

    if (cameraStream) {

        cameraStream.getTracks().forEach(track => {
            track.stop();
        });

        cameraStream = null;
    }

    cameraVideo.srcObject = null;
    cameraBox.hidden = true;

}

/* =========================================
   START WEBCAM
========================================= */

document.getElementById("startCamera").addEventListener("click",async function() {

    if (!navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia) {

        fileStatus.textContent =
            "Webcam is not supported by this browser or connection.";

        return;
    }

    try {

        stopCamera();

        cameraStream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:{ideal:"environment"}
            },

            audio:false

        });

        cameraVideo.srcObject = cameraStream;

        cameraBox.hidden = false;

        fileStatus.textContent =
            "Camera is ready. Capture a plant image.";

    } catch(error) {

        console.error(error);

        fileStatus.textContent =
            "Unable to access camera. Please allow camera permission and try again.";

    }

});

/* =========================================
   CAPTURE WEBCAM PHOTO
========================================= */

document.getElementById("capturePhoto").addEventListener("click",function() {

    if (!cameraStream) return;

    const width = cameraVideo.videoWidth;
    const height = cameraVideo.videoHeight;

    if (!width || !height) {

        fileStatus.textContent =
            "Camera is still starting. Please try again.";

        return;
    }

    cameraCanvas.width = width;
    cameraCanvas.height = height;

    const context = cameraCanvas.getContext("2d");

    context.drawImage(
        cameraVideo,
        0,
        0,
        width,
        height
    );

    preview.src = cameraCanvas.toDataURL("image/jpeg",0.92);

    selectedImage = true;
    currentPlant = null;

    previewBox.hidden = false;

    hideDiscoveryFeatures();

    predictionsBox.innerHTML =
        "<p>Tap Identify Image to classify your captured photo.</p>";

    categoryStatus.textContent = "";

    askButton.hidden = true;
    promptBox.hidden = true;

    classifyButton.disabled = !model;

    fileStatus.textContent = "Photo captured successfully.";

    stopCamera();
    stopSpeech();

});

/* =========================================
   STOP CAMERA BUTTON
========================================= */

document.getElementById("stopCamera").addEventListener("click",function() {

    stopCamera();

    fileStatus.textContent = "Camera stopped.";

});

/* =========================================
   PLANT OF THE DAY
========================================= */

function setupPlantOfTheDay() {

    const plants = Object.keys(plantInformation);

    const today = new Date();

    const todayNumber = Math.floor(
        Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        ) / 86400000
    );

    const startNumber = Math.floor(
        Date.UTC(2026,0,1) / 86400000
    );

    const daysPassed = todayNumber - startNumber;

    const index =
        ((daysPassed % plants.length) + plants.length) %
        plants.length;

    const plantName = plants[index];

    const plant = plantInformation[plantName];

    const card = document.getElementById("plantOfTheDay");

    if (!card || !plant) return;

    card.innerHTML = `
        <div class="plant-day-icon">🌿</div>

        <div>
            <p class="plant-day-label">TODAY'S FEATURED PLANT</p>

            <h2>${plantName}</h2>

            <p><em>${plant.scientific}</em></p>

            <p>${plant.overview}</p>
        </div>
    `;

}

/* =========================================
   DARK MODE
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

    let savedTheme = false;

    try {

        savedTheme =
            localStorage.getItem("plantExplorerDarkMode") === "true";

    } catch(error) {

        savedTheme = false;

    }

    function applyTheme(dark) {

        document.documentElement.classList.toggle(
            "dark-mode",
            dark
        );

        document.body.classList.toggle(
            "dark-mode",
            dark
        );

        button.textContent =
            dark ? "☀️ Light Mode" : "🌙 Dark Mode";

        try {

            localStorage.setItem(
                "plantExplorerDarkMode",
                dark ? "true" : "false"
            );

        } catch(error) {

            console.log("Theme preference could not be saved.");

        }

    }

    applyTheme(savedTheme);

    button.addEventListener("click",function() {

        const dark =
            !document.body.classList.contains("dark-mode");

        applyTheme(dark);

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
            "AI model is ready. Upload an image or use your webcam.";

        classifyButton.disabled = !selectedImage;

    } catch(error) {

        console.error(error);

        modelStatus.textContent =
            "Unable to load the AI model. Please refresh and try again.";

    }

}

/* =========================================
   HIDE DISCOVERY FEATURES
========================================= */

function hideDiscoveryFeatures() {

    discoverySection.hidden = true;

    discoveryModal.hidden = true;

    modalContent.innerHTML = "";

    if (storyTimer) {

        clearInterval(storyTimer);

        storyTimer = null;

    }

    document.body.style.overflow = "";

}

/* =========================================
   UPDATE DISCOVERY FEATURES
========================================= */

function updateDiscoveryFeatures(plantName) {

    const plant = normalizePlantName(plantName);

    if (!plant ||
        !disappearanceData[plant] ||
        !anatomyData[plant] ||
        !storyData[plant]) {

        hideDiscoveryFeatures();

        return;
    }

    disappearancePlant.textContent = plant;

    disappearancePreview.textContent =
        disappearanceData[plant].preview;

    xrayPlant.textContent = plant;

    xrayPreview.textContent =
        "Explore the important structures of " +
        plant +
        " through an interactive botanical guide.";

    storyPlant.textContent = plant;

    storyPreview.textContent =
        storyData[plant].topic;

    discoverySection.hidden = false;

}

/* =========================================
   OPEN AND CLOSE MODAL
========================================= */

function openDiscoveryModal(content) {

    if (storyTimer) {

        clearInterval(storyTimer);

        storyTimer = null;

    }

    modalContent.innerHTML = content;

    discoveryModal.hidden = false;

    document.body.style.overflow = "hidden";

    discoveryModal.scrollTop = 0;

    modalContent.scrollTop = 0;

}

function closeDiscoveryModal() {

    discoveryModal.hidden = true;

    document.body.style.overflow = "";

    if (storyTimer) {

        clearInterval(storyTimer);

        storyTimer = null;

    }

}

document.getElementById("closeModal").addEventListener(
    "click",
    closeDiscoveryModal
);

discoveryModal.addEventListener("click",function(event) {

    if (event.target === discoveryModal) {

        closeDiscoveryModal();

    }

});

document.addEventListener("keydown",function(event) {

    if (event.key === "Escape") {

        closeDiscoveryModal();

    }

});

/* =========================================
   FEATURE 1:
   ENVIRONMENTAL EXPLORER
========================================= */

document.getElementById("exploreDisappearance").addEventListener("click",function() {

    const plant = normalizePlantName(currentPlant);

    if (!plant) return;

    const data = disappearanceData[plant];

    openDiscoveryModal(`

        <div class="discovery-icon">🌳</div>

        <div class="discovery-label">
            ENVIRONMENTAL EXPLORER
        </div>

        <h2>What If ${plant} Disappeared?</h2>

        <p>${data.details}</p>

        <h3>🌍 Why Does This Plant Matter?</h3>

        <p>
            Every plant is part of a wider natural and human environment.
            Plants can provide food, shelter, useful materials and resources
            for other organisms.
        </p>

        <h3>💡 Think About It</h3>

        <p>
            How could communities protect plant diversity?
            Growing a variety of native plants and protecting natural
            habitats are important ways to support biodiversity.
        </p>

        <div class="modal-note">
            This is an illustrative educational scenario, not a scientific
            prediction that these changes would definitely occur.
        </div>

    `);

});

/* =========================================
   FEATURE 2:
   PLANT X-RAY EXPLORER
========================================= */

document.getElementById("exploreAnatomy").addEventListener("click",function() {

    const plant = normalizePlantName(currentPlant);

    if (!plant) return;

    const data = anatomyData[plant];

    const buttons = data.map((part,index) => `

        <button
            type="button"
            class="anatomy-part ${index === 0 ? "active" : ""}"
            data-part="${index}">

            ${part[0]}

        </button>

    `).join("");

    openDiscoveryModal(`

        <div class="discovery-icon">🔬</div>

        <div class="discovery-label">
            BOTANICAL DISCOVERY
        </div>

        <h2>${plant} — Plant X-Ray Explorer</h2>

        <p>
            Tap the different plant parts to explore their structures.
        </p>

        <div class="xray-diagram">

            <div class="xray-visual" id="xrayVisual">
                ${data[0][1]}
            </div>

            <strong>${plant}</strong>

            <p class="xray-caption">
                Simplified botanical illustration — not a medical X-ray.
            </p>

        </div>

        <h3>Explore the Plant Parts</h3>

        <div class="anatomy-parts">
            ${buttons}
        </div>

        <div class="anatomy-explanation" id="anatomyExplanation">

            <h3>${data[0][0]}</h3>

            <p>${data[0][2]}</p>

        </div>

        <div class="modal-note">
            This is a simplified educational guide. Plant structures can
            vary between species and varieties.
        </div>

    `);

    const partButtons =
        modalContent.querySelectorAll(".anatomy-part");

    const explanation =
        modalContent.querySelector("#anatomyExplanation");

    const visual =
        modalContent.querySelector("#xrayVisual");

    partButtons.forEach(button => {

        button.addEventListener("click",function() {

            const index = Number(this.dataset.part);

            const selected = data[index];

            partButtons.forEach(item => {
                item.classList.remove("active");
            });

            this.classList.add("active");

            visual.style.animation = "none";

            void visual.offsetWidth;

            visual.style.animation = "";

            visual.textContent = selected[1];

            explanation.innerHTML = `

                <h3>${selected[0]}</h3>

                <p>${selected[2]}</p>

            `;

        });

    });

});

/* =========================================
   FEATURE 3:
   THREE-SCENE ANIMATED PLANT STORY
========================================= */

document.getElementById("exploreStory").addEventListener("click",function() {

    const plant = normalizePlantName(currentPlant);

    if (!plant) return;

    const data = storyData[plant];

    const emoji = plantEmojis[plant] || "🌿";

    openDiscoveryModal(`

        <div class="story-intro">

            <div class="discovery-icon">🎬</div>

            <div class="discovery-label">
                THREE-SCENE ANIMATED STORY
            </div>

            <h2>${plant} — Animated Story</h2>

            <p>${data.topic}</p>

        </div>

        <div class="story-topic">

            <strong>Health education topic:</strong>

            <p>${data.condition}</p>

        </div>

        <div class="story-progress" id="storyProgress">

            <span class="active"></span>

            <span></span>

            <span></span>

        </div>

        <div class="story-triptych">

            <!-- BEFORE -->

            <article class="story-panel active" data-scene="0">

                <span class="story-panel-label">
                    BEFORE
                </span>

                <div class="story-art">

                    <div class="story-character">
                        🧑
                    </div>

                    <div>💭</div>

                </div>

                <h3>The Situation</h3>

                <p>${data.problem}</p>

            </article>

            <!-- PLANT -->

            <article class="story-panel" data-scene="1">

                <span class="story-panel-label">
                    MEDICINAL PLANT
                </span>

                <div class="story-art">

                    <div class="story-plant-art">
                        ${emoji}
                    </div>

                    <div>🌱</div>

                </div>

                <h3>${plant}</h3>

                <p>${data.traditional}</p>

            </article>

            <!-- AFTER -->

            <article class="story-panel" data-scene="2">

                <span class="story-panel-label">
                    AFTER
                </span>

                <div class="story-art">

                    <div class="story-after-art">
                        👩‍🎓
                    </div>

                    <div>📚 🩺</div>

                </div>

                <h3>What We Learn</h3>

                <p>${data.after}</p>

            </article>

        </div>

        <div class="story-status" id="storyStatus" aria-live="polite">
            Scene 1 of 3 — BEFORE
        </div>

        <div class="story-controls">

            <button
                id="storyPlay"
                class="story-play"
                type="button">

                ▶ Play Animation

            </button>

            <button
                id="storyPrevious"
                type="button">

                ← Previous

            </button>

            <button
                id="storyNext"
                type="button">

                Next →

            </button>

            <button
                id="storyRestart"
                type="button">

                ↻ Restart

            </button>

        </div>

        <div class="story-step">

            <h3>🌿 Traditional Plant Knowledge</h3>

            <p>${data.traditional}</p>

        </div>

        <div class="story-step">

            <h3>✨ What We Learn</h3>

            <p>${data.after}</p>

        </div>

        <div class="story-medical-note">

            <strong>Important educational note:</strong>

            <br><br>

            ${data.note}

            <br><br>

            Traditional practices are not automatically proven medical
            treatments. This animation does not recommend self-medication.

        </div>

    `);

    const panels =
        modalContent.querySelectorAll(".story-panel");

    const progress =
        modalContent.querySelectorAll("#storyProgress span");

    const status =
        modalContent.querySelector("#storyStatus");

    const playButton =
        modalContent.querySelector("#storyPlay");

    const previousButton =
        modalContent.querySelector("#storyPrevious");

    const nextButton =
        modalContent.querySelector("#storyNext");

    const restartButton =
        modalContent.querySelector("#storyRestart");

    const sceneNames = [
        "BEFORE",
        "MEDICINAL PLANT",
        "AFTER"
    ];

    let step = 0;

    function showScene(index) {

        step = Math.max(0,Math.min(index,2));

        panels.forEach((panel,i) => {

            panel.classList.toggle(
                "active",
                i === step
            );

        });

        progress.forEach((bar,i) => {

            bar.classList.toggle(
                "active",
                i <= step
            );

        });

        status.textContent =
            "Scene " + (step + 1) +
            " of 3 — " + sceneNames[step];

        previousButton.disabled = step === 0;

        nextButton.disabled = step === 2;

        playButton.textContent =
            step === 2
                ? "▶ Play Again"
                : "▶ Play Animation";

    }

    function stopAnimation() {

        if (storyTimer) {

            clearInterval(storyTimer);

            storyTimer = null;

        }

        playButton.textContent = "▶ Play Animation";

    }

    function nextScene() {

        if (step < 2) {

            showScene(step + 1);

        } else {

            stopAnimation();

        }

    }

    function startAnimation() {

        stopAnimation();

        if (step === 2) {

            showScene(0);

        }

        playButton.textContent = "⏸ Pause Animation";

        storyTimer = setInterval(function() {

            if (step < 2) {

                nextScene();

            } else {

                stopAnimation();

            }

        },4000);

    }

    playButton.addEventListener("click",function() {

        if (storyTimer) {

            stopAnimation();

        } else {

            startAnimation();

        }

    });

    previousButton.addEventListener("click",function() {

        stopAnimation();

        showScene(step - 1);

    });

    nextButton.addEventListener("click",function() {

        stopAnimation();

        showScene(step + 1);

    });

    restartButton.addEventListener("click",function() {

        stopAnimation();

        showScene(0);

    });

    showScene(0);

});

/* =========================================
   IMAGE UPLOAD FROM FILES
========================================= */

fileInput.addEventListener("change",function(event) {

    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        fileStatus.textContent =
            "Please select a valid image.";

        return;

    }

    stopCamera();

    selectedImage = file;

    currentPlant = null;

    hideDiscoveryFeatures();

    const reader = new FileReader();

    reader.onload = function(e) {

        preview.src = e.target.result;

        previewBox.hidden = false;

        fileStatus.textContent =
            "Image selected successfully.";

        classifyButton.disabled = !model;

        predictionsBox.innerHTML =
            "<p>Tap Identify Image to classify your picture.</p>";

        categoryStatus.textContent = "";

        askButton.hidden = true;

        promptBox.hidden = true;

        stopSpeech();

    };

    reader.readAsDataURL(file);

});

/* =========================================
   CLASSIFY IMAGE
========================================= */

classifyButton.addEventListener("click",async function() {

    if (!model || !selectedImage) return;

    classifyButton.disabled = true;

    classifyButton.textContent = "Identifying...";

    predictionsBox.innerHTML =
        "<p>🔍 Analyzing your image...</p>";

    hideDiscoveryFeatures();

    currentPlant = null;

    askButton.hidden = true;

    try {

        const image = new Image();

        image.src = preview.src;

        await new Promise((resolve,reject) => {

            image.onload = resolve;

            image.onerror = reject;

        });

        const predictions = await model.predict(image);

        predictions.sort((a,b) => {
            return b.probability - a.probability;
        });

        predictionsBox.innerHTML = "";

        predictions.forEach(prediction => {

            const percentage =
                (prediction.probability * 100).toFixed(1);

            const row = document.createElement("div");

            row.className = "confidence-item";

            const heading = document.createElement("div");

            heading.className = "confidence-heading";

            const label = document.createElement("span");

            label.textContent = prediction.className;

            const value = document.createElement("span");

            value.textContent = percentage + "%";

            heading.append(label,value);

            const track = document.createElement("div");

            track.className = "confidence-track";

            const fill = document.createElement("div");

            fill.className = "confidence-fill";

            fill.style.width = percentage + "%";

            track.appendChild(fill);

            row.append(heading,track);

            predictionsBox.appendChild(row);

        });

        const bestPrediction = predictions[0];

        currentPlant =
            normalizePlantName(bestPrediction.className);

        if (!currentPlant) {

            categoryStatus.textContent =
                "The top prediction is not a supported plant category.";

            hideDiscoveryFeatures();

            askButton.hidden = true;

            return;

        }

        categoryStatus.textContent =
            "Top prediction: " + currentPlant;

        askButton.hidden = false;

        updateDiscoveryFeatures(currentPlant);

    } catch(error) {

        console.error(error);

        predictionsBox.innerHTML =
            "<p>Something went wrong while identifying the image. Please try again.</p>";

    } finally {

        classifyButton.disabled = false;

        classifyButton.textContent = "🔍 Identify Image";

    }

});

/* =========================================
   VOICE NARRATION
========================================= */

function setupSpeechControls() {

    if (!("speechSynthesis" in window)) {

        return;

    }

    stopSpeech();

    const textToRead = informationBox.innerText;

    const controls = document.createElement("div");

    controls.className = "speech-controls";

    controls.innerHTML = `

        <button id="pauseButton" type="button">
            ⏸ Pause
        </button>

        <button id="resumeButton" type="button">
            ▶ Resume
        </button>

        <button id="stopButton" type="button">
            ⏹ Stop
        </button>

    `;

    informationBox.appendChild(controls);

    controls.querySelector("#pauseButton").addEventListener(
        "click",
        function() {

            if (speechSynthesis.speaking) {
                speechSynthesis.pause();
            }

        }
    );

    controls.querySelector("#resumeButton").addEventListener(
        "click",
        function() {

            if (speechSynthesis.paused) {
                speechSynthesis.resume();
            }

        }
    );

    controls.querySelector("#stopButton").addEventListener(
        "click",
        stopSpeech
    );

    speechUtterance =
        new SpeechSynthesisUtterance(textToRead);

    speechUtterance.lang = "en-IN";

    speechUtterance.rate = 0.9;

    speechSynthesis.speak(speechUtterance);

}

/* =========================================
   DISPLAY PLANT INFORMATION
========================================= */

function displayPlantInformation(plantName) {

    const normalizedName =
        normalizePlantName(plantName);

    const plant =
        plantInformation[normalizedName];

    stopSpeech();

    promptBox.hidden = false;

    if (!plant) {

        informationBox.innerHTML = `

            <h2>${plantName}</h2>

            <p>
                Detailed information for this category is not available yet.
            </p>

            <p>
                Please verify the AI prediction using a reliable source.
            </p>

        `;

        return;

    }

    informationBox.innerHTML = `

        <h2>🌿 ${normalizedName}</h2>

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

        <p class="modal-note">

            Educational information only. This website does not provide
            medical advice or recommend consuming plants for treatment.

        </p>

    `;

    setupSpeechControls();

    promptBox.scrollIntoView({
        behavior:"smooth",
        block:"start"
    });

}

/* =========================================
   GET INFORMATION
========================================= */

askButton.addEventListener("click",function() {

    if (!currentPlant) return;

    displayPlantInformation(currentPlant);

});

/* =========================================
   COPY INFORMATION
========================================= */

copyButton.addEventListener("click",async function() {

    const text = informationBox.innerText;

    try {

        await navigator.clipboard.writeText(text);

        copyStatus.textContent =
            "Information copied successfully.";

    } catch(error) {

        copyStatus.textContent =
            "Copy is unavailable. Please select and copy the text manually.";

    }

});

/* =========================================
   OPEN CHATGPT
========================================= */

chatGPTButton.addEventListener("click",function() {

    const text = informationBox.innerText;

    const prompt =
        "Explain the following plant in a clear educational way. " +
        "Do not give treatment, dosage or self-medication instructions.\n\n" +
        text;

    const url =
        "https://chatgpt.com/?q=" +
        encodeURIComponent(prompt);

    window.open(url,"_blank");

});

/* =========================================
   REMOVE IMAGE AND RESET
========================================= */

removeButton.addEventListener("click",function() {

    stopSpeech();

    stopCamera();

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
        <p>Your classification results will appear here.</p>
    `;

    askButton.hidden = true;

    promptBox.hidden = true;

    informationBox.innerHTML = "";

    hideDiscoveryFeatures();

    window.scrollTo({
        top:0,
        behavior:"smooth"
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
