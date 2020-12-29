
treeGroup = new THREE.Group();
// treeGroup1 = new THREE.Group();

var geometry1 = new THREE.ConeGeometry(20, 300, 25);
var material1 = new THREE.MeshBasicMaterial({ color: 0X00FF00 });
var material2 = new THREE.MeshBasicMaterial({ color: 0X00FFFF });
var material3 = new THREE.MeshBasicMaterial({ color: 0Xff0000 });
var material4 = new THREE.MeshBasicMaterial({ color: 0XFFA500 });

// treeGroup3 = new THREE.Group();
var geometry = new THREE.CylinderGeometry(20, 20, 300, 25);
var material = new THREE.MeshBasicMaterial( { color: 0xA0522D} );
// var trunk = new THREE.Mesh( geometry, material );
// trunk.position.set(0,-1,0);
// scene.add( trunk );
//can change the radial segments according to the dataset
var radialSegments = 9;
var circleGeometry = new THREE.CylinderGeometry(100, 100, 30, 25);
var circlematerial = new THREE.MeshBasicMaterial( { color: 0xA0f220} );
// var leaves = new THREE.Mesh(circleGeometry, circlematerial);
// leaves.position.set(0,1,0);
// leaves.rotation.x  = 90;
// scene.add( leaves );

// camera.position.z = 5;

// treeGroup.add(trunk, leaves);
//Ampara
// tree1 = new THREE.Mesh(geometry1, material1);
trunk1 = new THREE.Mesh(geometry, material);
trunk1.scale.y = 0.6;
trunk1.position.copy(new THREE.Vector3(313.6466971314155, -100,  239.16806595610694))
leaf1 = new THREE.Mesh(circleGeometry, circlematerial);
leaf1.scale.y = 0.6
leaf1.rotation.x = 80;
leaf1.position.copy(new THREE.Vector3(313.6466971314155, 80,  239.16806595610694))
// tree1.scale.y = 0.6;
treeGroupAmpara = new THREE.Group();
treeGroupAmpara.add(trunk1, leaf1);
// tree1.position.copy(new THREE.Vector3(313.6466971314155, -100,  239.16806595610694));
// treeGroupAmpara.position.copy(new THREE.Vector3(313.6466971314155, -100,  239.16806595610694));

// //Ampara
// treex = new THREE.Mesh(geometry1, material2);
// treex.scale.y = 0.6;
// treex.position.copy(new THREE.Vector3(300.6466971314155, -100,  230.16806595610694));

//anuradapura
trunk2 = new THREE.Mesh(geometry, material);
trunk2.scale.y = 0.6;
trunk2.position.copy(new THREE.Vector3(-133.50400526646462, -100,  -156.27262598648872))
leaf2 = new THREE.Mesh(circleGeometry, circlematerial);
leaf2.scale.y = 0.6
leaf2.rotation.x = 80;
leaf2.position.copy(new THREE.Vector3(-133.50400526646462, 80,  -156.27262598648872))
// tree1.scale.y = 0.6;
treeGroupAnuradhapura = new THREE.Group();
treeGroupAnuradhapura.add(trunk2, leaf2);
// tree2 = new THREE.Mesh(geometry1, material1);
// tree2.scale.y = 0.6;
// tree2.position.copy(new THREE.Vector3(-133.50400526646462, -100,  -156.27262598648872));

//Badulla
trunk3 = new THREE.Mesh(geometry, material);
trunk3.scale.y = 0.6;
trunk3.position.copy(new THREE.Vector3(106.32576319189383, -100, 318.17393229980587))
leaf3 = new THREE.Mesh(circleGeometry, circlematerial);
leaf3.scale.y = 0.6
leaf3.rotation.x = 80;
leaf3.position.copy(new THREE.Vector3(106.32576319189383, 80, 318.17393229980587))
// tree1.scale.y = 0.6;
treeGroupBadulla = new THREE.Group();
treeGroupBadulla.add(trunk3, leaf3);
// tree3 = new THREE.Mesh(geometry1, material1);
// tree3.scale.y = 0.6;
// tree3.position.copy(new THREE.Vector3( 106.32576319189383, -100, 318.17393229980587));

