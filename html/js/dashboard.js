//can be used for testing api
sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
btc_url = "http://127.0.0.1:5000/getBtcData"
aapl_url = "http://127.0.0.1:5000/getAaplData"
pfe_url = "http://127.0.0.1:5000/getPfeData"

//sample data retrieval
d3.json(btc_url).then(function(data){
    console.log(data)
    stocks = data.stocksdata
    console.log(stocks)    
});