var embedData = nodecg.Replicant("embedData");
const element = document.getElementById("Embeds");
var speedcontrolBundle = "nodecg-speedcontrol";
var runDataActiveRun = nodecg.Replicant("runDataActiveRun", speedcontrolBundle);
var next4runs = nodecg.Replicant("next4runs");
var next4incs = nodecg.Replicant("next4incs");
var incentData = nodecg.Replicant("incentData");
var donateTotal = nodecg.Replicant("donateTotal");

runDataActiveRun.on("change", (newVal, oldVal) => {
  if (newVal) {
    updateSceneFields(newVal);
    getnext(newVal);
  }
});

donateTotal.on("change", (newVal, oldVal) => {
  if (newVal) {
    nodecg.readReplicant("runDataActiveRun",speedcontrolBundle, (value) => {
      getnext(value);
    });
  }
});

function updateSceneFields(runData) {
  var playerNumber = 0;

  var tags = "";
  var lista = [];

  for (var i = 0; i < runData.teams.length; i++) {
    for (var j = 0; j < runData.teams[i].players.length; j++) {
      lista.push({
        status: "Play",
        volume: i == 0 ? "0.5" : "0.0",
        channel: runData.teams[i].players[j].social.twitch,
      });
    }
  }

  embedData.value = { players: lista };

  element.innerHTML = tags;
}

function Toggle(id) {
  nodecg.readReplicant("embedData", (value) => {
    var status = value.players[id].status;
    if (status == "Play") {
      status = "Pause";
    } else {
      status = "Play";
    }
    value.players[id] = {
      status: status,
      volume: value.players[id].volume,
      channel: value.players[id].channel,
    };

    embedData.value = value;
  });
}

function ToggleSound(id) {
  nodecg.readReplicant("embedData", (value) => {
    for (var i = 0; i < value.players.length; i++) {
      value.players[i] = {
        status: value.players[i].status,
        volume: i == id ? "0.5" : "0.0",
        channel: value.players[i].channel,
      };
    }

    embedData.value = value;
  });
}

function update(id) {
  var elem = document.getElementById("runnerName" + id);
  nodecg.readReplicant("embedData", (value) => {
    var channel = value.players[id].channel;

    if (elem.value != channel) {
      value.players[id] = {
        status: "Play",
        volume: value.players[id].volume,
        channel: elem.value,
      };
    }
    embedData.value = value;
  });
}

function loadPainel(values) {
  var tags = "";
  for (var i = 0; i < values.players.length; i++) {
    if (tags != "") {
      tags += "<br>";
    }
    var reverse = values.players[i].status == "Pause" ? "Play" : "Pause";
    tags +=
      "<input id='runnerName" +
      i +
      "' value='" +
      values.players[i].channel +
      "' type='text' /> ";
    tags +=
      "<button onclick='Toggle(" +
      i +
      ")'>" +
      reverse +
      "</button><button onclick='update(" +
      i +
      ")'>Reload</button>";
    tags += "<button onclick='ToggleSound(" + i + ")'>Foco</button>";
    tags += values.players[i].volume == "0.0" ? "" : "<<<";
  }
  element.innerHTML = tags;
}

embedData.on("change", (newVal, oldVal) => {
  if (newVal) {
    loadPainel(newVal);
  }
});

function getnext(run) {
  var ignore = [];
  nodecg.readReplicant("runDataArray", speedcontrolBundle, (value) => {
    var nextruns = [];
    var inject = false;
    for (var i = 0; i < value.length; i++) {
      if (inject) {
        nextruns.push(value[i]);

        if (nextruns.length == 4) {
          break;
        }
      }
      if (value[i].id == run.id) {
        inject = true;
      }
    }
    next4runs.value = nextruns;
    nodecg.readReplicant("incentData", (value2) => {
        var nextincs = [];
        for (var i = 0; i < value2.length; i++) {
          for (var j = 0; j < nextruns.length; j++) {
            if (value2[i].runID == nextruns[j].id) {
              console.log(value2[i].runID, nextruns[j].id);
              nextincs.push(value2[i]);
            }
          }
        }
        next4incs.value = nextincs;
    });
  });
}
