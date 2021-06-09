
var layout = nodecg.Replicant("streamLayout");
var layoutList = nodecg.Replicant("streamLayoutList");

var fileDiv = document.getElementById("file");


layout.on("change", (newVal,oldVal)=>{
    var atual = document.getElementById('atual');
    atual.innerHTML = newVal;
});

layoutList.on("change", (newVal,oldVal)=>{
    if(newVal){
       var html = "<option value =''>Nenhum</option>";
       for(var i = 0; i<newVal.length ; i++){
        html += `<option value = "${newVal[i]}" ${layout.value?layout.value == newVal[i]?"selected":"":""}  >${newVal[i]}</option>`
       }
       var change = document.getElementById('change');
       change.innerHTML = html;
    }
});


function New(){
    var form = document.getElementById('frmUploader');
    var data = new FormData( form );

    var btn = document.getElementById('btnCadastrar');
    btn.innerHTML = "Carregando"
    btn.disabled = true;
    
    data.append("path","Rando-Racer");
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
        if(layoutList.value && layoutList.value != {}){
            if(layoutList.value.indexOf(e) == -1){
                layoutList.value.push(e);
            }
        }else{
            layoutList.value = [e];
        }
        layout.value = e;
        
        var btn = document.getElementById('btnCadastrar');
        btn.innerHTML = "Cadastrar"
        btn.disabled = false;
    }
}

function removeLayout(){
    var change = document.getElementById("change");
    if(change.value){
        if(confirm("Deseja remover o pacote: "+change.value+"?")){
            if(layoutList.value.indexOf(change.value) != -1){
                layoutList.value.splice(layoutList.value.indexOf(change.value),1)
            }
            if(layout.value == change.value){
                layout.value = "";
            }
        }
    }
}

function downloadPack(){
    var change = document.getElementById("change");
    if(change.value){
        var file = "/bundles/Rando-Racer/pacotes/" + change.value+"/"+change.value+".zip";
        window.open(file);
    }
}

function Change(){
    
    var change = document.getElementById("change");
    layout.value = change.value;
}


