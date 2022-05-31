'use strict';

const fs = require('fs');

class fileSystem {

    constructor(nodecg){

        var layout = nodecg.Replicant("streamLayout");
        var layoutItens = nodecg.Replicant("layoutItens");
        var layoutLocations = nodecg.Replicant("layoutLocations");

        layout.on("change", (newVal, oldVal) => {
            
        });
    }
}

module.exports = fileSystem;