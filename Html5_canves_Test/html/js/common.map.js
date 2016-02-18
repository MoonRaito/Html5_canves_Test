// 阻止滚动
// 一些移动设备有缺省的touchmove行为，比如说经典的iOS overscroll效果，当滚动超出了内容的界限时就引发视图反弹。
// 这种做法在许多多点触控应用中会带来混乱，但要禁用它很容易。
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);


var gWinHeight = document.body.clientHeight;
var gWinWidth = document.body.clientWidth;


//window.addEventListener("orientationchange", function(event){
//    if ( window.orientation == 180 || window.orientation==0 ) {
//        //        alert("竖屏");
//        gWinHeight = document.body.clientHeight;
//        gWinWidth = document.body.clientWidth;
//    }
//    if( window.orientation == 90 || window.orientation == -90 ) {
//        //        alert("横屏");
//        gWinHeight = document.body.clientHeight;
//        gWinWidth = document.body.clientWidth;
//    }
//});