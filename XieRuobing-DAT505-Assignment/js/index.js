//Global variables
var container, stats;
var scene, camera, renderer;
var geometry1,geometry2, material,material2, mesh1,mesh2,mesh3;
var light1, light2;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function init(){
    scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor("#000000");
  renderer.setSize( window.innerWidth, window.innerHeight );

  var mtlLoader = new THREE.MTLLoader();

  mtlLoader.load("model/menkou3.mtl", function(materials){
  materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);

      objLoader.load("model/menkou3.obj", function(mesh){
        mesh.traverse(function(node){
          if( node instanceof THREE.Mesh ){
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
       var sizeRand = Math.random() * 0.5;
        mesh.scale.set(3,3,3);
        mesh.position.set(0,0,-800);
        mesh.position.z=-1000;
        mesh.rotation.y=1;
        //mesh.position.set(Math.random()*800-400, Math.random()*800-400, Math.random()*800-400);
        //mesh.rotation.y = -Math.PI/Math.random()*4;

        scene.add(mesh);
       //Add to the array so that we can access for raycasting
      });
    });
      document.body.appendChild( renderer.domElement );
 window.addEventListener( "mousedown", onDocumentMouseDown, false );
  window.addEventListener( "mousemove", onDocumentMouseMove, false );
 window.requestAnimationFrame(render);

}


function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.SphereGeometry(20, 5, 5);
  geometry2= new THREE.BoxGeometry(200, 200, 200);
    geometry3= new THREE.BoxGeometry(200, 200, 50);
      geometry4= new THREE.BoxGeometry(200, 200, 50);
  material = new THREE.MeshNormalMaterial({color:"#ff00ff"} );
  mesh1 = new THREE.Mesh( geometry1, material );
  mesh2 = new THREE.Mesh( geometry2, material );
    mesh3 = new THREE.Mesh( geometry3, material );
        mesh4= new THREE.Mesh( geometry4, material );
  mesh1.position.set(0,0,0);
  mesh1.position.z = -1000;
  mesh2.position.set(20,20,-500);
    mesh3.position.set(-100,-150,-600);
        mesh4.position.set(-150,-150,-600);
  mesh2.userData = { URL: "homepage.html"};
//  scene.add( mesh1 );
  //scene.add( mesh2 );
  //scene.add( mesh3 );
mesh2.addEventListener( "mousedown", onDocumentMouseDown, false );



  light1 = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light1);

  light2 = new THREE.PointLight(0xffffff, 1);
  scene.add(light2);



}
function onDocumentMouseMove( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  //scene.add(mesh3);
  //console.log(event.clientX);
  //console.log(event.clientY);
  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );
if( intersects.length>0 ) {
  //window.open(intersects[0].object.userData.URL);
  scene.add(mesh3);
}else{scene.remove(mesh3)}
  //console.log(intersects);

}

function onDocumentMouseDown( event ) {
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  //scene.add(mesh3);
  raycaster.setFromCamera( mouse, camera );

  var intersects = raycaster.intersectObjects( scene.children );
 if( intersects.length>0) {
  top.location ="homepage.html";
  //scene.add(mesh3);
  }

}


var render = function () {
  requestAnimationFrame( render );
  mesh1.rotation.x += 0.01;
  mesh1.rotation.y += 0.01;
  //mesh2.rotation.x += 0.02;
  //mesh2.rotation.y += 0.02;

/*  raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children );
 for ( var i = 0; i < intersects.length; i++ ) {
  //window.open(intersects[0].object.userData.URL);
}*/
  renderer.setClearColor("#2A3867");
  renderer.render(scene, camera);
};


init();
geometry();
render();
