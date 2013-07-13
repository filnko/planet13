
$(document).ready(function() {

	
	$("#hintergrund").load(function() {

		var pageWidth = $('[data-role="page"]').first().width()-100;
		console.log(pageWidth);
	
		var imgsize = $("#hintergrund").attr("width");
		console.log(imgsize);
		
		if (imgsize > pageWidth){
		
			var factor = pageWidth/imgsize;
			console.log(factor);
			$(this).attr("width", $(this).attr("width")*factor);
			$(this).attr("height", $(this).attr("height")*factor);
		}
		
	});
	
});
