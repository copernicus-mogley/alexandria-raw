function getAllArtifacts() {
	console.log("searching ...");
	$('.resultsCount').remove();
	$('.artifactList:visible li').remove();
	var filteredMedia = searchAPI('media', '*', '');
	deDupeResults(filteredMedia);
}