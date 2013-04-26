$(document).ready(function(){

  function schedulePlot(delay){
    setTimeout(function(){
      $.ajax({
        url: 'data.json',
        type: 'get',
        dataType: 'json',
        success: function(data){
          console.log("got data of size" + data.length);
          plot(data);
        }
      })
    }, delay)
  }
           
  function plot(data){
    console.log(data);
    if(data.length == 0){ 
      schedulePlot();
      return ;
    }
    $('#chart1').empty();
    $.jqplot('chart1', data, {
		  title:'Default Date Axis',
		  axes:{
        xaxis:{
          label: 'Time',
          renderer:$.jqplot.DateAxisRenderer
        },
        yaxis: {
          label: 'Hits'
        }
      },
      highlighter: {
        show: true,
        sizeAdjust: 7.5
      },
      cursor:{
        show: true,
        zoom:true,
        showTooltip:false
      },  
      legend: {
            show: true,
            placement: 'outsideGrid'
      },
      seriesDefaults:{
        lineWidth:4, 
          markerOptions:{
            style:'circle'
          },
          rendererOptions:{
            smooth: true
          }
      }, 
		  series:[
        {label: "Time Taken"},
        {label: "Sign up"},
        {label: "Login"},
      ]
	  });
    schedulePlot(1000);
  }

  schedulePlot(0);
});
