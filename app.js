/* =========================================
MEDICINAL PLANTS EXPLORER
AI + WEBCAM + THREE DISCOVERY FEATURES
========================================= */

const MODEL_URL =
"https://teachablemachine.withgoogle.com/models/j0LiEqAHw/";

let model = null;
let selectedImage = null;
let currentPlant = null;
let speechUtterance = null;
let cameraStream = null;
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
ENVIRONMENTAL SCENARIOS
========================================= */

const disappearanceData = {

"Mint":{
preview:"Pollinators and gardens could lose one of their familiar flowering herbs.",
details:"Mint flowers can provide nectar and pollen for visiting insects. If mint became uncommon in an area, insects that visit its flowers would have one fewer available food source. Gardens would also lose a familiar aromatic herb."
},

"Turmeric":{
preview:"Farmers and food traditions would lose an important cultivated spice crop.",
details:"Turmeric is important in agricultural communities, spice markets and traditional cuisines. Its disappearance would affect farmers, food processing and the diversity of cultivated crops."
},

"Tulsi":{
preview:"Home gardens and cultural plant traditions would lose a familiar aromatic herb.",
details:"Tulsi is commonly grown in household gardens. Its disappearance could affect garden diversity, cultural traditions and insects that visit its flowers."
},

"Neem":{
preview:"Many places could lose a familiar shade tree and local greenery.",
details:"Neem trees provide shade and form part of urban and rural landscapes. Their disappearance could reduce tree cover in places where they are common. Birds and insects associated with tree habitats could also experience changes."
},

"Garlic":{
preview:"Food systems would lose a widely cultivated bulb crop.",
details:"Garlic is grown by farmers and used in kitchens around the world. Its disappearance would affect crop diversity, agricultural livelihoods, food processing and traditional recipes."
},

"Curry":{
preview:"A familiar food plant and aromatic garden tree would become less common.",
details:"Curry leaf plants are important in home gardens and regional cooking. Their disappearance would affect food traditions and reduce the availability of this plant in local gardens."
},

"Rosemary":{
preview:"Flower-visiting insects would lose one of their familiar garden plants.",
details:"Rosemary flowers are visited by bees and other insects. If rosemary disappeared from an area, pollinators would lose one possible source of nectar and pollen."
},

"Lavender":{
preview:"Gardens would lose a fragrant flowering plant visited by pollinating insects.",
details:"Lavender flowers attract bees and other pollinators. Its disappearance could reduce one source of nectar in gardens and affect the fragrance and ornamental plant industry."
},

"Chamomile":{
preview:"A familiar flowering herb and cultivated crop would be lost.",
details:"Chamomile is grown for its flowers and is visited by insects. Its disappearance could affect growers, herbal tea production and the variety of flowering plants in cultivated areas."
},

"Aamla":{
preview:"Communities would lose an important fruit tree.",
details:"Amla trees provide fruit and contribute to local greenery. Their disappearance could affect fruit growers, food traditions and organisms that use the tree as part of their habitat."
},

"Brahmi":{
preview:"Wetland plant diversity could lose one of its small creeping herbs.",
details:"Brahmi commonly grows in moist habitats. Its disappearance could reduce plant diversity in some wet areas and affect organisms that use these habitats."
},

"Moringa":{
preview:"Farmers and communities would lose a useful tree crop.",
details:"Moringa is grown for its leaves and pods. Its disappearance could affect home gardens, small farms, local food systems and the diversity of useful trees."
},

"Lemongrass":{
preview:"Aromatic grass cultivation and food traditions would be affected.",
details:"Lemongrass is cultivated for its fragrant leaves and oils. Its disappearance could affect farmers, food producers and fragrance industries."
},

"Eucalyptus":{
preview:"Areas that depend on eucalyptus plantations could experience changes.",
details:"Eucalyptus species are used in forestry and paper production. Their disappearance could affect industries and landscapes where they are widely planted. Ecological effects would depend on the location and species."
},

"Cinnamon":{
preview:"A valuable spice crop and part of food traditions would be lost.",
details:"Cinnamon trees are cultivated for their inner bark. Their disappearance would affect growers, spice markets, food businesses and traditional recipes."
},

"Clove":{
preview:"Spice-growing communities would lose an important tropical tree crop.",
details:"Clove trees are cultivated for their unopened flower buds. Their disappearance could affect growers, spice markets, food industries and the availability of this spice."
},

"Hibiscus":{
preview:"Gardens would lose a colourful flowering shrub visited by insects.",
details:"Hibiscus flowers provide resources for some flower-visiting insects. Its disappearance could reduce ornamental plant diversity and affect gardeners and horticultural businesses."
},

"Gotu Kola":{
preview:"Moist habitats would lose one of their familiar creeping plants.",
details:"Gotu Kola grows in moist environments. Its disappearance could change the variety of small plants in these habitats and affect organisms that interact with its leaves and stems."
},

"Aloevera":{
preview:"Dry-climate gardens would lose a familiar water-storing succulent.",
details:"Aloe vera is cultivated in gardens and warm landscapes. Its disappearance would affect ornamental plant collections and products that use its gel as an ingredient."
},

"Ginger":{
preview:"Agriculture and food traditions would lose an important tropical spice crop.",
details:"Ginger is an important crop used in many cuisines. Its disappearance would affect farmers, food producers, spice markets and traditional recipes."
},

"Ashwagandha":{
preview:"A traditional cultivated shrub and part of regional plant diversity would be lost.",
details:"Ashwagandha is cultivated and studied as a botanical species. Its disappearance could affect plant diversity, growers and the study of plants used in traditional systems."
}

};

