//var ylyTestdingw=document.getElementById("ylyTestdingw");
function getLocation()
{
    if (navigator.geolocation)
    {
//
//        var options = {
//                             enableHighAccuracy: true,
//                         };
//        navigator.geolocation.getCurrentPosition(showPosition,showError, options);
        navigator.geolocation.getCurrentPosition(showPosition,showError);
    }
    else{
        //        ylyTestdingw.innerHTML="Geolocation is not supported by this browser.";
//                ylyTestdingw.value="浏览器不支持.";
        alert("浏览器不支持.");
    }
    
    
    var myPoint = clientRectToCanvas01(myPositionW,myPositionH,W*zoomScale,H*zoomScale,imgX,imgY);
    
//    document.getElementById("ylyTest").value=imgX+"**"+myPoint.x+"**"+gWinWidth;
    imgX =imgX +( gWinWidth/2-myPoint.x);
    imgY =imgY+( gWinHeight/2-myPoint.y) - H*zoomScale;
    
    drawImage();
//    context2D.strokeRect(gWinWidth/2, gWinHeight/2, 35, 35);
//    document.getElementById("ylyTest").value=imgX+"**"+myPositionW+"**"+myPoint.x+"**"+gWinWidth;
    
    
};
function showPosition(position)
{
    alert("纬度: " + position.coords.latitude +
          "*经度: " + position.coords.longitude);
//    ylyTestdingw.value="纬度: " + position.coords.latitude +
//    "*经度: " + position.coords.longitude;

};
function showError(error)
{
    switch(error.code)
    {
        case error.PERMISSION_DENIED:
            alert("用户拒绝对获取地理位置的请求。");
//            ylyTestdingw.value="用户拒绝对获取地理位置的请求。"
            break;
        case error.POSITION_UNAVAILABLE:
            alert("位置信息是不可用的。");
//            ylyTestdingw.value="位置信息是不可用的。"
            break;
        case error.TIMEOUT:
            alert("请求用户地理位置超时。");
//            ylyTestdingw.value="请求用户地理位置超时。"
            break;
        case error.UNKNOWN_ERROR:
            alert("未知错误。");
//            ylyTestdingw.value="未知错误。"
            break;
    }
};