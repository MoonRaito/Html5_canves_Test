var svgX=0,svgY=0;  // 偏移量

var svgMap    // svg 对象
,svgScale=1; // svg 缩放比例

var isTouch = 0; // 不同的 元素 都会 触发 touch  ，用于限定某些touch 不触发。


function initialize() {
    /* Set the global variable and detect if the browser supports SVG:  */
    svgMap = document.getElementById('svgMap');			// Best to only access the SVG element after the page has fully loaded.
    
    if(svgMap.namespaceURI != "http://www.w3.org/2000/svg")	// Alert the user if their browser does not support SVG.
        alert("Inline SVG in HTML5 is not supported. This document requires a browser that supports HTML5 inline SVG.");
    
    /* Add event listeners:  */
    //window.addEventListener('keydown', processKeyPress, true);
    
    
    // 设置宽和高
    //    宽度，这个宽度是指在页面中实际使用的大小，跟div中定义width是同样的含义。
    svgMap.setAttribute('width', gWinWidth+"px");
    svgMap.setAttribute('height', gWinHeight+"px");
    //viewBox:视图框，是一个由字符串表示的，格式："0 0 2050 1000",--->(ULCx ULCy UUwidth UUheight)
    //    ULCx 与 ULCy 分別代表「左上角 x」与「左上角 y」。UUwidth 与UUheight 分別代表「使用者单位宽度」与「使用者单位高度」
    svgMap.setAttribute('viewBox', "0 0 "+ gWinWidth +" "+ gWinHeight);
    
    // 绘制一个可显示 矩形
    var allWH = document.createElementNS(svgMap.namespaceURI, 'rect');
    allWH.setAttribute('id', 'allWH');
    allWH.setAttribute('x', '5px');
    allWH.setAttribute('y', '300px');
    allWH.setAttribute('width', "200px");
    allWH.setAttribute('height', "100px");
    allWH.setAttribute('stroke', 'blue');
    allWH.setAttribute('stroke-width', '5');
    allWH.setAttribute('fill', 'transparent');
    //    allWH.setAttribute('onclick', 'ylytest()');
    allWH.addEventListener("touchstart", ylytest1, true);
    //allWH.setAttribute('touchstart', 'ylytest1');
    svgMap.appendChild(allWH);
    
    
    // 绘制一个可显示 矩形
    allWH = document.createElementNS(svgMap.namespaceURI, 'rect');
    allWH.setAttribute('id', 'allWH');
    allWH.setAttribute('x', '50px');
    allWH.setAttribute('y', '100px');
    allWH.setAttribute('width', "200px");
    allWH.setAttribute('height', "100px");
    allWH.setAttribute('stroke', 'blue');
    allWH.setAttribute('stroke-width', '5');
    allWH.setAttribute('fill', 'transparent');
    //    allWH.setAttribute('onclick', 'ylytest()');
    allWH.addEventListener("touchstart", ylytest1, true);
    //allWH.setAttribute('touchstart', 'ylytest1');
    svgMap.appendChild(allWH);
    
    // 绘制一个可显示 矩形
    //    allWH = document.createElementNS(svgMap.namespaceURI, 'rect');
    //    allWH.setAttribute('id', 'allWH');
    //    allWH.setAttribute('x', '0px');
    //    allWH.setAttribute('y', '0px');
    //    allWH.setAttribute('width', gWinWidth+"px");
    //    allWH.setAttribute('height', gWinHeight+"px");
    //    allWH.setAttribute('stroke', 'blue');
    //    allWH.setAttribute('stroke-width', '5');
    //    allWH.setAttribute('fill', 'transparent');
    //    //    allWH.setAttribute('onclick', 'ylytest()');
    //    allWH.addEventListener("touchstart", touchstart, false);
    //    allWH.addEventListener("touchmove", touchmove, false);
    //    allWH.addEventListener("touchend", touchend, false);
    //    //allWH.setAttribute('touchstart', 'ylytest1');
    //    svgMap.appendChild(allWH);
    
    // 绘制地图
    drawMap();
    
    svgMap.addEventListener("touchstart", touchstart, true);
    svgMap.addEventListener("touchmove", touchmove, true);
    svgMap.addEventListener("touchend", touchend, true);
}


