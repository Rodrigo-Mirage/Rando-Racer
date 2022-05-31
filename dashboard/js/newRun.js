const element = document.getElementById("hostName");
const elementGame = document.getElementById("gameName");
const elementEstimate = document.getElementById("gameEstimate");
const layoutDiv = document.getElementById("layoutDiv");

const runnersDiv = document.getElementById("runnersDiv");
const syncSwitch = document.getElementById("syncSwitch");
var hostName = nodecg.Replicant("hostName"); 
var raceInfo = nodecg.Replicant("raceInfo"); 
var gameList = nodecg.Replicant("gameList"); 
var raceList = nodecg.Replicant("raceList"); 

var id = null;

var baseData=
{
  runners:[],
  type: "sync"
}
var runners = [];

hostName.on("change", (newVal, oldVal) => {
  if (newVal) {
    element.value = newVal;
  }
});

var games = [
  "OOT",
  "ALTTP",
  "SS",
  "MMR",
  "SMZ3",
  "KH2",
  "KH3"
];
var layouts = [
  {
    name:"1 Player 4:3",
    value:"1pl_4_3"
  },
  {
    name:"2 Player 4:3",
    value:"2pl_4_3"
  },
  {
    name:"3 Player 4:3",
    value:"3pl_4_3"
  },
  {
    name:"4 Player 4:3",
    value:"4pl_4_3"
  },
  {
    name:"1 Player 16:9",
    value:"1pl_16_9"
  },
  {
    name:"2 Player 16:9",
    value:"2pl_16_9"
  },
  {
    name:"3 Player 16:9",
    value:"3pl_16_9"
  },
  {
    name:"4 Player 16:9",
    value:"4pl_16_9"
  },
];

gameList.on("change", (newVal, oldVal) => {
  if (oldVal != games) {
    gameList.value = games;
  }
});

function newName(e) {
    var name = e.value;
    hostName.value = name;
}

raceInfo.on("change", (newVal, oldVal) => {
    setup(newVal);
});

function setup(newVal){
  var html = "";
  if(newVal){
    runners = newVal.runners;
    id= newVal.id;
    element.value = newVal.hosts?newVal.hosts:"";
    elementGame.value = newVal.jogo?newVal.jogo:"";
    elementEstimate.value = newVal.estimativa?newVal.estimativa:"";
    syncSwitch.checked = (newVal.type != "async");
    var html2 = "";
    html2 += `<select name="layoutGame" id="layoutGame" value="`+newVal.layout+`">`;
    html2 += `<option value="">Layout</option>`;
    layouts.forEach((layout)=>{
      html2 += `<option value="${layout.value}" ${newVal.layout == layout.value?"selected":""}>${layout.name}</option>`;
    });
    
    html2 += `</select><br>`;
    layoutDiv.innerHTML = html2;

    if(runners){
      for(var i =0;i<runners.length;i++){

        html += `
        <fieldset>
        <input type='text' id='RunnerName`+i+`' onchange="changeRunner(${i})" placeholder='Nome' value="`+runners[i].name+`" />
        <input type='text' id='RunnerStream`+i+`' onchange="changeRunner(${i})" placeholder='Twitch' value="`+runners[i].stream+`" /><br>`;

        html += `<label for="RunnerGame`+i+`">Jogo:</label>`;
        html += `<select name="RunnerGame`+i+`" onchange="changeRunner(${i})" id="RunnerGame`+i+`" value="`+runners[i].game+`">`;
        html += `<option value="">Jogo</option>`;

        games.forEach((game)=>{
          html += `<option value="${game}" ${runners[i].game?runners[i].game == game?"selected":"":""}>${game}</option>`;
        });
        
        html += `</select><br>`;

        if(newVal.type != "async"){
          html += `<input type='text' id='RunnerAlt`+i+`' onchange="changeRunner(${i})" placeholder='TwitchAtl' value="`+runners[i].alt+`" /><br>`;
        }else{
          html += `<input type='text' id='RunnerUrl`+i+`' onchange="changeRunner(${i})" placeholder='Url Video' value="`+runners[i].url+`" />
          <input type='text' id='RunnerStart`+i+`' onchange="changeRunner(${i})" placeholder='Video Start' value="`+runners[i].start+`" /><br>`;
        }

        html += `<button onclick="remRunner(`+i+`)" >Remover</button>
        </fieldset>`;


      }
    }
  }
  else{
    id = null;
    element.value = "";
    elementGame.value = "";
    elementEstimate.value = "";
    var html2 = "";
    html2 += `<select name="layoutGame" id="layoutGame">`;
    html2 += `<option value="">Layout</option>`;
    layouts.forEach((layout)=>{
      html2 += `<option value="${layout.value}">${layout.name}</option>`;
    });
    
    html2 += `</select><br>`;
    layoutDiv.innerHTML = html2;
  }
  html += `<fieldset>
      <input type='text' id='addRunnerName' placeholder='Nome' />
      <input type='text' id='addRunnerStream' placeholder='Twitch' /><br>`;

      html += `<label for="addRunnerGame">Jogo:</label>`;
      html += `<select name="addRunnerGame" id="addRunnerGame" ">`;
      html += `<option value="">Jogo</option>`;
      games.forEach((game)=>{
        html += `<option value="${game}">${game}</option>`;
      });
      html += `</select><br>`;

       
      if(newVal && newVal.type != "async"){
        html += `<input type='text' id='addRunnerAlt' placeholder='TwitchAtl' /><br>`;
      }else{
        html += `<input type='text' id='addRunnerUrl' placeholder='Url Video' />
        <input type='text' id='addRunnerStart' placeholder='Video Start' /><br>`;
      }
      html += `<button onclick="addRunner()" >Adicionar</button>
      </fieldset>`;
    runnersDiv.innerHTML = html;
}

