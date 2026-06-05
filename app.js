
const teams=[
'Argentina','Brazil','England','France','Spain','Germany','Portugal','Netherlands',
'Uruguay','Croatia','Japan','USA','Mexico','Canada','Morocco','Colombia',
'Italy Placeholder','Team 18','Team 19','Team 20','Team 21','Team 22','Team 23','Team 24',
'Team 25','Team 26','Team 27','Team 28','Team 29','Team 30','Team 31','Team 32',
'Team 33','Team 34','Team 35','Team 36','Team 37','Team 38','Team 39','Team 40',
'Team 41','Team 42','Team 43','Team 44','Team 45','Team 46','Team 47','Team 48'
];

function shuffle(a){let x=[...a];for(let i=x.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}

async function randomise(){
 let names=document.getElementById('names').value.split('\n').filter(Boolean);
 let draw=shuffle(teams);
 let rows='';
 for(let i=0;i<Math.min(names.length,draw.length);i++){
   document.getElementById('presentation').innerHTML=`🎉 ${names[i]} draws <strong>${draw[i]}</strong>`;
   if(window.speechSynthesis){
      speechSynthesis.speak(new SpeechSynthesisUtterance(names[i]+' has drawn '+draw[i]));
   }
   await new Promise(r=>setTimeout(r,1500));
   rows += `<tr><td>${names[i]}</td><td>${draw[i]}</td></tr>`;
 }
 document.getElementById('results').innerHTML='<table><tr><th>Name</th><th>Team</th></tr>'+rows+'</table>';
}

function toggleFullscreen(){ if(!document.fullscreenElement){document.documentElement.requestFullscreen()} else {document.exitFullscreen()}}
function saveNames(){localStorage.setItem('wc_names',document.getElementById('names').value)}
function loadNames(){document.getElementById('names').value=localStorage.getItem('wc_names')||''}
