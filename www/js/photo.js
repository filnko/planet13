	var pictureSource;   // picture source
    var destinationType; // sets the format of returned value 
    var image;

    document.addEventListener("deviceready",onDeviceReady,false);

    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }
    
    function onPhotoURISuccess(imageURI) {
		image = imageURI;
		console.log("imageURI = " + imageURI);
    }

    function capturePhoto() {
      	// Take picture using device camera and retrieve image as base64-encoded string
      	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
        destinationType: destinationType.FILE_URI });
    }

    function getPhoto(source) {
      	// Retrieve image file location from specified source
      	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

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
    
			var options = new FileUploadOptions();
				options.fileKey="Filedata";
				options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
				console.log(options.fileName);
				options.mimeType="image/jpeg";
				
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
	}

	function fail(response) {
		navigator.notification.alert("Fehler beim Hochladen! Error during upload!", null, "Error"); 
		console.log("Code = " + response.responseCode);
		console.log("upload error source " + response.source);
		console.log("upload error target " + response.target);
	}
    
$(document).ready(function() {
	$("#upload").click(function() {
		uploadPhoto(image);
	});
})
