//url to be used to query data from respective collections
btc_url = "http://127.0.0.1:5000/getBtcData"
aapl_url = "http://127.0.0.1:5000/getAaplData"
pfe_url = "http://127.0.0.1:5000/getPfeData"
tsla_url = "http://127.0.0.1:5000/getTSLAData"
shop_url = "http://127.0.0.1:5000/getShopData"
dal_url = "http://127.0.0.1:5000/getDalData"
nflx_url = "http://127.0.0.1:5000/getNflxData"
gold_url = "http://127.0.0.1:5000/getGoldData"
calc_url = "http://127.0.0.1:5000/getStocksCalc"


//plot data based on stock selected 
function optionChanged(useId) {
    console.log("use id in op change", useId);
    if (useId == "Bitcoin (BTC)") {
        parseurl = btc_url
    } else if (useId == "Apple (AAPL)") {
        parseurl = aapl_url
    } else if (useId == "Shopify (SHOP)") {
        parseurl = shop_url
    } else if (useId == "Tesla (TSLA)") {
        parseurl = tsla_url
    } else if (useId == "Delta Air Lines (DAL)") {
        parseurl = dal_url
    } else if (useId == "Netflix (NFLX)") {
        parseurl = nflx_url
    } else if (useId == "Barrick Gold Corp (GOLD)") {
        parseurl = gold_url
    } else if (useId == "Pfizer (PFE)") {
        parseurl = pfe_url
    } else {
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
            title: data.database,
        };

        console.log(adj_price_array);

        Plotly.newPlot('StockData2', chrtdata, layout);


    });

}