//Batticaloa
trunk4 = new THREE.Mesh(geometry, material);
trunk4.scale.y = 0.6;
trunk4.position.copy(new THREE.Vector3(311.96108079483827, -100, 36.40974663858708))
leaf4 = new THREE.Mesh(circleGeometry, circlematerial);
leaf4.scale.y = 0.6
leaf4.rotation.x = 80;
leaf4.position.copy(new THREE.Vector3(311.96108079483827, 80, 36.40974663858708))
// tree1.scale.y = 0.6;
treeGroupBatticaloa = new THREE.Group();
treeGroupBatticaloa.add(trunk4, leaf4);
// tree4 = new THREE.Mesh(geometry1, material1);
// tree4.scale.y = 0.6;
// tree4.position.copy(new THREE.Vector3(311.96108079483827, -100, 36.40974663858708));

//colombo
trunk5 = new THREE.Mesh(geometry, material);
trunk5.scale.y = 0.6;
trunk5.position.copy(new THREE.Vector3(-312.62347226347094, -100, 333.3669080282368))
leaf5 = new THREE.Mesh(circleGeometry, material3);
leaf5.scale.y = 0.6
leaf5.rotation.x = 80;
leaf5.position.copy(new THREE.Vector3(-312.62347226347094, 80, 333.3669080282368))
// tree1.scale.y = 0.6;
treeGroupColombo = new THREE.Group();
treeGroupColombo.add(trunk5, leaf5);
// tree5 = new THREE.Mesh(geometry1, material1);
// tree5.scale.y = 0.6;
// tree5.position.copy( new THREE.Vector3(-312.62347226347094, -100, 333.3669080282368) );


//galle
trunk6 = new THREE.Mesh(geometry, material);
trunk6.scale.y = 0.6;
trunk6.position.copy(new THREE.Vector3(-205.54248874025956, -100,  634.3784195102967))
leaf6 = new THREE.Mesh(circleGeometry, circlematerial);
leaf6.scale.y = 0.6
leaf6.rotation.x = 80;
leaf6.position.copy(new THREE.Vector3(-205.54248874025956, 80,  634.3784195102967))
// tree1.scale.y = 0.6;
treeGroupGalle = new THREE.Group();
treeGroupGalle.add(trunk6, leaf6);
// tree6 = new THREE.Mesh(geometry1, material1);
// tree6.scale.y = 0.6;
// tree6.position.copy( new THREE.Vector3(-205.54248874025956, -100,  634.3784195102967) );

//gampaha
trunk7 = new THREE.Mesh(geometry, material);
trunk7.scale.y = 0.6;
trunk7.position.copy(new THREE.Vector3(-266.6700448217783, -100,  256.68171333209125))
leaf7 = new THREE.Mesh(circleGeometry, material4);
leaf7.scale.y = 0.6
leaf7.rotation.x = 80;
leaf7.position.copy(new THREE.Vector3(-266.6700448217783, 80,  256.68171333209125))
// tree1.scale.y = 0.6;
treeGroupGampaha = new THREE.Group();
treeGroupGampaha.add(trunk7, leaf7);
// tree7 = new THREE.Mesh(geometry1, material1);
// tree7.scale.y = 0.6;
// tree7.position.copy( new THREE.Vector3(-266.6700448217783, -100,  256.68171333209125) );


