
    var image;

    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {
		$("#uploadPhoto").hide();
    }
    
    function onPhotoURISuccess(imageURI) {
		image = imageURI;
		$("#uploadPhoto").fadeIn();
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
		navigator.notification.alert("Fehler! Error!", null, "Error"); 
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
        
			$("#uploadPhoto").fadeOut();
    
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
    	    ft.upload(imageURI, encodeURI("http://fotoupload.planet13.at"), success, fail, options);
    	    
    	}
    	    
    }

	function success(response) {
		navigator.notification.alert("Erfolgreich hochgeladen! Successfully uploaded!", null, "Yeah!"); 
		console.log("Code = " + response.responseCode);
		console.log("Response = " + response.response);
		console.log("Sent = " + response.bytesSent);
		
		$("#uploadPhoto").fadeIn();
		$("#getPhoto").fadeIn();
		$("#capturePhoto").fadeIn();
		
	}

	function fail(response) {
		navigator.notification.alert("Fehler beim Hochladen! Error during upload!", null, "Error"); 
		console.log("Code = " + response.responseCode);
		console.log("upload error source " + response.source);
		console.log("upload error target " + response.target);
		
		$("#uploadPhoto").fadeIn();
		$("#getPhoto").fadeIn();
		$("#capturePhoto").fadeIn();
	}
