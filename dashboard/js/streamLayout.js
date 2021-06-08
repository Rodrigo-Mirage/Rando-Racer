
var layoutList = nodecg.Replicant("streamLayoutList");
var layout = nodecg.Replicant("streamLayout");

var fileDiv = document.getElementById("file");


layout.on("change", (newVal,oldVal)=>{
    console.log(newVal)
    var atual = document.getElementById('atual');
    atual.innerHTML = newVal;
});

layoutList.on("change", (newVal,oldVal)=>{
    if(newVal){
       var html = "<option value =''>Nenhum</option>";
       for(var i = 0; i<newVal.length ; i++){
        html += `<option value = "${newVal[i]}">${newVal[i]}</option>`
       }
       var change = document.getElementById('change');
       change.innerHTML = html;
    }
});


function New(){
    var form = document.getElementById('frmUploader');
    var data = new FormData( form );
    console.log("carregando")
    data.append("path","Rando-Racer");
    console.log(data)
    $.ajax( {
        url: '/upload',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        success: addLayout
      } );
}

function addLayout(e){
    if(e){
        if(layoutList.value){
            if(layoutList.value.indexOf(e) == -1){
                layoutList.value.append(e);
            }
        }else{
            layoutList.value = [e];
        }
        layout.value = e;
    }
}


function Change(){
    
    var change = document.getElementById("change");
    layout.value = change.value;
}


