var gWinHeight = document.body.clientHeight;
var gWinWidth = document.body.clientWidth;
//alert(gWinWidth + "," + gWinHeight);

var lastScale = 0; // 双指缩放时的 最后距离

var canvas,context;
var img,//图片对象
imgIsLoaded,//图片是否加载完成;
imgX=-30,
imgY=-10,
imgScale=1;


window.addEventListener("orientationchange", function(event){
    if ( window.orientation == 180 || window.orientation==0 ) {
//        alert("竖屏");
        gWinHeight = document.body.clientHeight;
        gWinWidth = document.body.clientWidth;
    }
    if( window.orientation == 90 || window.orientation == -90 ) {
//        alert("横屏");
        gWinHeight = document.body.clientHeight;
        gWinWidth = document.body.clientWidth;
    }
    // yly 添加宽度和高度
    canvas.width=gWinWidth;
    canvas.height=gWinHeight;
    drawImage();
});




(function int(){
    canvas=document.getElementById('canvas');
 // yly 添加宽度和高度
 canvas.width=gWinWidth;
 canvas.height=gWinHeight;
 canvas.addEventListener("touchstart", touchstart, false);
 canvas.addEventListener("touchmove", touchmove, true);
 //        canvas.addEventListener("touchend", touchUp, false);
 //        document.body.addEventListener("touchcancel", touchUp, false);
 
    context=canvas.getContext('2d');
    loadImg();
})();

function loadImg(){
    img=new Image();
    img.onload=function(){
        imgIsLoaded=true;
        drawImage();
    }
    img.src="resources/image/map.png";
}

function drawImage(){
    context.clearRect(0,0,canvas.width,canvas.height);
//    context.drawImage(img,0,0,img.widthimg.height,imgX,imgY,img.width*imgScale,img.height*imgScale);
    

    
    context.drawImage(img,0,0,img.width,img.height,imgX,imgY,img.width*imgScale,img.height*imgScale);
}

var tsX,tsY;
function touchstart(event) {
    if (event.targetTouches.length == 1) {
    //    alert(event.targetTouches.length);
    //    return false;
        var touch = event.targetTouches[0];
        tsX = touch.pageX;
        tsY = touch.pageY;
    //    alert(touch.pageX+"**"+touch.pageY);
    }
    
    if (event.targetTouches.length == 2) {
        //    alert(event.targetTouches.length);
        //    return false;
//        var touch = event.targetTouches[0];
//        tsX = touch.pageX;
//        tsY = touch.pageY;
        //    alert(touch.pageX+"**"+touch.pageY);
        
        // 两个手指
        var touch1 = event.targetTouches[0];
//        var pos1=windowToCanvas(canvas,touch1.pageX,touch1.pageY);
        var touch2 = event.targetTouches[1];
//        var pos2=windowToCanvas(canvas,touch2.pageX,touch2.pageY);
        
        // 两点之间的距离
        lastScale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
    }
}

