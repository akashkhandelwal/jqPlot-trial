$(document).ready(function(){
	var line1=[
		[1366711113000,4],
		[1366714703000,5],
		[1366797484000,6],
		[1366801078000,7],
		// [(new Date(1366368930000)),8.2]
	];
	var plot1 = $.jqplot('chart1', data, {
		title:'Default Date Axis',
		axes:{
      xaxis:{
        renderer:$.jqplot.DateAxisRenderer
      }
    },
		series:[
      {
        lineWidth:4, 
        markerOptions:{
          style:'square'
        },
        rendererOptions:{
          smooth: true
        }
      }
    ]
	});
});
