//can be used for testing api
sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
btc_url = "http://127.0.0.1:5000/getBtcData"
aapl_url = "http://127.0.0.1:5000/getAaplData"
pf_url = "http://127.0.0.1:5000/getPortfolioData"

//sample data retrieval
d3.json(aapl_url).then(function(data){
    console.log(data)    
});

 
 
 
