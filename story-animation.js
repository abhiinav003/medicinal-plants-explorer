/* MEDICINAL PLANTS EXPLORER
   Custom illustrated three-scene story animation
*/

(() => {
"use strict";

const stories = {
mint: ["Stomach discomfort", "Mint has a long history in food traditions and is often studied for its aroma and culinary use.", "A caregiver helps the child rest and seeks appropriate advice if symptoms continue."],
turmeric: ["A minor skin concern", "Turmeric is an important spice with a long history in food and cultural traditions.", "The child receives suitable care and the family follows professional guidance."],
tulsi: ["A seasonal cough", "Tulsi is a culturally important plant in many Indian household traditions.", "The caregiver comforts the child and follows advice from a qualified health professional."],
neem: ["Chickenpox awareness", "Neem has a long history in traditional Indian plant knowledge. It is not a proven cure or way to stop chickenpox spreading.", "The child is supported by a caregiver and receives guidance from a healthcare professional."],
garlic: ["Learning about healthy food habits", "Garlic is widely used as a culinary ingredient in many food cultures.", "The family learns about balanced habits and gets reliable health guidance."],
curry: ["Learning about nutritious food", "Curry leaves are commonly used to add flavour and aroma to meals.", "The family explores a varied and nutritious diet."],
rosemary: ["Learning about study habits", "Rosemary is an aromatic herb used in cooking and studied for its distinctive scent.", "The student takes a break and follows healthy study habits."],
lavender: ["Feeling stressed before an exam", "Lavender is an aromatic flowering plant known for its fragrance.", "The student talks with a trusted adult and practises healthy routines."],
chamomile: ["Learning about bedtime routines", "Chamomile is a flowering plant discussed in traditional herbal-drink traditions.", "The child follows a relaxing bedtime routine with caregiver support."],
aamla: ["Learning about vitamin-rich foods", "Aamla is a fruit used in many Indian food traditions.", "The family explores a varied diet with fruits and vegetables."],
brahmi: ["A busy study day", "Brahmi is a plant discussed in traditional knowledge and botanical studies.", "The student takes breaks and follows a balanced study routine."],
moringa: ["Learning about balanced nutrition", "Moringa leaves are used as food in several regions.", "The family learns about eating a variety of nutritious foods."],
lemongrass: ["Learning about plant aromas", "Lemongrass is an aromatic grass used in cooking and herbal traditions.", "The child explores plant science with a trusted adult."],
eucalyptus: ["Learning about fragrant leaves", "Eucalyptus trees are known for their distinctive aromatic leaves.", "The family learns that concentrated plant oils should not be used casually."],
cinnamon: ["Learning about spices", "Cinnamon is a fragrant spice obtained from the bark of certain trees.", "The family learns how spices are used in food traditions."],
clove: ["Learning about aromatic spices", "Cloves are dried flower buds used as a spice in many cuisines.", "The child learns about safe food use with adult guidance."],
hibiscus: ["Learning about traditional plant uses", "Hibiscus is a flowering plant used in gardens and some traditional practices.", "The family checks reliable information and avoids untested treatments."],
"gotu kola": ["Learning about plant diversity", "Gotu kola is a small creeping plant discussed in traditional botanical knowledge.", "The student explores plant science and checks claims with reliable sources."],
aloevera: ["A minor skin irritation", "Aloe vera is a succulent plant known for its gel-containing leaves.", "A caregiver checks the concern and seeks medical advice when needed."],
ginger: ["A feeling of nausea", "Ginger is a rhizome widely used as a spice in food traditions.", "The child receives care from an adult and follows suitable health advice."],
ashwagandha: ["Learning about traditional medicinal plants", "Ashwagandha is discussed in Ayurveda and botanical studies; products can have risks and interactions.", "The family discusses health questions with a qualified professional rather than self-treating."]
};

const aliases = {
"curry leaf":"curry",
"curry leaves":"curry",
"aloe vera":"aloevera",
"amla":"aamla",
"centella asiatica":"gotu kola",
"mentha":"mint",
"curcuma longa":"turmeric"
};

const normalize = value =>
String(value || "").trim().toLowerCase().replace(/[_-]/g," ").replace(/\s+/g," ");

function getPlant() {
const select = document.getElementById("storyPlant");
return select?.selectedOptions?.[0]?.textContent ||
select?.value || "Tulsi";
}

function findStory(name) {
const n = normalize(name);
const key = aliases[n] || Object.keys(stories).find(
k => n.includes(k) || k.includes(n)
) || "tulsi";
return stories[key];
}

/* Animation styles */

const css = document.createElement("style");

css.textContent = `
.illustrated-story{color:var(--text)}
.is-intro{text-align:center;margin:5px 0 18px}
.is-kicker{font-size:11px;letter-spacing:1.5px;font-weight:bold;color:var(--green2)}
.is-stage{
position:relative;min-height:390px;border-radius:20px;
overflow:hidden;
background:linear-gradient(145deg,#e5f3e6,#f8f5e8);
border:1px solid var(--border);
}
.is-scene{
position:absolute;inset:0;padding:18px;
display:flex;flex-direction:column;
align-items:center;justify-content:center;
text-align:center;opacity:0;visibility:hidden;
transform:translateX(25px);
transition:opacity .5s ease,transform .5s ease;
}
.is-scene.active{
opacity:1;visibility:visible;transform:translateX(0);
}
.is-scene svg{
width:min(100%,430px);height:215px;
filter:drop-shadow(0 7px 5px rgba(35,65,40,.12));
}
.is-scene h3{color:#24543e;margin:8px 0 4px;font-size:21px}
.is-scene p{max-width:600px;font-size:14px;color:#425f4a}
.is-badge{
background:#24543e;color:white;border-radius:30px;
padding:6px 15px;font-size:11px;font-weight:bold;
letter-spacing:1px;
}
.is-progress{display:flex;gap:7px;margin:17px 0}
.is-progress span{
height:7px;flex:1;background:var(--border);border-radius:9px
}
.is-progress span.active{background:#39765a}
.is-controls{
display:flex;justify-content:center;flex-wrap:wrap;
gap:8px;margin:15px 0
}
.is-controls button{min-width:95px}
.is-play{background:var(--green);color:white}
.is-status{text-align:center;color:var(--green2);font-weight:bold;font-size:13px}
.is-note{
background:#fff4dc;color:#70521c;
border-left:4px solid #d7a43c;border-radius:12px;
padding:13px;margin-top:14px;font-size:13px
}
@keyframes characterMove{
0%,100%{transform:translateY(0)}
50%{transform:translateY(-7px)}
}
@keyframes plantMove{
0%,100%{transform:rotate(-2deg)}
50%{transform:rotate(2deg)}
}
.is-person{animation:characterMove 2.5s ease-in-out infinite}
.is-leaves{transform-origin:bottom center;animation:plantMove 3s ease-in-out infinite}
html.dark-mode .is-stage{background:linear-gradient(145deg,#294735,#344b37)}
html.dark-mode .is-scene h3{color:#d3f0d6}
html.dark-mode .is-scene p{color:#d0e3d2}
html.dark-mode .is-note{background:#493d27;color:#ffe5a9}
@media(max-width:550px){
.is-stage{min-height:410px}
.is-scene{padding:12px}
.is-scene svg{height:190px}
.is-controls button{flex:1 1 40%}
}
@media(prefers-reduced-motion:reduce){
.illustrated-story *{animation:none!important;transition:none!important}
}
`;

document.head.appendChild(css);

/* Cartoon person illustration */

function personIllustration(after) {

return `
<svg viewBox="0 0 420 220" role="img"
aria-label="Cartoon child with caregiver">

<ellipse cx="210" cy="197" rx="165" ry="13"
fill="#9abd9b" opacity=".35"/>

<rect x="42" y="116" width="125" height="76"
rx="13" fill="#d9e8d7"/>

<rect x="54" y="126" width="102" height="55"
rx="9" fill="#f8fbf4"/>

<g class="is-person">

<path d="M137 125 Q137 105 158 105
H215 Q237 105 237 128 V185 H137Z"
fill="#6f9fc1"/>

<circle cx="186" cy="76" r="39" fill="#d99c72"/>

<path d="M148 70 Q145 29 185 30
Q226 29 225 73 Q208 51 188 53
Q166 53 148 70" fill="#44342d"/>

<circle cx="173" cy="78" r="3.5" fill="#302b28"/>
<circle cx="199" cy="78" r="3.5" fill="#302b28"/>

<path d="M178 94 Q186 99 194 94"
fill="none" stroke="#8b4e45" stroke-width="3"/>

${after ? "" : `
<circle cx="158" cy="89" r="4" fill="#dc7770"/>
<circle cx="215" cy="96" r="4" fill="#dc7770"/>
<circle cx="184" cy="112" r="4" fill="#dc7770"/>
`}

</g>

<g>
<circle cx="87" cy="87" r="25" fill="#bd805e"/>
<path d="M61 84 Q59 55 87 55 Q113 55 113 84
Q96 70 78 73Z" fill="#45362e"/>

<path d="M58 119 Q87 102 116 119
L124 183 H51Z" fill="#d9a85f"/>

<circle cx="79" cy="87" r="2.5"/>
<circle cx="96" cy="87" r="2.5"/>

<path d="M80 98 Q88 103 96 98"
fill="none" stroke="#78493e" stroke-width="2.5"/>
</g>

${after ? `
<g>
<circle cx="315" cy="72" r="27" fill="#c98d68"/>
<path d="M288 68 Q290 38 317 43 Q342 44 342 73
Q324 56 288 68" fill="#40352f"/>
<path d="M282 105 Q315 88 348 105
L358 185 H272Z" fill="#78a98a"/>
<path d="M301 109 L315 130 L329 109"
fill="none" stroke="white" stroke-width="5"/>
<rect x="307" y="129" width="16" height="25"
rx="3" fill="white"/>
<path d="M315 134 V149 M309 141.5 H321"
stroke="#d76a64" stroke-width="3"/>
</g>` : ""}

</svg>`;
}

/* Botanical illustration */

function plantIllustration() {

let leaves = "";

const colors = [
"#397b50","#4d965e","#72ad65","#2d6845"
];

for(let i=0;i<12;i++){

const side = i%2 ? 1 : -1;
const y = 118-Math.floor(i/2)*15;
const x = 210+side*(26+Math.floor(i/2)*9);

leaves += `
<ellipse cx="${x}" cy="${y}"
rx="24" ry="10"
transform="rotate(${side*(25+i*2)} ${x} ${y})"
fill="${colors[i%4]}"/>`;
}

return `
<svg viewBox="0 0 420 220" role="img"
aria-label="Illustration of a green medicinal plant">

<ellipse cx="210" cy="196" rx="145" ry="13"
fill="#8fb88d" opacity=".4"/>

<path d="M194 190 Q210 130 210 46
Q218 117 230 190Z" fill="#8b6242"/>

<g class="is-leaves">
${leaves}

<path d="
M210 158 Q164 111 117 87
M211 146 Q261 99 302 80
M209 117 Q171 76 159 45
M214 108 Q245 67 254 38"
fill="none" stroke="#527d4b"
stroke-width="5" stroke-linecap="round"/>
</g>

<path d="M145 192 Q210 180 275 192"
fill="none" stroke="#7b9b54" stroke-width="7"/>

<circle cx="91" cy="66" r="5" fill="#e6bd59"/>
<circle cx="330" cy="53" r="6" fill="#e6bd59"/>
<circle cx="305" cy="125" r="4" fill="#e6bd59"/>

</svg>`;
}

/* Open the story */

function openStory() {

const plant = getPlant();
const [problem, plantText, afterText] = findStory(plant);

const modal = document.getElementById("discoveryModal");
const content = document.getElementById("modalContent");

if(!modal || !content) return;

content.innerHTML = `

<section class="illustrated-story">

<div class="is-intro">
<div class="is-kicker">ILLUSTRATED PLANT STORY</div>
<h2>${plant} — A Learning Journey</h2>
<p>Three illustrated scenes about plant knowledge and responsible care.</p>
</div>

<div class="is-progress">
<span class="active"></span>
<span></span>
<span></span>
</div>

<div class="is-stage">

<article class="is-scene active">
<span class="is-badge">BEFORE</span>
${personIllustration(false)}
<h3>${problem}</h3>
<p>A child is experiencing a concern.
A trusted adult listens and takes it seriously.</p>
</article>

<article class="is-scene">
<span class="is-badge">MEDICINAL PLANT</span>
${plantIllustration()}
<h3>${plant}</h3>
<p>${plantText}</p>
</article>

<article class="is-scene">
<span class="is-badge">AFTER</span>
${personIllustration(true)}
<h3>Support and responsible care</h3>
<p>${afterText}</p>
</article>

</div>

<div class="is-status">Scene 1 of 3 · BEFORE</div>

<div class="is-controls">
<button type="button" class="is-prev">← Previous</button>
<button type="button" class="is-play">Ⅱ Pause</button>
<button type="button" class="is-next">Next →</button>
<button type="button" class="is-replay">↻ Replay</button>
</div>

<div class="is-note">
<strong>Important educational note:</strong>
This animation explains traditional plant knowledge,
not a medical treatment. A plant should not be assumed
to cure or prevent an illness or replace medical care.
For health concerns, follow advice from a qualified
healthcare professional.
</div>

</section>
`;

modal.hidden = false;
modal.setAttribute("aria-hidden","false");

const scenes = [...content.querySelectorAll(".is-scene")];
const bars = [...content.querySelectorAll(".is-progress span")];
const status = content.querySelector(".is-status");
const playButton = content.querySelector(".is-play");

let index = 0;
let timer = null;
let playing = true;

const labels = ["BEFORE","MEDICINAL PLANT","AFTER"];

function show(n){

index = (n+3)%3;

scenes.forEach((scene,i)=>{
scene.classList.toggle("active",i===index);
});

bars.forEach((bar,i)=>{
bar.classList.toggle("active",i<=index);
});

status.textContent =
`Scene ${index+1} of 3 · ${labels[index]}`;
}

function stopTimer(){
if(timer) clearInterval(timer);
timer = null;
}

function startTimer(){

stopTimer();
playing = true;
playButton.textContent = "Ⅱ Pause";

timer = setInterval(()=>{
show(index+1);
},4200);

}

content.querySelector(".is-prev").onclick =
()=>show(index-1);

content.querySelector(".is-next").onclick =
()=>show(index+1);

playButton.onclick = ()=>{

if(playing){

stopTimer();
playing = false;
playButton.textContent = "▶ Play";

}else{

startTimer();

}

};

content.querySelector(".is-replay").onclick = ()=>{
show(0);
startTimer();
};

startTimer();

}

/* Replace only the old story button behaviour */

document.addEventListener("click",event=>{

const button = event.target.closest("#exploreStory");

if(!button) return;

event.preventDefault();
event.stopImmediatePropagation();

openStory();

},true);

})();
