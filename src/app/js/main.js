$(document).ready(function(){
	cleanView();
});

function cleanView() {
	$('.viewWrapper').hide();
	$('.artifactList li').remove();
	$('.resultsCount').remove();
	$('#artifactView').children().remove();
}