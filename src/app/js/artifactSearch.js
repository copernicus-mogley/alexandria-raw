function getAllArtifacts() {
	cleanView();
	console.log("searching ...");
	$('.resultsCount').remove();
	$('.artifactList li').remove();
	var filteredMedia = searchAPI('media', '*', '');
	deDupeResults(filteredMedia);
}

function getArtifact(txid) {
	cleanView();
	console.log("Loading Artifact ...");
	var artifactObj = searchAPI('media', 'txid', txid);
	var artifactData = parseArtifactData(artifactObj[0]);
	console.info(artifactData);
	loadArtifact(artifactData);
}