/* =========================================
BOTANICAL ANATOMY
========================================= */

const anatomyData = {

"Mint":{
parts:[
["Leaves","🌿","The opposite green leaves contain aromatic glands."],
["Stem","🌱","The soft stem supports the leaves and may spread along the ground."],
["Roots","🌱","Roots absorb water and minerals and anchor the plant."],
["Flowers","🌸","Small flowers grow in clusters and attract visiting insects."]
]},

"Turmeric":{
parts:[
["Leaves","🍃","Broad leaves grow above the ground and capture sunlight."],
["Rhizome","🟠","The thick underground stem stores food and produces new shoots."],
["Roots","🌱","Roots grow from the underground rhizome and absorb water."],
["Flowers","🌼","Flower structures grow on a separate flowering shoot."]
]},

"Tulsi":{
parts:[
["Leaves","🌿","Aromatic leaves grow in opposite pairs."],
["Stem","🌱","The branching stem supports leaves and flowers."],
["Roots","🌱","Roots anchor the plant and absorb water."],
["Flower spike","🌸","Small flowers are arranged along upright spikes."]
]},

"Neem":{
parts:[
["Leaflets","🍃","Many narrow leaflets form a compound leaf."],
["Branch","🌳","Branches support the crown and spread outward."],
["Trunk","🪵","The woody trunk supports the tree."],
["Fruit","🫒","The tree produces oval fruits containing seeds."]
]},

"Garlic":{
parts:[
["Leaves","🌿","Long narrow leaves grow above the ground."],
["Bulb","🧄","The underground bulb contains several cloves."],
["Cloves","🧄","Individual sections of the bulb can develop into new plants."],
["Roots","🌱","Fibrous roots grow from the base of the bulb."]
]},

"Curry":{
parts:[
["Leaflets","🍃","Several small leaflets form one compound leaf."],
["Stem","🌱","The woody stem supports the leaves."],
["Roots","🌱","Roots absorb water and minerals."],
["Flowers","🌼","Small white flowers grow in clusters."]
]},

"Rosemary":{
parts:[
["Needle-like leaves","🌿","Narrow leaves contain aromatic glands."],
["Stem","🌱","Woody stems support the evergreen shrub."],
["Roots","🌱","Roots anchor the shrub in the soil."],
["Flowers","🌸","Small flowers may be blue, pink, purple or white."]
]},

"Lavender":{
parts:[
["Leaves","🌿","Narrow grey-green leaves grow along the stems."],
["Stem","🌱","Upright stems support the flower spikes."],
["Roots","🌱","Roots anchor the plant and absorb water."],
["Flower spike","💜","Clusters of small flowers form an upright spike."]
]},

"Chamomile":{
parts:[
["Leaves","🌿","Finely divided leaves grow along branching stems."],
["Stem","🌱","The branching stem supports the flowers."],
["Roots","🌱","Roots absorb water and minerals."],
["Flower head","🌼","White ray florets surround a yellow central disc."]
]},

"Aamla":{
parts:[
["Leaves","🍃","Small leaves grow closely along branchlets."],
["Branches","🌳","Branches support the tree crown."],
["Trunk","🪵","The woody trunk provides structural support."],
["Fruit","🟢","Round fruits contain seeds."]
]},

"Brahmi":{
parts:[
["Leaves","🌿","Small fleshy leaves grow in opposite pairs."],
["Creeping stem","🌱","The stem spreads across the ground."],
["Roots","🌱","Roots may develop at stem nodes."],
["Flowers","🌸","Small pale flowers grow near the leaves."]
]},

"Moringa":{
parts:[
["Leaflets","🍃","Many small leaflets form compound leaves."],
["Trunk","🌳","The trunk supports the tree."],
["Roots","🌱","Roots anchor the tree and absorb water."],
["Seed pod","🥒","Long pods develop from flowers and contain seeds."]
]},

"Lemongrass":{
parts:[
["Leaf blades","🌿","Long narrow leaves capture sunlight."],
["Leaf base","🌱","Overlapping leaf bases form a dense clump."],
["Roots","🌱","Fibrous roots anchor the grass."],
["Stem base","🌾","The short basal stem produces new leaves."]
]},

"Eucalyptus":{
parts:[
["Leaves","🍃","Leathery leaves contain aromatic oils."],
["Bark","🪵","The outer bark protects the woody trunk."],
["Trunk","🌳","The trunk supports the tree crown."],
["Seed capsules","🟤","Woody capsules contain seeds."]
]},

"Cinnamon":{
parts:[
["Leaves","🍃","The tree has simple green leaves."],
["Outer bark","🪵","The outer bark protects the trunk."],
["Inner bark","🟤","The inner bark is the part harvested to produce cinnamon."],
["Trunk","🌳","The woody trunk supports the tree."]
]},

"Clove":{
parts:[
["Leaves","🍃","Aromatic leaves grow on the evergreen tree."],
["Branch","🌳","Branches support leaves and flower clusters."],
["Flower buds","🌺","The unopened flower buds are harvested and dried as cloves."],
["Roots","🌱","Roots anchor the tree and absorb water."]
]},

"Hibiscus":{
parts:[
["Leaves","🍃","Broad leaves capture sunlight."],
["Stem","🌱","The stem supports leaves and flowers."],
["Flower","🌺","Large flowers contain petals and reproductive structures."],
["Roots","🌱","Roots anchor the shrub and absorb water."]
]},

"Gotu Kola":{
parts:[
["Leaves","🍃","Rounded or fan-shaped leaves grow on long stalks."],
["Stolon","🌱","Creeping stems spread across the ground."],
["Roots","🌱","Roots may form at nodes along the creeping stems."],
["Flowers","🌸","Small flowers grow close to the leaves."]
]},

"Aloevera":{
parts:[
["Leaf","🌵","Thick fleshy leaves store water."],
["Leaf gel","💧","The clear inner leaf tissue is commonly called aloe gel."],
["Leaf skin","🌵","The outer green layer protects the leaf."],
["Roots","🌱","Roots anchor the succulent in the soil."]
]},

"Ginger":{
parts:[
["Leaves","🌿","Long narrow leaves grow from upright shoots."],
["Rhizome","🫚","The branching underground stem stores food."],
["Roots","🌱","Roots grow from the rhizome and absorb water."],
["Shoot","🌱","New above-ground stems develop from the rhizome."]
]},

"Ashwagandha":{
parts:[
["Leaves","🍃","Oval leaves grow along branching stems."],
["Stem","🌱","The branching stem supports the shrub."],
["Roots","🌱","The plant has a main root system."],
["Fruit","🟠","Small berries develop inside papery coverings."]
]}

};

