/* Medicinal Plants Explorer — Plant Impact Animation
   Educational, silent, video-style animation for all 21 plant categories.
   This is an illustrative everyday-use / garden / cultural story, NOT a medical result.
*/
(() => {
  "use strict";

  const PLANTS = [
    { names: ["mint"], title: "Mint", before: "🥗", after: "🥗 🌿", beforeText: "A simple meal", afterText: "A meal with fresh mint flavour", result: "Mint is widely used as an aromatic culinary herb." },
    { names: ["turmeric"], title: "Turmeric", before: "🍲", after: "🍲 🟡", beforeText: "A simply prepared dish", afterText: "A dish coloured and seasoned with turmeric", result: "Turmeric is valued as a golden-coloured spice in many food traditions." },
    { names: ["tulsi", "holy basil"], title: "Tulsi", before: "🪴", after: "🪴 🌿", beforeText: "An empty garden pot", afterText: "A pot growing a leafy tulsi plant", result: "Tulsi is an aromatic plant with an important place in many Indian home gardens and traditions." },
    { names: ["neem"], title: "Neem", before: "🌱", after: "🌳 🍃", beforeText: "A young garden space", afterText: "A garden featuring a neem tree", result: "Neem is a familiar tree in South Asian landscapes and traditional plant knowledge." },
    { names: ["garlic"], title: "Garlic", before: "🍞", after: "🍞 🧄", beforeText: "A simply prepared food", afterText: "Food seasoned with garlic", result: "Garlic is a widely used bulb ingredient in cuisines around the world." },
    { names: ["curry", "curry leaves"], title: "Curry Leaves", before: "🍛", after: "🍛 🌿", beforeText: "A plain curry", afterText: "A curry finished with curry leaves", result: "Curry leaves add a distinctive aroma to many South Asian dishes." },
    { names: ["rosemary"], title: "Rosemary", before: "🥔 🥕", after: "🥔 🥕 🌿", beforeText: "Plain roasted vegetables", afterText: "Vegetables seasoned with rosemary", result: "Rosemary is an aromatic herb often used in cooking and ornamental gardens." },
    { names: ["lavender"], title: "Lavender", before: "🌱 🌱", after: "💜 🌸 🐝", beforeText: "A simple garden bed", afterText: "A colourful flowering lavender garden", result: "Lavender is known for its fragrant flowers and its value in ornamental gardens." },
    { names: ["chamomile"], title: "Chamomile", before: "🌱", after: "🌼 🌼 🐝", beforeText: "A green garden patch", afterText: "A patch of daisy-like chamomile flowers", result: "Chamomile has daisy-like flowers and a long history in gardens and herbal traditions." },
    { names: ["aamla", "amla", "indian gooseberry"], title: "Aamla", before: "🧺 🍃", after: "🧺 🟢 🟢", beforeText: "An ordinary fruit basket", afterText: "A basket displaying fresh amla fruits", result: "Aamla is a fruit used in many Indian food preparations and cultural traditions." },
    { names: ["brahmi"], title: "Brahmi", before: "💧 🌱", after: "💧 🌿 🐸", beforeText: "A damp garden edge", afterText: "A planted, moisture-loving garden patch", result: "Brahmi is associated with moist habitats and is part of traditional botanical knowledge." },
    { names: ["moringa", "drumstick"], title: "Moringa", before: "🥬", after: "🌳 🥬 🫘", beforeText: "A small vegetable selection", afterText: "A food garden featuring moringa leaves and pods", result: "Moringa is grown for its edible leaves and pods in many regions." },
    { names: ["lemongrass", "lemon grass"], title: "Lemongrass", before: "🍲", after: "🍲 🌾", beforeText: "A simply prepared soup", afterText: "A soup with lemongrass aroma", result: "Lemongrass is a fragrant grass used in cooking and gardens." },
    { names: ["eucalyptus"], title: "Eucalyptus", before: "🌱", after: "🌳 🌿", beforeText: "An open landscape", afterText: "A landscape with a eucalyptus tree", result: "Eucalyptus includes many tree species; planting choices should suit the local ecosystem." },
    { names: ["cinnamon"], title: "Cinnamon", before: "🍪", after: "🍪 🟤", beforeText: "A plain baked treat", afterText: "A treat seasoned with cinnamon", result: "Cinnamon is a fragrant spice obtained from the inner bark of certain trees." },
    { names: ["clove"], title: "Clove", before: "🍵", after: "🍵 🌰", beforeText: "A simple spice display", afterText: "A spice display featuring cloves", result: "Cloves are dried flower buds used as an aromatic spice." },
    { names: ["hibiscus"], title: "Hibiscus", before: "🌿", after: "🌺 🌺 🦋", beforeText: "A green garden", afterText: "A garden brightened by hibiscus flowers", result: "Hibiscus is known for its large, colourful flowers and ornamental value." },
    { names: ["gotu kola", "centella asiatica"], title: "Gotu Kola", before: "🌱 💧", after: "🍃 🍃 💧", beforeText: "A moist patch of soil", afterText: "A spreading groundcover in a moist garden", result: "Gotu kola is a creeping herb commonly found in moist tropical environments." },
    { names: ["aloe vera", "aloevera"], title: "Aloe Vera", before: "🪴", after: "🪴 🌵", beforeText: "A simple plant shelf", afterText: "A shelf displaying an aloe vera plant", result: "Aloe vera is a succulent plant often grown in homes and gardens." },
    { names: ["ginger"], title: "Ginger", before: "🍜", after: "🍜 🫚", beforeText: "A simply prepared dish", afterText: "A dish seasoned with ginger", result: "Ginger is a widely used rhizome valued as a flavourful cooking ingredient." },
    { names: ["ashwagandha"], title: "Ashwagandha", before: "🔎 🌱", after: "🌿 🏷️ 📚", beforeText: "A botanical study table", afterText: "A labelled plant in an educational herb garden", result: "Ashwagandha is a plant with a long history in traditional botanical and cultural knowledge." }
  ];

  const normalise = s => (s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

  function findPlant(text) {
    const t = normalise(text);
    return PLANTS.find(p => p.names.some(n => {
      const needle = normalise(n);
      return t === needle || t.startsWith(needle + " ") || t.includes(" " + needle + " ");
    })) || null;
  }

  function addStyles() {
    if (document.getElementById("plant-impact-animation-styles")) return;
    const style = document.createElement("style");
    style.id = "plant-impact-animation-styles";
    style.textContent = `
      #plant-impact-animation { margin: 24px 0; padding: 22px; border-radius: 22px; color: #263b31;
        background: linear-gradient(135deg,#f3f8ed,#e5f0e3); border: 1px solid #d4e4d3;
        overflow: hidden; font-family: inherit; }
      #plant-impact-animation .pia-kicker { font-size: .76rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 800; color: #66836d; }
      #plant-impact-animation h2 { margin: 7px 0 8px; font-size: clamp(1.25rem,4vw,1.8rem); color: #294c38; }
      #plant-impact-animation .pia-result { margin: 0 0 18px; line-height: 1.55; }
      #plant-impact-animation .pia-scenes { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 10px; }
      #plant-impact-animation .pia-scene { min-width: 0; padding: 15px 8px; border-radius: 16px; background: rgba(255,255,255,.76); text-align: center; border: 1px solid #dce9dc; }
      #plant-impact-animation .pia-label { font-size: .75rem; font-weight: 800; letter-spacing: .08em; color: #728477; text-transform: uppercase; }
      #plant-impact-animation .pia-emoji { min-height: 84px; display: grid; place-items: center; font-size: clamp(2.3rem,9vw,3.8rem); line-height: 1.25; }
      #plant-impact-animation .pia-caption { font-size: .88rem; line-height: 1.35; font-weight: 650; }
      #plant-impact-animation .pia-arrow { font-size: 1.6rem; color: #719578; font-weight: 900; }
      #plant-impact-animation .pia-scene.pia-before .pia-emoji { animation: pia-fade-in .8s both; }
      #plant-impact-animation .pia-scene.pia-after .pia-emoji { animation: pia-pop-in 1s .35s both; }
      #plant-impact-animation .pia-note { margin: 15px 0 0; font-size: .76rem; line-height: 1.45; color: #64776a; }
      @keyframes pia-fade-in { from { opacity:.25; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      @keyframes pia-pop-in { 0% { opacity:0; transform:scale(.75); } 70% { opacity:1; transform:scale(1.08); } 100% { opacity:1; transform:scale(1); } }
      @media (max-width:480px) { #plant-impact-animation { padding:16px 12px; } #plant-impact-animation .pia-scenes { gap:6px; } #plant-impact-animation .pia-scene { padding:12px 5px; } #plant-impact-animation .pia-caption { font-size:.78rem; } }
      body.dark-mode #plant-impact-animation, .dark-mode #plant-impact-animation { background:linear-gradient(135deg,#20372d,#263e32); color:#e5f0e5; border-color:#405b49; }
      body.dark-mode #plant-impact-animation h2, .dark-mode #plant-impact-animation h2 { color:#d8ead9; }
      body.dark-mode #plant-impact-animation .pia-scene, .dark-mode #plant-impact-animation .pia-scene { background:#30483a; border-color:#4a6552; }
      body.dark-mode #plant-impact-animation .pia-note, .dark-mode #plant-impact-animation .pia-note { color:#c0d0c1; }
    `;
    document.head.appendChild(style);
  }

  function ensureSection() {
    let section = document.getElementById("plant-impact-animation");
    if (section) return section;
    section = document.createElement("section");
    section.id = "plant-impact-animation";
    section.className = "card";
    section.hidden = true;
    const games = document.getElementById("plant-games") || document.querySelector(".games-section");
    const info = document.getElementById("promptBox");
    if (games && games.parentNode) games.parentNode.insertBefore(section, games);
    else if (info && info.parentNode) info.parentNode.insertBefore(section, info.nextSibling);
    else document.body.appendChild(section);
    return section;
  }

  function render(plant) {
    const section = ensureSection();
    if (!plant) { section.hidden = true; return; }
    section.innerHTML = `
      <div class="pia-kicker">Silent animated plant story</div>
      <h2>${plant.title}: Before &amp; After</h2>
      <p class="pia-result"><strong>Everyday contribution:</strong> ${plant.result}</p>
      <div class="pia-scenes" aria-label="Illustrative before and after animation">
        <div class="pia-scene pia-before">
          <div class="pia-label">Before</div>
          <div class="pia-emoji">${plant.before}</div>
          <div class="pia-caption">${plant.beforeText}</div>
        </div>
        <div class="pia-arrow" aria-hidden="true">→</div>
        <div class="pia-scene pia-after">
          <div class="pia-label">After</div>
          <div class="pia-emoji">${plant.after}</div>
          <div class="pia-caption">${plant.afterText}</div>
        </div>
      </div>
      <p class="pia-note">Illustrative educational animation. It does not show a medical effect, prove a treatment, or recommend consuming the plant.</p>
    `;
    section.hidden = false;
    // Re-run the silent entrance animation whenever a new plant is displayed.
    section.querySelectorAll(".pia-emoji").forEach(el => {
      el.style.animation = "none";
      void el.offsetWidth;
      el.style.animation = "";
    });
  }

  function check() {
    const infoBox = document.getElementById("promptBox");
    const info = document.getElementById("information");
    if (!infoBox || !info) return;
    const isVisible = !infoBox.hidden && getComputedStyle(infoBox).display !== "none";
    if (!isVisible) { render(null); return; }
    const text = (info.innerText || info.textContent || "").trim();
    render(findPlant(text));
  }

  function start() {
    addStyles();
    ensureSection();
    const observer = new MutationObserver(check);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["hidden", "style", "class"] });
    check();
    // Also check after delayed rendering from the main app.
    setInterval(check, 1200);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
