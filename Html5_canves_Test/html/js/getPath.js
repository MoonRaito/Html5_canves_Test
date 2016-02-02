
var opentLst = new Array();
var closeLst = new Array();

// 寻路
function getAddressePath(){
    // 初始化
    opentLst.length=0;
    closeLst.length=0;
    
    // 我的位置 转化为坐标
    var startX = Math.floor(myPositionW/W);
    var startY = Math.floor((myPositionH+30)/H);
    
    var startObj = getPathObj(mapData[startX][startY],0,0,0,"",startX,startY);
    opentLst[0] = startObj;
    
    while(opentLst.length>0){  // 不等于 null
        var checkPoint  = opentLst[0];
        if(checkDestination(checkPoint.id)){ // 是否是终点
            closeLst.push(checkPoint);
            opentLst.length == 0;
            
            getAllPath();
            
            // 绘制路径
            drawPath();
            return true;
//            break;
        }
        var lstPointDelegate = new Array(); // 周围点临时数组
        
        lstPointDelegate.push(getPathObj(mapData[checkPoint.x][checkPoint.y-1]
                                    ,0,checkPoint.G+10,0,checkPoint,checkPoint.x,checkPoint.y-1));
        lstPointDelegate.push(getPathObj(mapData[checkPoint.x][checkPoint.y+1]
                                       ,0,checkPoint.G+10,0,checkPoint,checkPoint.x,checkPoint.y+1));
        
//        console.log(checkPoint.x +"=="+checkPoint.y);
        if(checkPoint.x!=0){
            lstPointDelegate.push(getPathObj(mapData[checkPoint.x-1][checkPoint.y]
                                       ,0,checkPoint.G+10,0,checkPoint,checkPoint.x-1,checkPoint.y));
        }
        lstPointDelegate.push(getPathObj(mapData[checkPoint.x+1][checkPoint.y]
                                       ,0,checkPoint.G+10,0,checkPoint,checkPoint.x+1,checkPoint.y));
        if(checkPoint.x!=0){
            lstPointDelegate.push(getPathObj(mapData[checkPoint.x-1][checkPoint.y-1]
                                       ,0,checkPoint.G+14,0,checkPoint,checkPoint.x-1,checkPoint.y-1));
        }
        lstPointDelegate.push(getPathObj(mapData[checkPoint.x+1][checkPoint.y+1]
                                       ,0,checkPoint.G+14,0,checkPoint,checkPoint.x+1,checkPoint.y+1));
        if(checkPoint.x!=0){
            lstPointDelegate.push(getPathObj(mapData[checkPoint.x-1][checkPoint.y+1]
                                       ,0,checkPoint.G+14,0,checkPoint,checkPoint.x-1,checkPoint.y+1));
        }
        lstPointDelegate.push(getPathObj(mapData[checkPoint.x+1][checkPoint.y-1]
                                       ,0,checkPoint.G+14,0,checkPoint,checkPoint.x+1,checkPoint.y-1));
        
        for (var i = 0;i<lstPointDelegate.length;i++){
            
            // 是否可以通过
            if (checkPointDelegate(lstPointDelegate[i]) // 是否可以通过
                &&!checkPointCloseLst(lstPointDelegate[i].x,lstPointDelegate[i].y)) {  // 是否已经在closeLst
                //                F=G+H;
                lstPointDelegate[i].H= (Math.abs(lstAddresses[0].x-checkPoint.x)
                            +Math.abs(lstAddresses[0].y-checkPoint.y))*10;
                lstPointDelegate[i].F= lstPointDelegate[i].G+lstPointDelegate[i].H;
                lstPointDelegate[i].parent = checkPoint;
                opentLst.push(lstPointDelegate[i]);

            }
        }
        
//        alert(lstAddresses[0].x+"**"+lstAddresses[0].y+"=="+checkPoint.x+"**"+checkPoint.y+"**"+lstAddresses.length);
        closeLst.push(checkPoint); // 添加 检查过的
        
//        drawLstPointDelegate(opentLst);
        
        
        opentLst.shift(); // 删除第一个

        openLstBubbleSort(); //排序
        
    }
    
    
}

// 最后整理 close
function getAllPath(){
    var allPath = new Array();
    var point;
    
//    var pPoint = lstAddresses[0];
//    for(var i=closeLst.length-1;i>=0;i--){
//        point = closeLst[i];
//        
//        // 不等于空 即 不为 起始位置
//        if(point.parent==""){
//            
//            break;
//        }
//        
//        if(point.id != 0){
//            // 添加父节点
//            pPoint = point.parent;
//            allPath.push(point.parent);
//            
//            i=closeLst.length-2;
//        }
//
//        // 是否是父节点
//        if(point.id == 0 && pPoint.x==point.parent.x&&pPoint.y==point.parent.y){
//            // 添加父节点
//            pPoint = point.parent;
//            allPath.push(point.parent);
//            
//            i=closeLst.length-2;
//        }
//        
//    }
    
    var index = true;
    var pPoint = closeLst[closeLst.length-1];
    
//    var ylytestdasf = 0;
    while(index){
        allPath.push(pPoint);
//        ylytestdasf++;
//        console.log(ylytestdasf);
        if(pPoint.parent!=""){
            pPoint = pPoint.parent;
        }else{
            index = false;
        }
        
    }
    
    closeLst.length = 0
     closeLst = allPath;
    
//    drawLstPointDelegate(allPath);
//    
//    alert(lstAddresses[0].id+"**"+lstAddresses[0].x+"**"+lstAddresses[0].y);
//    context2D.fillStyle = "rgba(135, 206, 235, 1)";
//    context2D.fillRect(lstAddresses[0].x*W*lstAddresses[0]+imgX+100
//                       , lstAddresses[0].y*H*lstAddresses[0]+imgY
//                       , W*zoomScale, H*zoomScale);
//    
//    alert(closeLst[closeLst.length-1].id+"**"+closeLst[closeLst.length-1].x+"**"+closeLst[closeLst.length-1].y);
//    context2D.fillStyle = "rgba(0, 0, 0, 1)";
//    context2D.fillRect(closeLst[closeLst.length-1].x*W*zoomScale+imgX
//                       , closeLst[closeLst.length-1].y*H*zoomScale+imgY
//                       , W*zoomScale, H*zoomScale);

}


