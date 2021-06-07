
var randoTracker = nodecg.Replicant("randoTracker");
var raceInfo = nodecg.Replicant("raceInfo");
var randoLayout = nodecg.Replicant("randoLayout");


const PlayerCount = document.getElementById("PlayerCount");
const TypeSelect = document.getElementById("TypeSelect");

var randoBase = nodecg.Replicant("randoBase");


var locationListOOT = ["???", "FREE", "DKT", "DDC", "JJB", "FOR", "WAT", "FIR", "SPR", "SHD"];

var locationListALTTP = ["unk", "crystal", "red", "pendant", "green"];

var magicListALTTP = ["???", "MM", "TR", "BOTH"];

var players = 2;
var layout = "OOT";
var randoList = ["OOT", "MMR","ALTTP","SMZ3"];

var setup = () => {
    nodecg.readReplicant("randoCount", "Rando-Racer", (optionsCount) => {
        players = optionsCount;
        nodecg.readReplicant("randoLayout", "Rando-Racer", (optionsLayout) => {
        
            players = optionsCount || 2;
            layout = optionsLayout || "OOT";
            TypeSelect.innerHTML = "";
            randoList.forEach(element => {
                var x = document.createElement("OPTION");
                x.setAttribute("value", element);
                var t = document.createTextNode(element);
                x.appendChild(t);
                TypeSelect.appendChild(x);
            });
            TypeSelect.value = layout;
            PlayerCount.value = players;
        });
    });
}

setup();

TypeSelect.onchange = () => {
    randoLayout.value = TypeSelect.value;
}