//hambanthota
trunk8 = new THREE.Mesh(geometry, material);
trunk8.scale.y = 0.6;
trunk8.position.copy(new THREE.Vector3(112.37330392772338,  -100, 578.3823563446105))
leaf8 = new THREE.Mesh(circleGeometry, circlematerial);
leaf8.scale.y = 0.6
leaf8.rotation.x = 80;
leaf8.position.copy(new THREE.Vector3(112.37330392772338,  80, 578.3823563446105))
// tree1.scale.y = 0.6;
treeGroupHambanthota = new THREE.Group();
treeGroupHambanthota.add(trunk8, leaf8);
// tree8 = new THREE.Mesh(geometry1, material1);
// tree8.scale.y = 0.6;
// tree8.position.copy( new THREE.Vector3(112.37330392772338,  -100, 578.3823563446105) );

//jaffna
trunk9 = new THREE.Mesh(geometry, material);
trunk9.scale.y = 0.6;
trunk9.position.copy(new THREE.Vector3(-263.70491733576927, -100,  -667.9713237287366))
leaf9 = new THREE.Mesh(circleGeometry, circlematerial);
leaf9.scale.y = 0.6
leaf9.rotation.x = 80;
leaf9.position.copy(new THREE.Vector3(-263.70491733576927, 80,  -667.9713237287366))
// tree1.scale.y = 0.6;
treeGroupJaffna = new THREE.Group();
treeGroupJaffna.add(trunk9, leaf9);
// tree9 = new THREE.Mesh(geometry1, material1);
// tree9.scale.y = 0.6;
// tree9.position.copy( new THREE.Vector3(-263.70491733576927, -100,  -667.9713237287366) );

//kalutara
trunk10 = new THREE.Mesh(geometry, material);
trunk10.scale.y = 0.6;
trunk10.position.copy(new THREE.Vector3(-252.87560003775883, -100,  460.9521869051496))
leaf10 = new THREE.Mesh(circleGeometry, circlematerial);
leaf10.scale.y = 0.6
leaf10.rotation.x = 80;
leaf10.position.copy(new THREE.Vector3(-252.87560003775883, 80,  460.9521869051496))
// tree1.scale.y = 0.6;
treeGroupKalutara = new THREE.Group();
treeGroupKalutara.add(trunk10, leaf10);
// tree10 = new THREE.Mesh(geometry1, material1);
// tree10.scale.y = 0.6;
// tree10.position.y = -100;
// tree10.position.copy( new THREE.Vector3(-252.87560003775883, -100,  460.9521869051496) );


//Kandy
trunk11 = new THREE.Mesh(geometry, material);
trunk11.scale.y = 0.6;
trunk11.position.copy(new THREE.Vector3(-40.240137585480284, -100,  204.67288742878964))
leaf11 = new THREE.Mesh(circleGeometry, material4);
leaf11.scale.y = 0.6
leaf11.rotation.x = 80;
leaf11.position.copy(new THREE.Vector3(-40.240137585480284, 80,  204.67288742878964))
// tree1.scale.y = 0.6;
treeGroupKandy = new THREE.Group();
treeGroupKandy.add(trunk11, leaf11);
// tree11 = new THREE.Mesh(geometry1, material1);
// tree11.scale.y = 0.6;
// tree11.position.copy( new THREE.Vector3(-40.240137585480284, -100,  204.67288742878964) );


//kegalle
trunk12 = new THREE.Mesh(geometry, material);
trunk12.scale.y = 0.6;
trunk12.position.copy(new THREE.Vector3(-144.28700305690123, -100, 216.37690318355408))
leaf12 = new THREE.Mesh(circleGeometry, circlematerial);
leaf12.scale.y = 0.6
leaf12.rotation.x = 80;
leaf12.position.copy(new THREE.Vector3(-144.28700305690123, 80, 216.37690318355408))
// tree1.scale.y = 0.6;
treeGroupKegalle = new THREE.Group();
treeGroupKegalle.add(trunk12, leaf12);
// tree12 = new THREE.Mesh(geometry1, material1);
// tree12.scale.y = 0.6;
// tree12.position.copy( new THREE.Vector3(-144.28700305690123, -100, 216.37690318355408) );