function changeRunner(i){
  const Name = document.getElementById("RunnerName"+i);
  const Stream = document.getElementById("RunnerStream"+i);
  const AltStream = document.getElementById("RunnerAlt"+i);
  const url = document.getElementById("RunnerUrl"+i);
  const start = document.getElementById("RunnerStart"+i);
  const game = document.getElementById("RunnerGame"+i);
  console.log(raceInfo.value.runners[i])
  var runnerid = raceInfo.value.runners[i].id;
  if(!raceInfo.value.runners[i].id){
    runnerid=uuidv4()
  }
  if(raceInfo.value.runners[i]){

    var runnerData ={
      id : runnerid,
      name : Name.value,
      stream : Stream.value,
      game : game.value,
      alt : AltStream?AltStream.value:"",
      url : url?url.value:"",
      start : start?start.value:"",
      crop: raceInfo.value.runners[i].crop||{
        up:0,
        down:0,
        left:0,
        right:0
      },
      volume:raceInfo.value.runners[i].volume||0,
      status:raceInfo.value.runners[i].status||"waiting"
    }
    raceInfo.value.runners[i] = runnerData;

  }
}

function addRunner() {
  const Name = document.getElementById("addRunnerName");
  const Stream = document.getElementById("addRunnerStream");
  const AltStream = document.getElementById("addRunnerAlt");
  const url = document.getElementById("addRunnerUrl");
  const start = document.getElementById("addRunnerStart");
  const game = document.getElementById("addRunnerGame");
  var newId = uuidv4();

  var runnerobj = {
    id: newId,
    name: Name.value,
    stream: Stream.value,
    alt: AltStream ? AltStream.value:"",
    url:url ? url.value:"",
    game:game.value,
    crop: {
      up:0,
      down:0,
      left:0,
      right:0
    },
    volume:0,
    start:start ? start.value:"",
    status:"waiting"
  };
  runners.push(runnerobj);
  raceInfo.value = {runners : runners , type: raceInfo.value.type};
}
function remRunner(i) {
  if(confirm("Deseja remover o Runner?")){
    runners.splice(i, 1);
    raceInfo.value = {runners : runners, type: raceInfo.value.type};
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function switchRaceType(){
  if(raceInfo.value){
    var type = raceInfo.value.type;

    if(!type || type == "sync"){
      type = "async"
    }else{
      type = "sync"
    }
    raceInfo.value.type = type;
  }
}
function switchRaceInfo(){
  const layoutGame = document.getElementById("layoutGame");
  if(raceInfo.value){
    var data = raceInfo.value;
    data.hosts = element.value;
    data.game = elementGame.value;
    data.estimativa = elementEstimate.value;
    data.layout = layoutGame.value;

    raceInfo.value = data;
    console.log(raceInfo.value);
  }
}

function cancelar(){
  raceInfo.value = null;
}

function saveRace(){
  var newList = [];
  const layoutGame = document.getElementById("layoutGame");
  nodecg.readReplicant("raceInfo", "Rando-Racer", (newrace) => {
    nodecg.readReplicant("raceList", "Rando-Racer", (repraceList) => {
      if(repraceList){
        repraceList.forEach((race) => {
          if(id){
            if (race.id == id) {
              race.hosts = element.value;
              race.type = newrace.type||"sync";
              race.runners = newrace.runners;
              race.jogo = elementGame.value;
              race.estimativa = elementEstimate.value;
              race.layout = layoutGame.value;
                            
              var raceInfoCurrent = nodecg.Replicant("raceInfoCurrent");
              if(raceInfoCurrent.value){
                if(raceInfoCurrent.value.id == id){
                  raceInfoCurrent.value = race;
                }
              }

            }
          }
          newList.push(race);
        });
      }
      if(!id){
        var race = {
          id: uuidv4(),
          hosts : element.value,
          type : newrace.type||"sync",
          runners : newrace.runners,
          jogo : elementGame.value,
          estimativa : elementEstimate.value,
          layout : layoutGame.value
        }
        newList.push(race);
      }
      raceList.value = newList;
      raceInfo.value = null;

    });
  });
}