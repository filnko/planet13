document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	// do something? nope!
}

function tweet() {
    	
    var name 		= $("#tname").val();
	var tweet 		= $("#tweet").val();
	var dataOk 		= true;

    if (name.length<2 && dataOk){
    	dataOk = false;
		navigator.notification.alert("Name fehlt! Name is missing!", null, "Error"); 
    }
    
    if (name.length>100 && dataOk){
    	dataOk = false;
		navigator.notification.alert("Name > 100!", null, "Error"); 
    }
    
    if (tweet.length<2 && dataOk){
    	dataOk = false;
		navigator.notification.alert("Nachricht fehlt! Message is missing!", null, "Error"); 
    }
    
    if (tweet.length>320 && dataOk){
    	dataOk = false;
		navigator.notification.alert("Nachricht zu lang! Message too long!", null, "Error"); 
    }

    if (dataOk){
    
		$("#submitButtons").fadeOut();
    	
    	$.ajax({
        	url: "http://fotoupload.planet13.at/tweet", 
            type: 'POST',
            data: { name: name, tweet: tweet}
        }).fail(function(jqXHR, textStatus, errorThrown) {
			navigator.notification.alert("Fehler beim Senden! Error sending!", null, "Error"); 
    	}).done(function(jqXHR, textStatus, errorThrown) {
			if(testStatus=="success"){
				navigator.notification.alert("Erfolgreich gesendet! Successfully sent!", null, "Yeah!"); 
			} else {
				navigator.notification.alert("Fehler beim Senden! Error sending!", null, "Error"); 
			}
        });
        
        $("#submitButtons").fadeIn();
	    
	}
	    
}