var tsX,tsY;
var lastScale = 0; // 双指缩放时的 最后距离
function touchstart(event) {
    //    document.getElementById('txtAdresse').value += event.touches.length;
    
    // 监听到svg 非多指触碰
    if (event.touches.length == 1 && isTouch<2) {
        var touch = event.touches[0];
        tsX = touch.pageX;
        tsY = touch.pageY;
        
        //document.getElementById('txtAdresse').value = svgX+"**"+svgY+"********************";
    }
    if (event.touches.length == 2) {
        isTouch = 2; // 双指触碰
        
        // 两个手指
        var touch1 = event.touches[0];
        var touch2 = event.touches[1];
        // 两点之间的距离
        lastScale = Math.sqrt(Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2));
    }
}

function touchmove(event) {
    // 监听到svg 非多指触碰
    if (event.touches.length == 1 && isTouch<2) {
        
        
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
    if (event.touches.length == 2) {
        //document.getElementById('txtAdresse').value = svgX+"**"+svgY;
        
        // 两个手指
        var touch1 = event.touches[0];
        var touch2 = event.touches[1];
        
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
    if (event.touches.length == 2) {
        document.getElementById('txtAdresse').value = "**"+event.touches.length;
        isTouch = 0; //  双指触碰 后 初始化
        alert(isTouch);
    }
    
    isTouch = 0; //  触碰 后 初始化
}

function ylytest(){
    alert(1);
}


function ylytest1(event){
    //    alert(1);
//    document.getElementById('txtAdresse').value += "**"+event.targetTouches.length;
    //    alert(event.targetTouches.length);
//    document.getElementById('txtAdresse').value = event.targetTouches.length;
    document.getElementById('txtAdresse').value = this.id;
}


//touchstart：触摸开始的时候触发
//touchmove：手指在屏幕上滑动的时候触发
//touchend：触摸结束的时候触发
//而每个触摸事件都包括了三个触摸列表，每个列表里包含了对应的一系列触摸点（用来实现多点触控）：
//touches：当前位于屏幕上的所有手指的列表。
//targetTouches：位于当前DOM元素上手指的列表。
//changedTouches：涉及当前事件手指的列表。
//每个触摸点由包含了如下触摸信息（常用）：
//identifier：一个数值，唯一标识触摸会话（touch session）中的当前手指。一般为从0开始的流水号（android4.1，uc）
//target：DOM元素，是动作所针对的目标。


//<div id="div1" style="background: blue;width: 100px; height: 100px;">
//<div id="div2" style="background: red;width: 70px; height: 70px;">
//<div id="div3" style="background: yellow;width: 50px; height: 50px;"></div>
//</div>
//</div>
//捕获阶段: 外-》里 * 在div1处检测 useCapture 是否为true,是则执行程序， div2同理 .
//
//目标阶段: 目标到div3处，发现div3就是鼠标点击的节点， 所以这里是目标阶段。若有事件处理程序，则执行该程序，这里不论 useCapture 为 true 还是 false。
//
//冒泡阶段: 里-》外  在div2处检测useCapture 是否为false， 是则执行该程序 . div1同

//--
// tild 宽高
var tiledHeight = 32,tiledWidth = 32;

// 绘制地图
function drawMap(){
    var _mapData;
    for(var i=0;i<mapData.length;i++){
        _mapData = mapData[i];
        for(var j=0;j<_mapData.length;j++){
            
            if(_mapData[j]!=0){
                var propertie=getProperties(_mapData[j]-1);
                if(propertie!=""){  // 属性图块
                    
                    // 绘制一个可显示 矩形
                    var allWH = document.createElementNS(svgMap.namespaceURI, 'rect');
                    allWH.setAttribute('id', 'id_'+i+'_'+j);
                    allWH.setAttribute('x', i*tiledWidth+'px');
                    allWH.setAttribute('y', j*tiledHeight+'px');
                    allWH.setAttribute('width', propertie.width*tiledWidth+'px');
                    allWH.setAttribute('height', propertie.height*tiledHeight+'px');
                    allWH.setAttribute('fill',propertie.color);
                    allWH.setAttribute('stroke', propertie.bordercolor);
                    allWH.setAttribute('stroke-width', '1');
                    //                allWH.setAttribute('fill','rgb(0,0,255)');
                    
                    //            allWH.setAttribute('fill', 'transparent');
                    //    allWH.setAttribute('onclick', 'ylytest()');
                    allWH.addEventListener("touchstart", ylytest1, true);
                    //allWH.setAttribute('touchstart', 'ylytest1');
                    svgMap.appendChild(allWH);
                    
                    // 文字大小
                    var textsize = propertie.width*tiledWidth*propertie.height*tiledHeight/1000;
//                    if(textsize>10){
                    
                    // 文字
                    var stext = document.createElementNS(svgMap.namespaceURI,"text");
//                    x + width / 7 + 40 * zoomScale, y + height / 2
                    stext.setAttribute("x",((i*tiledWidth)+(propertie.width*tiledWidth/7)+40)+"px");
                    stext.setAttribute("y",((j*tiledHeight)+(propertie.height*tiledHeight/2))+"px");

                    stext.setAttribute("font-size",textsize);
                    stext.setAttribute("style","font-family:'Microsoft YaHei', SimHei,Arial, 'Times New Roman';");
                    stext.setAttribute("fill",propertie.textcolor);
                    var textString = document.createTextNode(propertie.title);
                    stext.appendChild(textString);
                    svgMap.appendChild(stext);
//                    document.getElementById('txtAdresse').value += propertie.title;
                    
                    var imageurl = propertie.imageurl;
                    if (imageurl != ""&&imageurl != " ") {
                        var simage = document.createElementNS(svgMap.namespaceURI, "image");
                        simage.href.baseVal = imageurl;
//                        simage.setAttributeNS(null, "x", (i*tiledWidth)+(propertie.width*tiledWidth/7));
//                        simage.setAttributeNS(null, "y", ((j*tiledHeight)+(propertie.height*tiledHeight/2)-25));
//                        simage.setAttributeNS(null, "height", "30px");
//                        simage.setAttributeNS(null, "width", "30px");
                        simage.setAttribute("x", (i*tiledWidth)+(propertie.width*tiledWidth/7));
                        simage.setAttribute("y", ((j*tiledHeight)+(propertie.height*tiledHeight/2)-25));
                        simage.setAttribute("height", "30px");
                        simage.setAttribute("width", "30px");
                        svgMap.appendChild(simage);
                    }
                    
                    
                    
                    //                    DrawBlock((l+imgX), t+imgY,propertie.width*tiledW
                    //                              ,propertie.height*tiledH
                    //                              ,propertie.title,propertie.color,propertie.textcolor
                    //                              ,propertie.bordercolor,propertie.imageurl);
                    //                    // 搜索目的地
                    //                    var destinations = document.getElementById("txtAdresse").value;
                    //                    // 是否是目的地
                    //                    if(destinations!=""&&destinations!=null){
                    //                        if(propertie.title.indexOf(destinations) >= 0){
                    //                            DrawAddresse((l+imgX), t+imgY,propertie.width*tiledW
                    //                                         ,propertie.height*tiledH
                    //                                         ,propertie.title,propertie.color,propertie.textcolor
                    //                                         ,propertie.bordercolor,mapPoi,map.data[i],i);
                    //                        }
                    //                    }
//                    }
                }
                
            }
            
        }
    }
}

// 切换 屏幕时
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
//                        svgMap.setAttribute('viewBox', "0 0 "+ gWinWidth +" "+ gWinHeight);
//                        initialize();
                        svgMap.setAttribute('width', gWinWidth+'px');
                        svgMap.setAttribute('height', gWinHeight+'px');
});





