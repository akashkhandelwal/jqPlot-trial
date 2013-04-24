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
    schedulePlot(1000);
  }

  schedulePlot(0);
});