var baseData = [
    [
        //jewels
        {
            type: "item",
            name: "forca",
            have: 0,
            max: 3,
            location: ""
        },
        {
            type: "item",
            name: "bow",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hookshot",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "bomb",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "slingshot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "lens",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "goron_tunic",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "zora_tunic",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "break"
        },
        {
            type: "item",
            name: "scale",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "light_arrows",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "iron_boots",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hammer",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "boomerang",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "dins_fire",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "ZL",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "suns",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "break",
        },
        
        {
            type: "item",
            name: "claim_check",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "fire_arrows",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hover_boots",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mirror_shield",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "rutos",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "farore_wind",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "Epona",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "time",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "break",
        },
        
        {
            type: "music",
            name: "minuet",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "bolero",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "serenade",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "nocturne",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "requiem",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "prelude",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "sarias",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "storms",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "break",
        },
        {
            type: "jewel",
            name: "Kokiri",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "ruby",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "zora",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "forestmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "firemed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "watermed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "shadowmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "spiritmed",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "jewel",
            name: "lightmed",
            have: 0,
            max: 1,
            location: "???"
        },
    ],
    [
        {
            type: "transf_mask",
            name: "deku_mask",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "transf_mask",
            name: "goron_mask",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "transf_mask",
            name: "zora_mask",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "space",
            name: "",
            have: 0,
            max: 1,
            location: ""
        },



        {
            type: "space",
            name: "",
            have: 0,
            max: 1,
            location: ""
        },


        
        {
            type: "boss_mask",
            name: "gyorg",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "boss_mask",
            name: "goth",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "boss_mask",
            name: "odowa",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "boss_mask",
            name: "twinmold",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },



        {
            type: "item",
            name: "bow",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "fire_arrow",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "ice_arrow",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "light_arrow",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hookshot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "bombs",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "shield",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "powder_keg",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "capn",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },


        

        {
            type: "item",
            name: "moons_tear",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "land_title",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "swamp_title",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mountain_title",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "ocean_title",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "letter_kafei",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "letter_mama",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "room_key",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "wallet",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },



        {
            type: "item",
            name: "postman_hat",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "all_night",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "blast",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "keaton",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "bremen",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "romani",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "magic_bean",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "magic",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "lens",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },



        {
            type: "item",
            name: "kafei",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "couple",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "truth",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "kamaro",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "gibdo",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "garo",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "gold_dust",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "bottle",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "pictobox",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },
        


        {
            type: "music",
            name: "healing",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "epona",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "storms",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "oath",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "sonata",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "goron_lullaby",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "new_wave",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "music",
            name: "elegy",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "fierce",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },
    ],
    [
        {
            type: "item",
            name: "bow",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "boomerang",
            have: 0,
            max: 3,
            location: ""
        },
        {
            type: "item",
            name: "hookshot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mushroom",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "powder",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "break",
        },


        {
            type: "item",
            name: "fire_rod",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "ice_rod",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "medal",
            name: "bombus",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "medal",
            name: "ether",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "medal",
            name: "quake",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "break",
        },


        {
            type: "item",
            name: "lantern",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hammer",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "ocarina",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "shovel",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "book",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "break",
        },



        {
            type: "item",
            name: "bottle",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "somaria",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "byrna",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "cape",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mirror",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "break",
        },



        {
            type: "item",
            name: "boot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "strength",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "flippers",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "pearl",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "sword",
            have: 0,
            max: 4,
            location: ""
        },
        {
            type: "break",
        },



        {
            type: "location",
            name: "EP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "DP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "TOH",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "POD",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "SP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "break",
        },



        {
            type: "location",
            name: "SW",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "TT",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "IP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "MM",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "TR",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "break",
        },


    ],
    [
        {
            type: "item",
            name: "bow",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "boomerang",
            have: 0,
            max: 3,
            location: ""
        },
        {
            type: "item",
            name: "hookshot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mushroom",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "powder",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "item",
            name: "charge",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "item",
            name: "ice",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "spazer",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "item",
            name: "plasma",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "wave",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "item",
            name: "space",
            have: 0,
            max: 1,
            location: ""
            },



        {
            type: "break",
        },


        {
            type: "item",
            name: "fire_rod",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "ice_rod",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "medal",
            name: "bombus",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "medal",
            name: "ether",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "medal",
            name: "quake",
            have: 0,
            max: 1,
            location: "???"
            },
        
        {
            type: "item",
            name: "morph",
            have: 0,
            max: 1,
            location: ""
            },
        
        {
            type: "item",
            name: "bomb",
            have: 0,
            max: 1,
            location: ""
            },
        
        

        {
            type: "item",
            name: "varia",
            have: 0,
            max: 1,
            location: ""
            },
        
        {
            type: "item",
            name: "gravity",
            have: 0,
            max: 1,
            location: ""
            },
        {
            type: "item",
            name: "screw",
            have: 0,
            max: 1,
            location: ""
            },
        
        
        {
            type: "item",
            name: "grapple",
            have: 0,
            max: 1,
            location: ""
        },
        
        {
            type: "break",
        },


        {
            type: "item",
            name: "lantern",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hammer",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "ocarina",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "shovel",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "book",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "spring",
            have: 0,
            max: 1,
            location: ""
            },
        {
            type: "space",
        },
        
        {
            type: "item",
            name: "ridley",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "item",
            name: "kreid",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "item",
            name: "phantoom",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "item",
            name: "draigon",
            have: 0,
            max: 1,
            location: ""
        },
        

        {
            type: "break",
        },



        {
            type: "item",
            name: "bottle",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "somaria",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "byrna",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "cape",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "mirror",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "hijump",
            have: 0,
            max: 1,
            location: ""
            },
        

        {
            type: "break",
        },



        {
            type: "item",
            name: "boot",
            have: 0,
            max: 1,
            location: ""
        },
        {
            type: "item",
            name: "strength",
            have: 0,
            max: 2,
            location: ""
        },
        {
            type: "item",
            name: "flippers",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "item",
            name: "pearl",
            have: 0,
            max: 1,
            location: "???"
        },
        {
            type: "item",
            name: "sword",
            have: 0,
            max: 4,
            location: "???"
        },
        {
            type: "item",
            name: "speed",
            have: 0,
            max: 1,
            location: ""
            },

        {
            type: "break",
        },



        {
            type: "location",
            name: "EP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "DP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "TOH",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "POD",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "SP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
            },
        
        {
            type: "item",
            name: "mother",
            have: 0,
            max: 1,
            location: ""
        },


        {
            type: "break",
        },



        {
            type: "location",
            name: "SW",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "TT",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "IP",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "MM",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "location",
            name: "TR",
            have: 0,
            max: 1,
            location: "",
            prize:"unk"
        },
        {
            type: "item",
            name: "ganon",
            have: 0,
            max: 1,
            location: ""
        },

        {
            type: "break",
        },


    ]
];

randoBase.value = {
    'baseData': baseData,
    'locationListOOT': locationListOOT,
    'locationListALTTP': locationListALTTP,
    'magicListALTTP': magicListALTTP,
};

randoTracker.on("change", (newVal, oldVal) => {
    if(newVal){
        updateTracker(newVal);
    }
});


function setPlayers(){
    nodecg.readReplicant("randoTracker", "Rando-Racer", (newVal) => {
    var newData =
        {
            layout: layout,
            runnerInfo:[]
        };
        for (i = 0; i < newVal.runnerInfo.length; i++) {
            if (layout == "OOT") {
                newData.runnerInfo[i] = {
                    name:newVal.runnerInfo[i].name,
                    id:newVal.runnerInfo[i].id,
                    itens: baseData[0]
                }
            }
            if (layout == "MMR") {
                newData.runnerInfo[i] = {
                    name:newVal.runnerInfo[i].name,
                    id:newVal.runnerInfo[i].id,
                    itens: baseData[1]
                }
            }
            if (layout == "ALTTP") {
                newData.runnerInfo[i] = {
                    name:newVal.runnerInfo[i].name,
                    id:newVal.runnerInfo[i].id,
                    itens: baseData[2]
                }
            }
            if (layout == "SMZ3") {
                newData.runnerInfo[i] = {
                    name:newVal.runnerInfo[i].name,
                    id:newVal.runnerInfo[i].id,
                    itens: baseData[3]
                }
            }
        }
        randoTracker.value = newData;
    });

}

raceInfo.on("change", (newVal, oldVal) => {
    players = newVal.runners.length;
    raceInfoData = newVal;
    if(oldVal){
        if (newVal.runners.length != oldVal.runners.length) {
            var newData =
            {
                layout: layout,
                runnerInfo:[]
            };
            for (i = 0; i < players; i++) {
                if (layout == "OOT") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[0]
                    }
                }
                if (layout == "MMR") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[1]
                    }
                }
                if (layout == "ALTTP") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[2]
                    }
                }
                if (layout == "SMZ3") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[3]
                    }
                }
            }
            randoTracker.value = newData;
            setPlayers();
        }
    }else{
        var newData =
            {
                layout: layout,
                runnerInfo:[]
            };
            for (i = 0; i < players; i++) {
                if (layout == "OOT") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[0]
                    }
                }
                if (layout == "MMR") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[1]
                    }
                }
                if (layout == "ALTTP") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[2]
                    }
                }
                if (layout == "SMZ3") {
                    newData.runnerInfo[i] = {
                        name:newVal.runners[i].name,
                        id:newVal.runners[i].id,
                        itens: baseData[3]
                    }
                }
            }
            randoTracker.value = newData;
            setPlayers();

    }
});