// //kilinochchi
trunk13 = new THREE.Mesh(geometry, material);
trunk13.scale.y = 0.6;
trunk13.position.copy(new THREE.Vector3(-141.51976635143092,  -100, -538.3927633695309))
leaf13 = new THREE.Mesh(circleGeometry, circlematerial);
leaf13.scale.y = 0.6
leaf13.rotation.x = 80;
leaf13.position.copy(new THREE.Vector3(-141.51976635143092,  80, -538.3927633695309))
// tree1.scale.y = 0.6;
treeGroupKilinochchi = new THREE.Group();
treeGroupKilinochchi.add(trunk13, leaf13);
// tree13 = new THREE.Mesh(geometry1, material1);
// tree13.scale.y = 0.6;
// tree13.position.copy( new THREE.Vector3(-141.51976635143092,  -100, -538.3927633695309) );

//kurunegala
trunk14 = new THREE.Mesh(geometry, material);
trunk14.scale.y = 0.6;
trunk14.position.copy(new THREE.Vector3(-141.92780578871407, -100,  118.00975509833796))
leaf14 = new THREE.Mesh(circleGeometry, circlematerial);
leaf14.scale.y = 0.6
leaf14.rotation.x = 80;
leaf14.position.copy(new THREE.Vector3(-141.92780578871407, 80,  118.00975509833796))
// tree1.scale.y = 0.6;
treeGroupKurunegala = new THREE.Group();
treeGroupKurunegala.add(trunk14, leaf14);
// tree14 = new THREE.Mesh(geometry1, material1);
// tree14.scale.y = 0.6;
// tree14.position.copy( new THREE.Vector3(-141.92780578871407, -100,  118.00975509833796) );

//mannar
trunk15 = new THREE.Mesh(geometry, material);
trunk15.scale.y = 0.6;
trunk15.position.copy(new THREE.Vector3(-298.99836498681543,  -100, -401.4515391395307))
leaf15 = new THREE.Mesh(circleGeometry, circlematerial);
leaf15.scale.y = 0.6
leaf15.rotation.x = 80;
leaf15.position.copy(new THREE.Vector3(-298.99836498681543,  80, -401.4515391395307))
// tree1.scale.y = 0.6;
treeGroupMannar = new THREE.Group();
treeGroupMannar.add(trunk15, leaf15);
// tree15 = new THREE.Mesh(geometry1, material1);
// tree15.scale.y = 0.6;
// tree15.position.copy(new THREE.Vector3(-298.99836498681543,  -100, -401.4515391395307));

//matale
trunk16 = new THREE.Mesh(geometry, material);
trunk16.scale.y = 0.6;
trunk16.position.copy(new THREE.Vector3(-45.79155488909924, -100,  120.37899894909856))
leaf16 = new THREE.Mesh(circleGeometry, circlematerial);
leaf16.scale.y = 0.6
leaf16.rotation.x = 80;
leaf16.position.copy(new THREE.Vector3(-45.79155488909924, 80,  120.37899894909856))
// tree1.scale.y = 0.6;
treeGroupMatale = new THREE.Group();
treeGroupMatale.add(trunk16, leaf16);
// tree16 = new THREE.Mesh(geometry1, material1);
// tree16.scale.y = 0.6;
// tree16.position.copy(new THREE.Vector3(-45.79155488909924, -100,  120.37899894909856));

//matara
trunk17 = new THREE.Mesh(geometry, material);
trunk17.scale.y = 0.6;
trunk17.position.copy(new THREE.Vector3(-89.98980886414427,  -100, 662.3722488275705))
leaf17 = new THREE.Mesh(circleGeometry, circlematerial);
leaf17.scale.y = 0.6
leaf17.rotation.x = 80;
leaf17.position.copy(new THREE.Vector3(-89.98980886414427,  80, 662.3722488275705))
// tree1.scale.y = 0.6;
treeGroupMatara = new THREE.Group();
treeGroupMatara.add(trunk17, leaf17);
// tree17 = new THREE.Mesh(geometry1, material1);
// tree17.scale.y = 0.6;
// tree17.position.copy( new THREE.Vector3(-89.98980886414427,  -100, 662.3722488275705) );

