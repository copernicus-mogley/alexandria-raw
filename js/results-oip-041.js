// DEDUPE SEARCH RESULTS
function deDupeResults(filteredMedia) {
	var revs = 0;
	var results = {};
	console.log(filteredMedia.length)
	results.length = 0;
	for (var i = filteredMedia.length - 1; i >= 0 ; i--) {
		if (filteredMedia[i]['media-data']){
			var artifactData = filteredMedia[i]['media-data']['alexandria-media'];
		} else {
			var artifactData = filteredMedia[i]['oip-041']['artifact'];
		}
		var deDupeHash = new String(artifactData['info']['title']+'_'+artifactData['publisher']).hashCode();
		if (results.length === 0) {
			results[results.length] = {
				0: deDupeHash,
				1: artifactData
			}
			results.length ++;
		} else {
			var isRev = in_array(deDupeHash, results);
			if (isRev === false) {
				results[results.length] = {
					0: deDupeHash,
					1: artifactData
				}
				results.length ++;
			} else {
				revs++;
			}
		}
	}
	populateSearchResults(results, 'media');
}

function in_array(what, where) {
    var a=false;
    for (var i=0; i<where.length; i++) {
        if(what == where[i][0]) {
            a=true;
            break;
        }
    }
    return a;
}

// POPULATE SEARCH RESULTS
function populateSearchResults(results, module) {
	console.info(results);
	if (module === 'publishers') {
		module = 'publisher';
	};
	if ( (module =='media') && (results) ) {
		for (var i = 0; i < results.length; i++) {
			appendResults(results[i][1]);
		}
		$('#browse-media-wrap #'+module+'-results-wrap .row.'+module+'-entity:first-of-type').addClass('first');
	} else if ( (module =='publisher') && (results) ) {
		for (var i = 0; i < results.length; i++) {
		}
		$('#browse-media-wrap #'+module+'-results-wrap .row.'+module+'-entity:first-of-type').addClass('first');
	}
	if (!results) {
		console.log('No results');
	}

	$('#browse-media .row.'+module+'-entity.first').each(function(){
/*		var resultsTitle = (module == 'publisher') ? ('Publishers') : ('Media');
		$(this).before('<h2 id="'+module+'-results-title">'+resultsTitle+'</h2>');
*/
	});
//	afterSearch();
}

// APPEND RESULTS TO LIST
function appendResults(artifactData){
	var artifactPublisher = artifactData['publisher'];
	var artifactInfo = artifactData['info'];
	var artifactTitle = artifactInfo['title'];
	$('.artifactList:visible').append('<li>'+artifactTitle+' | '+artifactPublisher+'</li>');
}

String.prototype.hashCode = function(){
    if (Array.prototype.reduce){
        return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    } 
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}