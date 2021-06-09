'use strict';

const fs = require('fs');

class fileSystem {

    constructor(nodecg){

        var layout = nodecg.Replicant("streamLayout");
        var layoutItens = nodecg.Replicant("layoutItens");
        var layoutLocations = nodecg.Replicant("layoutLocations");

        layout.on("change", (newVal, oldVal) => {
            if(newVal){
                if(fs.existsSync("./bundles/Rando-Racer/pacotes/"+newVal+"/tracker.json")){
                    let rawdata = fs.readFileSync("./bundles/Rando-Racer/pacotes/"+newVal+"/tracker.json");
                    let trackerData = JSON.parse(rawdata);
                    if(trackerData){
                        layoutItens.value = trackerData.itens;
                        layoutLocations.value = trackerData.locations;
                    }else{
                        console.log("dados invalidos");
                    }
                }else{
                    console.log("Tracker.json nao encontrado");
                    layoutItens.value = null;
                    layoutLocations.value = null;
                }
            }else{
                layoutItens.value = null;
                layoutLocations.value = null;
            }
        });
    }
}

module.exports = fileSystem;