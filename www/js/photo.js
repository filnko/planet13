
    var image;

    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {
    }
    
    function onPhotoURISuccess(imageURI) {
		image = imageURI;
		
		var img = document.getElementById('showPhoto');
		//img.style.display = 'block';
    	img.src = imageURI;
		$("#showPhoto").fadeIn();
	/*
		console.log($("#showPhoto"));
		$("#showPhoto").attr("src") = imageURI;
		console.log($("#showPhoto"));
	*/	
		var maxwidth	 	= $(window).width();
		var realwidth  	 	= $("#showPhoto").width();
        var realheight 	 	= $("#showPhoto").height();
        var factor  		= maxwidth/realwidth;
        
        console.log("maxwidth: "+maxwidth);
        console.log("realwidth: "+realwidth);
        console.log("realheight: "+realheight);
        console.log("factor: "+factor);

    	$("#showPhoto").width(realwidth*factor);
        $("#showPhoto").height(realheight*factor);

		$("#submitButtons").fadeIn();
		
    }

    function capturePhoto() {
      	// Take picture using device camera 
      	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true });
    }

    function getPhoto() {
      	// Retrieve image file location from photo library
      	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80, 
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY });
    }

    function onFail(message) {
		navigator.notification.alert("Kein Foto ausgewählt! No photo chosen!", null, "Error"); 
    }
    
    function uploadPhoto(imageURI) {
        	
        var dataOk 		= true;
        var name 		= $("#name").val();
		var title 		= $("#title").val();
        var description = $("#description").val();
        var ok 			= $("#ok").val();
        var picturedb	= $("#picturedb").val();

        if (name.length<2){
        	dataOk = false;
			navigator.notification.alert("Name fehlt! Name is missing!", null, "Error"); 
        }
        
        if (title.length<4 && dataOk){
        	dataOk = false;
			navigator.notification.alert("Titel fehlt! Title is missing!", null, "Error"); 
        }
        
        if (ok!="on" && dataOk){
        	dataOk = false;
			navigator.notification.alert("Zustimmung fehlt! Allowance is missing!", null, "Error"); 
        }

        if (dataOk){
        
			$("#submitButtons").fadeOut();
			$("#photoButtons").fadeOut();
    
			var options = new FileUploadOptions();
				
			var params = {};
				params.name = name;
				params.title = title;
        		params.description = description;
        		params.ok = ok;
        		params.picturedb = picturedb;
        		params.source = "app";

        	options.params = params;

	        var ft = new FileTransfer();
    	    ft.upload(image, encodeURI("http://fotoupload.planet13.at"), success, fail, options);
    	    
    	}
    	    
    }

	function success(response) {
		navigator.notification.alert("Erfolgreich hochgeladen! Successfully uploaded!", null, "Yeah!"); 
		console.log("Code = " + response.responseCode);
		console.log("Response = " + response.response);
		console.log("Sent = " + response.bytesSent);
		
		$("#showPhoto").fadeOut();
		image = "";
		$("#submitButtons").fadeIn();
		$("#photoButtons").fadeIn();
		
	}

	function fail(response) {
		navigator.notification.alert("Fehler beim Hochladen! Error during upload!", null, "Error"); 
		console.log("Code = " + response.responseCode);
		console.log("upload error source " + response.source);
		console.log("upload error target " + response.target);
		
		$("#submitButtons").fadeIn();
		$("#photoButtons").fadeIn();
	}
	
$(document).ready(function() {
	$("#submitButtons").hide();
	$("#showPhoto").hide();
})
