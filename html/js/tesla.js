//can be used for testing api
sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
pf_url = "http://127.0.0.1:5000/getPortfolioData"

btc_url = "http://127.0.0.1:5000/getBtcData"
aapl_url = "http://127.0.0.1:5000/getAaplData"
dal_url = "http://127.0.0.1:5000/getDalData"
gold_url = "http://127.0.0.1:5000/getGoldData"
nflx_url = "http://127.0.0.1:5000/getNflxData"
tesla_url ="http://127.0.0.1:5000/getTSLAData"
shop_url = "http://127.0.0.1:5000/getShopData"
pfizer_url = "http://127.0.0.1:5000/getPfeData"

closevals = []
dates = []
//sample data retrieval
d3.json(tesla_url).then(function(data){
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
          label: 'Tesla stock values',
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
        document.getElementById('tesla_line'),
        config
      );
});

 
 
 