//calc portfolio returns based on input
function calcPortfolio() {

    var BTC_inv = parseInt(document.getElementById("BTCInput").value) || 0;
    var AAPL_inv = parseInt(document.getElementById("AAPLInput").value) || 0;
    var GOLD_inv = parseInt(document.getElementById("GOLDInput").value) || 0;
    var NFLX_inv = parseInt(document.getElementById("NFLXInput").value) || 0;
    var PFE_inv = parseInt(document.getElementById("PFEInput").value) || 0;
    var DAL_inv = parseInt(document.getElementById("DALInput").value) || 0;
    var TSLA_inv = parseInt(document.getElementById("TSLAInput").value) || 0;
    var SHOP_inv = parseInt(document.getElementById("SHOPInput").value) || 0;

    console.log("bitcoin", BTC_inv);
    console.log("apple", AAPL_inv);
    console.log("gold", GOLD_inv);
    console.log("netflix", NFLX_inv);
    console.log("pfizer", PFE_inv);
    console.log("delta airlines", DAL_inv);
    console.log("tesla", TSLA_inv);
    console.log("shopify", SHOP_inv);

    //get historical returns 
    d3.json(calc_url).then(function (data) {
        stocks = data.stocksdata

        var SHOP_ann_return = stocks[0][0]['Annual Return'];
        var TSLA_ann_return = stocks[0][1]['Annual Return'];
        var GOLD_ann_return = stocks[0][2]['Annual Return'];
        var DAL_ann_return = stocks[0][3]['Annual Return'];
        var NFLX_ann_return = stocks[0][4]['Annual Return'];
        var AAPL_ann_return = stocks[0][5]['Annual Return'];
        var PFE_ann_return = stocks[0][6]['Annual Return'];
        var BTC_ann_return = stocks[0][0]['Annual Return'];

        console.log("all stocks", stocks);
        console.log("SHOP_ann_return", SHOP_ann_return);
        console.log("TSLA", TSLA_ann_return);
        console.log("GOLD", GOLD_ann_return);
        console.log("DAL", DAL_ann_return);
        console.log("NFLX", NFLX_ann_return);
        console.log("AAPL", AAPL_ann_return);
        console.log("PFE", PFE_ann_return);
        console.log("BTC", BTC_ann_return);

        var BTC_rtn = BTC_inv * BTC_ann_return/100;
        var PFE_rtn = PFE_inv * PFE_ann_return/100;
        var AAPL_rtn = AAPL_inv * AAPL_ann_return/100;
        var NFLX_rtn = NFLX_inv * NFLX_ann_return/100;
        var DAL_rtn = DAL_inv * DAL_ann_return/100;
        var GOLD_rtn = GOLD_inv * GOLD_ann_return/100;
        var TSLA_rtn = TSLA_inv * TSLA_ann_return/100;
        var SHOP_rtn = SHOP_inv * SHOP_ann_return/100;

        var porfolio_return = Math.round(BTC_rtn + PFE_rtn + AAPL_rtn + NFLX_rtn + DAL_rtn + GOLD_rtn + TSLA_rtn + SHOP_rtn);


        var total_inv = BTC_inv + PFE_inv + AAPL_inv + NFLX_inv + DAL_inv + GOLD_inv + TSLA_inv + SHOP_inv;

        var total_return = porfolio_return + total_inv;
        var exp_return_perc = Math.round(porfolio_return / total_inv * 100);

        console.log("typeof", porfolio_return);

        document.getElementById("TotalInv").innerHTML = (total_inv);
        document.getElementById("ExpAnnRet").innerHTML = (porfolio_return);
        document.getElementById("ExpAnnRet%").innerHTML = (exp_return_perc);
        document.getElementById("ExpPortVal").innerHTML = (total_return);

        console.log("bitcoin", BTC_inv);
        console.log("apple", AAPL_inv);
        console.log("gold", GOLD_inv);
        console.log("netflix", NFLX_inv);
        console.log("pfizer", PFE_inv);
        console.log("delta airlines", DAL_inv);
        console.log("tesla", TSLA_inv);
        console.log("shopify", SHOP_inv);

        var data = [{
            type: "pie",
            values: [BTC_inv, AAPL_inv, GOLD_inv, NFLX_inv, PFE_inv, DAL_inv, TSLA_inv, SHOP_inv],
            labels: ["BTC", "AAPL", "GOLD", "NFLX", "PFE", "DAL", "TSLA", "SHOP"],
            textinfo: "label+percent",
            textposition: "inside",
            automargin: true,
            marker: {
                'colors': [
                    'Aquamarine',
                    'CadetBlue',
                    'CornflowerBlue',
                    'DarkCyan',
                    'DarkSlateBlue',
                    'DarkGrey',
                    'DeepSkyBlue',
                    'Indigo'
                ]
            }
        }]

        var layout = {
            height: 500,
            width: 600,
            //margin: {"t": 0, "b": 0, "l": 0, "r": 0},
            showlegend: true,
            title: "Breakdown of your Total Investment",
            paper_bgcolor: "#f8f9fc"
        }

        Plotly.newPlot('StockData1', data, layout)


        var trace1 = {
            x: ["BTC", "AAPL", "GOLD", "NFLX", "PFE", "DAL", "TSLA", "SHOP"],
            y: [BTC_inv, AAPL_inv, GOLD_inv, NFLX_inv, PFE_inv, DAL_inv, TSLA_inv, SHOP_inv],
            name: 'Initial Invstment',
            type: 'bar',
            marker:{
                color:"DarkGrey"
            }
        };

        var trace2 = {
            x: ["BTC", "AAPL", "GOLD", "NFLX", "PFE", "DAL", "TSLA", "SHOP"],
            y: [BTC_rtn, AAPL_rtn, GOLD_rtn, NFLX_rtn, PFE_rtn, DAL_rtn, TSLA_rtn, SHOP_rtn],
            name: 'Stock Return',
            type: 'bar',
            marker:{
                color:"CornflowerBlue"
            }
        };

        var data2 = [trace1, trace2];

        var layout2 = { 
            barmode: 'stack',
            title: "Breakdown of your Total Investment and Returns",
            paper_bgcolor: "#f8f9fc"
        };

        Plotly.newPlot('StockData3', data2, layout2);



    });




}