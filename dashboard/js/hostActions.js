const element = document.getElementById("hostName");
const runnersDiv = document.getElementById("runnersDiv");
const syncSwitch = document.getElementById("syncSwitch");
var hostName = nodecg.Replicant("hostName"); 
var raceInfo = nodecg.Replicant("raceInfo"); 

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
    syncSwitch.checked = (newVal.type != "async");
    if(runners){
      for(var i =0;i<runners.length;i++){

        html += `
        <fieldset>
        <input type='text' id='RunnerName`+i+`' placeholder='Nome' value="`+runners[i].name+`" />
        <input type='text' id='RunnerStream`+i+`' placeholder='Twitch' value="`+runners[i].stream+`" /><br>`;

        if(newVal.type != "async"){
          html += `<input type='text' id='RunnerAlt`+i+`' placeholder='TwitchAtl' value="`+runners[i].alt+`" /><br>`;
        }else{
          html += `<input type='text' id='RunnerUrl`+i+`' placeholder='Url Video' value="`+runners[i].url+`" />
          <input type='text' id='RunnerStart`+i+`' placeholder='Video Start' value="`+runners[i].start+`" /><br>`;
        }
        
        html += `<button onclick="changeRunner(`+i+`)" >Save</button>
        <button onclick="trackRunner('`+runners[i].id+`')" >Tracker</button>
        <button onclick="cropRunner('`+runners[i].id+`')" >Crop</button>
        <button onclick="remRunner(`+i+`)" >Remover</button>
        </fieldset>`;
      }
    }
    html += `<fieldset>
      <input type='text' id='addRunnerName' placeholder='Nome' />
      <input type='text' id='addRunnerStream' placeholder='Twitch' /><br>`;

      if(newVal.type != "async"){
        html += `<input type='text' id='addRunnerAlt' placeholder='TwitchAtl' /><br>`;
      }else{
        html += `<input type='text' id='addRunnerUrl' placeholder='Url Video' />
        <input type='text' id='addRunnerStart' placeholder='Video Start' /><br>`;
      }
      html += `<button onclick="addRunner()" >Adicionar</button>
      </fieldset>`;
    runnersDiv.innerHTML = html;
  }else{
    raceInfo.value = baseData;
  }
}

function changeRunner(i){
  const Name = document.getElementById("RunnerName"+i);
  const Stream = document.getElementById("RunnerStream"+i);
  const AltStream = document.getElementById("RunnerAlt"+i);
  const url = document.getElementById("RunnerUrl"+i);
  const start = document.getElementById("RunnerStart"+i);
  raceInfo.value.runners[i].name = Name.value;
  raceInfo.value.runners[i].stream = Stream.value;
  if(AltStream)  
    raceInfo.value.runners[i].alt = AltStream.value;
  if(url)  
    raceInfo.value.runners[i].url = url.value;
  if(start)  
    raceInfo.value.runners[i].start = start.value;
}

function addRunner() {
  const Name = document.getElementById("addRunnerName");
  const Stream = document.getElementById("addRunnerStream");
  const AltStream = document.getElementById("addRunnerAlt");
  const url = document.getElementById("addRunnerUrl");
  const start = document.getElementById("addRunnerStart");
  var newId = uuidv4();

  var runnerobj = {
    id: newId,
    name: Name.value,
    stream: Stream.value,
    alt: AltStream ? AltStream.value:"",
    url:url ? url.value:"",
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

function trackRunner(id){
  window.open("/bundles/Rando-Racer/graphics/tracker.html?pl="+id, '_blank');
}

function cropRunner(id){
  window.open("/bundles/Rando-Racer/graphics/crop.html?pl="+id, '_blank');
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