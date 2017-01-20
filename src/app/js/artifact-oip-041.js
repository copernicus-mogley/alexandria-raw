function parseArtifactData(artifactObj) {
	if (artifactObj['media-data']){
		var artifactData = artifactObj['media-data']['alexandria-media'];
	} else {
		var artifactData = artifactObj['oip-041']['artifact'];
	}
	return artifactData;
}

function loadArtifact(artifactData) {
	$('#artifactView').show();
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
	var artifactStr = '<h1>'+artifactTitle+'</h1>';
	$('#artifactView').append(artifactStr);
}