randoLayout.on("change", (newVal, oldVal) => {
    if (newVal) {
        layout = newVal;
        setPlayers();
    }
});


function resetTracker(player) {    
    nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {
        var newData =
        {
            layout: optionsOld.layout,
            runnerInfo:optionsOld.runnerInfo
        }
        if (optionsOld.layout == "OOT") {
            newData.runnerInfo[player].itens = baseData[0];
        }
        if (optionsOld.layout == "MMR") {
            newData.runnerInfo[player].itens = baseData[1];
        }
        if (layout == "ALTTP") {
            newData.runnerInfo[player].itens = baseData[2];
        }
        if (layout == "SMZ3") {
            newData.runnerInfo[player].itens = baseData[3];
        }
        randoTracker.value = newData;
    });
}

function updateTracker(newVal) {

    var medalwidth = "65px";
    var medalheight = "70px";

    var prizemarginT = "30px";
    var prizemargin = "5px";
    var prizewidth = "50px";
    var prizeheight = "20px";

    var itemwidth = "50px";
    var itemheight = "50px";

    var randoTrackerDiv = document.getElementById("randoTracker");
    randoTrackerDiv.style.height = "auto";
    randoTrackerDiv.innerHTML = "";
    if(newVal.runnerInfo){
        for (i = 0; i < newVal.runnerInfo.length; i++) {

            var newcontent = document.createElement('div');

            var tracker = "<span>Player " +(i+1) + " - "+ newVal.runnerInfo[i].name+"<span></br>";
            if(newVal.runnerInfo[i].itens){
                newVal.runnerInfo[i].itens.forEach(element => {
                    var imgName = element.name;
                    if (element.have == 0) {
                        imgName += "_fade";
                    } else {
                        if (element.have != element.max || (element.have == element.max && element.max != 1) ) {
                            imgName += "_" + element.have;
                        }
                    }
                    
                    if (element.type == "break") {
                        tracker += "</div><div style = 'margin-left:5px;'>";

                    } else { 
                        switch (element.type) {
                            //OOT
                            case "jewel":
                                tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + medalwidth + ";height :" + medalheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:45px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                            break;
                            case "medal":
                                tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' style='margin-top:35px' onclick=\"rotateLocation('" + element.name + "','" + element.location + "','"+newVal.layout+"',"+i+")\">" + element.location + "</div></div>";
                            break;
                            case "location":
                                tracker += "<div style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;background-position: center; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"><div class='location' onclick=\"rotatePrize('" + element.name + "','" + element.prize + "','"+newVal.layout+"',"+i+")\" style='display:inline-block; text-align: center;vertical-align: bottom;background-repeat: no-repeat;background-size: contain;margin-top:"+prizemarginT+";margin-left:"+prizemargin+"; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + element.prize + ".png\"); width:" + prizewidth + ";height :" + prizeheight + "'></div></div>";
                            break;
                            case "item":
                            case "music":
                            case "transf_mask":
                            case "boss_mask":
                                tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; background-image: url(\"Images//Tracker//"+newVal.layout+"//" + imgName + ".png\"); width:" + itemwidth + ";height :" + itemheight + "' onclick=\"addItem('" + element.name + "','"+layout+"',"+i+")\"></div>";
                                break;
                            case "space":
                                tracker += "<div style='display:inline-block;background-repeat: no-repeat;background-size: contain; width:" + itemwidth + ";height :" + itemheight + "' ></div>";
                                break;
                        }
                    }
                });
                tracker += `<button onclick="resetTracker(${i})">Reset</button>`;    
            }
            newcontent.innerHTML = tracker;
            randoTrackerDiv.appendChild(newcontent);
        }
    }
}

var prior = false;

function rotateLocation(name, location, type, player) {
    prior = true;
    var list = [];
    if (type == "OOT") {
        list = locationListOOT;
    }
    if (type == "ALTTP" || type == "SMZ3") {
        list = magicListALTTP;
    }
    
    var nextLoc = "";
    var ins = false;
    list.forEach((loc) => {
        if (ins) { 
            nextLoc = loc
            ins = false;
        }
        if (location == loc) { 
            ins = true;
        }
    });
    if (nextLoc == "") { 
        nextLoc = "???";
    }

    var newList = [];
    nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {
        if (optionsOld) {

            var infos = [];
            for (i = 0; i < optionsOld.runnerInfo.length; i++) {
                infos[i] = optionsOld.runnerInfo[i]
            }

            optionsOld.runnerInfo[player].itens.forEach((item) => {
                if (item.name == name) {
                    item.location = nextLoc;
                }
                newList.push(item);
            });

            infos[player].itens = newList;

            var full = {
                layout:optionsOld.layout,
                runnerInfo: infos
            }

            randoTracker.value = full;
        }
    });
    setTimeout(() => {
        prior = false
    }, 300);
}

