var result = document.getElementById('result');

function verify(){
	// Nome da cidade desejada.
	var city = document.getElementById('city').value;	

		// URL de requisição por nome da cidade - Token = SEU TOKEN de acesso.
		var url_Name = "http://apiadvisor.climatempo.com.br/api/v1/locale/city?name="+city+"&token=f8a3dcc78ce906ec037c0169a5f42cdb";

	// Enviando a requisição por Ajax.
	$.ajax({
		url: encodeURI(url_Name),
		dataType: 'json',
		success:function(json){
			if(json.length > 0) {
				for(var x = 0; x<json.length;x++ ) {
					// Capturando o ID  da cidade e enviando como parametro para manipulação.
					getInfo(json[x].id);
				}
			} else {
				result.innerHTML = "Sem registros...";
			}
		}

	});
}

// Através do ID  da cidade é possível pegar mais informações de clima.
function getInfo(id) {
	//URl para requisitar informações da cidade pelo ID.
	var url_ID = "http://apiadvisor.climatempo.com.br/api/v1/weather/locale/"+id+"/current?token=f8a3dcc78ce906ec037c0169a5f42cdb";

	$.ajax({
		url: encodeURI(url_ID),
		dataType: 'json',
		beforeSend:function(){
			result.innerHTML = "Carregando...";
		},
		success:function(json){			
			// Imprimindo os dados desejados.	
			result.innerHTML = 
			"Temperatura: "+json.data.temperature + "° C <br/>"+
			"Condição: "+json.data.condition;			
		}
	});
}

