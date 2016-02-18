var svgX=0,svgY=0;  // 偏移量

var svgMap    // svg 对象
    ,svgScale=1; // svg 缩放比例
function initialize() {
    /* Set the global variable and detect if the browser supports SVG:  */
    svgMap = document.getElementById('svgMap');			// Best to only access the SVG element after the page has fully loaded.

    if(svgMap.namespaceURI != "http://www.w3.org/2000/svg")	// Alert the user if their browser does not support SVG.
        alert("Inline SVG in HTML5 is not supported. This document requires a browser that supports HTML5 inline SVG.");

    /* Add event listeners:  */
    //window.addEventListener('keydown', processKeyPress, true);


    // 设置宽和高
    svgMap.setAttribute('width', gWinWidth+"px");
    svgMap.setAttribute('height', gWinHeight+"px");
    svgMap.setAttribute('viewBox', "0 0 "+ gWinWidth +" "+ gWinHeight);

    // 绘制一个可显示 矩形
    var allWH = document.createElementNS(svgMap.namespaceURI, 'rect');
    allWH.setAttribute('id', 'allWH');
    allWH.setAttribute('x', '0');
    allWH.setAttribute('y', '200');
    allWH.setAttribute('width', "200px");
    allWH.setAttribute('height', "100px");
    allWH.setAttribute('stroke', 'blue');
    allWH.setAttribute('stroke-width', '5');
    allWH.setAttribute('fill', 'transparent');
    //allWH.setAttribute('onclick', 'ylytest()');
    //allWH.addEventListener("touchstart", ylytest1, false);
    //allWH.setAttribute('touchstart', 'ylytest1');
    //svgMap.appendChild(allWH);



    svgMap.addEventListener("touchstart", touchstart, false);
    svgMap.addEventListener("touchmove", touchmove, false);
    svgMap.addEventListener("touchend", touchend, false);
}


var tsX,tsY;
var lastScale = 0; // 双指缩放时的 最后距离
function touchstart(event) {
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        tsX = touch.pageX;
        tsY = touch.pageY;

        //document.getElementById('txtAdresse').value = svgX+"**"+svgY+"********************";
    }
    if (event.targetTouches.length == 2) {
        // 两个手指
        var touch1 = event.targetTouches[0];
        var touch2 = event.targetTouches[1];
        // 两点之间的距离
        lastScale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
    }
}

function touchmove(event) {
    if (event.targetTouches.length == 1) {


        var viewBox = svgMap.getAttribute('viewBox');	// Grab the object representing the SVG element's viewBox attribute.
        var viewBoxValues = viewBox.split(' ');				// Create an array and insert each individual view box attribute value (assume they're seperated by a single whitespace character).
        /* The array is filled with strings, convert the first two viewBox values to floats: */
        viewBoxValues[0] = parseFloat(viewBoxValues[0]);	// Represent the x-coordinate on the viewBox attribute.
        viewBoxValues[1] = parseFloat(viewBoxValues[1]);	// Represent the y coordinate on the viewBox attribute.

        var touch = event.targetTouches[0];
        var x = tsX - touch.pageX;
        var y = tsY - touch.pageY;
        svgX += x;
        svgY += y;

        viewBoxValues[0] = svgX;
        viewBoxValues[1] = svgY;

        //document.getElementById('txtAdresse').value = svgX+"**"+svgY;
        svgMap.setAttribute('viewBox', viewBoxValues.join(' '));	// Convert the viewBoxValues array into a string with a white space character between the given values.


        // 每次绘制完成之后 初始化地图坐标
        tsX = touch.pageX;
        tsY = touch.pageY;
    }

    // 双指 缩放
    if (event.targetTouches.length == 2) {

        //document.getElementById('txtAdresse').value = svgX+"**"+svgY;

        // 两个手指
        var touch1 = event.targetTouches[0];
        var touch2 = event.targetTouches[1];

        // 两点之间的距离
        var newScale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));

        if(newScale<lastScale){ // 放大
            svgScale*=1.05;
        }
        if(newScale>lastScale){ // 缩小
            svgScale/=1.05;
        }

        svgMap.setAttribute('viewBox', svgX+" "+svgY+" "+ gWinWidth*svgScale +" "+ gWinHeight*svgScale);

        lastScale = newScale;  // 两点之间的距离
    }
}

function touchend(event) {
}

function ylytest(){
    alert(1);
}


function ylytest1(event){
    alert(event.targetTouches.length);
}