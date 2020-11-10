function setup() {
  console.log(null+1);
  var width = 250;
  var height = 200;
  createCanvas(width , height ) ;
  background(0) ;
    for(var x = 0; x < width ; x += width / 10) {
      for(var y = 0; y < height ; y += height / 5) {
        stroke(125 , 125 , 125) ;
        strokeWeight(1) ;
        line(x, 0, x, height ) ;
        line(0 , y, width , y);
      }
    }
    var data = [];
    for( let i = 0; i < 12; i ++) {
      var x = Math.floor(Math.random() * height );
      var y = Math.floor(Math.random() * height );
      data.push([x, y]);
      fill(255 , 255 , 255);
      circle(x, height - y, 7); // 200 -y para q se dibuje apropiadamente
      textSize(8);
      text(x + ',' + y, x + 5, height - y);// 200 -y para q se dibuje apropiadamente
    }
    var puntos = [];
    var x = Math.floor(Math.random() * height );
    var y = Math.floor(Math.random() * height );
    puntos.push(x,y);
    var root = build_kdtree(data);  
    console.log(root);
    console.log("altura del árbol");
    console.log(getHeight(root));
    
    console.log(generate_dot(root));
    console.log("raiz");
    console.log(root);
    console.log("los nodos son");
    console.log(data);
    console.log("el punto random es");

    console.log([30, 17]);
    console.log("punto cercano closest_point");
    console.log(closest_point_big(root, [30, 17], 0));
    console.log("punto cercano closest_point_brute_force");
    console.log(closest_point_brute_force(data,[30, 17]));
    console.log("punto cercano naive_closest_point");
    console.log(naive_closest_point(root,[30, 17]));
    console.log("más cercanso");
    
    console.log(KNNN(2));


}
