// copyright 2020 Spider contributors. MIT license.
// 2020-03-26
/* global THR, resetGroups , THREE, camera, renderer,intersected, linecases, DMTdragParent, divMessage */
/* globals */
// jshint esversion: 6
// jshint loopfunc: true

// https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data
// https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data/United_States_medical_cases_by_state

const BAR = {
  lat: 0,
  lon: 0,
  places: "Null Island",
  index: 0,
  color: "red",
  radius: 0.4,
  height: 40,
  offset: 0,
  radialSegments: 5,
  heightSegments: 1,
  openEnded: true,
};

const WP = {};

WP.init = function () {
  // found in main js add keys and remove them rotation and functionalities
  resetGroups();

  const timeStartAll = performance.now();

  // WP.getPandemicData(c19GeoDataUsa, WP.templateUsa);

  // WP.getPandemicData(c19GeoDataGlobal, WP.templateGlobal);

  //console.log( "time start all", performance.now() - timeStartAll );
  importCSV();
};

// creating the countries array
var countryArrfromcsv = [];

// import the csv file and crete the array object as in countries
function importCSV() {
  console.log("called");
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      console.log("imported");
      var ports = CSVToArray(xmlhttp.responseText, ";");
      ports.forEach(function (e) {
        let jsonCountry = {};
        // console.log(e);
        var points = e[0].split(",");
        jsonCountry.country = points[0];
        jsonCountry.region = points[1];
        jsonCountry.latitude = points[2];
        jsonCountry.longitude = points[3];
        jsonCountry.continent = points[4];
        jsonCountry.population = points[5];
        jsonCountry.cases = points[6];
        jsonCountry.deaths = points[7];
        jsonCountry.recoveries = points[8];
        countryArrfromcsv.push(jsonCountry);
      });
      // console.log(countryArrfromcsv);
      WP.updateBars(countryArrfromcsv);
    }
  };

  xmlhttp.open("GET", "./docs/datafiles/worldwide2.csv", true);
  xmlhttp.send();
}

WP.updateBars = function (places) {
  //   console.log("", places);

  const heightsCases = places.map((line) => Number(line.cases));
  //console.log( 'heightsCases', heightsCases );

  meshCases = WP.addBars(places, heightsCases, "yellow");
  meshCases.userData.places = places;
  groupCasesWP.add(meshCases);

  const heightsDeaths = places.map((line) => Number(line.deaths));
  //console.log( 'heightsDeaths', heightsDeaths );

  meshDeaths = WP.addBars(places, heightsDeaths, "red");
  groupDeathsWP.add(meshDeaths);

  const heightsRecoveries = places.map((line) => Number(line.recoveries));
  //console.log( 'heightsRecoveries', heightsRecoveries );

  meshRecoveries = WP.addBars(places, heightsRecoveries, "green");
  groupRecoveriesWP.add(meshRecoveries);
};


WP.addBars = function (places, heights, color = "red") {
  radius = 0.5;
  radialSegments = 5;
  heightSegments = 1;
  openEnded = true;

  //const geometry = new THREE.BoxBufferGeometry( 0.3, 0.3, 1 );
  let geometry = new THREE.CylinderBufferGeometry(
    0.2,
    radius,
    1,
    radialSegments,
    heightSegments,
    openEnded
  );
  geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(0.5 * Math.PI));
  geometry.applyMatrix4(new THREE.Matrix4().makeScale(-1, -1, -1));

  //const material = new THREE.MeshNormalMaterial( { side: 2 } );
  const material = new THREE.MeshPhongMaterial({ color: color, side: 2 });
  const cases = new THREE.InstancedMesh(geometry, material, places.length);

  for (let i = 0; i < places.length; i++) {
    place = places[i];
    let height = isNaN(heights[i]) ? 10 : Number(heights[i]);

    const heightScaled = WP.scale ? 0.05 * Math.sqrt(height) : 0.0002 * height;

    //height = height < 1000 ? 10 : height;
    height = 0.05 * Math.sqrt(height);
    //console.log( "height", height );

    const matrix = BAR.getMatrixComposed(
      50,
      place.latitude,
      place.longitude,
      heightScaled
    );
    cases.setMatrixAt(i, matrix);
  }

  return cases;
};

BAR.getMatrixComposed = function (r = 50, lat = 0, lon = 0, height = 5) {
  const position = BAR.latLonToXYZ(r + 0.5 * height, lat, lon);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 0, 1),
    position.clone().normalize()
  );
  const scale = new THREE.Vector3(1, 1, height);
  const matrix = new THREE.Matrix4();
  matrix.compose(position, quaternion, scale);

  return matrix;
};

BAR.latLonToXYZ = function (radius, lat, lon) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((180 - lon) * Math.PI) / 180;
  //console.log( "lat/lon", theta, phi, index);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);

  return new THREE.Vector3(-x, y, z);
};

function CSVToArray(strData, strDelimiter) {
  // Check to see if the delimiter is defined. If not,
  // then default to comma.
  strDelimiter = strDelimiter || ",";

  // Create a regular expression to parse the CSV values.
  var objPattern = new RegExp(
    // Delimiters.
    "(\\" +
      strDelimiter +
      "|\\r?\\n|\\r|^)" +
      // Quoted fields.
      '(?:"([^"]*(?:""[^"]*)*)"|' +
      // Standard fields.
      '([^"\\' +
      strDelimiter +
      "\\r\\n]*))",
    "gi"
  );

  // Create an array to hold our data. Give the array
  // a default empty first row.
  var arrData = [[]];

  // Create an array to hold our individual pattern
  // matching groups.
  var arrMatches = null;

  // Keep looping over the regular expression matches
  // until we can no longer find a match.
  while ((arrMatches = objPattern.exec(strData))) {
    // Get the delimiter that was found.
    var strMatchedDelimiter = arrMatches[1];

    // Check to see if the given delimiter has a length
    // (is not the start of string) and if it matches
    // field delimiter. If id does not, then we know
    // that this delimiter is a row delimiter.
    if (strMatchedDelimiter.length && strMatchedDelimiter != strDelimiter) {
      // Since we have reached a new row of data,
      // add an empty row to our data array.
      arrData.push([]);
    }

    // Now that we have our delimiter out of the way,
    // let's check to see which kind of value we
    // captured (quoted or unquoted).
    if (arrMatches[2]) {
      // We found a quoted value. When we capture
      // this value, unescape any double quotes.
      var strMatchedValue = arrMatches[2].replace(new RegExp('""', "g"), '"');
    } else {
      // We found a non-quoted value.
      var strMatchedValue = arrMatches[3];
    }

    // Now that we have our value string, let's add
    // it to the data array.
    arrData[arrData.length - 1].push(strMatchedValue);
  }

  // Return the parsed data.
  return arrData;
}
