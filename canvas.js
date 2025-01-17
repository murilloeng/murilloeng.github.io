//canvas
const canvas = document.getElementById("canvas");

//context
const context = canvas.getContext("2d");

let radius = canvas.height / 2;
context.translate(radius, radius);
radius = 0.90 * radius
setInterval(draw_clock, 1000);

//draw
function draw_clock()
{
	const canvas = document.getElementById("canvas");
	const button = document.getElementById("button-background");
	canvas.style = "background-color:" + button.value;
	draw_face(context, radius);
	draw_numbers(context, radius);
	draw_time(context, radius);
}
function draw_face(context, radius)
{
	const grad = context.createRadialGradient(0, 0, 0.95 * radius, 0, 0, 1.05 * radius);
	grad.addColorStop(0, '#333');
	grad.addColorStop(0.5, 'white');
	grad.addColorStop(1, '#333');
	context.beginPath();
	context.arc(0, 0, radius, 0, 2*Math.PI);
	context.fillStyle = 'white';
	context.fill();
	context.strokeStyle = grad;
	context.lineWidth = radius*0.1;
	context.stroke();
	context.beginPath();
	context.arc(0, 0, radius*0.1, 0, 2*Math.PI);
	context.fillStyle = '#333';
	context.fill();
}
function draw_numbers(context, radius)
{
	context.textAlign = "center";
	context.textBaseline = "middle";
	context.font = 0.15 * radius + "px arial";
	for(let num = 1; num < 13; num++)
	{
		let ang = num * Math.PI / 6;
		context.rotate(ang);
		context.translate(0, -0.85 * radius);
		context.rotate(-ang);
		context.fillText(num.toString(), 0, 0);
		context.rotate(ang);
		context.translate(0, 0.85 * radius);
		context.rotate(-ang);
	}
}
function draw_time(context, radius)
{
	const now = new Date();
	let hour = now.getHours();
	let minute = now.getMinutes();
	let second = now.getSeconds();
	//hour
	hour=hour%12;
	hour=(hour*Math.PI/6)+
	(minute*Math.PI/(6*60))+
	(second*Math.PI/(360*60));
	draw_hand(context, hour, radius*0.5, radius*0.07);
	//minute
	minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
	draw_hand(context, minute, radius*0.8, radius*0.07);
	// second
	second=(second*Math.PI/30);
	draw_hand(context, second, radius*0.9, radius*0.02);
}
function draw_hand(context, position, length, width)
{
	context.beginPath();
	context.lineWidth = width;
	context.lineCap = "round";
	context.moveTo(0,0);
	context.rotate(position);
	context.lineTo(0, -length);
	context.stroke();
	context.rotate(-position);
}