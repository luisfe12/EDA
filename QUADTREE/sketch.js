/*let qt; //prima que manda 3 random
let count = 0;
function setup () {
    createCanvas (400 ,400) ;
    // centre point and half of width and height
    let boundary = new Rectangle (200 ,200 ,200 ,200) ;
    // each leave just could have 4 elements
    qt = new QuadTree ( boundary , 4) ;
    console .log (qt);
    for (let i = 0; i < 3; i ++) {
        let p = new Point ( Math.random () * 400 , Math.random () * 400) ;
        qt. insert (p);
        }
    background (0) ;
    qt. show () ;
}*/

let qt;
let count = 0;
function setup(){
    createCanvas (400 ,400) ;
    let boundary = new Rectangle (200 ,200 ,200 ,200) ;
    qt = new QuadTree ( boundary , 4) ;
    console .log (qt);
    for (let i =0; i < 2500; i ++) {
        let p = new Point ( Math . random () * 400 , Math . random () * 400) ;
        qt. insert (p);
    }
    background (0) ;
    qt. show () ;
    stroke (0 ,255 ,0) ;
    rectMode ( CENTER );
    let range = new Rectangle ( random (200) ,random (200) ,random (50) ,random (50) )
    rect ( range .x, range .y, range .w*2 , range .h *2) ;
    let points = [];
    qt. query (range , points );
    for (let p of points ){
        strokeWeight (4) ;
        point (p.x, p.y);
    }
    console.log( count );
    
}/*
let qt;
let count = 0;
function setup () {
    createCanvas (400 ,400) ;
    let boundary = new Rectangle (200 ,200 ,200 ,200) ;
    qt = new QuadTree ( boundary , 4) ;
    console.log (qt);
    for (let i =0; i < 2000; i ++) {
        let p = new Point ( Math . random () * 400 , Math . random () * 400) ;
        qt.insert (p);
    }
    background (0) ;
    qt.show () ;
    //console.log( count );
}


function draw(){
    background (0) ;
    qt.show () ;
    stroke (0 ,255 ,0) ;
    rectMode ( CENTER );
    let range = new Rectangle ( mouseX ,mouseY ,50 ,50)
    rect ( range .x, range .y, range .w*2 , range .h *2) ;
    let points = [];
    qt.query (range , points );
    
    for (let p of points ){
        strokeWeight (4) ;
        point (p.x, p.y);
    }
    //console.log( count );
}*/