// DEDUPE SEARCH RESULTS
function deDupeResults(filteredMedia) {
	var revs = 0;
	var results = {};
	results.length = 0;
	for (var i = filteredMedia.length - 1; i >= 0 ; i--) {
		var txid = filteredMedia[i]['txid'];
		var artifactData = parseArtifactData(filteredMedia[i]);
		var deDupeHash = new String(artifactData['info']['title']+'_'+artifactData['publisher']).hashCode();
		if (results.length === 0) {
			results[results.length] = {
				0: deDupeHash,
				1: artifactData,
				2: txid
			}
			results.length ++;
		} else {
			var isRev = in_array(deDupeHash, results);
			if (isRev === false) {
				results[results.length] = {
					0: deDupeHash,
					1: artifactData,
					2: txid
				}
				results.length ++;
			} else {
				revs++;
			}
		}
	}
	populateSearchResults(results, 'media');
}

// POPULATE SEARCH RESULTS
function populateSearchResults(results, module) {
	$('#searchResults').show();
	if (module === 'publishers') {
		module = 'publisher';
	};
	if ( (module =='media') && (results) ) {
		for (var i = 0; i < results.length; i++) {
			appendResults(results[i][1], results[i][2]);
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
	afterSearch();
}

// APPEND RESULTS TO LIST
function appendResults(artifactData, txid){
	var artifactType = artifactData['type'];
	var artifactPublisher = artifactData['publisher'];
	var artifactInfo = artifactData['info'];
	var artifactTitle = artifactInfo['title'];
	var artifactYear = artifactInfo['year'];
	var artifactExtra = (artifactInfo['extra-info'] ? artifactInfo['extra-info'] : artifactInfo['extraInfo']);
	var artifactCreator = getCreator(artifactType, artifactExtra);
	var artifactRuntime = (artifactExtra['runtime'] ? calcRuntime(artifactExtra['runtime']) : '');
	var artifactTimestamp = artifactData['timestamp'];
	var artifactTimestampLen = artifactTimestamp.toString().length;
	if (artifactTimestampLen == 10) {
		artifactTimestamp = parseInt(artifactTimestamp)*1000;
	}
	artifactTimestamp = new Date(artifactTimestamp);
	var artifactStr = artifactType+' | '+artifactTitle+' | '+artifactYear;
	if (artifactCreator) {
		artifactStr += ' | ' + artifactCreator;
	}
	if (artifactRuntime != '') {
		artifactStr += ' | ' + artifactRuntime;
	}
	artifactStr += ' | ' + artifactTimestamp;
	$('.artifactList:visible').append('<li><a onclick="getArtifact(&apos;'+txid+'&apos;)">'+artifactStr+'</a></li>');
}

// GET ARTIFACT CREATOR
function getCreator(artifactType, artifactExtra) {
	if ( (artifactType === 'music') || (artifactType === 'video') || (artifactType === 'book') ) {
		return artifactExtra['artist'];
	} else if ( (artifactType === 'thing') || (artifactType === 'html') ) {
		return artifactExtra['creator'];
	}
}

function afterSearch() {
	$('.artifactList:visible').before('<p class="resultsCount">'+$('.artifactList:visible li').length+' Artifacts</p>');
}

// CALCULATE RUNTIME FROM SECONDS
function calcRuntime(seconds) {
	var runSecs = seconds;
	var runMins = 0;
	var runHours = 0;
	if (runSecs > 59) {
		runMins = Math.floor(parseInt(seconds)/60);
		runSecs = runSecs-(runMins*60);
	}
	if (runSecs < 10) {
		runSecs = '0' + runSecs;
	}
	if (runMins > 59) {
		runHours = Math.floor(parseInt(runMins)/60);
		runMins = runMins-(runHours*60);
	}
	if (runMins < 10) {
		runMins = '0' + runMins;
	}
	if (runHours < 10) {
		runHours = '0' + runHours;
	}
	var runtime = runHours + ':' + runMins + ':' + runSecs;
	return runtime;
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