function touchmove(event) {
//    alert
//    (1);
//    return false;
//    
//    if (!e)
//        var e = event;
//    e.preventDefault();
//    canX = e.targetTouches[0].pageX - can.offsetLeft;
//    canY = e.targetTouches[0].pageY - can.offsetTop;
//    showPos();
    // 如果这个元素的位置内只有一个手指的话 单指拖拽
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        // 把元素放在手指所在的位置
//        obj.style.left = touch.pageX + 'px';
//        obj.style.top = touch.pageY + 'px';
        
//        alert(touch.pageX+"***"+touch.pageY);
        
        var pos=windowToCanvas(canvas,tsX,tsY);
        canvas.style.cursor="move";
        var pos1=windowToCanvas(canvas,touch.pageX,touch.pageY);
        var x=pos1.x-pos.x;
        var y=pos1.y-pos.y;
        pos=pos1;
        imgX+=x;
        imgY+=y;

        // 超过边界时 不再拖拽
        if(imgX>0)imgX=0;
        if(imgX<-((img.width*imgScale)-canvas.width))
            imgX = -((img.width*imgScale)-canvas.width);
        if(imgY>0) imgY=0;
        if(imgY<-((img.height*imgScale)-canvas.height))
            imgY=-((img.height*imgScale)-canvas.height);

        drawImage();
        
        // 每次绘制完成之后 初始化地图坐标
        tsX = touch.pageX;
        tsY = touch.pageY;
    }
    
    // 双指 缩放
    if(event.targetTouches.length == 2){
        // 两个手指
        var touch1 = event.targetTouches[0];
        var pos1=windowToCanvas(canvas,touch1.pageX,touch1.pageY);
        var touch2 = event.targetTouches[1];
        var pos2=windowToCanvas(canvas,touch2.pageX,touch2.pageY);
        
        // 两点之间的距离
        var newScale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
        
        
        
        var ylyTest=document.getElementById('ylyTest');
        
        var limgScale = imgScale;
        if(newScale>lastScale){
//            imgScale*=2;
//            imgX=imgX*2-(pos1.x-pos2.x);
//            imgY=imgY*2-(pos1.y-pos2.y);
            var limgX = img.width*imgScale;
            var limgY = img.height*imgScale;
            
            limgScale*=1.1;
//            imgX = -(img.width*limgScale - limgX);
//            imgY = -(img.height*limgScale - limgY);
            imgX=imgX*1.1;
            imgY=imgY*1.1;
            
            
//            ylyTest.value += "**"+imgX;
        }
        if(newScale<lastScale){
//            imgScale/=2;
//            imgX=imgX*0.5+(pos1.x-pos2.x)*0.5;
//            imgY=imgY*0.5+(pos1.y-pos2.y)*0.5;
            var limgX = img.width*imgScale;
            var limgY = img.height*imgScale;
            limgScale/=1.1;
//            imgX = -(limgX - img.width*limgScale);
//            imgY = -(limgY - img.height*limgScale);
            imgX=imgX/1.1;
            imgY=imgY/1.1;
//            ylyTest.value += "**"+imgX;
        }
//        tsX =touch1.pageX;
//        tsY =touch1.pageY;
        
//        var ylyTest1=document.getElementById('ylyTest1');
//        ylyTest1.value = img.width+"**"+ img.width*imgScale + "**"+ canvas.width + "**"
//        + img.height +"**"
//        + img.height*imgScale+"**"+canvas.height;
        
        
        // 超过边界时 不再缩放
        if(img.width*limgScale<canvas.width||img.height*limgScale<canvas.height){
//            ylyTest.value = imgX+"****||*****" + imgY;
            imgX=imgX*1.1;
            imgY=imgY*1.1;
        }else{
            
            
            imgScale  = limgScale;  // 缩放之前 赋值
//            ylyTest1.value=img.height+"**"+img.getBoundingClientRect().left;
            
        }
        
        drawImage();
        lastScale = newScale;  // 两点之间的距离
        
        // 每次绘制完成之后 初始化地图中心点坐标
//        tsX = (touch1.pageX+touch2.pageX)/2;
//        tsY = (touch1.pageY+touch2.pageY)/2;
    }

}

canvas.onmousedown=function(event){
    var pos=windowToCanvas(canvas,event.clientX,event.clientY);
    canvas.onmousemove=function(event){
        canvas.style.cursor="move";
        var pos1=windowToCanvas(canvas,event.clientX,event.clientY);
        var x=pos1.x-pos.x;
        var y=pos1.y-pos.y;
        pos=pos1;
        imgX+=x;
        imgY+=y;
        drawImage();
    }
    canvas.onmouseup=function(){
        canvas.onmousemove=null;
        canvas.onmouseup=null;
        canvas.style.cursor="default";
    }
}
canvas.onmousewheel=canvas.onwheel=function(event){
    var pos=windowToCanvas(canvas,event.clientX,event.clientY);
    event.wheelDelta=event.wheelDelta?event.wheelDelta:(event.deltaY*(-40));
    if(event.wheelDelta>0){
        imgScale*=2;
        imgX=imgX*2-pos.x;
        imgY=imgY*2-pos.y;
    }else{
        imgScale/=2;
        imgX=imgX*0.5+pos.x*0.5;
        imgY=imgY*0.5+pos.y*0.5;
    }
    drawImage();
}

function windowToCanvas(canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left - (bbox.width - canvas.width) / 2,
        y:y - bbox.top - (bbox.height - canvas.height) / 2
    };
}


// 得到鼠标在Canvas的坐标，代码如下：

//function getPointOnCanvas(canvas, x, y) {
//    
//    var bbox =canvas.getBoundingClientRect();
//    
//    return { x: x- bbox.left *(canvas.width / bbox.width),
//        
//    y:y - bbox.top  * (canvas.height / bbox.height)
//        
//    };
//    
//}


// 放大
function zoomIn(){
    imgX=imgX*1.1;
    imgY=imgY*1.1;
    imgScale*=1.1;
    drawImage();
}

// 缩小
function zoomOut(){
    if(img.width*(imgScale/1.1)<canvas.width||img.height*(imgScale/1.1)<canvas.height){
        return false;
    }
    imgX=imgX/1.1;
    imgY=imgY/1.1;
    imgScale/=1.1;
    drawImage();
}

