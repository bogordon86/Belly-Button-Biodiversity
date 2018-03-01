//On Initial load, run with the sample set "BB_940"
buildDropdown();
buildMeta("BB_940");
piePlot("BB_940");
bubblePlot("BB_940");


//When a new sample is selected update the chart
function optionChanged(sample){
    buildMeta(sample);
    piePlot(sample);
    bubblePlot(sample);
}

// Build the dropdown by inputting sample names in HTML
function buildDropdown() {
    Plotly.d3.json('/names', function(error, names){
        if (error) return console.warn(error);
        var selDataset = document.getElementById("selDataset");
        for (i = 0; i < names.length; i++) {
                    sample = names[i]
                    var sample_option = document.createElement("option");
                    sample_option.text = sample;
                    sample_option.value= sample;
                    selDataset.appendChild(sample_option);
        }
    }
)}
// Function to build the metadata table in HTML template
function buildMeta(sample) {
    url = '/metadata/' + sample
    Plotly.d3.json(url, function(error, data){
       if (error) return console.warn(error);

       var age = document.getElementById("age");
       var bbtype = document.getElementById("bbtype");
       var gender = document.getElementById("gender");
       var location = document.getElementById("location");
       var sampleid = document.getElementById("sampleid");

       age.innerHTML = data.AGE;
       bbtype.innerHTML = data.BBTYPE;
       gender.innerHTML = data.GENDER;
       location.innerHTML = data.LOCATION;
       sampleid.innerHTML = data.SAMPLEID;
    }
)}

//Build the piePlot using a slice of ten
function piePlot(sample){
    url = '/samples/'+sample;
    Plotly.d3.json(url, function(error, data){
        if (error) return console.warn(error);

        var otu = data.map(record => record.otu_id);
        var values =data.map(record => record.sample_value);

        var trace1 = {
            labels: +otu.slice(0,10),
            values:+values.slice(0,10),
            type: 'pie'
        }
        var pieData = [trace1];
        layout = {
            height:400,
            width:400,
        }
        var PIE = document.getElementById('piePlot');
        Plotly.plot(PIE, pieData, layout);
      }
)}

//Build the bubble chart for the index page
function bubblePlot(sample){
    url ='/samples/'+sample;
    Plotly.d3.json(url, function(error, data){
        if (error) return console.warn(error);
        var otu = data.map(record => record.otu_id);
        var values = data.map(record => record.sample_value);
        var names = data.map(record => record.lowest_taxonomic_unit_found);

        var trace1 = {
            x: otu,
            y: +values,
            text: names,
            mode: 'markers',
            marker : {
            size: values,
            color: otu
            }
        };
        var data = [trace1];

        var layout = {
            showlegend: false
        };
        var BUBBLE = document.getElementById('bubblePlot')
        Plotly.plot(BUBBLE, data, layout);
    }
)}
