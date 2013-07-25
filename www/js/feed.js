var RSS   = "http://feeds.feedburner.com/planet13at";
var RSSen = "http://feeds.feedburner.com/planet13en";
var entries = [];
var selectedEntry = "";

$(document).ready(function() {

	$('#news-all').on('pageinit', function() {

		$.ajax({
			url: RSS
		}).done(function (res) {
			var xml = $(res);
			var items = xml.find("item");
	
			$.each(items, function(i, v) {
	
				entry = { 
					title:$(v).find("title").text(), 
					link:$(v).find("link").text(), 
					description:$.trim($(v).find("description").text()),
					content:$(v).find('encoded').text()
				};
				entries.push(entry);
			});
	
			var s = '';
	
			$.each(entries, function(i, v) {
				s += '<li data-theme="a"><a href="#news-single" class="news-single" onclick="loadPage('+i+')">' + 
						'<h3>'+v.title + '</h3>'+
						'<p>'+v.description+'</p></a></li>';
			});
	
			$("#articleList").append(s);
			removeSizes();
			$("#articleList").listview("refresh");
		}).fail(function() {
			navigator.notification.alert("Kein Internet! No internet!", null, "Error"); 
		});
	
	});


	//Listen for the content page to load
	$("#news-single").on("pageshow", function(prepage) {
		//Set the title
		$("#newsheadline", this).text(entries[selectedEntry].title);
		var contentHTML = "";
		contentHTML += entries[selectedEntry].content;
		contentHTML += '<a href="'+entries[selectedEntry].link + '">Auf der Homepage lesen</a>';
		$("#newscontent",this).html(contentHTML);
		removeSizes();
	});

});

function loadPage(id) {
	selectedEntry = id;
}

function removeSizes() {

	// remove youtube sizes
	$("iframe").removeAttr("width");
	$("iframe").removeAttr("height");
	
	$("a").attr("target","_system");
	
	// alter image sizes
	var contentWidth = $('[data-role="page"]').first().width()-30;
	//console.log("c "+contentWidth);
	
	$("img").each(function() {
	
		var imgsize = $(this).attr("width");
		
		if (imgsize > contentWidth){
			var factor = contentWidth/imgsize;
			$(this).attr("width", $(this).attr("width")*factor);
			$(this).attr("height", $(this).attr("height")*factor);
		}
		
	});

}