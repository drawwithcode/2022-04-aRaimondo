let dotX;
let dotY;
let rectX;
let rectY;
let rectW;
let rectH;
let penna;
let bgcolor;
let destra;
let sinistra;
let sopra;
let sotto;
let value = 220;
let button;


function setup() {
  createCanvas(windowWidth, windowHeight);
  bgcolor = 210;
  background(210, 0, 39);
  textAlign(CENTER);
  rectMode(CENTER);
  fill(255, 255, 255, 80)
  text("Shake to erase", windowWidth/2, windowHeight/10)
  dotX = windowWidth/2;                                                                   //punto di partenza della penna
  dotY = windowHeight/2;                                                                  
  destra = new Tasto((windowWidth/10)+25, 7*(windowHeight/8), 50, "DX");                  //tasti direzionali
  sinistra = new Tasto((windowWidth/10)-25, 7*(windowHeight/8), 50, "SX");
  sopra = new Tasto(9*(windowWidth/10)+25, 7*(windowHeight/8), 50, "UP");
  sotto = new Tasto(9*(windowWidth/10)-25, 7*(windowHeight/8), 50, "DOWN");
  rectX = windowWidth/2;                                                                  //posizione e dimensione del rettangolo grigio
  rectY = windowHeight/2;
  rectW = 9*(windowWidth/10);
  rectH = 6*(windowHeight/10);
  noStroke();
  push()
  translate(0, -windowHeight/20);                      
  fill(value);
  rect(rectX, rectY, rectW, rectH, 30)
  pop()
  button = createButton('Fullscreen');                                                    //bottone per fullscreen (ATTENZIONE: DA IOS NON FUNZIONA ANCHE DANDO IL CONSENSO)
  button.size(80,20);
  button.position((windowWidth/2)-40, 7*(windowHeight/8));
  button.mousePressed(schermointero);
  button.addClass("prevent-select");                                                      //aggiunta classe da css per evitare che sia evidenziabile il testo del pulsante
}

function draw() {

  destra.show();                                                                          //mostra tasti
  sinistra.show();
  sopra.show();
  sotto.show();
  muovi();
  
  if (dotY >= (rectH/2)+(windowHeight/2)-(windowHeight/20)){                              //evita che la "penna" esca dal rettangolo grigio
    dotY--;
  } else if(dotY <= -(rectH/2)+(windowHeight/2)-(windowHeight/20)){
    dotY++;
  }

  if(dotX >= (rectW/2)+(windowWidth/2)){
    dotX--;
  } else if (dotX <= -(rectW/2)+(windowWidth/2)){
    dotX++;
  }

}

function muovi(){                             //funzione per muovere penna se si tengono premuti i tasti
  if(mouseIsPressed){
    fill("black");
    penna = ellipse(dotX, dotY, 1);
    destra.muovidx();
    sinistra.muovisx();
    sopra.muoviup();
    sotto.muovidown();
    
  }

}

function schermointero(){                     //funzione per schermo intero richiamata dal bottone (ATTENZIONE: DA IOS NON FUNZIONA ANCHE DANDO IL CONSENSO)
  let fs = fullscreen();
  fullscreen(!fs);
}

function deviceShaken() {                     //"cancella" il disegno quando si scuote il telefono, ridisegnando il rettangoo grigio
  push()
  translate(0, -windowHeight/20);
  fill(value);
  rect(rectX, rectY, rectW, rectH, 30)
  pop()
}

function touchMoved() {                       //evitare di scorrere la pagina
  return false;
}

class Tasto {
  constructor(xpos, ypos, radius, title){
    this.x = xpos;
    this.y = ypos;
    this.r = radius;
    this.color = "white";
    this.name = title;
  }
  show(){
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.r);
    textAlign(CENTER, CENTER);
    fill("black");
    text(this.name, this.x, this.y);
  }
  muovidx(){                                                        //funzioni per aumentare o diminuire le variabili della penna
    let d = (dist(mouseX, mouseY, this.x, this.y)+25);
    if (d < this.r){
      dotX++;      
    }
  }

  muovisx(){
    let d = (dist(mouseX, mouseY, this.x, this.y)+25);
    if (d < this.r){
      dotX = dotX - 1;      
    }
  }
  muoviup(){
    let d = (dist(mouseX, mouseY, this.x, this.y)+25);
    if (d < this.r){
      dotY = dotY - 1;
   }
  }

  muovidown(){
    let d = (dist(mouseX, mouseY, this.x, this.y)+25);
    if (d < this.r){
      dotY++;
    }
  }
}


function windowResized(){                             //resize in tempo reale della pagina
  dotX = windowWidth/2;
  dotY = windowHeight/2;
  penna = (dotX, dotY);
  destra.x = (windowWidth/10)+25;
  destra.y = 7*(windowHeight/8);
  sinistra.x = (windowWidth/10)-25;
  sinistra.y = 7*(windowHeight/8);
  sopra.x = 9*(windowWidth/10)+25;
  sopra.y = 7*(windowHeight/8);
  sotto.x = 9*(windowWidth/10)-25;
  sotto.y = 7*(windowHeight/8);
  resizeCanvas(windowWidth, windowHeight);
  rectX = windowWidth/2;
  rectY = windowHeight/2;
  rectW = 9*(windowWidth/10);
  rectH = 6*(windowHeight/10);
  background(210, 0, 39);
  button.position((windowWidth/2)-40, 7*(windowHeight/8));
  fill(255, 255, 255, 80)
  text("Shake to erase", windowWidth/2, windowHeight/10)

  push()                                                //quando si ruota il telefono si cancella il disegno
  translate(0, -windowHeight/20);
  fill(value);
  rect(rectX, rectY, rectW, rectH, 30)
  pop()

}