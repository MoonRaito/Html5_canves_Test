
var lstAddresses = new Array();

//var mapPoi = "../html/image/map_poi.png";

// 获取目的地
function getDestinations(){
    lstAddresses.splice(0,lstAddresses.length);
    
    // 清空 设置好的路径
    closeLst.length=0;
    drawImage();
    
};

// 获得目的地属性
function getAddProperties(pId,add){
    var bool;
    for (var key in properties){
        if(pId == key){
            var liinshiyly = properties[key].title;
            bool = properties[key].title.indexOf(add);
            break;
        }
    };

    if(bool >= 0){
        return properties[key];
    }
    return "";
}

// 绘制目的地
function DrawAddresse(x, y, width, height, text
                      , backgroudcolor, textcolor, bordercolor, imageurl,id,index){
    var imageAddresse = new Image();
//    imageAddresse.addEventListener("touchmove", touchmove, true);
    lstAddresses.length=0; // 清空数组
    lstAddresses.push(saveAddresseToList(x + width / 2, y + height / 2 - 25 * zoomScale-15
                                         ,30,30,imgX,imgY,id,index));
    imageAddresse.onload=function(){
        context2D.drawImage(imageAddresse,35,0,30,30, x + width / 2, y + height / 2 - 25 * zoomScale-15, 30, 30);
    }
    imageAddresse.src = mapPoi;
};

// 保存目的地
function saveAddresseToList(pointX,pointY,tiledW,tiledH,deviationX,deviationY,id,index){
    
//    l = i%map.width*tiledW;     //绘画每一块地图块的X坐标
//    if (i%map.width==0&&i!=0){     //当达到一行是换行，注意第一行是0%0=0；所以应去除第一行换行的情况
//        //            t+=H;              //绘画地图块的Y坐标
//        t+=H*zoomScale;              //绘画地图块的Y坐标
//        //            document.getElementById("ylyTest").value="1";
//    }
    
    var indexX = index%map.width;
    var indexY = parseInt(index/map.width)+1;
    
    return {
        id:id,
        F:0,
        G:0,
        H:0,
        x:indexX,
        y:indexY,
        pointX:pointX,
        pointY:pointY,
        tiledW:tiledW,
        tiledH:tiledH,
        deviationX:deviationX,
        deviationY:deviationY
    };
    
//    a.push(1); // 添加到最后
//    a.unshift(); // 添加到第一个位置
}





// 是否是目的地
function isDestination(pointX,pointY){

    if(lstAddresses.length>0&&(lstAddresses[0].pointX<=pointX&&pointX<=lstAddresses[0].pointX+30)
       &&(lstAddresses[0].pointY<=pointY&&pointY<=lstAddresses[0].pointY+30)){
        mapDataTodyadicArray();
        //        alert("目的地");
        
//        var linshiy = 0;
//        for(var i=0; i<mapData.length; i++){
//            for(var j=0; j<mapData[i].length; j++){
//                linshiy+=1;
//            }
//        }
//
        getAddressePath(); // 如果是目的地 寻路
//        alert(mapData.length);
    }
}