/* =========================================
PLANT STORY DATA
Traditional knowledge only.
No treatment or cure claims.
========================================= */

const storyData = {

"Mint":{
topic:"Mint in traditional household food and refreshment practices",
before:"A family is preparing a meal but has not yet added its familiar fresh herb.",
traditional:"Mint has a long history in food traditions. Its fragrant leaves are commonly used in chutneys, drinks and meals.",
after:"The family enjoys a freshly prepared meal featuring mint as a flavourful ingredient.",
note:"This is a food and cultural story, not a demonstration of a medical effect."
},

"Turmeric":{
topic:"Turmeric in Indian food and cultural traditions",
before:"A kitchen is preparing a traditional meal with several ingredients.",
traditional:"Turmeric is a familiar spice in Indian cooking and is also associated with cultural traditions.",
after:"The meal is prepared with turmeric adding its characteristic golden colour.",
note:"This story illustrates culinary and cultural use, not disease prevention or treatment."
},

"Tulsi":{
topic:"Tulsi in household gardens and traditional practices",
before:"A household garden has several plants but no Tulsi plant.",
traditional:"Tulsi has an important place in many Indian households and traditional practices.",
after:"A Tulsi plant becomes part of the household garden and its cultural traditions.",
note:"Traditional importance does not establish that Tulsi treats or prevents illness."
},

"Neem":{
topic:"Neem in traditional skin-care practices and Ayurvedic history",
before:"A student is learning about traditional plant knowledge and notices that different cultures have different skin-care traditions.",
traditional:"Neem has a long history in South Asian traditional practices, including some skin-care traditions.",
after:"The student learns to distinguish historical plant practices from proven medical care and consult reliable health professionals for skin conditions.",
note:"Neem is not proven to prevent chickenpox from spreading or worsening, and it should not be used as a substitute for appropriate healthcare."
},

"Garlic":{
topic:"Garlic in traditional kitchens",
before:"A cook is preparing a meal and wants to understand the ingredients used in traditional recipes.",
traditional:"Garlic is a widely used ingredient in many food traditions and is valued for its strong aroma.",
after:"The cook learns how garlic contributes flavour to different dishes.",
note:"This is a culinary story, not a health treatment demonstration."
},

"Curry":{
topic:"Curry leaves in regional food traditions",
before:"A family is preparing a regional dish and learning about its ingredients.",
traditional:"Curry leaves are used in many Indian cooking traditions, especially in seasoning.",
after:"The family learns how this aromatic plant contributes to familiar recipes.",
note:"The story describes food traditions, not medical effects."
},

"Rosemary":{
topic:"Rosemary in Mediterranean cooking",
before:"A learner explores herbs used in different regional cuisines.",
traditional:"Rosemary is a familiar aromatic herb in Mediterranean cooking.",
after:"The learner discovers how rosemary is used to flavour selected dishes.",
note:"This story is about culinary history, not medical treatment."
},

"Lavender":{
topic:"Lavender in fragrance and garden traditions",
before:"A garden designer is looking for flowering plants with distinctive fragrances.",
traditional:"Lavender has a long history in gardens, fragrances and scented products.",
after:"The designer learns about lavender's role in horticulture and fragrance-making.",
note:"A pleasant fragrance is not evidence of a medical effect."
},

"Chamomile":{
topic:"Chamomile in traditional tea culture",
before:"A learner explores plants that have been used in different tea traditions.",
traditional:"Chamomile flowers have a long history of use in herbal tea traditions.",
after:"The learner discovers how dried chamomile flowers are prepared as a beverage ingredient.",
note:"Traditional tea use does not establish that chamomile treats a medical condition."
},

"Aamla":{
topic:"Amla in Indian food traditions",
before:"A family is learning about traditional fruit preservation and regional foods.",
traditional:"Amla is used in pickles, preserves, candies and other food preparations.",
after:"The family discovers the many ways this sour fruit appears in food traditions.",
note:"This is a food-culture story, not a treatment recommendation."
},

"Brahmi":{
topic:"Brahmi in the history of traditional botanical knowledge",
before:"A student is researching plants mentioned in traditional Indian texts.",
traditional:"Brahmi is associated with traditional preparations and botanical research. The common name can refer to different plants.",
after:"The student learns why correct scientific identification matters when studying traditional plant knowledge.",
note:"Historical use does not establish effectiveness or safety for a medical purpose."
},

"Moringa":{
topic:"Moringa in local food systems",
before:"A student is learning about plants that contribute to everyday meals.",
traditional:"Moringa leaves and immature pods are used as vegetables in different food traditions.",
after:"The student learns how this tree can contribute to food diversity.",
note:"This is a food and agriculture story, not a treatment demonstration."
},

"Lemongrass":{
topic:"Lemongrass in food and fragrance traditions",
before:"A cook is exploring ingredients used in Southeast Asian dishes.",
traditional:"Lemongrass is known for its lemon-like aroma and is used in cooking and fragrance products.",
after:"The cook discovers how this aromatic grass contributes to different recipes.",
note:"This story does not claim a medical benefit."
},

"Eucalyptus":{
topic:"Eucalyptus in forestry and fragrance history",
before:"A student is learning about trees used in forestry and everyday products.",
traditional:"Eucalyptus leaves are known for their aromatic compounds, and the trees are used in forestry and some fragrance products.",
after:"The student learns about the plant's uses and its native Australian diversity.",
note:"Eucalyptus oils can be hazardous if misused. This website does not recommend consuming or applying them."
},

"Cinnamon":{
topic:"Cinnamon in historical spice trade",
before:"A learner explores how spices travelled between different regions.",
traditional:"Cinnamon has been traded for centuries and is used in many food traditions.",
after:"The learner discovers how the inner bark became a valued culinary spice.",
note:"This is a history and food story, not a medical claim."
},

"Clove":{
topic:"Clove in traditional spice culture",
before:"A cook is exploring the history of spices used in traditional recipes.",
traditional:"Cloves are dried unopened flower buds and have been important in historical spice trade.",
after:"The cook learns how cloves contribute a distinctive aroma to food traditions.",
note:"Clove oil should not be treated as a self-care remedy."
},

"Hibiscus":{
topic:"Hibiscus in gardens and cultural traditions",
before:"A gardener is planning a colourful tropical garden.",
traditional:"Hibiscus is widely grown for its striking flowers and is used in some cultural and food traditions.",
after:"The garden includes a colourful hibiscus shrub that attracts attention.",
note:"The story focuses on gardening and culture, not medical effects."
},

"Gotu Kola":{
topic:"Gotu Kola in regional food and botanical traditions",
before:"A learner is exploring small plants found in moist environments.",
traditional:"Gotu Kola appears in some regional food traditions and traditional botanical preparations.",
after:"The learner discovers its creeping growth habit and rounded leaves.",
note:"Traditional use is not proof of a medical effect."
},

"Aloevera":{
topic:"Aloe vera in personal-care product history",
before:"A student is learning how plants are used as ingredients in everyday products.",
traditional:"Aloe vera gel is used as an ingredient in some moisturizers and personal-care products.",
after:"The student learns about the plant's thick water-storing leaves and its place in product history.",
note:"This is not advice to apply aloe to injuries or skin conditions."
},

"Ginger":{
topic:"Ginger in food traditions",
before:"A family is preparing a meal and learning about aromatic ingredients.",
traditional:"Ginger is used in many cuisines in fresh and dried forms.",
after:"The family discovers how ginger contributes its distinctive flavour to food.",
note:"This is a culinary story, not a medical treatment demonstration."
},

"Ashwagandha":{
topic:"Ashwagandha in the history of Ayurveda",
before:"A student is researching plants mentioned in traditional Indian systems.",
traditional:"Ashwagandha has a long history in Ayurvedic traditions and is also studied by modern researchers.",
after:"The student learns that traditional history and scientific evidence are different kinds of information.",
note:"Ashwagandha is not a recommendation for self-medication. Plant products can have risks and interactions."
}

};

