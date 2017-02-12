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
	var artifactPayToken = artifactData['payment']['addresses'][0]['token'];
	var artifactPayAddress = artifactData['payment']['addresses'][0]['address'];
	var artifactNetwork = artifactData['storage']['network'];
    var trackPath = "https://ipfs.alexandria.io/ipfs/";
	var artifactLocation = artifactData['storage']['location'];
	var artifactMainDisplayName = artifactData['storage']['files'][0]['dname'];
	var artifactMainFileName = artifactData['storage']['files'][0]['fname'];
	var artifactPlayer = '<audio src="'+trackPath+artifactLocation+'/'+artifactMainFileName+'" controls></audio>';
	var artifactStr = '<h1>'+artifactTitle+'</h1><p>Creator: '+artifactCreator+'<br />Address: '+artifactPublisher+'<br />Year: '+artifactYear+'<br />Runtime: '+artifactRuntime+'<br />Published: '+artifactTimestamp+'<br />Payment: '+artifactPayToken+' '+artifactPayAddress+'<br />Network: '+artifactNetwork+'<br />Main File: '+artifactLocation+'/'+artifactMainFileName+'</p><div>'+artifactPlayer+'</div><div>'+JSON.stringify(artifactData, null, "    ")+'</div>';
	$('#artifactView').append(artifactStr);
}