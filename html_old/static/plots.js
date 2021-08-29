// READ DATA
const url = "data/samples.json";
const dataread = d3.json(url);
console.log(dataread);

//FETCH JSON DATA 
d3.json(url).then(function(name) {

    let names = name.names;
    console.log("names", names)

	names.forEach((name) => {
		d3.select("#selDataset").append("option").text(name);
	})
    
// INITIAL PAGE DATA AND CHART

function init () {  
//1) display bar chart 
    //get array of values for the chart
    initial_value = name.samples.map((id) => {return id;})

    function init_id(init_id) {return init_id.id === "940"; }

    bar_init_value = initial_value.filter(init_id)

        console.log("All samples",initial_value);
        console.log("Filter a sample for id 940 only",bar_init_value);

    // get values for initial chart
    let bar_values = bar_init_value.map((values) => {return values.sample_values.slice(0, 10);});
    let bar_labels = bar_init_value.map((labels) => {return labels.otu_ids.slice(0, 10);});
    let hovertext = bar_init_value.map((hovtext) => {return hovtext.otu_labels.slice(0, 10);});
    
    let bar_values_cl = bar_values[0].reverse();
    let bar_label_cl = bar_labels[0].map((bar_label_cl) =>{return `OTU_${bar_label_cl}` }).reverse();
    let hovertext_cl = hovertext[0].reverse();
    

    
        console.log('Bar_values', bar_values_cl);
        console.log("Bar_labels", bar_label_cl);
        console.log("Hover_text",hovertext_cl);

    //plot initial chart   
    let trace1 = {
        x: bar_values_cl,
        y: bar_label_cl,
        text: hovertext_cl,
        type: 'bar',
        orientation: 'h'
      };
    
    let bardata = [trace1];
    
    title = "Top 10 OTUs"
    let layout = {
        title: title
      };
    
    Plotly.newPlot("bar", bardata, layout);

//2) display metadata on demographics
    // get an array of values 
    metadata = name.metadata.map((mdata) => {return mdata;})
        console.log("meta data array", metadata)

    function init_id_md(init_id_md) {return init_id_md.id === 940; }

    metadata_flt = metadata.filter(init_id_md)
        console.log("meta data filtered array", metadata_flt)

    let metadata_flt_cl =  metadata_flt[0] 
        console.log("meta data filtered and clean array", metadata_flt_cl)
    
    //display demographics data on the html page
    d3.select("#sample-metadata").html("");
    Object.entries(metadata_flt_cl).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));

//3 Plot bubble chart

    // get values for teh chart
    let blb_values = bar_init_value.map((blb_values) => {return blb_values.sample_values;});
    let blb_labels = bar_init_value.map((blb_labels) => {return blb_labels.otu_ids;});
    let blb_hovertext = bar_init_value.map((blb_hovtext) => {return blb_hovtext.otu_labels;});

    let blb_values_cl = blb_values[0];
    let blb_labels_cl = blb_labels[0];
    let blb_hovertext_cl = blb_hovertext[0];

    let trace2 = {
        x: blb_labels_cl,
        y: blb_values_cl,
        text: blb_hovertext_cl,
        marker:{
            size: blb_values_cl,
            color: blb_labels_cl
        },
        mode: 'markers'
    };

    let bubbledata = [trace2];

    title = "OTUs"
    let blb_layout = {
        title: title,
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot("bubble", bubbledata, blb_layout);

 //4) gauge chart data   
    // getting data
    let wash_freq = metadata_flt_cl.wfreq
    console.log("washing frequency for id 940",wash_freq)
     
    // ploting a gauge chart

    var gauge_data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wash_freq,
          title: { text: "Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            bar:{color: "#af005f"},
            steps: [
              { range: [0, 1], color: "#D6CFC7" },
              { range: [1, 2], color: "#C7C6C1" },
              { range: [2, 3], color: "#BEBDB8" },
              { range: [3, 4], color: "#BDB7AB" },
              { range: [4, 5], color: "#97978F" },
              { range: [5, 6], color: "#818380" },
              { range: [6, 7], color: "#808588" },
              { range: [7, 8], color: "#877F7D" },
              { range: [8, 9], color: "#48494B" }
            ],

          }
        }
      ];
      
      var gauge_layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', gauge_data, gauge_layout);


}
init()