// 测试用 绘制 临时 f=g+h
function drawLstPointDelegate(lstPointDelegate){
    var openPoint;
    for(var i = 0;i<lstPointDelegate.length;i++){
        //        for(var j = 0;j<opentLst[i].length;j++){
        //            context2D.fillStyle = "rgba(135, 206, 235, 1)";
        //            context2D.fillRect(x*W*zoomScale+imgX, y*H*zoomScale+imgY, W*zoomScale, H*zoomScale);
        //        }
        openPoint = lstPointDelegate[i];
        context2D.fillStyle = "rgba(135, 206, 235, 1)";
        context2D.fillRect(openPoint.x*W*zoomScale+imgX
                           , openPoint.y*H*zoomScale+imgY
                           , W*zoomScale, H*zoomScale);
        context2D.fillStyle = "rgba(0, 0, 0, 1)";
        context2D.fillText(openPoint.F, openPoint.x*W*zoomScale+imgX, openPoint.y*H*zoomScale+imgY+10);
        context2D.fillText(openPoint.G, openPoint.x*W*zoomScale+imgX, openPoint.y*H*zoomScale+imgY+30);
        context2D.fillText(openPoint.H, openPoint.x*W*zoomScale+imgX+20, openPoint.y*H*zoomScale+imgY+30);
    }
}

// 测试用 绘制 临时 f=g+h
function ylyTEstopent(){
    var openPoint;
    for(var i = 0;i<opentLst.length;i++){
        //        for(var j = 0;j<opentLst[i].length;j++){
        //            context2D.fillStyle = "rgba(135, 206, 235, 1)";
        //            context2D.fillRect(x*W*zoomScale+imgX, y*H*zoomScale+imgY, W*zoomScale, H*zoomScale);
        //        }
        openPoint = opentLst[i];
        context2D.fillStyle = "rgba(135, 206, 235, 1)";
        context2D.fillRect(openPoint.x*W*zoomScale+imgX
                           , openPoint.y*H*zoomScale+imgY
                           , W*zoomScale, H*zoomScale);
        context2D.fillStyle = "rgba(0, 0, 0, 1)";
        context2D.fillText(openPoint.F, openPoint.x*W*zoomScale+imgX, openPoint.y*H*zoomScale+imgY+10);
        context2D.fillText(openPoint.G, openPoint.x*W*zoomScale+imgX, openPoint.y*H*zoomScale+imgY+30);
        context2D.fillText(openPoint.H, openPoint.x*W*zoomScale+imgX+20, openPoint.y*H*zoomScale+imgY+30);
    }
}


// 绘制路径
function drawPath(){
    if(closeLst.length<=0){
        return false;
    }
    var closePoint;
    for(var i = 0;i<closeLst.length;i++){
//        for(var j = 0;j<opentLst[i].length;j++){
//            context2D.fillStyle = "rgba(135, 206, 235, 1)";
//            context2D.fillRect(x*W*zoomScale+imgX, y*H*zoomScale+imgY, W*zoomScale, H*zoomScale);
//        }
        closePoint = closeLst[i];
        context2D.fillStyle = "rgba(135, 206, 235, 1)";
        context2D.fillRect(closePoint.x*W*zoomScale+imgX
                           , closePoint.y*H*zoomScale+imgY
                           , W*zoomScale, H*zoomScale);
    }
    
}


//  openList排序
function openLstBubbleSort(){
    var i = opentLst.length, j;
    var tempExchangVal;
    while (i > 0) {
        for (j = 0; j < i - 1; j++) {
            if (opentLst[j].F > opentLst[j + 1].F) {
                tempExchangVal = opentLst[j];
                opentLst[j] = opentLst[j + 1];
                opentLst[j + 1] = tempExchangVal;
            }
        }
        i--;
    }
//    return opentLst;
//    console.log(1);
    return true;
}

// 检查是否是closeLst
function checkPointCloseLst(x,y){
    var closePoint;
    for(var i = 0;i<closeLst.length;i++){
        closePoint = closeLst[i];
        if(closePoint.x == x &&closePoint.y == y){
            return true;
        }
    }
    return false;
}

// 检查是否可以通过
function checkPointDelegate(pdObj){
    
//    console.log(pdObj.id+"**"+pdObj.x);
    
    // x和y 小于0返回false
    if(pdObj.x<0||pdObj.y<0){
        return false;
    }
    
   
    if(pdObj.id==0){
        var openPoint;
        for(var i = 0;i<opentLst.length;i++){
            openPoint = opentLst[i];
            if(openPoint.x == pdObj.x &&openPoint.y == pdObj.y){  // 是否已经添加过
                return false;
            }
        }
        return true;
    }
    if(pdObj.id>0){ // 大于零 是否是终点
        return checkDestination(pdObj.id);
    }
    return false;
}

// 检查是不是终点
function checkDestination(id){
    for(var i = 0;i<lstAddresses.length;i++){
        if(id == lstAddresses[i].id){
            return true;
        }
    }
    return false;
}


// 保存目的地
function getPathObj(id,f,g,h,parent,x,y){

    return {
    id:id,
    F:f,
    G:g,
    H:h,
    parent:parent,
    x:x,
    y:y
    };
}