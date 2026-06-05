let hiddenReveal = false;
const teams=[
["Mexico","A"],["South Africa","A"],["South Korea","A"],["Czechia","A"],
["Canada","B"],["Bosnia & Herzegovina","B"],["Qatar","B"],["Switzerland","B"],
["Brazil","C"],["Morocco","C"],["Haiti","C"],["Scotland","C"],
["USA","D"],["Paraguay","D"],["Australia","D"],["Türkiye","D"],
["Germany","E"],["Curaçao","E"],["Côte d'Ivoire","E"],["Ecuador","E"],
["Netherlands","F"],["Japan","F"],["Sweden","F"],["Tunisia","F"],
["Belgium","G"],["Egypt","G"],["Iran","G"],["New Zealand","G"],
["Spain","H"],["Cape Verde","H"],["Saudi Arabia","H"],["Uruguay","H"],
["France","I"],["Senegal","I"],["Iraq","I"],["Norway","I"],
["Argentina","J"],["Algeria","J"],["Austria","J"],["Jordan","J"],
["Portugal","K"],["DR Congo","K"],["Uzbekistan","K"],["Colombia","K"],
["England","L"],["Croatia","L"],["Ghana","L"],["Panama","L"]
];

function shuffle(a){let x=[...a];for(let i=x.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}

async function randomise(){
 let names=document.getElementById('names').value.split('\n').filter(Boolean);
 let draw=shuffle(teams);
 let rows='';
 for(let i=0;i<Math.min(names.length,draw.length);i++){
document.getElementById('presentation').innerHTML =
'⚽ Drawing Team...';

await new Promise(r=>setTimeout(r,1000));

if(hiddenReveal){

    document.getElementById('presentation').innerHTML = `
    <div style="font-size:3rem;font-weight:bold;">
        ${names[i]}
    </div>

    <div style="font-size:2rem;margin:30px 0;">
        🙈 Team Hidden
    </div>

    <button id="revealBtn"
        style="
            font-size:2rem;
            padding:20px 40px;
            cursor:pointer;
        ">
        Reveal Team
    </button>
    `;

    await new Promise(resolve => {
        document
            .getElementById('revealBtn')
            .addEventListener('click', resolve);
    });
}
  document.getElementById('presentation').innerHTML = `
<div style="font-size:3rem;font-weight:bold;margin-bottom:20px;">
${names[i]}
</div>

<div style="font-size:5rem;">
🏆
</div>

<div style="font-size:4rem;font-weight:bold;color:#FFD700;">
${draw[i][0]}
</div>

<div style="font-size:2rem;">
Group ${draw[i][1]}
</div>
`;
   if(window.speechSynthesis){
      speechSynthesis.speak(
  new SpeechSynthesisUtterance(
    names[i] + ' has drawn ' + draw[i][0]
  )
);
   }
   await new Promise(r=>setTimeout(r,1500));
   rows += `<tr>
<td>${names[i]}</td>
<td>${draw[i][0]}</td>
<td>Group ${draw[i][1]}</td>
</tr>`;
 }document.getElementById('results').innerHTML =
'<table><tr><th>Participant</th><th>Team</th><th>Group</th></tr>'+rows+'</table>';
}

function toggleFullscreen(){ if(!document.fullscreenElement){document.documentElement.requestFullscreen()} else {document.exitFullscreen()}}
function saveNames(){localStorage.setItem('wc_names',document.getElementById('names').value)}
function loadNames(){document.getElementById('names').value=localStorage.getItem('wc_names')||''}
function toggleHiddenReveal(){

    if(e.key === 'f'){
        toggleFullscreen();
    }

    if(e.key === 'h'){
        toggleHiddenReveal();
    }

});
    hiddenReveal = !hiddenReveal;

    alert(
        hiddenReveal
        ? "🙈 Hidden Reveal Mode ON"
        : "👀 Hidden Reveal Mode OFF"
    );
}
 document.addEventListener('keydown', (e) => {
