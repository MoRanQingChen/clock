/**
 * Created by Administrator on 2015/12/20.
 */
var canvas_height=648;
var canvas_width=1224;
var R=4;
var margin_top=150;
var margin_left=300;
var pastTime=new Date();
var pastHour=pastTime.getHours();
var pastMin=pastTime.getMinutes();
var pastSecond=pastTime.getSeconds();
var ball=[];
var colors2=["#86CC27","#CBCC1C","#CC2517","#CC65C6","#AB12CC","#4C0FCC","#2F66CC","#1487CC","#0ACC60","#42CC14"];
var colors=["rgba(15,200,200,0.3)","rgba(15,100,225,0.3)","rgba(30,220,225,0.3)","rgba(0,210,225,0.3)","rgba(50,200,225,0.3)","rgba(70,190,225,0.3)","rgba(0,180,225,0.3)","rgba(15,170,225,0.3)","rgba(15,160,225,0.3)","rgba(50,150,225,0.3)"];

window.onload=function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    canvas.width=canvas_width;
    canvas.height=canvas_height;
    setInterval(
        function(){
            setTime(context);
            update(context);
        },
        50
    );
};
function drawCircle(context,x,y,R,color){   /*绘制小圆圈（传入坐标和半径和颜色）*/

    context.beginPath();
    context.arc(x,y,R,0,2*Math.PI);
    context.fillStyle=color;
    context.fill()
}
function drawNumber(x,context,left,top){   /*绘制数字（传入数字、数字的位置）*/
    for(var i=0;i<digit[x].length;i++){
        for(var j=0;j<digit[x][i].length;j++){
            if(digit[x][i][j]) {
                drawCircle(context,left+j*2*(R+1),top+i*2*(R+1),R,"#6b4bff");
            }
            }
        }
}
function setTime(context)   /*绘制当前时间和掉落小球*/
{
    context.clearRect(0,0,canvas_width,canvas_height);
    var now = new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var seconds = now.getSeconds();
    drawNumber(parseInt(hour/10),context,margin_left,margin_top);
    drawNumber(parseInt(hour%10),context,margin_left+15*(R+1),margin_top);
    drawNumber(10,context,margin_left+30*(R+1),margin_top);
    drawNumber(parseInt(min/10),context,margin_left+39*(R+1),margin_top);
    drawNumber(parseInt(min%10),context,margin_left+54*(R+1),margin_top);
    drawNumber(10,context,margin_left+69*(R+1),margin_top);
    drawNumber(parseInt(seconds/10),context,margin_left+78*(R+1),margin_top);
    drawNumber(parseInt(seconds%10),context,margin_left+93*(R+1),margin_top);
    for(var i = 0 ; i < ball.length ; i++){
        drawCircle(context,ball[i].x,ball[i].y,ball[i].R,ball[i].color);
    }
}
function update(context){
    var now=new Date();
    var hour = now.getHours();
    var min = now.getMinutes();
    var seconds = now.getSeconds();

    if(parseInt(hour/10)!=parseInt(pastHour/10)) {
        addBall(parseInt(hour / 10), context, margin_left, margin_top);

    }
    if(parseInt(hour % 10)!=parseInt(pastHour%10)) {
        addBall(parseInt(hour % 10), context, margin_left + 15 * (R + 1), margin_top);
        pastHour=hour;
    }

    if(parseInt(min / 10)!=parseInt(pastMin/10)) {
        addBall(parseInt(min / 10), context, margin_left + 39 * (R + 1), margin_top);
    }
    if(parseInt(min % 10)!=parseInt(pastMin%10)) {
        addBall(parseInt(min%10),context,margin_left+54*(R+1),margin_top);
        pastMin=min;
    }
    if(parseInt(seconds / 10)!=parseInt(pastSecond/10)) {
        addBall(parseInt(seconds / 10), context, margin_left + 78 * (R + 1), margin_top);
    }
    if(parseInt(seconds % 10)!=parseInt(pastSecond%10)) {
        addBall(parseInt(seconds % 10), context, margin_left + 93 * (R + 1), margin_top);
        pastSecond=seconds;




    }
    dropBall(ball);
}

function addBall(x,context,left,top){   /*增加小球的属性*/
    var count=0;
    for(var j=0;j<ball.length;j++)
        if( ball[j].x + ball[j].R > 0 && ball[j].x -R < canvas_width ){
            ball[count++]=ball[j];
        }
    console.log(count);
    while(ball.length>count){
        ball.pop();
    }
    for(var i=0;i<digit[x].length;i++){
        for(var j=0;j<digit[x][i].length;j++){
            if(digit[x][i][j]) {
                console.log(count)
                    aBall={
                        x:left+j*2*(R+1),
                        y:top+i*2*(R+1),
                        vx:(3+5*Math.random())*Math.pow(-1,Math.ceil(Math.random()*2)),
                        vy:-10-5*Math.random(),
                        a:1,
                        R:5*Math.random()+3,
                        color:colors[Math.ceil(Math.random()*10)]
                }
                ball.push(aBall);
            }
        }
    }


}

function dropBall(ball){
    for(var i=0;i<ball.length;i++){
        ball[i].x+=ball[i].vx;
        ball[i].y+=ball[i].vy;
        ball[i].vy+=ball[i].a;


        if(ball[i].y>=canvas_height-R) {
            ball[i].y = canvas_height - R;
            ball[i].vy *= -0.6;
            if(ball[i].R<100)
            ball[i].R += 10*Math.random();
            if(ball[i].vy<-5)
                ball[i].vx *= Math.pow(-1,Math.ceil(Math.random()*2));

        }
    }
}

