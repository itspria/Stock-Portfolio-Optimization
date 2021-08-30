//can be used for testing api
sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
btc_url = "http://127.0.0.1:5000/getBtcData"
aapl_url = "http://127.0.0.1:5000/getAaplData"
pf_url = "http://127.0.0.1:5000/getPortfolioData"
closevals = []
dates = []
//sample data retrieval
d3.json(btc_url).then(function(data){
    console.log(data)    
    stocksData = data.stocksdata;
   
    stocksData.forEach(row => {    
        
        closevals.push(row.adjclose);
        dates.push(row.formatted_date);    
    });

    chartdata = {
        labels: dates,
        datasets: [{
          label: 'Bitcoin values',
          backgroundColor: 'rgb(173, 15, 33)',
          borderColor: 'rgb(173, 15, 33)',
          
          data: closevals,
        }]
      };
    
      config = {
        type: 'line',
        data: chartdata,
        options: {}
      };
    
      var myChart = new Chart(
        document.getElementById('btc_line'),
        config
      );
});

 
 
 
