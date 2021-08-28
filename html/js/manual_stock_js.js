//can be used for testing api
sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
btc_url = "http://127.0.0.1:5000/getBtcData"
aapl_url = "http://127.0.0.1:5000/getAaplData"
pfe_url = "http://127.0.0.1:5000/getPfeData"
tsla_url = "http://127.0.0.1:5000/getTSLAData"
shop_url = "http://127.0.0.1:5000/getShopData"
dal_url = "http://127.0.0.1:5000/getDalData"
nflx_url = "http://127.0.0.1:5000/getNflxData"
gold_url = "http://127.0.0.1:5000/getGoldData"

//sample data retrieval


function optionChanged(useId) {
    console.log("use id in op change", useId);
    if (useId == "Bitcoin (BTC)"){
        parseurl= btc_url
    }   else if (useId == "Apple (AAPL)"){
        parseurl = aapl_url
    }   else if (useId =="Shopify (SHOP)"){
        parseurl = shop_url
    }   else if (useId =="Tesla (TSLA)"){
        parseurl = tsla_url
    }   else if (useId =="Delta Air Lines (DAL)"){
        parseurl = dal_url
    }   else if (useId =="Netflix (NFLX)"){
        parseurl = nflx_url
    }   else if (useId =="Barrick Gold Corp (GOLD)"){
        parseurl = gold_url
    }   else if (useId =="Pfizer (PFE)"){
        parseurl = pfe_url
    }   else {
        parseurl = aapl_url
    }
    console.log("use id in op change", parseurl);
    PlotData(parseurl);
};


function PlotData(useId) {

    d3.json(useId).then(function (data) {
        stocks = data.stocksdata
        // console.log("all stocks", stocks)
        // console.log(" first stock - stocks[0]", stocks[0])
        // console.log(" first stock - adjusted close price", stocks[0]['adjclose'])
        // console.log(" first stock - formatted date", stocks[0]['formatted_date'])
        // console.log(" all prices", stocks['adjclose'])

        adj_price_array = []
        formatted_date_array = []
        for (var i = 0; i < stocks.length; i++) {
            // loop through the array, create a new marker, and push it to the eqMarkers array
            var price = stocks[i]['adjclose'];
            adj_price_array.push(price)
            formatted_date_array.push(stocks[i]['formatted_date'])
        };

        //console.log(adj_price_array)
        adj_price_array.reverse()
        formatted_date_array.reverse()

 
        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: 'AAPL High',
            x: formatted_date_array,
            y: adj_price_array,
            line: { color: '#17BECF' }
        }

        var chrtdata = [trace1];

        var layout = {
            title: 'Basic Time Series',
        };

        Plotly.newPlot('StockData2', chrtdata, layout);


    });

}

