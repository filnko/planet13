var RSS = "http://feeds.feedburner.com/planet13at";
var entries = [];
var selectedEntry = "";

$('#news-all').live('pageinit', function() {

	$.get(RSS, {}, function(res, code) {
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

		//console.log(xml);
		//console.log(entry);

		var s = '';

		$.each(entries, function(i, v) {
			s += '<li><a href="#news-single" class="news-single" data-entryid="'+i+'">' + 
					'<h3>'+v.title + '</h3>'+
					'<p>'+v.description+'</p></a></li>';
		});

		$("#articleList").append(s);
		removeSizes();
		$("#articleList").listview("refresh");
	});

});

function removeSizes() {

	// remove youtube sizes
	$("iframe").removeAttr("width");
	$("iframe").removeAttr("height");
	
	// alter image sizes
	var contentWidth = $('[data-role="page"]').first().width()-30;
	//console.log("c "+contentWidth);
	
	$("img").each(function() {
	
		var imgsize = $(this).attr("width");
		
		if (imgsize > contentWidth){
			var factor = contentWidth/imgsize;
			//alert("bild zu groß!");
			//console.log("i "+imgsize);
			//console.log("faktor: "+(contentWidth/imgsize));
			$(this).attr("width", $(this).attr("width")*factor);
			$(this).attr("height", $(this).attr("height")*factor);
		}
		
	});

}

$(".news-single").live("click", function() {
	selectedEntry = $(this).data("entryid");
});
	
//Listen for the content page to load
$("#news-single").live("pageshow", function(prepage) {
	//Set the title
	$("#newsheadline", this).text(entries[selectedEntry].title);
	var contentHTML = "";
	contentHTML += entries[selectedEntry].content;
	contentHTML += '<a href="'+entries[selectedEntry].link + '">Auf der Homepage lesen</a>';
	$("#newscontent",this).html(contentHTML);
	removeSizes();
});