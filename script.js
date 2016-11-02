var stock_name = [], stock_val=[];
  var url = "http://query.yahooapis.com/v1/public/yql";
$(document).ready(function(){
	  var stock_name = [], stock_val=[];
	  var ctx = document.getElementById("myChart").getContext("2d");

		
$('#button').click(function() {
  var url = "http://query.yahooapis.com/v1/public/yql";
  var symbol = $("#symbol").val();
  var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");

  $.getJSON(url, 'q=' + data + "&format=json&diagnostics=true&env=http://datatables.org/alltables.env")
    .done(function(data) {
		var value = parseFloat(data.query.results.quote.LastTradePriceOnly);
      $("#result").text("Bid Price for " + symbol + ": "+ value);
	  
	  if(data.query.results.quote.LastTradePriceOnly != null && stock_name.indexOf(symbol) == -1)
	  {
	   
       $("#section").prepend('<li class="list-group-item">'+symbol+'</li>');
       stock_name.push(symbol);
       stock_val.push(value);
	   var myChart = new Chart(ctx, {
			type: 'horizontalBar',
			data: {
				labels: stock_name,
				datasets: [{
					label: 'Stock Value',
					data: stock_val,
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true,
							responsive: true,
							maintainAspectRatio: true,
							barThickness: 10
						}
					}]
				}
			}
		});
	  }
	  
    })
    .fail(function(jqxhr, textStatus, error) {
      var err = textStatus + ", " + error;
      $("#result").text('Request failed: ' + err);
    });
});



});
//Code to auto-refresh data values in the chart by querying the listed stock symbols - Would have made it work if I had some more time. But I can explain my strategy to implement it.

// function myFunction() {
    // for(i=0; i< stock_name.length; i++){
		 // var data = encodeURIComponent("select * from yahoo.finance.quotes where symbol in ('" + symbol + "')");
		 // stock_val[i] = parseFloat(data.query.results.quote.LastTradePriceOnly);
		 
		 
	// }
// }

// var i = setInterval(function() { myFunction(); }, 2000);
