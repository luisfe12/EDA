k = 2;
can = 2;
var puntos_mejores = [];//para la tercera funcion
puntos_mejoresKNN = [can];
optimo = 0;
contadorrr = 0;
contadorrr2 = 0;

class knn{
  constructor(point, cantidad){
    this.point = point;
    this.cantidad = cantidad;
  }
}
class Node {
  constructor (point , axis ){
    this.point = point ;
    this.left = null ;
    this.right = null ;
    this.axis = axis ;
    //axis = 0, en x
    //axis = 1, en y
  }
}
function getHeight ( node ) {
  if(node == null){
    return 0;
  }
  return Math.max(1 + int(getHeight(node.left)),1+ int(getHeight(node.right))); 

}

function generate_dot ( node ) {
  var str = "";
  if(node.left != null){
    str += '"'+node.point[0].toString()+','+node.point[1].toString()+'" ';
    str = str+ "->" +'"'+node.left.point[0].toString()+','+node.left.point[1].toString()+'" ';
    str += "\n";
    var izq = generate_dot(node.left);
    str = str + izq +"\n";
  }
  if(node.right != null){
    str += '"'+node.point[0].toString()+','+node.point[1].toString()+'" ';
    str = str+ "->" +'"'+node.right.point[0].toString()+','+node.right.point[1].toString()+'" ';
    str += "\n";
    var der = generate_dot(node.right);
    str = str + der +"\n";
  }
  return str;
}

function orderx(pa,pb){
  if(pa[0]>pb[0]) return 1;
  else {
    return -1;
  }
}
function ordery(pa,pb){
  if(pa[1] > pb[1]) return 1;
  else {
    return -1;
  }
}


function build_kdtree ( points , depth = 0) {
  if(points==0){
    return null;
  }
  console.log(points);
  if(depth%2==0)
    points.sort(orderx);
  else  
    points.sort(ordery);
  var root = new Node(points[Math.floor(points.length/2)],depth%2);
  root.left = build_kdtree(points.slice(0,points.length/2),depth+1);
  root.right = build_kdtree(points.slice(points.length/2+1,points.length),depth+1);

  return root;
}

function distanceSquared ( point1 , point2 ){//distacia de un punto a otro
  var distance = 0;
  for (var i = 0; i < k; i ++)
  distance += Math.pow (( point1 [i] - point2 [i]) , 2) ;
  return Math.sqrt ( distance );
}

function distacaci(valor1, valor2){//funcion para la cmprobasr distancia no se llego a usar
  valor3 = valor1 - valor2;
  return valor3;
}


function menor(valor1, valor2){
  if(valor1 < valor2){
    return valor1;
  }
  return valor2;
}

function naive_closest_point(node , point , depth = 0, best = null ) {

  auxiliar = distanceSquared(best.point, point);
  auxiliar1 = distanceSquared(node.point, point); 
  if(depth == 0 || depth%2 == 0){//para las x
    if(auxiliar < auxiliar1){
      return best.point;
    }
    else{
      if(point[0] > node.point[0]){
        closest_point(node.right, point, node.axis, node);
      }else{
        closest_point(node.left, point, node.axis, node);
      }
    }
  }else{//para las y
    if(auxiliar1 < auxiliar1){
      return best.point;
    }
    else{
      if(point[1] > node.point[1]){
        closest_point(node.right, point, node.axis, node);
      }else{
        closest_point(node.left, point, node.axis, node);
      }
    }
  }
}

function closest_point_brute_force ( points , point ) {
  best = points[0]
  for ( let i = 1 ; i < points.length ; i++)
  {
    if ( distanceSquared(best,point) > distanceSquared(points[i],point) )
      best = points[i];
  }
  return best;
}

