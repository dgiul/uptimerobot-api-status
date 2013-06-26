/**
* @param {String} apiKey The monitor-specific api key with UptimeRobot to use
* @param {String} statusURL The URL to check
* @param {String} data The data to pass to the api in the ajax request
*/
var apiKey = '[YOUR_API_KEY]';
var statusURL = 'http://api.uptimerobot.com/getMonitors';
var uptimeForLabel = 'Google.com';
var data = {apiKey:apiKey, logs:1, alertContacts:1, customUptimeRatio: 30, format:'json'};

$('.chart').easyPieChart({
	animate: 2000,
	lineWidth: 10,
	size: 270,
	lineCap: 'square',
	barColor: '#88B8E6'
});

$('.chart-label').text('Alltime Uptime for: ' + uptimeForLabel);

/**
* The callback function for the response
*/			
function jsonUptimeRobotApi(e) {
	var alltimeUpdateRatio = e.monitors.monitor[0].alltimeuptimeratio;
	
	$('.percentage span').text(alltimeUpdateRatio + '%');
	$('.chart').data('easyPieChart').update(alltimeUpdateRatio);
};

$.ajax({
	type: 'POST',
	url: statusURL,
	data: data,
	dataType: 'jsonp'
});