/* =========================================
ELEMENTS
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
STOP CAMERA
========================================= */

function stopCamera() {
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    cameraVideo.srcObject = null;
    cameraBox.hidden = true;
}

/* =========================================
START WEBCAM
========================================= */

document.getElementById("startCamera").addEventListener("click",async function() {

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
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
        fileStatus.textContent = "Camera is still starting. Please try again.";
        return;
    }

    cameraCanvas.width = width;
    cameraCanvas.height = height;

    const context = cameraCanvas.getContext("2d");
    context.drawImage(cameraVideo,0,0,width,height);

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
    speechSynthesis.cancel();
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
        Date.UTC(today.getFullYear(),today.getMonth(),today.getDate()) / 86400000
    );

    const startNumber = Math.floor(Date.UTC(2026,0,1) / 86400000);
    const daysPassed = todayNumber - startNumber;
    const index = ((daysPassed % plants.length) + plants.length) % plants.length;

    const plantName = plants[index];
    const plant = plantInformation[plantName];

    const welcome = document.querySelector(".welcome-section");

    if (!welcome || !plant) return;

    let card = document.getElementById("plantOfTheDay");

    if (!card) {
        card = document.createElement("section");
        card.id = "plantOfTheDay";
        card.className = "card plant-day-card";
        welcome.insertAdjacentElement("afterend",card);
    }

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

    function applyTheme(dark) {

        document.documentElement.classList.toggle("dark-mode",dark);
        document.documentElement.dataset.theme = dark ? "dark" : "light";
        document.body.classList.toggle("dark-mode",dark);

        button.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";

        localStorage.setItem(
            "plantExplorerDarkMode",
            dark ? "true" : "false"
        );
    }

    applyTheme(localStorage.getItem("plantExplorerDarkMode") === "true");

    button.addEventListener("click",function() {
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
        "Explore the important structures of " + plant +
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
WHAT IF THIS PLANT DISAPPEARED?
========================================= */

document.getElementById("exploreDisappearance").addEventListener("click",function() {

    const plant = normalizePlantName(currentPlant);
    if (!plant) return;

    const data = disappearanceData[plant];

    openDiscoveryModal(`
        <div class="discovery-icon">🌳</div>
        <div class="discovery-label">ENVIRONMENTAL EXPLORER</div>

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
            Growing a variety of native plants and protecting natural habitats
            are important ways to support biodiversity.
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

    const buttons = data.parts.map((part,index) => `
        <button
            type="button"
            class="anatomy-part ${index === 0 ? "active" : ""}"
            data-part="${index}">
            ${part[0]}
        </button>
    `).join("");

    openDiscoveryModal(`
        <div class="discovery-icon">🔬</div>
        <div class="discovery-label">BOTANICAL DISCOVERY</div>

        <h2>${plant} — Plant X-Ray Explorer</h2>

        <p>
            Tap the different plant parts to explore their structures.
        </p>

        <div class="xray-diagram">
            <div class="xray-visual" id="xrayVisual">
                ${data.parts[0][1]}
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
            <h3>${data.parts[0][0]}</h3>
            <p>${data.parts[0][2]}</p>
        </div>

        <div class="modal-note">
            This is a simplified educational guide. Plant structures can
            vary between species and varieties.
        </div>
    `);

    const partButtons = modalContent.querySelectorAll(".anatomy-part");
    const explanation = modalContent.querySelector("#anatomyExplanation");
    const visual = modalContent.querySelector("#xrayVisual");

    partButtons.forEach(button => {

        button.addEventListener("click",function() {

            const index = Number(this.dataset.part);
            const selected = data.parts[index];

            partButtons.forEach(item => item.classList.remove("active"));
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
PLANT STORY ANIMATION
========================================= */

document.getElementById("exploreStory").addEventListener("click",function() {

    const plant = normalizePlantName(currentPlant);
    if (!plant) return;

    const data = storyData[plant];

    openDiscoveryModal(`
        <div class="discovery-icon">🎬</div>
        <div class="discovery-label">ANIMATED PLANT STORY</div>

        <h2>${plant} — Plant Story</h2>

        <p><strong>${data.topic}</strong></p>

        <div class="story-stage">

            <div class="story-scene" id="storyScene">
                <div class="story-person">🧑‍🎓</div>
                <div class="story-plant">🌱</div>
            </div>

            <h3 id="storySceneTitle">Scene 1: Discover</h3>

            <p id="storySceneText">
                ${data.before}
            </p>

        </div>

        <div class="story-controls">
            <button id="storyPlay" type="button">▶ Play Story</button>
            <button id="storyRestart" type="button">↻ Restart</button>
        </div>

        <div class="story-step">
            <h3>🌿 Traditional Knowledge</h3>
            <p>${data.traditional}</p>
        </div>

        <div class="story-step">
            <h3>✨ What We Learn</h3>
            <p>${data.after}</p>
        </div>

        <div class="modal-note">
            ${data.note}
            Traditional practices are not proof of medical effectiveness.
            This animation is for education and does not recommend
            self-medication.
        </div>
    `);

    const sceneTitle = modalContent.querySelector("#storySceneTitle");
    const sceneText = modalContent.querySelector("#storySceneText");
    const scene = modalContent.querySelector("#storyScene");

    const playButton = modalContent.querySelector("#storyPlay");
    const restartButton = modalContent.querySelector("#storyRestart");

    let step = 0;

    const scenes = [
        {
            title:"Scene 1: Discover",
            text:data.before,
            person:"🧑‍🎓",
            plant:"🌱"
        },
        {
            title:"Scene 2: The Plant",
            text:data.traditional,
            person:"🧑‍🎓",
            plant:"🌿"
        },
        {
            title:"Scene 3: What We Learn",
            text:data.after,
            person:"👩‍🎓",
            plant:"🌳"
        }
    ];

    function showStep() {

        const current = scenes[step];

        sceneTitle.textContent = current.title;
        sceneText.textContent = current.text;

        scene.innerHTML = `
            <div class="story-person">${current.person}</div>
            <div class="story-plant">${current.plant}</div>
        `;

        if (step === scenes.length - 1) {
            playButton.textContent = "▶ Play Again";
        } else {
            playButton.textContent = "▶ Play Story";
        }
    }

    function nextStep() {

        step++;

        if (step >= scenes.length) {
            clearInterval(storyTimer);
            storyTimer = null;
            step = scenes.length - 1;
        }

        showStep();
    }

    playButton.addEventListener("click",function() {

        if (storyTimer) {
            clearInterval(storyTimer);
            storyTimer = null;
        }

        if (step === scenes.length - 1) {
            step = 0;
        }

        showStep();

        storyTimer = setInterval(nextStep,4000);
    });

    restartButton.addEventListener("click",function() {

        if (storyTimer) {
            clearInterval(storyTimer);
            storyTimer = null;
        }

        step = 0;
        showStep();
    });

    showStep();
});

/* =========================================
IMAGE UPLOAD FROM FILES
========================================= */

fileInput.addEventListener("change",function(event) {

    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        fileStatus.textContent = "Please select a valid image.";
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

        fileStatus.textContent = "Image selected successfully.";

        classifyButton.disabled = !model;

        predictionsBox.innerHTML =
            "<p>Tap Identify Image to classify your picture.</p>";

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

classifyButton.addEventListener("click",async function() {

    if (!model || !selectedImage) return;

    classifyButton.disabled = true;
    classifyButton.textContent = "Identifying...";

    predictionsBox.innerHTML =
        "<p>🔍 Analyzing your image...</p>";

    hideDiscoveryFeatures();
    currentPlant = null;

    try {

        const image = new Image();

        image.src = preview.src;

        await new Promise((resolve,reject) => {
            image.onload = resolve;
            image.onerror = reject;
        });

        const predictions = await model.predict(image);

        predictions.sort((a,b) => b.probability - a.probability);

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

        currentPlant = normalizePlantName(bestPrediction.className);

        if (!currentPlant) {

            categoryStatus.textContent =
                "The top prediction is not a supported plant category.";

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
        classifyButton.textContent = "Identify Image";
    }
});

/* =========================================
VOICE NARRATION
========================================= */

function setupSpeechControls() {

    speechSynthesis.cancel();

    const textToRead = informationBox.innerText;

    const controls = document.createElement("div");
    controls.className = "speech-controls";

    controls.innerHTML = `
        <button id="pauseButton" type="button">⏸ Pause</button>
        <button id="resumeButton" type="button">▶ Resume</button>
        <button id="stopButton" type="button">⏹ Stop</button>
    `;

    informationBox.appendChild(controls);

    document.getElementById("pauseButton").addEventListener("click",function() {
        if (speechSynthesis.speaking) speechSynthesis.pause();
    });

    document.getElementById("resumeButton").addEventListener("click",function() {
        if (speechSynthesis.paused) speechSynthesis.resume();
    });

    document.getElementById("stopButton").addEventListener("click",function() {
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

    const normalizedName = normalizePlantName(plantName);
    const plant = plantInformation[normalizedName];

    speechSynthesis.cancel();

    promptBox.hidden = false;

    if (!plant) {

        informationBox.innerHTML = `
            <h2>${plantName}</h2>
            <p>Detailed information for this category is not available yet.</p>
            <p>Please verify the AI prediction using a reliable source.</p>
        `;

        setupSpeechControls();
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
        "https://chatgpt.com/?q=" + encodeURIComponent(prompt);

    window.open(url,"_blank");
});

/* =========================================
REMOVE IMAGE AND RESET
========================================= */

removeButton.addEventListener("click",function() {

    speechSynthesis.cancel();
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
