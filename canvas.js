var canvas = document.querySelector('canvas');

// esto es para probar que el canvas esta enlasado bien 
console.log(canvas);
canvas.width = (window.innerWidth);//(window.innerWidth)
canvas.height= (window.innerHeight);//(window.innerHeight)
var t = canvas.getContext('2d');


var mouse = {
	x: undefined,
	y: undefined
}

var colorArray = 
[
	'#87FFF7',
	'#7B9AE8',
	'#CB94FF',
	'#E87BA7',
	'#FF5100'

]

//defino puntos de partida indefinidos para el mous
window.addEventListener('mousemove',
function(event){
mouse.x = event.clientX;
mouse.y = event.clientY;
console.log(mouse);
})
//------------------------------
window.addEventListener('resize',function(){
canvas.width = (window.innerWidth);
canvas.height= (window.innerHeight);
})

//------------------------------------------------------------------------------------
function Circle (x,y,Vx,Vy,radio)
{
	this.x = x;
	this.y = y; 
	this.radio =radio;
	this.Vx= Vx;
	this.Vy=Vy;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
	this.draw = function ()
	{
		t.beginPath();
		t.arc(this.x,this.y,this.radio,0, Math.PI * 2 ,false);
		t.strokeStyle = ' white';
		t.fillStyle = this.color
		t.stroke();
		t.fill();
	}

this.update = function()
{
		//velocidades
	this.y += this.Vy;
	this.x += this.Vx;//cada vez que pase un frame , x se mueve un pixel 

	//colisiones
	if(this.x+this.radio> innerWidth || this.x-this.radio <0 )
	{
		this.Vx=-this.Vx
	}

	if(this.y+this.radio> innerHeight || this.y-this.radio <0 )
	{
		this.Vy=-this.Vy
	}
//------------------------------------------------------------------------------------
		this.draw();
//------------------------------------------------------------------------------------
	if (mouse.x -this.x < 50 && mouse.x -this.x > -50 && mouse.y -this.y < 50 && mouse.y -this.y >-50)
	{

		this.radio+= 6;

	}else if (this.radio >10 )
	{
		this.radio -=1;
	}

	if (this.radio >65) {this.radio -=6;}


}

}

//------------------------------------------------------------------------------------
//Circle

var circleArray = [];

for (var i = 0 ; i < 600; i++) 
{
	var x = Math.random()*(innerWidth-60)+30;
	var y = Math.random()*(innerHeight-60)+30;
	var Vx = (Math.random()-0.5)*20;//el -0.5 es para que random pueda ser negativo
	var Vy = (Math.random()-0.5)*10;
	var radio = 20
	circleArray.push(new Circle(x,y,Vx,Vy,radio));
}
//------------------------------------------------------------------------
function animacion ()
{
	requestAnimationFrame(animacion);

	t.clearRect(0,0,innerWidth,innerHeight);//borra la trayectoria
	
	for (var i = 0; i < circleArray.length; i++)
	{	
	 	circleArray[i].update();
	}


}
animacion();






