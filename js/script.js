/**
* @param {String} apiKey The api key with UptimeRobot to use (can be the main api key or a monitor-specific one)
* @param {String} statusURL The URL to check
* @param {String} data The data to pass to the api in the ajax request
* @param {String} customUptimeDays The uptime percentage for a specific number of days (e.g., the last 30 days)
*/
var apiKey = '[YOUR_API_KEY]';
var statusURL = 'http://api.uptimerobot.com/getMonitors';
var uptimeForLabel = 'Google.com';
var customUptimeDays = 30;
var data = {apiKey:apiKey, logs:1, alertContacts:1, customUptimeRatio: customUptimeDays, format:'json'};

/**
* The callback function for the response
*/			
function jsonUptimeRobotApi(e) {
	var html = '';
	var updateQueue = [];
	var count = 0;
	$.each(e.monitors.monitor, function(e) {
		var alltimeUptimeRatio = this.alltimeuptimeratio;
		var customUptimeRatio = this.customuptimeratio;
		var siteName = this.friendlyname;
		var dateTime = this.log[0].datetime;
		html += '<div class="label chart-label">Total Uptime for ' + siteName + '</div><div class="chart all-' + e + '"><div class="percentage" data-percent="' + alltimeUptimeRatio + '"><span>' + alltimeUptimeRatio + '%</span></div></div>';
		html += '<div class="label chart-label">' + customUptimeDays + '-Day Uptime for ' + siteName + '</div><div class="chart custom-' + e + '"><div class="percentage" data-percent="' + customUptimeRatio + '"><span>' + customUptimeRatio + '%</span></div></div>';
		
		updateQueue.push({'class': '.chart.all-' + e, 'value': alltimeUptimeRatio});
		updateQueue.push({'class': '.chart.custom-' + e, 'value': customUptimeRatio});
	});
	
	$('.container').html(html);
	html = null;
	
	$('.chart').easyPieChart({
		animate: 1600,
		lineWidth: 10,
		size: 130,
		lineCap: 'square',
		barColor: '#88B8E6'
	});
	
	$.each(updateQueue, function(e, r) {
		//console.log(r.class);
		$(r.class).data('easyPieChart').update('100');
	});
};

$.ajax({
	type: 'POST',
	url: statusURL,
	data: data,
	dataType: 'jsonp'
});