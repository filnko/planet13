	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    var image;

    // Wait for Cordova to connect with the device
    document.addEventListener("deviceready",onDeviceReady,false);

    // Cordova is ready to be used!
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    
    function onPhotoURISuccess(imageURI) {
		image = imageURI;
    }

    // A button will call this function
    function capturePhoto() {
      	// Take picture using device camera and retrieve image as base64-encoded string
      	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI });
    }

    // A button will call this function
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.FILE_URI });
    }

    // A button will call this function
    function getPhoto(source) {
      	// Retrieve image file location from specified source
      	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    function onFail(message) {
		navigator.notification.alert("Fehler! Error!", null, "Error"); 
    }
    
    function uploadPhoto(imageURI) {
        	
        dataOk 		= true;
        name 		= $("#name").val();
		title 		= $("#title").val();
        description = $("#description").val();
        ok 			= $("#ok").val();
        picturedb	= $("#picturedb").val();

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
        
       		var params = {};
				params.name = name;
				params.title = title;
        		params.description = description;
        		params.ok = ok;
        		params.picturedb = picturedb;
        		params.source = "app";
    
			var options = new FileUploadOptions();
				options.fileKey="Filedata";
				options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
				options.mimeType="image/jpeg";

			var params = {};
				params.name = $("#name").val();
				params.title = $("#title").val();
        		params.description = $("#description").val();
        		params.ok = $("#ok").val();
        		params.source = "app";
        	options.params = params;

	        var ft = new FileTransfer();
    	    ft.upload(imageURI, encodeURI("http://fotoupload.planet13.at"), win, fail, options);
    	    
    	}
    	    
    }

	function win(r) {
		navigator.notification.alert("Erfolgreich hochgeladen! Successfully uploaded!", null, "Yeah!"); 
		console.log("Code = " + r.responseCode);
		console.log("Response = " + r.response);
		console.log("Sent = " + r.bytesSent);
	}

	function fail(error) {
		navigator.notification.alert("Fehler beim Hochladen! Error during upload!", null, "Error"); 
		console.log("Code = " + r.responseCode);
		console.log("upload error source " + error.source);
		console.log("upload error target " + error.target);
	}
    
$(document).ready(function() {
	$("#upload").click(function() {
		uploadPhoto(image);
	});
})
