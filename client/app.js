
//Katie pustolski
//11/11/14
//Rich Meia web app II MVC project

"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

app.doodleBucket = {

	DEFAULT_LINE_WIDTH : 3,
	DEFAULT_STROKE_STYLE: "red",

	// variables
	canvas:undefined,
	ctx:undefined,

	eraserBtn:undefined,
	penBtn:undefined,
	lineWidthSlider:undefined,

	WIDTH:undefined,
	HEIGHT:undefined,
	showGrid:undefined,
	gridChecked : false,
	dragging: undefined,
	lineWidth:undefined,
	strokeStyle:undefined,
	mouseCursorPos:undefined,
	cursor:undefined,
	mouse:{},

	earserOn: false,
	penOn:true,

	init:function(){
		this.canvas = document.querySelector('#mainCanvas');
		this.ctx = this.canvas.getContext('2d');
		console.log(this.ctx);
		this.eraserBtn = document.querySelector('#eraserBtn');
		this.penBtn = document.querySelector('#penBtn');
		this.lineWidthSlider = document.querySelector('#lineWidthSlider');

		this.strokeStyle = this.DEFAULT_STROKE_STYLE;
		this.WIDTH = window.innerWidth-375;
		this.HEIGHT=window.innerHeight-150;
		this.canvas.height = this.HEIGHT;
		this.canvas.width = this.WIDTH;

		this.dragging = false;

		this.ctx.lineWidth = this.lineWidthSlider.value;
		this.ctx.strokeStyle = this.strokeStyle;
		this.ctx.lineCap ="round";
		this.ctx.lineJoin = "round";

		this.eraserBtn.addEventListener("click", function(){this.eraserOn=true; this.penOn=false});
		this.penBtn.addEventListener("click", function(){this.penOn=true; this.eraserOn=false;});

		this.eraserBtn.onclick = function(){
			app.doodleBucket.eraserOn=true; 
			app.doodleBucket.penOn=false;
		}
		this.penBtn.onclick = function(){
			app.doodleBucket.eraserOn=false; 
			app.doodleBucket.penOn=true;
		}

		this.canvas.onmousedown = this.mouseDown;
		this.canvas.onmousemove = this.mouseMove;
		this.canvas.onmouseup = this.mouseUp;
		this.canvas.onmouseout = this.mouseOut;

		this.lineWidth = this.lineWidthSlider.value;


		this.update();
	},

	update:function(){
		//grid
		// this.ctx.lineWidth = this.DEFAULT_LINE_WIDTH;
		// this.ctx.lineCap = "round";
		// this.ctx.lineJoin = "round";
		// console.log("Pen on:"+this.penOn);
		// console.log("Eraser on:"+this.eraserOn);
		this.lineWidth = app.doodleBucket.lineWidthSlider.value;

	},
	mouseDown:function(e){
		app.doodleBucket.dragging= true;
		console.log("dragging");

		app.doodleBucket.ctx.beginPath();

		//location of mouse in canvas
		//var mouse = app.doodleBucket.getMouse(e);

		//Pencil tool
		app.doodleBucket.ctx.beginPath();
		app.doodleBucket.ctx.moveTo(app.doodleBucket.mouse.x,app.doodleBucket.mouse.y);
	},

	mouseMove:function(e){
		//bail out if mouse button is not down
		 if(app.doodleBucket.dragging){
			// app.doodleBucket.canvas.style.cursor="crosshair";

			var mouse = app.doodleBucket.getMouse(e);

		 	//get location of mouse in canvas
		 	if(app.doodleBucket.penOn && !app.doodleBucket.eraserOn){
		 		// Pencil tool
		 		app.doodleBucket.ctx.strokeStyle= app.doodleBucket.DEFAULT_STROKE_STYLE;
		 	}
		 	else if (app.doodleBucket.eraserOn && !app.doodleBucket.penOn){
		 		app.doodleBucket.ctx.strokeStyle = "white";
		 	}
		 	app.doodleBucket.ctx.lineWidth = app.doodleBucket.lineWidthSlider.value;
		 	// app.doodleBucket.ctx.lineWidth = app.doodleBucket.DEFAULT_LINE_WIDTH;
		 	console.log(app.doodleBucket.lineWidth);
		 	// console.log(app.doodleBucket.ctx.strokeStyle);

		 	app.doodleBucket.ctx.lineTo(mouse.x,mouse.y);
		 	// app.doodleBucket.ctx.closePath();
		 	app.doodleBucket.ctx.stroke();
		 }
		 else{
		 	return;
		 }
		/*var mouse = app.doodleBucket.getMouse(e);
		app.doodleBucket.ctx.beginPath();
		app.doodleBucket.ctx.arc(mouse.x,mouse.y,100,2*Math.PI,false);
		app.doodleBucket.ctx.closePath();*/

		// console.log("stroking");
	},
	mouseOut:function(e){
		app.doodleBucket.dragging = false;
		app.doodleBucket.ctx.closePath();
		console.log(e.type);

	},
	mouseUp:function(e){
		app.doodleBucket.dragging = false;
		app.doodleBucket.ctx.closePath();
		console.log(e.type);

	},
	getMouse:function(e){
		app.doodleBucket.mouse.x = e.pageX - e.target.offsetLeft;
		app.doodleBucket.mouse.y = e.pageY - e.target.offsetTop;
		// console.log(mouse.x,mouse.y);
		return app.doodleBucket.mouse;
	}
};

window.onload=app.doodleBucket.init();