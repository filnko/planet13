
var image;

document.addEventListener("deviceready",onDeviceReady,false);

function onDeviceReady() {
	// do something?
}

function onPhotoURISuccess(imageURI) {
	image = imageURI;

	var imgWidth = $(window).width()-30;

	$("#showPhoto").attr("src", imageURI);
	$("#showPhoto").width(imgWidth);
	$("#showPhoto").fadeIn();

	$("#submitButtons").fadeIn();
	
}

function capturePhoto() {
  	// Take picture using device camera 
  	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80,
    destinationType: Camera.DestinationType.FILE_URI });
}

function getPhoto() {
  	// Retrieve image file location from photo library
  	navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 80, 
    destinationType: Camera.DestinationType.FILE_URI,
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
    var stufe 		= $("#stufe").val();
    
	$("#submitButtons").fadeOut();

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
			options.fileKey="file";
			options.fileName="image.jpg";
			options.mimeType="image/jpeg";
			
		var params = {};
			params.name = name;
			params.title = title;
    		params.description = description;
    		params.ok = ok;
    		params.stufe = stufe;
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
})
