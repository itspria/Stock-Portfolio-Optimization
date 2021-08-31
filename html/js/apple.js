//can be used for testing api
sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
url = "http://127.0.0.1:5000/getStocksCalc"

aapl_url = "http://127.0.0.1:5000/getAaplData"

closevals = []
dates = []
//sample data retrieval
d3.json(aapl_url).then(function(data){
    console.log(data)    
    stocksData = data.stocksdata;
   
    stocksData.forEach(row => {    
        
        closevals.push(row.adjclose);
        dates.push(row.formatted_date);    
    });
    closevals.reverse();
    dates.reverse();
    
    console.log(stocksData)
    chartdata = {
        labels: dates,
        datasets: [{
          label: 'Apple stock values',
          backgroundColor: 'rgb(173, 15, 33)',
          borderColor: 'rgb(173, 15, 33)',
          
          data: closevals,
        }]
      };
    
      config = {
        type: 'line',
        data: chartdata,
        options: {
          animation: {
            onComplete: () => {
              delayed = true;
            },
            delay: (context) => {
              let delay = 0;
              if (context.type === 'data' && context.mode === 'default' && !delayed) {
                delay = context.dataIndex * 300 + context.datasetIndex * 100;
              }
              return delay;
            },
          scale: {
            x: { 
              reverse: true 
            }
          }
        }
      };
    
      var myChart = new Chart(
        document.getElementById('appl_line'),
        config
      );
});

d3.json(url).then(function(data){
  console.log(data)
});

 
 
 
