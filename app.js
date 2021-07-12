let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext("2d");

const TargetRadius = 25;
const Target = 30;
let playing = false;
let x0;
let y0;
let x1;
let y1;
let point = 0;
let miss = 0;

function drawTarget() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x0 = Math.floor(Math.random() * (canvas.width - (2*TargetRadius) + 1) + TargetRadius);
    y0 = Math.floor(Math.random() * (canvas.height - (2*TargetRadius) + 1) + TargetRadius);
    ctx.beginPath();
    ctx.arc(x0, y0, TargetRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function sound0()
{
    document.getElementById( 'sound0-file' ).currentTime = 0 ;
	document.getElementById( 'sound0-file' ).play() ;
}
function sound1()
{
    document.getElementById( 'sound1-file' ).currentTime = 0 ;
	document.getElementById( 'sound1-file' ).play() ;
}

function judgment(){
    if((TargetRadius >= Math.sqrt( (x1 - x0 )**2 + ( y1 - y0 )**2 ) )&& (Target > point )){
        drawTarget();
        sound0();
        point++;
    }else if ((TargetRadius < Math.sqrt( (x1 - x0 )**2 + ( y1 - y0 )**2 ) )&& (Target > point )){
        sound1()
        miss++;
    }
    if(Target <= point){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.alert('クリア!!!\n　Point　' + point + '　Miss　' + miss);
        playing = false;
    }
    if(miss > Math.floor(Target / 10) +1 ){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.alert('ゲームオーバー\n　Point　' + point + '　Miss　' + miss);
        playing = false;
    }
}

canvas.addEventListener("click", (e) => {
    if(playing == true){
    let rect = e.target.getBoundingClientRect()
    x1 = e.clientX - rect.left -10//-border
    y1 = e.clientY - rect.top -10//-border
    judgment();
    }
});

document.getElementById(`btn`).addEventListener(`click`, func = () => {
    playing = true;
    point = 0;
    miss = 0;
    drawTarget();
});