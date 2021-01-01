// var districts = [
//     ['Ampara',      1, 7.29754, 81.68202],
//     ['Anuradhapura',2, 8.31223, 80.41306],
//     ['Badulla',	    3, 6.9895,  81.0557],
//     ['Batticaloa',	4, 7.7102,	81.6924],
//     ['Colombo',   	5, 6.93194,	79.84778],
//     ['Galle',       6, 6.0367,  80.217],
//     ['Gampaha',     7,7.08731, 80.014366],
//     ['Hambantota',	8, 6.1429, 81.1212],
//     ['Jaffna',	    9, 9.66845, 80.00742],
//     ['Kalutara',	10,	6.5831,	79.9593],
//     ['Kandy',	    11,	7.2955,	80.6356],
//     ['Kegalle',     12,	7.2513,	80.3464],
//     ['Kilinochchi',	13,	9.3961,	80.3982],
//     ['Kurunegala',  14,	7.4863,	80.3623],
//     ['Mannar',	    15,	8.981,	79.9044],
//     ['Matale',      16,	7.4675, 80.6234],
//     ['Matara',      17,	5.94851,80.53528],
//     ['Moneragala',  18,	6.8714,	81.3487],
//     ['Mullaitivu',  19,	9.2671,	80.8142],
//     ['Nuwara Eliya',20,	6.97078, 80.78286],
//     ['Polonnaruwa',	21,	7.93965,81.00274],
//     ['Puttalam',    22, 8.0362,	79.8283],
//     ['Ratnapura',	23,	6.68278,80.39917],
//     ['Trincomalee',	24,	8.5711,	81.2335],
//     ['Vavuniya',    25,	8.7514,	80.4971],
//     ];



    
group1 = new THREE.Group();
			
var geometry1 = new THREE.ConeGeometry(20, 300, 25);
var material1 = new THREE.MeshBasicMaterial({ color: 0XFF0000 });

//Ampara
cone1 = new THREE.Mesh(geometry1, material1);
cone1.scale.y = 0.6;
cone1.position.copy(new THREE.Vector3(313.6466971314155, -100,  239.16806595610694));

//anuradapura
cone2 = new THREE.Mesh(geometry1, material1);
cone2.scale.y = 0.6;
cone2.position.copy(new THREE.Vector3(-133.50400526646462, -100,  -156.27262598648872));

//Badulla
cone3 = new THREE.Mesh(geometry1, material1);
cone3.scale.y = 0.6;
cone3.position.copy(new THREE.Vector3( 106.32576319189383, -100, 318.17393229980587));

//Batticaloa
cone4 = new THREE.Mesh(geometry1, material1);
cone4.scale.y = 0.6;
cone4.position.copy(new THREE.Vector3(311.96108079483827, -100, 36.40974663858708));

//colombo
cone5 = new THREE.Mesh(geometry1, material1);
cone5.scale.y = 0.6;
cone5.position.copy( new THREE.Vector3(-312.62347226347094, -100, 333.3669080282368) );


//galle
cone6 = new THREE.Mesh(geometry1, material1);
cone6.scale.y = 0.6;
cone6.position.copy( new THREE.Vector3(-205.54248874025956, -100,  634.3784195102967) );

//gampaha
cone7 = new THREE.Mesh(geometry1, material1);
cone7.scale.y = 0.6;
cone7.position.copy( new THREE.Vector3(-266.6700448217783, -100,  256.68171333209125) );


//hambanthota
cone8 = new THREE.Mesh(geometry1, material1);
cone8.scale.y = 0.6;
cone8.position.copy( new THREE.Vector3(112.37330392772338,  -100, 578.3823563446105) );

//jaffna
cone9 = new THREE.Mesh(geometry1, material1);
cone9.scale.y = 0.6;
cone9.position.copy( new THREE.Vector3(-263.70491733576927, -100,  -667.9713237287366) );

//kalutara
cone10 = new THREE.Mesh(geometry1, material1);
cone10.scale.y = 0.6;
cone10.position.y = -100;
cone10.position.copy( new THREE.Vector3(-252.87560003775883, -100,  460.9521869051496) );


//Kandy
cone11 = new THREE.Mesh(geometry1, material1);
cone11.scale.y = 0.6;
cone11.position.copy( new THREE.Vector3(-40.240137585480284, -100,  204.67288742878964) );


//kegalle
cone12 = new THREE.Mesh(geometry1, material1);
cone12.scale.y = 0.6;
cone12.position.copy( new THREE.Vector3(-144.28700305690123, -100, 216.37690318355408) );

// //kilinochchi
cone13 = new THREE.Mesh(geometry1, material1);
cone13.scale.y = 0.6;
cone13.position.copy( new THREE.Vector3(-141.51976635143092,  -100, -538.3927633695309) );

//kurunegala
cone14 = new THREE.Mesh(geometry1, material1);
cone14.scale.y = 0.6;
cone14.position.copy( new THREE.Vector3(-141.92780578871407, -100,  118.00975509833796) );

//mannar
cone15 = new THREE.Mesh(geometry1, material1);
cone15.scale.y = 0.6;
cone15.position.copy(new THREE.Vector3(-298.99836498681543,  -100, -401.4515391395307));

//matale
cone16 = new THREE.Mesh(geometry1, material1);
cone16.scale.y = 0.6;
cone16.position.copy(new THREE.Vector3(-45.79155488909924, -100,  120.37899894909856));

//matara
cone17 = new THREE.Mesh(geometry1, material1);
cone17.scale.y = 0.6;
cone17.position.copy( new THREE.Vector3(-89.98980886414427,  -100, 662.3722488275705) );

//Moneragala
cone18 = new THREE.Mesh(geometry1, material1);
cone18.scale.y = 0.6;
cone18.position.copy(new THREE.Vector3(202.11461141808945,  -100,  356.8571558559356));

// Mullaitivu
cone19 = new THREE.Mesh(geometry1, material1);

cone19.scale.y = 0.6;
cone19.position.copy(new THREE.Vector3(-11.315057047233381, -100, -484.87590940293467));


// Nuwara Eliya
cone20 = new THREE.Mesh(geometry1, material1);
cone20.scale.y = 0.6;
cone20.position.copy(new THREE.Vector3(12.041636594788613, -100,  311.99058754591056));


// Polonnaruwa
cone21= new THREE.Mesh(geometry1, material1);
cone21.scale.y = 0.6;
cone21.position.copy(new THREE.Vector3(88.93068952990603,  -100,  -17.35885074528801));

// Puttalam
cone22 = new THREE.Mesh(geometry1, material1);
cone22.scale.y = 0.6;
cone22.position.copy(new THREE.Vector3(-314.0152581244281, -100,  -58.89835148484544));

// Ratnapura
cone23 = new THREE.Mesh(geometry1, material1);
cone23.scale.y = 0.6;
cone23.position.copy(new THREE.Vector3(-118.38032693119229, -100,  399.8663773006007));

//trincomalee
cone24 = new THREE.Mesh(geometry1, material1);
cone24.scale.y = 0.6;
cone24.position.copy(new THREE.Vector3(141.39527860089362, -100, -262.84823731300366));

// Vavuniya


cone25 = new THREE.Mesh(geometry1, material1);
cone25.scale.y = 0.6;
cone25.position.copy(new THREE.Vector3(-86.58835181700681,  -100,  -311.44480867929485));



group1.add( cone1, cone2, cone3, cone4, cone5, cone6, cone7, cone8, cone9, cone10,
            cone11, cone12,cone13, cone14,cone15,cone16,cone17,cone18, cone19,cone20, 
             cone21,cone22,cone23,cone24,cone25);
