var canvas,context;
var img,//图片对象
    imgIsLoaded,//图片是否加载完成;
    imgX=0,
    imgY=0,
    imgScale=1;

(function int(){
    canvas=document.getElementById('canvas');
    context=canvas.getContext('2d');
    loadImg();
})();

function loadImg(){
    img=new Image();
    img.onload=function(){
        imgIsLoaded=true;
        drawImage();
    }
    img.src="map.jpg";
}

function drawImage(){
    context.clearRect(0,0,canvas.width,canvas.height);
    context.drawImage(img,0,0,img.width,img.height,imgX,imgY,img.width*imgScale,img.height*imgScale);
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
var dd;
var pos;
canvas.onmousewheel=canvas.onwheel=function(event){
    pos=windowToCanvas(canvas,event.clientX,event.clientY);
    event.wheelDelta=event.wheelDelta?event.wheelDelta:(event.deltaY*(-40));
    dd = event.wheelDelta;
    window.setTimeout(sss,10);
}

var tt = 1;
var is ,ix,iy;
function sss(){
	if(tt <=10){
	if(tt == 1){
		if(dd>0){
			is = (imgScale*2-imgScale)/10;
			ix = (imgX*2-pos.x+imgX)/10;
			iy = (imgY*2-pos.y+imgY)/10;
	        
	    }else{
	    	is = (imgScale/2-imgScale)/10;
	    	ix = (imgX*0.5+pos.x*0.5+imgX)/10;
	    	iy = (imgX*0.5+pos.x*0.5+imgY)/10;
	        
	    }
    }

		imgScale += is;
	    imgX+=ix;
	    imgY+=iy;

	    drawImage();
	    tt=tt+1;
    	window.setTimeout(sss,10);
    }else{
    	tt =1;
    }
}

function windowToCanvas(canvas,x,y){
    var bbox = canvas.getBoundingClientRect();
    return {
        x:x - bbox.left - (bbox.width - canvas.width) / 2,
        y:y - bbox.top - (bbox.height - canvas.height) / 2
    };
}

