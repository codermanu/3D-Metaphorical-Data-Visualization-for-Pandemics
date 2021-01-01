/**
* Author: Dulya Murage
*/
function DataVisualizer(dataset, caseVisualizer){
    this.popup_window = document.getElementById('myModal');
    this.dataset = dataset;
    this.caseVisualizer = caseVisualizer;
    this.chart = null;
    this.history = {};
    /*
    // sample history structure
    {
        path: null,
        mainDimension:null,
        xDimensions:null
    }
    */

    this.close_btn = document.getElementById('close_btn'); 
    window.onclick = function(event) {
        if (event.target == this.close_btn) {
            //modal.style.display = "none";
            this.hide();
        }
    }.bind(this);
}

DataVisualizer.prototype.updateDataset = function(dataset){
    this.dataset = dataset;
    if(this.history && this.history ["path"]){
        console.log("DATASET CHANGED!");
        this.update(this.history.path, this.history.mainDimension, this.history.xDimensions);
    }
}

DataVisualizer.prototype.update = function(path, mainDimension, xDimensions) {
    
    /* 
        path = [{mainDimension:[subDimensions]}, ...]
        eg.
            path = [{"death":["yes"]}, {"age":["elder", "child"]}]
    */

    // x = xDimensions
    // y = number of cases
    /*
        Here we should work out the dataset using the path and make data
        -> labels = xDimensions
    */
  /* console.log("visualize", path, mainDimension, xDimensions);
    var query = {};
    path.forEach(obj => {
        query = {...query, ...obj};
    }); */
    console.log("DataVisualizer update", path, mainDimension, xDimensions);
    var dataset=[];
    var pathResult=[];
    var pathLabels=[];
    var query={};
    ///////////
    var data_results = [];
    var data_colors = [];

   
    var i;
    if(path.length>0){
       var resultArray=[];
        for(i=0;i<path.length;i++){
            var query = {};

            Object.keys(path[i]).forEach(function eachKey(key) { 
                var j;
               var temp_result=[];
               var tempLabels=[];
              
                for(j=0;j<path[i][key].length;j++){
                    query[key] = path[i][key][j];
                    if(i==0){
                       
                        tempLabels.push(path[i][key][j]); // elder 2. adult
                        var temp=_.filter(this.dataset, query);
                        temp_result.push(temp);
                        
                    }else{
                        var count=0;
                        
                        pathLabels.forEach(item=>{
                            //console.log("item",item);
                            //console.log("nwe item",path[i][key][j]);
                            tempLabels.push(item+"-"+path[i][key][j]); 
                            //console.log("temp labels",tempLabels);             
                            count++;
                        });
                        
                        
                        pathResult.forEach(item =>{
                            var temp=_.filter(item, query);
                            temp_result.push(temp);
                        });
                        
                    }
                    
                } 
                //console.log("temp temo", tempLabels); 
                pathLabels=tempLabels;
                pathResult=temp_result;     
            }); 
            
        }   
       // elder - male 9
       //adult- male 10
       //elder - female 6
       //adult- female 9
        xDimensions.forEach(dimension => {
                        var dimension_query = {};
                        dimension_query[mainDimension] = dimension;
                        pathResult.forEach(item=>{
                            var dimension_result = _.filter(item, dimension_query);                         
                            data_results.push(dimension_result.length);
                            /*console.log("-------------------------------------------");
                            console.log(pathLabels);
                            console.log(dimension_result);
                            console.log(dimension_query);
                            console.log("-------------------------------------------");*/
                            data_colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
                        });                   
                     });
        
        var i=0;
        pathLabels.forEach(item=>{
            var dataitem={};
            dataitem["label"]=toTitleCase(pathLabels[i]);
            var j;
            var iterator=0;
            dataitem["data"]=[];
            for(j=0;j<xDimensions.length;j++){
                dataitem["data"].push(data_results[i+iterator]);
                iterator=iterator+pathLabels.length;
            }
           
            dataitem["backgroundColor"]='#'+(Math.random()*0xFFFFFF<<0).toString(16);
            dataset.push(dataitem);
            i++;
        });
      
    }else{
        pathResult = _.filter(this.dataset, query);
        xDimensions.forEach(dimension => {
                        var dimension_query = {};
                        dimension_query[mainDimension] = dimension;

                        var dimension_result = _.filter(pathResult, dimension_query);
                        data_results.push(dimension_result.length);
                        data_colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
                        dataset=[{
                            label:"# Cases",
                            data:data_results,
                            backgroundColor:data_colors
                        }];

                       
                     });
    }     
    
   //console.log("data set", dataset);
   

    /*var data_results = [];
    var data_colors = [];
    xDimensions.forEach(dimension => {
        var dimension_query = {};
        dimension_query[mainDimension] = dimension;

        var dimension_result = _.filter(pathResult, dimension_query);
        data_results.push(dimension_result.length);

        data_colors.push('#'+(Math.random()*0xFFFFFF<<0).toString(16));
    });*/

    document.getElementById("chart").innerHTML = "";

    if(this.chart) {
        this.chart.destroy();
    }
    var titledXDimensions=[];
    xDimensions.forEach(dimension => {
        titledXDimensions.push(toTitleCase(dimension));

    });

    this.chart = new Chart(document.getElementById("chart"), {
        type: 'bar',
        data: {
        labels: titledXDimensions,
        datasets: dataset
          
        /*[
            {
            label: "# cases",
            backgroundColor:data_colors,
            data: data_results
            }
        ]*/
        },
        options: {
            
            legend: { position: 'bottom',
                      labels: {
                        fontColor: 'rgb(255, 255, 255)'
                      }
            },
            title: {
                display: true,
                fontColor: 'rgb(255, 255, 255)',
                text: toTitleCase(mainDimension+' distribution')
            },
            scales: {
                yAxes: [
                    
                { stacked: true,
                    ticks: {
                        fontColor: "white",
                     } }
            ],
            xAxes:[{stacked:true,barPercentage :0.4,ticks: {
                fontColor: "white",
                
             } }]
            }
        }
    });

    // update case visualizer
    console.log("Bar chart data", dataset);
    this.caseVisualizer.update(mainDimension, xDimensions, dataset);

    // update history
    this.history["path"] = path ;
    this.history["mainDimension"] = mainDimension;
    this.history["xDimensions"] = xDimensions;
}
DataVisualizer.prototype.show = function(){
    this.popup_window.style.display = "block";
    //$('#myModal').modal('show');

}

DataVisualizer.prototype.hide = function(){
    this.popup_window.style.display = "none";
    //$('#myModal').modal({show:false});

}