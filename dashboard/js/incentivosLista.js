    var incentData = nodecg.Replicant('incentData');
    const listaElement = document.getElementById('Lista');
    var curIncentData = nodecg.Replicant('curIncentData');
    var editIncentData = nodecg.Replicant('editIncentData');
  
  
	incentData.on('change', (newVal, oldVal) => {
		
		if (newVal){
			var html = "";

			for(var i=0;i<newVal.length;i++){
				html +=  "<div class='incItem' onclick='edit("+i+")'>";
				
				html +=  newVal[i].name;
				
				
				if(newVal[i].type == 'Arc'){
					
					html += "<spam>" + newVal[i].valueA +"/"+ newVal[i].valueB + "</spam>";
					
				}
				
				if(newVal[i].type == 'Mod'){
					var itemNome = "";
					var itemVal = "";
					var maxVal =0;
					for(var j=0; j< newVal[i].options.length; j++){
						if(newVal[i].options[j].value > maxVal){
							maxVal = newVal[i].options[j].value;
							itemNome = newVal[i].options[j].name;
							itemVal = newVal[i].options[j].value;
						}
					}
					html += "<spam class='incInfo'>" + itemNome + ": " + itemVal + "</spam>";
				}
				html +=  "</div>";
			}
			listaElement.innerHTML = html;
		}		
	});
  
  function edit(i){
	  nodecg.readReplicant('incentData', value => {
	    var incentivo = {};
		if(value[i].type == 'Arc'){
			incentivo = {id:value[i].id,runID:value[i].runID,name:value[i].name,type:value[i].type,valueA:value[i].valueA,valueB:value[i].valueB,game:value[i].game};
		}
		if(value[i].type == 'Mod'){
			var options = [];
			for(var j=0;j<value[i].options.length;j++){
				options.push({name:value[i].options[j].name,value:value[i].options[j].value})
			}
			incentivo = {id:value[i].id,runID:value[i].runID,name:value[i].name,type:value[i].type,options:options,game:value[i].game};
		}
		curIncentData.value = incentivo;
		editIncentData.value = true;;
	  });
  }
  
  