//Moneragala
trunk18 = new THREE.Mesh(geometry, material);
trunk18.scale.y = 0.6;
trunk18.position.copy(new THREE.Vector3(202.11461141808945,  -100,  356.8571558559356))
leaf18 = new THREE.Mesh(circleGeometry, circlematerial);
leaf18.scale.y = 0.6
leaf18.rotation.x = 80;
leaf18.position.copy(new THREE.Vector3(202.11461141808945,  80,  356.8571558559356))
// tree1.scale.y = 0.6;
treeGroupMoneragala = new THREE.Group();
treeGroupMoneragala.add(trunk18, leaf18);
// tree18 = new THREE.Mesh(geometry1, material1);
// tree18.scale.y = 0.6;
// tree18.position.copy(new THREE.Vector3(202.11461141808945,  -100,  356.8571558559356));

// Mullaitivu
trunk19 = new THREE.Mesh(geometry, material);
trunk19.scale.y = 0.6;
trunk19.position.copy(new THREE.Vector3(-11.315057047233381, -100, -484.87590940293467))
leaf19 = new THREE.Mesh(circleGeometry, circlematerial);
leaf19.scale.y = 0.6
leaf19.rotation.x = 80;
leaf19.position.copy(new THREE.Vector3(-11.315057047233381, 80, -484.87590940293467))
// tree1.scale.y = 0.6;
treeGroupMullaitiv = new THREE.Group();
treeGroupMullaitiv.add(trunk19, leaf19);
// tree19 = new THREE.Mesh(geometry1, material1);
//
// tree19.scale.y = 0.6;
// tree19.position.copy(new THREE.Vector3(-11.315057047233381, -100, -484.87590940293467));


// Nuwara Eliya
trunk20 = new THREE.Mesh(geometry, material);
trunk20.scale.y = 0.6;
trunk20.position.copy(new THREE.Vector3(12.041636594788613, -100,  311.99058754591056))
leaf20 = new THREE.Mesh(circleGeometry, material3);
leaf20.scale.y = 0.6
leaf20.rotation.x = 80;
leaf20.position.copy(new THREE.Vector3(12.041636594788613, 80,  311.99058754591056))
// tree1.scale.y = 0.6;
treeGroupNuwaraEliya= new THREE.Group();
treeGroupNuwaraEliya.add(trunk20, leaf20);
// tree20 = new THREE.Mesh(geometry1, material1);
// tree20.scale.y = 0.6;
// tree20.position.copy(new THREE.Vector3(12.041636594788613, -100,  311.99058754591056));


// Polonnaruwa
trunk21 = new THREE.Mesh(geometry, material);
trunk21.scale.y = 0.6;
trunk21.position.copy(new THREE.Vector3(88.93068952990603,  -100,  -17.35885074528801))
leaf21 = new THREE.Mesh(circleGeometry, circlematerial);
leaf21.scale.y = 0.6
leaf21.rotation.x = 80;
leaf21.position.copy(new THREE.Vector3(88.93068952990603,  80,  -17.35885074528801))
// tree1.scale.y = 0.6;
treeGroupPolonnaruwa = new THREE.Group();
treeGroupPolonnaruwa.add(trunk21, leaf21);
// tree21= new THREE.Mesh(geometry1, material1);
// tree21.scale.y = 0.6;
// tree21.position.copy(new THREE.Vector3(88.93068952990603,  -100,  -17.35885074528801));

