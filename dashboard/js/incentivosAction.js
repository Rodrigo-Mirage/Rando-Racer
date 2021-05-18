var incentData = nodecg.Replicant("incentData");
var donateTotal = nodecg.Replicant("donateTotal");
var incentUrl = nodecg.Replicant("incentUrl");

const UrlElement = document.getElementById("incentUrl");

var actualUrl = "https://spreadsheets.google.com/feeds/cells/19PkBpuZZTroJLuC0qjFKPrTlWqNNvlVgjUs-15Kp9ug/6/public/full?alt=json";

//https://spreadsheets.google.com/feeds/cells/19PkBpuZZTroJLuC0qjFKPrTlWqNNvlVgjUs-15Kp9ug/6/public/full?alt=json
//https://docs.google.com/spreadsheets/d/19PkBpuZZTroJLuC0qjFKPrTlWqNNvlVgjUs-15Kp9ug/edit#gid=0
//2PACX-1vTfi3B83R_7Zh3ff5sN2E0xKm-bKpoU7bpx5UkbZnvolSfz5CHUxaWd3ajNut53YbhTy1wN9qlKwkC4

nodecg.readReplicant("incentUrl", (value) => {
  actualUrl = value;
  UrlElement.value = actualUrl;
});

setTimeout(() => {
function reorder() {
  nodecg.readReplicant("runDataArray", "nodecg-speedcontrol", (runArray) => {
    nodecg.readReplicant("incentData", (incentArray) => {
      var reordered = [];
      var newid = 0;

      for (var i = 0; i < runArray.length; i++) {
        for (var j = 0; j < incentArray.length; j++) {
          if (runArray[i].id == incentArray[j].runID) {
            incentArray[j].id = newid;
            reordered.push(incentArray[j]);
            newid++;
          }
        }
      }
      incentData.value = reordered;
    });
  });
}

incentUrl.on("change", (newVal, oldVal) => {
  if (newVal != oldVal && oldVal) {
    actualUrl = newVal;
    reImport();
  }
});

function reImport() {
  incentUrl.value = "https://spreadsheets.google.com/feeds/cells/19PkBpuZZTroJLuC0qjFKPrTlWqNNvlVgjUs-15Kp9ug/6/public/full?alt=json";
  if (actualUrl && actualUrl != "undefined") {
    $.getJSON(actualUrl, function (data) {
      var entry = data.feed.entry;
      var tabela = [];
      var linha = {};
      var opts = [];
      var option = {};
      var tipo = "";
      var n_v = "n";

      $(entry).each(function () {
        var col = this.title.$t.charAt(0);

        if (
          this.title.$t.charAt(1) != 1 ||
          (this.title.$t.charAt(1) == 1 && this.title.$t.charAt(2) != null)
        ) {
          if (col == "Z" && this.title.$t.charAt(1) == 1) {
            donateTotal.value = this.content.$t;
          }

          if (col == "A" && linha.name != "name") {
            if (opts.length > 0 && tipo == "Mod") {
              linha.options = opts;
            }
            tabela.push(linha);
            linha = {};
            opts = [];
          }
          switch (col) {
            case "A":
              linha.name = this.content.$t;
              break;
            case "B":
              var t =
                this.content.$t.charAt(0).toUpperCase() +
                this.content.$t.slice(1);

              linha.type = t;
              tipo = t;
              break;
            case "C":
              if (tipo == "Arc") linha.valueA = this.content.$t;
              break;
            case "D":
              if (tipo == "Arc") linha.valueB = this.content.$t;
              break;
            case "E":
              linha.runID = this.content.$t;
              break;
            default:
              if (col != "Z") {
                if (n_v == "n") {
                  option.name = this.content.$t;
                  n_v = "v";
                } else {
                  option.value = this.content.$t;
                  opts.push(option);
                  option = {};
                  n_v = "n";
                }
              }
          }
        }
      });

      tabela.shift();
      update(tabela);
    });
  }
}

function update(table) {
  nodecg.readReplicant("runDataArray", "nodecg-speedcontrol", (runArray) => {
    var count = 0;
    for (var i = 0; i < runArray.length; i++) {
      for (var j = 0; j < table.length; j++) {
        if (runArray[i].game == table[j].runID) {
          table[j].id = count;
          table[j].game = table[j].runID;
          table[j].runID = runArray[i].id;
          count++;
        }
      }
    }

    var reordered = [];
    var newid = 0;

    for (var i = 0; i < runArray.length; i++) {
      for (var j = 0; j < table.length; j++) {
        if (runArray[i].id == table[j].runID) {
          table[j].id = newid;
          reordered.push(table[j]);
          newid++;
        }
      }
    }
    incentData.value = reordered;
  });
}

function reorder(table) {
  nodecg.readReplicant("runDataArray", "nodecg-speedcontrol", (runArray) => {
    var reordered = [];
    var newid = 0;

    for (var i = 0; i < runArray.length; i++) {
      for (var j = 0; j < table.length; j++) {
        if (runArray[i].id == incentArray[j].runID) {
          incentArray[j].id = newid;
          reordered.push(incentArray[j]);
          newid++;
        }
      }
    }
    incentData.value = reordered;
  });
}

function loop() {
  reImport();
  setTimeout(function () {
    loop();
  }, 5000);
}
loop();

}, 1000);