function rotatePrize(name, prize, type, player) {
    prior = true;
     
    var nextLoc = "";
    var ins = false;
    locationListALTTP.forEach((loc) => {
        if (ins) { 
            nextLoc = loc
            ins = false;
        }
        if (prize == loc) { 
            ins = true;
        }
    });
    if (nextLoc == "") { 
        nextLoc = "unk";
    }

    var newList = [];
    nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {

        if (optionsOld) {

            
            var infos = [];
            for (i = 0; i < optionsOld.runnerInfo.length; i++) {
                infos[i] = optionsOld.runnerInfo[i]
            }

            optionsOld.runnerInfo[player].itens.forEach((item) => {
                if (item.name == name) {
                    item.prize = nextLoc;
                }
                newList.push(item);
            });

            infos[player].itens = newList;

            var full = {
                layout:optionsOld.layout,
                runnerInfo: infos
            }

            randoTracker.value = full;
        }
    });

    setTimeout(() => {
        prior = false
    }, 300);
}

function addItem(name, layout, player) {
    setTimeout(() => {
        if (prior == false) {
            var newList = [];
            nodecg.readReplicant("randoTracker", "Rando-Racer", (optionsOld) => {
                if (optionsOld) {

            
                    var infos = [];
                    for (i = 0; i < optionsOld.runnerInfo.length; i++) {
                        infos[i] = optionsOld.runnerInfo[i]
                    }
        
                    optionsOld.runnerInfo[player].itens.forEach((item) => {
                        if (item.name == name) {
                            item.have = item.have + 1;
                            if (item.have > item.max) {
                                item.have = 0;
                            }
                        }
                        newList.push(item);
                    });

                    infos[player].itens = newList;

                    var full = {
                        layout:optionsOld.layout,
                        runnerInfo: infos
                    }
        
                    randoTracker.value = full;

                }
            });
        }
    }, 200);
}