function getAllArtifacts() {
	console.log("searching ...");
	var filteredMedia = searchAPI('media', '*', '');
//	console.info(filteredMedia);
	deDupeResults(filteredMedia);
}