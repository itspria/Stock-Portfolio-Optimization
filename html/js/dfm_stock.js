//can be used for testing api
//sampleurl = 'https://api.publicapis.org/entries'

//url to be used to query data from respective collections
portf_url = "http://127.0.0.1:5000/getPortfolioData"


// const dataread = d3.json(portf_url);
// console.log(dataread);


function portfolio_composition() {

    d3.json(portf_url).then(function (portfolio_data) {
        portf = portfolio_data.stocksdata
        console.log("Portfolios", portf)


        lowrisk_portf = []
        modrisk_portf = []
        highrisk_portf = []

        for (var i = 0; i < portf.length; i++) {

            if (portf[i].Volatility < 0.22) {
                lowrisk_portf.push(portf[i])
            }
            else if (portf[i].Volatility < 0.25) {
                modrisk_portf.push(portf[i])
            }
            else {
                highrisk_portf.push(portf[i])
            }
        };

        console.log("low risk portfolios", lowrisk_portf);
        console.log("moderate risk portfolios", modrisk_portf);
        console.log("high risk portfolios", highrisk_portf);


        // Optimum low risk portfolio 


        optortflowrisk = [];
        optortfmoderrisk = [];
        optortfhighrisk = [];

        for (var v = 0; v < lowrisk_portf.length; v++) {
            if (lowrisk_portf[v].Returns === Math.max.apply(null, lowrisk_portf.map(function (item) {
                return item.Returns;
            }))) {
                let lowriskportf = lowrisk_portf[v]
                optortflowrisk.push(lowriskportf)
            }
            //console.log("low risk optimum portfolio", lowriskportf)}
        };

        // Optimum moderate risk portfolio 
        for (var v = 0; v < modrisk_portf.length; v++) {
            if (modrisk_portf[v].Returns === Math.max.apply(null, modrisk_portf.map(function (item) {
                return item.Returns;
            }))) {
                let moderriskportf = modrisk_portf[v]
                optortfmoderrisk.push(moderriskportf)
            }
            //console.log("moderate risk optimum portfolio", moderriskportf)}
        };

        // Optimum high risk portfolio 
        for (var v = 0; v < highrisk_portf.length; v++) {
            if (highrisk_portf[v].Returns === Math.max.apply(null, highrisk_portf.map(function (item) {
                return item.Returns;
            }))) {
                let highriskportf = highrisk_portf[v]
                optortfhighrisk.push(highriskportf)
            }
            //console.log("high risk optimum portfolio", highriskportf)}
        };

        console.log("low risk optimum portfolio", optortflowrisk)
        console.log("moderate risk optimum portfolio", optortfmoderrisk)
        console.log("high risk optimum portfolio", optortfhighrisk)

        // let lowrisk_plot_values = {
        //     "AAPL_weight": optortflowrisk[0]["AAPL_weight"],
        //     ["BTC weight"]": optortflowrisk[0]["BTC weight"],
        //     "DAL_weight": optortflowrisk[0]["DAL_weight"],
        //     "GOLD_weight": optortflowrisk[0]["GOLD_weight"],
        //     ["NFLX_weight"]": optortflowrisk[0]["NFLX_weight"],
        //     "PFE_weight": optortflowrisk[0]["PFE_weight"],
        //     "SHOP_weight": optortflowrisk[0]["SHOP_weight"],
        //     "TSLA_weight": optortflowrisk[0]["TSLA_weight"]
        // }
        // console.log("lowrisk_plot_values", lowrisk_plot_values)

        console.log(optortflowrisk[0]["AAPL weight"]);

        let lowrisk_plot_values = [
            optortflowrisk[0]["AAPL weight"],
            optortflowrisk[0]["BTC weight"],
            optortflowrisk[0]["DAL weight"],
            optortflowrisk[0]["GOLD weight"],
            optortflowrisk[0]["NFLX weight"],
            optortflowrisk[0]["PFE weight"],
            optortflowrisk[0]["SHOP weight"],
            optortflowrisk[0]["TSLA weight"]
        ]

        let modrisk_plot_values = [
            optortfmoderrisk[0]["AAPL weight"],
            optortfmoderrisk[0]["BTC weight"],
            optortfmoderrisk[0]["DAL weight"],
            optortfmoderrisk[0]["GOLD weight"],
            optortfmoderrisk[0]["NFLX weight"],
            optortfmoderrisk[0]["PFE weight"],
            optortfmoderrisk[0]["SHOP weight"],
            optortfmoderrisk[0]["TSLA weight"]
        ]

        let highrisk_plot_values = [
            optortfhighrisk[0]["AAPL weight"],
            optortfhighrisk[0]["BTC weight"],
            optortfhighrisk[0]["DAL weight"],
            optortfhighrisk[0]["GOLD weight"],
            optortfhighrisk[0]["NFLX weight"],
            optortfhighrisk[0]["PFE weight"],
            optortfhighrisk[0]["SHOP weight"],
            optortfhighrisk[0]["TSLA weight"]
        ]

        let plot_labels = ["AAPL", "BTC", "DAL", "GOLD", "NFLX", "PFE", "SHOP", "TSLA"]

        let lowrisk_portf_retrun = {
            "Return": optortflowrisk[0].Returns.toFixed(2),
            "Volatility": optortflowrisk[0].Volatility.toFixed(2)
        }

        let modrisk_portf_retrun = {
            "Return": optortfmoderrisk[0].Returns.toFixed(2),
            "Volatility": optortfmoderrisk[0].Volatility.toFixed(2)
        }

        let highrisk_portf_retrun = {
            "Return": optortfhighrisk[0].Returns.toFixed(2),
            "Volatility": optortfhighrisk[0].Volatility.toFixed(2)
        }

        console.log("lowrisk_plot_values", lowrisk_plot_values)
        //console.log("modrisk_plot_values", modrisk_plot_values)
        //console.log("highrisk_plot_values", highrisk_plot_values)
        //console.log("lowrisk_portf_retrun", lowrisk_portf_retrun)




        //UPDATE CHARTS AND DATA BASED ON THE SELECTION IN THE DROPDOWN MENU
        function optionChanged() {

            //1)  define update function and assign values to drop down menu  
            d3.selectAll("#button").on("click", createPlotly);

            function createPlotly() {
                var dropdownMenu = d3.select("#Stock_Dropdown3");
                var selection = dropdownMenu.property("value");

                var dropdownMenu_period = d3.select("#Stock_Dropdown");
                var selection_period = dropdownMenu_period.property("value");

                //2) Plot a portfolio composition chart
                if (selection === "Low risk") {

                    //plot initial chart   
                    var data = [{
                        values: lowrisk_plot_values,
                        labels: plot_labels,
                        type: 'pie',
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
                    }];

                    var layout = {
                        height: 600,
                        width: 700,
                        paper_bgcolor: "#f8f9fc"
                    };

                    Plotly.newPlot('pie', data, layout);

                    //display portfolio data on the html page
                    d3.select("#portfolio-metadata").html("");
                    Object.entries(lowrisk_portf_retrun).forEach(([key, value]) => d3.select("#portfolio-metadata").append("p").text(`${key}: ${value}`));

                    //display future value data on the html page
                    //get user input value for the investment amount and keep it in variable
                    var inputValue = document.getElementById("input-field").value;


                    if (selection_period === "5") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (lowrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)
                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    //console.log("input", est_future_value)

                    else if (selection_period === "10") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (lowrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)
                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    //console.log("input", est_future_value)

                    else if (selection_period === "20") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (lowrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }

                    else if (selection_period === "30") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (lowrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    else {
                        var est_future_value = (inputValue * (1 + (lowrisk_portf_retrun.Return / 100))).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }

                    //lowrisk_plot_values.map((values) => {return values*inputValue;});

                    //plot2 initial chart   
                    var data = [{
                        x: lowrisk_plot_values.map((values) => { return values * inputValue; }),
                        y: plot_labels,
                        type: 'bar',
                        orientation: 'h',
                        marker: {
                            color:"CornflowerBlue"
                        }
                    }];

                    var layout = {
                        height: 600,
                        width: 700,
                        paper_bgcolor: "#f8f9fc"
                    };

                    Plotly.newPlot('pie2', data, layout);

                }
                else if (selection === "Moderate risk") {

                    //plot initial chart   
                    var data = [{
                        values: modrisk_plot_values,
                        labels: plot_labels,
                        type: 'pie',
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
                    }];

                    var layout = {
                        height: 600,
                        width: 700,
                        paper_bgcolor: "#f8f9fc"
                    };

                    Plotly.newPlot('pie', data, layout);

                    //display portfolio data on the html page
                    d3.select("#portfolio-metadata").html("");
                    Object.entries(modrisk_portf_retrun).forEach(([key, value]) => d3.select("#portfolio-metadata").append("p").text(`${key}: ${value}`));

                    //display future value data on the html page
                    //get user input value for the investment amount and keep it in variable
                    var inputValue = document.getElementById("input-field").value;

                    if (selection_period === "5") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (modrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)
                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }


                    else if (selection_period === "10") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (modrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)
                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    //console.log("input", est_future_value)

                    else if (selection_period === "20") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (modrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }

                    else if (selection_period === "30") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (modrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    else {
                        var est_future_value = (inputValue * (1 + (modrisk_portf_retrun.Return / 100))).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }



                    //plot2 initial chart   
                    var data = [{
                        x: modrisk_plot_values.map((values) => { return values * inputValue; }),
                        y: plot_labels,
                        type: 'bar',
                        orientation: 'h',
                        marker: {
                            color:"CornflowerBlue"
                        }
                    }];

                    var layout = {
                        height: 600,
                        width: 700,
                        paper_bgcolor: "#f8f9fc"
                    };

                    Plotly.newPlot('pie2', data, layout);

                }
                else if (selection === "High risk") {

                    //plot initial chart   
                    var data = [{
                        values: highrisk_plot_values,
                        labels: plot_labels,
                        type: 'pie',
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
                    }];

                    var layout = {
                        height: 600,
                        width: 700,
                        paper_bgcolor: "#f8f9fc"
                    };

                    Plotly.newPlot('pie', data, layout);

                    //display portfolio data on the html page       
                    d3.select("#portfolio-metadata").html("");
                    Object.entries(highrisk_portf_retrun).forEach(([key, value]) => d3.select("#portfolio-metadata").append("p").text(`${key}: ${value}`));


                    //display future value data on the html page
                    //get user input value for the investment amount and keep it in variable
                    var inputValue = document.getElementById("input-field").value;


                    if (selection_period === "5") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (highrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)
                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }



                    else if (selection_period === "10") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (highrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)
                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    //console.log("input", est_future_value)

                    else if (selection_period === "20") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (highrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }

                    else if (selection_period === "30") {
                        //estimate the future value of the investments
                        var est_future_value = (inputValue * (1 + (highrisk_portf_retrun.Return / 100)) ** selection_period).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }
                    else {
                        var est_future_value = (inputValue * (1 + (highrisk_portf_retrun.Return / 100))).toFixed(2)

                        //display future value data on the html page
                        d3.select("#portfolio-metadata2").html("");
                        d3.select("#portfolio-metadata2").append("p").text(`Estimated future value (USD): ${est_future_value}`);
                    }

                    //plot2 initial chart   
                    var data = [{
                        x: highrisk_plot_values.map((values) => { return values * inputValue; }),
                        y: plot_labels,
                        type: 'bar',
                        orientation: 'h',
                        marker: {
                            color:"CornflowerBlue"
                        }
                    }];

                    var layout = {
                        height: 600,
                        width: 700,
                        paper_bgcolor: "#f8f9fc"
                    };

                    Plotly.newPlot('pie2', data, layout);
                }

                else {
                    d3.select("#pie").html("");
                    d3.select("#portfolio-metadata").html("");
                    d3.select("#portfolio-metadata2").html("");
                }

            }

        }
        optionChanged()

    });
}
portfolio_composition()