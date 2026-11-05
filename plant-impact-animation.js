/* Medicinal Plants Explorer
   Lightweight plant animation
   Educational use only — not a medical demonstration.
*/

(() => {
  "use strict";

  const PLANTS = [
    {
      names: ["mint"],
      title: "Mint",
      before: "🥗",
      after: "🥗 🌿",
      beforeText: "A simple meal",
      afterText: "A meal with fresh mint flavour",
      result: "Mint is widely used as an aromatic culinary herb."
    },
    {
      names: ["turmeric"],
      title: "Turmeric",
      before: "🍲",
      after: "🍲 🟡",
      beforeText: "A simple dish",
      afterText: "A dish seasoned with turmeric",
      result: "Turmeric is valued as a golden-coloured spice."
    },
    {
      names: ["tulsi", "holy basil"],
      title: "Tulsi",
      before: "🪴",
      after: "🪴 🌿",
      beforeText: "An empty garden pot",
      afterText: "A pot with a leafy tulsi plant",
      result: "Tulsi is important in many Indian gardens and traditions."
    },
    {
      names: ["neem"],
      title: "Neem",
      before: "🌱",
      after: "🌳 🍃",
      beforeText: "An open garden space",
      afterText: "A garden with a neem tree",
      result: "Neem is a familiar tree in South Asian landscapes."
    },
    {
      names: ["garlic"],
      title: "Garlic",
      before: "🍞",
      after: "🍞 🧄",
      beforeText: "Simply prepared food",
      afterText: "Food seasoned with garlic",
      result: "Garlic is widely used in cuisines around the world."
    },
    {
      names: ["curry leaves", "curry"],
      title: "Curry Leaves",
      before: "🍛",
      after: "🍛 🌿",
      beforeText: "A plain curry",
      afterText: "A curry with curry leaves",
      result: "Curry leaves add aroma to many South Asian dishes."
    },
    {
      names: ["rosemary"],
      title: "Rosemary",
      before: "🥔 🥕",
      after: "🥔 🥕 🌿",
      beforeText: "Plain vegetables",
      afterText: "Vegetables seasoned with rosemary",
      result: "Rosemary is an aromatic herb used in cooking."
    },
    {
      names: ["lavender"],
      title: "Lavender",
      before: "🌱 🌱",
      after: "💜 🌸 🐝",
      beforeText: "A simple garden",
      afterText: "A flowering lavender garden",
      result: "Lavender is known for its fragrant flowers."
    },
    {
      names: ["chamomile"],
      title: "Chamomile",
      before: "🌱",
      after: "🌼 🌼 🐝",
      beforeText: "A green garden patch",
      afterText: "A patch of chamomile flowers",
      result: "Chamomile has distinctive daisy-like flowers."
    },
    {
      names: ["aamla", "amla", "indian gooseberry"],
      title: "Aamla",
      before: "🧺",
      after: "🧺 🟢",
      beforeText: "An ordinary fruit basket",
      afterText: "A basket displaying amla fruits",
      result: "Aamla is used in many Indian food preparations."
    },
    {
      names: ["brahmi"],
      title: "Brahmi",
      before: "💧 🌱",
      after: "💧 🌿",
      beforeText: "A damp garden edge",
      afterText: "A planted moist garden patch",
      result: "Brahmi is associated with moist environments."
    },
    {
      names: ["moringa", "drumstick"],
      title: "Moringa",
      before: "🥬",
      after: "🌳 🥬",
      beforeText: "A small vegetable selection",
      afterText: "A garden featuring moringa",
      result: "Moringa is grown for its leaves and pods."
    },
    {
      names: ["lemongrass", "lemon grass"],
      title: "Lemongrass",
      before: "🍲",
      after: "🍲 🌾",
      beforeText: "A simple soup",
      afterText: "A soup with lemongrass aroma",
      result: "Lemongrass is a fragrant grass used in cooking."
    },
    {
      names: ["eucalyptus"],
      title: "Eucalyptus",
      before: "🌱",
      after: "🌳 🌿",
      beforeText: "An open landscape",
      afterText: "A landscape with a eucalyptus tree",
      result: "Eucalyptus includes many different tree species."
    },
    {
      names: ["cinnamon"],
      title: "Cinnamon",
      before: "🍪",
      after: "🍪 🟤",
      beforeText: "A plain baked treat",
      afterText: "A treat seasoned with cinnamon",
      result: "Cinnamon is obtained from the inner bark of certain trees."
    },
    {
      names: ["clove"],
      title: "Clove",
      before: "🍵",
      after: "🍵 🌰",
      beforeText: "A simple spice display",
      afterText: "A display featuring cloves",
      result: "Cloves are dried flower buds used as a spice."
    },
    {
      names: ["hibiscus"],
      title: "Hibiscus",
      before: "🌿",
      after: "🌺 🌺 🦋",
      beforeText: "A green garden",
      afterText: "A garden with hibiscus flowers",
      result: "Hibiscus is known for its colourful flowers."
    },
    {
      names: ["gotu kola", "centella asiatica"],
      title: "Gotu Kola",
      before: "🌱 💧",
      after: "🍃 🍃 💧",
      beforeText: "A moist patch of soil",
      afterText: "A spreading garden groundcover",
      result: "Gotu kola is a creeping herb found in moist environments."
    },
    {
      names: ["aloe vera", "aloevera"],
      title: "Aloe Vera",
      before: "🪴",
      after: "🪴 🌵",
      beforeText: "A simple plant shelf",
      afterText: "A shelf displaying aloe vera",
      result: "Aloe vera is a succulent often grown in homes."
    },
    {
      names: ["ginger"],
      title: "Ginger",
      before: "🍜",
      after: "🍜 🫚",
      beforeText: "A simple dish",
      afterText: "A dish seasoned with ginger",
      result: "Ginger is widely used as a cooking ingredient."
    },
    {
      names: ["ashwagandha"],
      title: "Ashwagandha",
      before: "🔎 🌱",
      after: "🌿 📚",
      beforeText: "A botanical study table",
      afterText: "A labelled plant in a learning garden",
      result: "Ashwagandha has a history in traditional botanical knowledge."
    }
  ];

  let lastPlant = "";
  let section;

  function normalise(text) {
    return (text || "")
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function findPlant(text) {
    const value = normalise(text);

    return PLANTS.find(plant =>
      plant.names.some(name =>
        value.includes(normalise(name))
      )
    ) || null;
  }

  function addStyles() {
    if (document.getElementById("pia-styles")) return;

    const style = document.createElement("style");
    style.id = "pia-styles";

    style.textContent = `
      #plant-impact-animation {
        margin: 24px 0;
        padding: 20px;
        border-radius: 20px;
        background: linear-gradient(135deg,#f3f8ed,#e5f0e3);
        color: #263b31;
        overflow: hidden;
      }

      #plant-impact-animation h2 {
        color: #294c38;
        margin: 8px 0;
      }

      #plant-impact-animation .pia-scenes {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        gap: 10px;
        align-items: center;
      }

      #plant-impact-animation .pia-scene {
        background: white;
        border-radius: 15px;
        padding: 12px 5px;
        text-align: center;
        min-width: 0;
      }

      #plant-impact-animation .pia-emoji {
        font-size: clamp(35px, 9vw, 60px);
        padding: 15px 0;
      }

      #plant-impact-animation .pia-caption {
        font-size: 13px;
        line-height: 1.4;
      }

      #plant-impact-animation .pia-label {
        font-size: 12px;
        font-weight: bold;
        color: #66836d;
      }

      #plant-impact-animation .pia-arrow {
        font-size: 25px;
      }

      #plant-impact-animation .pia-before {
        animation: piaFade .8s ease both;
      }

      #plant-impact-animation .pia-after {
        animation: piaPop .9s .3s ease both;
      }

      #plant-impact-animation .pia-note {
        font-size: 12px;
        line-height: 1.5;
        margin-top: 15px;
      }

      @keyframes piaFade {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes piaPop {
        from { opacity: 0; transform: scale(.8); }
        to { opacity: 1; transform: scale(1); }
      }

      @media(max-width:480px) {
        #plant-impact-animation { padding: 14px 8px; }
        #plant-impact-animation .pia-caption { font-size: 11px; }
      }
    `;

    document.head.appendChild(style);
  }

  function createSection() {
    section = document.getElementById("plant-impact-animation");

    if (section) return;

    section = document.createElement("section");
    section.id = "plant-impact-animation";
    section.hidden = true;

    const games = document.getElementById("plant-games");
    const infoBox = document.getElementById("promptBox");

    if (games && games.parentNode) {
      games.parentNode.insertBefore(section, games);
    } else if (infoBox && infoBox.parentNode) {
      infoBox.parentNode.insertBefore(section, infoBox.nextSibling);
    }
  }

  function render(plant) {
    if (!section) return;

    if (!plant) {
      section.hidden = true;
      lastPlant = "";
      return;
    }

    if (lastPlant === plant.title) {
      section.hidden = false;
      return;
    }

    lastPlant = plant.title;

    section.innerHTML = `
      <div class="pia-label">PLANT STORY</div>

      <h2>${plant.title}: Before &amp; After</h2>

      <p>
        <strong>Everyday contribution:</strong>
        ${plant.result}
      </p>

      <div class="pia-scenes">

        <div class="pia-scene pia-before">
          <div class="pia-label">BEFORE</div>
          <div class="pia-emoji">${plant.before}</div>
          <div class="pia-caption">${plant.beforeText}</div>
        </div>

        <div class="pia-arrow">→</div>

        <div class="pia-scene pia-after">
          <div class="pia-label">AFTER</div>
          <div class="pia-emoji">${plant.after}</div>
          <div class="pia-caption">${plant.afterText}</div>
        </div>

      </div>

      <p class="pia-note">
        Illustrative educational animation. It does not show a medical
        effect, prove a treatment, or recommend consuming the plant.
      </p>
    `;

    section.hidden = false;
  }

  function check() {
    const promptBox = document.getElementById("promptBox");
    const information = document.getElementById("information");

    if (!promptBox || !information) return;

    const visible =
      !promptBox.hidden &&
      getComputedStyle(promptBox).display !== "none";

    if (!visible) {
      render(null);
      return;
    }

    render(findPlant(information.innerText || information.textContent));
  }

  function start() {
    addStyles();
    createSection();

    const information = document.getElementById("information");
    const promptBox = document.getElementById("promptBox");

    if (!information || !promptBox || !section) return;

    const observer = new MutationObserver(check);

    observer.observe(information, {
      childList: true,
      subtree: true,
      characterData: true
    });

    observer.observe(promptBox, {
      attributes: true,
      attributeFilter: ["hidden", "style", "class"]
    });

    check();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }

})();