// UPDATE CHARTS AND DATA BASED ON THE SELECTION IN THE DROPDOWN MENU
function optionChanged() {

//1)  define update function and assign values to drop down mane  
    d3.selectAll("#selDataset").on("change", updatePlotly);

    function updatePlotly() {
    var dropdownMenu = d3.select("#selDataset");
    var selection = dropdownMenu.property("value");

//2)update bar chart
    dataset = name.samples.map((id) => {return id;});

    function select_id(select_id) {return select_id.id === selection };

    bar_select_dataset = dataset.filter(select_id);
    console.log("Filtered dataset array",bar_select_dataset)

    // get values for the chart
    let bar_sel_values = bar_select_dataset.map((sel_values) => {return sel_values.sample_values.slice(0, 10);});
    let bar_sel_labels = bar_select_dataset.map((sel_labels) => {return sel_labels.otu_ids.slice(0, 10);});
    let sel_hovertext = bar_select_dataset.map((sel_hovtext) => {return sel_hovtext.otu_labels.slice(0, 10);});

    let bar_sel_values_cl = bar_sel_values[0].reverse();
    let bar_sel_labels_cl = bar_sel_labels[0].map((bar_label_cl) =>{return `OTU_${bar_label_cl}` }).reverse();
    let sel_hovertext_cl = sel_hovertext[0].reverse();

        console.log('Bar_values', bar_sel_values);
        console.log("Bar_labels", bar_sel_labels);
        console.log("Hover_text",sel_hovertext_cl);

    Plotly.restyle("bar", "x", [bar_sel_values_cl]);
    Plotly.restyle("bar", "y", [bar_sel_labels_cl]);
    Plotly.restyle("bar", "text", [sel_hovertext_cl]);
    
//3 Update demographics metadata   
            //var dropdownMenu = d3.select("#selDataset");
            // Assign the value of the dropdown menu option to a variable
            // var selection_md = dropdownMenu.property("value");
            //   console.log("selection", selection_md)
    metadata = name.metadata.map((mdata) => {return mdata;})
        console.log("raw metadata for update",metadata)
    
    function md_id(md_id) {return md_id.id == selection };
    
    metadata_flt = metadata.filter(md_id)
        console.log("Filtered dataset array",metadata_flt)
    
    metadata_flt_cl =  metadata_flt[0] 
        console.log("meta data filtered and clean array", metadata_flt_cl)
    
    d3.select("#sample-metadata").html("");
    Object.entries(metadata_flt_cl).forEach(([key, value]) => d3.select("#sample-metadata").append("p").text(`${key}: ${value}`));
    
    
    
 //4) update  bubble chart

    let blb_sel_values = bar_select_dataset.map((blb_sel_values) => {return blb_sel_values.sample_values;});
    let blb_sel_labels = bar_select_dataset.map((blb_sel_labels) => {return blb_sel_labels.otu_ids;});
    let blb_sel_hovertext = bar_select_dataset.map((blb_sel_hovtext) => {return blb_sel_hovtext.otu_labels;});

    let blb_sel_values_cl = blb_sel_values[0];
    let blb_sel_labels_cl = blb_sel_labels[0];
    let blb_sel_hovertext_cl = blb_sel_hovertext[0];

    Plotly.restyle("bubble", "x", [blb_sel_labels_cl]);
    Plotly.restyle("bubble", "y", [blb_sel_values_cl]);
    Plotly.restyle("bubble", "text", [blb_sel_hovertext_cl]);
    Plotly.restyle("bubble", "marker.size", [blb_sel_values_cl]);
    Plotly.restyle("bubble", "marker.color", [blb_sel_labels_cl]);
  
    
//5) gauge chart udpate   
    // getting data
    let wash_sel_freq = metadata_flt_cl.wfreq
    console.log("washing frequency for selected id",wash_sel_freq)    
    Plotly.restyle("gauge", "value", [wash_sel_freq]);

}

}
optionChanged()   

});