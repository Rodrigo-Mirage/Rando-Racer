
var hostName = nodecg.Replicant("hostName");
var hostNameDiv = document.getElementById("HostName");


hostName.on("change", (newVal, oldVal) => {
      hostNameDiv.value = newVal;
});

function HostUpdate() { 
    hostName.value = hostNameDiv.value;
}