var dataset = [];
  //var boundaryId=48;
  var fields = [];
  var subdimensions;
  var nonDimensionalFields = ["caseid", "boundaryid", "lat", "lon"];
  function loadDataset(polygon, callback) {
    console.log("loading dataset...");
    d3.csv("./data_full.csv", function (data) {
      
      //select cases according to the given boundary
      dataset = data.filter(function (report) {
        var bid = 0;
        try {
          bid = parseInt(report.boundaryid);
        } catch (e) {
          console.log("error", e);
        }
        return bid == polygon.indexID;
      });
      //select dimensional fields 
      if (dataset.length > 0) {
        fields = Object.keys(dataset[0]).filter(function (key) {
          return nonDimensionalFields.indexOf(key) == -1;
        });
      }

      //finding subdimenions from the dataset values
      var fieldValues = {};
      subdimensions = {};
      fields.forEach(function (field) {
        fieldValues[field] = [];
        subdimensions[field] = [];
      });

      dataset.forEach(function (record) {
        fields.forEach(function (field) {
          fieldValues[field].push(record[field]);
        });

      });

      fields.forEach(function (field) {
        fieldValues[field] = Array.from(new Set(fieldValues[field]));
        if (isSubdimension(fieldValues[field])) {
          subdimensions[field] = fieldValues[field];
        }

      });
      console.log("dataset loaded!");
      console.log("######## Dataset #########");
      console.log("Main dimensions = ", fields);
      console.log("Main dimensions info = ", subdimensions);
      console.log("##########################")


      //callback(polygon);

    });

    //conditions for selecting subdimesnions
    var isSubdimension = function (dimArray) {
      var threshold = (dataset.length * 10) / 100;
      if (!dimArray.some(isNaN)) {
        return false;
      }

      if (dimArray.length >= threshold) {
        return false;
      }

      return true;
    }
  }