function naive_closest_point(node , point , depth = 0, best = null ) {
  best = node.point;
  while (node != null )
  {
    if ( best == null || distanceSquared(best,point) > distanceSquared(point,node.point) ) 
    {
      best = node.point;
    }
    if ( node.left != null && node.right != null)
    {
      if ( !depth%2 )
      {
        if ( point[0] - node.left.point[0] <   node.right.point[0] - point[0] )
          node = node.left;
        else
          node = node.right;
      }
      else
      {
        if ( point[1] - node.left.point[1] <   node.right.point[1] - point[1] )
          node = node.left;
        else
          node = node.right;
      }
    }
    else if ( node.left != null )
    {
      node = node.left;
    }
    else if ( node.right != null )
    {
      node = node.right;
    }
    else
    {
      node = node.left;
    }
    depth++;
  }
  return best;
}

function  closest_point(node , point , depth = 0){
  if(node == null){return;}
  
  var distacia_puntos;
  if(depth == 0 && contadorrr == 0 && contadorrr2 == 0){ 
    optimo  = distanceSquared(node.point, point);
    puntos_mejores = node.point;
    //para el knn
    var nuevo = new knn(node.point, optimo);
    puntos_mejoresKNN[contadorrr2] = nuevo;
    if(contadorrr2 < can){contadorrr2++;}
    //fin para el knn
    contadorrr++;
    
  }
  else{
    distacia_puntos = distanceSquared(node.point, point);//ver de nuevo algo anda mal
    var nuevo =  new knn(node.point, distacia_puntos);
    puntos_mejoresKNN[contadorrr2]= nuevo;
    var temporal = new knn([0 ,0], 0);
    //swap
    if(puntos_mejoresKNN[contadorrr2-1].cantidad > puntos_mejoresKNN[contadorrr2].cantidad){
      temporal.point = puntos_mejoresKNN[contadorrr2-1].point;
      temporal.cantidad = puntos_mejoresKNN[contadorrr2-1].cantidad;
      puntos_mejoresKNN[contadorrr2-1].point = puntos_mejoresKNN[contadorrr2].point;
      puntos_mejoresKNN[contadorrr2-1].cantidad = puntos_mejoresKNN[contadorrr2].cantidad;
      puntos_mejoresKNN[contadorrr2].point = temporal.point;
      puntos_mejoresKNN[contadorrr2].cantidad = temporal.cantidad;
      
    }

    if(distacia_puntos < optimo){
      puntos_mejores = node.point;
     
    }
    optimo = menor(distacia_puntos, optimo);
    if(contadorrr2 < can){contadorrr2++;}
    
    
  }

  if(node.right != null || node.left != null){
    if(depth == 0 || depth%2 == 0){
      if((node.point[0] - point[0]) < distacia_puntos){
        if(node.left != null){
          closest_point(node.left, point, node.left.axis);
        }
        else if(node.right != null){
          closest_point(node.right, point, node.right.axis);
        }
      }
      else{
        if(point[0] > node.point[0]){
          if(node.right != null){
            closest_point(node.right, point, node.right.axis);
          }
        }else{
          if(node.left != null){
            closest_point(node.left, point, node.left.axis);
          }
        }
      }
    }else{
      if((node.point[1] - point[1]) < distacia_puntos){
        if(node.left != null){
          closest_point(node.left, point, node.left.axis);
        }
        if(node.right != null){
          closest_point(node.right, point, node.right.axis);
        }
      }
      else{
        if(point[1] > node.point[1]){
          if(node.right != null){
            closest_point(node.right, point, node.right.axis);
          }
        }else{
          if(node.left != null){
            closest_point(node.left, point, node.left.axis);
          }
        }
      }
    }
  }

  return;
}

function  closest_point_big(node , point , depth = 0){
  closest_point(node, point, depth);
  return puntos_mejores;
}

function KNNN(cantidad){
  if(puntos_mejoresKNN.length >= cantidad){
    for(var i = 0; i < cantidad; i++) {
      console.log(puntos_mejoresKNN[i].point);
      console.log(puntos_mejoresKNN[i].cantidad);
    }
  }
  else{
    for(var i = 0; i < puntos_mejoresKNN.length; i++) {
      console.log(puntos_mejoresKNN[i].point);
      console.log(puntos_mejoresKNN[i].cantidad);
    }
  }
}