// Puttalam
trunk22 = new THREE.Mesh(geometry, material);
trunk22.scale.y = 0.6;
trunk22.position.copy(new THREE.Vector3(-314.0152581244281, -100,  -58.89835148484544))
leaf22 = new THREE.Mesh(circleGeometry, circlematerial);
leaf22.scale.y = 0.6
leaf22.rotation.x = 80;
leaf22.position.copy(new THREE.Vector3(-314.0152581244281, 80,  -58.89835148484544))
// tree1.scale.y = 0.6;
treeGroupPuttalam = new THREE.Group();
treeGroupPuttalam.add(trunk22, leaf22);
// tree22 = new THREE.Mesh(geometry1, material1);
// tree22.scale.y = 0.6;
// tree22.position.copy(new THREE.Vector3(-314.0152581244281, -100,  -58.89835148484544));

// Ratnapura
trunk23 = new THREE.Mesh(geometry, material);
trunk23.scale.y = 0.6;
trunk23.position.copy(new THREE.Vector3(-118.38032693119229, -100,  399.8663773006007))
leaf23 = new THREE.Mesh(circleGeometry, material3);
leaf23.scale.y = 0.6
leaf23.rotation.x = 80;
leaf23.position.copy(new THREE.Vector3(-118.38032693119229, 80,  399.8663773006007))
// tree1.scale.y = 0.6;
treeGroupRatnapura= new THREE.Group();
treeGroupRatnapura.add(trunk23, leaf23);
// tree23 = new THREE.Mesh(geometry1, material1);
// tree23.scale.y = 0.6;
// tree23.position.copy(new THREE.Vector3(-118.38032693119229, -100,  399.8663773006007));

//trincomalee
trunk24 = new THREE.Mesh(geometry, material);
trunk24.scale.y = 0.6;
trunk24.position.copy(new THREE.Vector3(141.39527860089362, -100, -262.84823731300366))
leaf24 = new THREE.Mesh(circleGeometry, circlematerial);
leaf24.scale.y = 0.6
leaf24.rotation.x = 80;
leaf24.position.copy(new THREE.Vector3(141.39527860089362, 80, -262.84823731300366))
// tree1.scale.y = 0.6;
treeGroupTrincomalee = new THREE.Group();
treeGroupTrincomalee.add(trunk24, leaf24);
// tree24 = new THREE.Mesh(geometry1, material1);
// tree24.scale.y = 0.6;
// tree24.position.copy(new THREE.Vector3(141.39527860089362, -100, -262.84823731300366));

// Vavuniya
trunk25 = new THREE.Mesh(geometry, material);
trunk25.scale.y = 0.6;
trunk25.position.copy(new THREE.Vector3(-86.58835181700681,  -100,  -311.44480867929485))
leaf25 = new THREE.Mesh(circleGeometry, circlematerial);
leaf25.scale.y = 0.6
leaf25.rotation.x = 80;
leaf25.position.copy(new THREE.Vector3(-86.58835181700681,  80,  -311.44480867929485))
// tree1.scale.y = 0.6;
treeGroupVavuniya = new THREE.Group();
treeGroupVavuniya.add(trunk25, leaf25);

// tree25 = new THREE.Mesh(geometry1, material1);
// tree25.scale.y = 0.6;
// tree25.position.copy(new THREE.Vector3(-86.58835181700681,  -100,  -311.44480867929485));


// treeGroup1.add(treex)
treeGroup.add(treeGroupAmpara, treeGroupAnuradhapura, treeGroupBadulla, treeGroupBatticaloa, treeGroupColombo, 
    treeGroupGalle, treeGroupGampaha, treeGroupHambanthota, treeGroupJaffna, treeGroupKalutara,
    treeGroupKandy, treeGroupKegalle, treeGroupKilinochchi, treeGroupKurunegala, treeGroupMannar, treeGroupMatale, 
    treeGroupMatara, treeGroupMoneragala, treeGroupMullaitiv, treeGroupNuwaraEliya,
    treeGroupPolonnaruwa, treeGroupPuttalam, treeGroupRatnapura, treeGroupTrincomalee, treeGroupVavuniya);


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
    