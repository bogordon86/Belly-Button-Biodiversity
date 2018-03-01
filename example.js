// Populating metadata
function buildMeta(sample) {
    url = '/metadata/'+sample
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

// build pie chart
function pieChart(sample){
    url = '/samples/'+sample;
    Plotly.d3.json(url, function(error, data){
        if (error) return console.warn(error);

        var otus = data.map(record => record.otu_id);
        var values = data.map(record => record.sample_value);

        var trace1 = {
            labels: otus.slice(0,10),
            values: values.slice(0,10),
            type: 'pie'
        }

        var pieData = [trace1];

        layout = {
            height: 400,
            width: 400,
        }
        var PIE = document.getElementById('pie');
        Plotly.plot(PIE, pieData, layout);
        }
)}

// build bubble chart
function bubbleChart(sample){
    url = '/samples/'+sample;
    Plotly.d3.json(url, function(error, data){
        if (error) return console.warn(error);
        var otus = data.map(record => record.otu_id);
        var values = data.map(record => record.sample_value);
        var names = data.map(record => record.lowest_taxonomic_unit_found);

        var trace1 = {
            x: otus,
            y: values,
            text: names,
            mode: 'markers',
            marker: {
            size: values,
            color: otus
            }
        };

        var data = [trace1];

        var layout = {
            showlegend: false
        };
        var BUBBLE = document.getElementById('bubble');

        Plotly.plot(BUBBLE, data, layout);
    }
)}
