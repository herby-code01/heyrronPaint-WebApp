var paintcanv = document.getElementById("drawing-panel");
var ctxt = paintcanv.getContext("2d")
var br_color = 'black';
var br_size = 10;
var er_size = 10;
var isPainting = false;
var panel_bg_color = 'white';

function setWidth(value){
    paintcanv.width = parseInt(value);
    ctxt = paintcanv.getContext("2d");
}

function setHeight(value){
    paintcanv.height = parseInt(value);
    ctxt = paintcanv.getContext("2d");
}

function isNumeric(value){
    return !isNaN(value);
}

function setBrushSize(){
    var brush_size = document.getElementById("brush-size").value;
    br_size = brush_size;
    return br_size;
}

function setBrushColor(){
    var brush_color_op1 = document.getElementById("brush-color-select-box").value;
    var brush_color_op2 = document.getElementById("brush-color-picker").value;

    if(brush_color_op1.trim() && brush_color_op1 !==""){
        br_color = brush_color_op1;
    } else if(brush_color_op2 && brush_color_op2 !==""){
        br_color = brush_color_op2;
    } else{
        br_color = 'black';
    }
    return br_color;
}

function setPanelColor(){
    var panel_color_op1 = document.getElementById("fill-panel-color").value;
    var panel_color_op2 = document.getElementById("panel-color-picker").value;

    if(panel_color_op2 && panel_color_op2 !=="#ffffff" || panel_color_op2){
        panel_color_op1 = panel_color_op2;
        panel_bg_color = panel_color_op2;
    } else if (panel_color_op1.trim() && panel_color_op1.trim() !==""){
        panel_color_op2 = panel_color_op1;
        panel_bg_color = panel_color_op1;
    } else{
        panel_bg_color = 'white';
    }

    paintcanv.style.backgroundColor = panel_bg_color;

}

function regularDraw(x,y){
    ctxt.beginPath();
    ctxt.arc(x, y, br_size, 0, Math.PI*2, true);
    ctxt.fillStyle = br_color;
    ctxt.fill();
}


function setEraserActive(){
    setEraserSize();
    br_size = er_size;

    if(panel_bg_color !== "#ffffff" || panel_bg_color !='white'){
        br_color = panel_bg_color;
    } else {
        br_color = 'white';
    }
    return br_color;
    return br_size;
}

function setBrushActive(){
    setBrushColor();
    setBrushSize();
}

function setEraserSize(){
    var eraser_size = document.getElementById("eraser-size").value;
    er_size = eraser_size;

    return er_size;
}

function setPanelWidth(){
    var widthInput = document.getElementById("panel-width");
    var width = parseInt(widthInput.value);
    
    if(isNumeric(width)){
        setWidth(width);
    } else {
        alert('Type a valid number for the width');
    }
}

function setPanelHeight(){
    var heightInput = document.getElementById("panel-height");
    var height = parseInt(heightInput.value);

    if(isNumeric(height)){
        setHeight(height);
    } else {
        alert('Type a valid number for the height');
    }
}

function saveImage(){
    var exportCanvas = document.createElement('canvas');
    exportCanvas.width = paintcanv.width;
    exportCanvas.height = paintcanv.height;
    var expoCanv = exportCanvas.getContext('2d');

    expoCanv.fillStyle = panel_bg_color;
    expoCanv.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    expoCanv.drawImage(paintcanv, 0, 0);

    var dataURL = exportCanvas.toDataURL('image/png');
    var a = document.createElement('a');
    a.href = dataURL;
    a.download = 'heyyronpaintfile.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
}

function drawAvailable(){
    return isPainting = true;
}

function drawUnavailable(){
    return isPainting = false;
}

function activateDraw(){
    drawAvailable();
    var x = event.offsetX;
    var y = event.offsetY;
    regularDraw(x, y);
}

function draw(){
    if(isPainting == true){
        var x = event.offsetX;
        var y = event.offsetY;
        regularDraw(x, y);
    }
}

function deactivateDraw(){
    drawUnavailable();
}

function clearAll(){
    ctxt.fillStyle = panel_bg_color;
    ctxt.fillRect(0,0, paintcanv.width, paintcanv.height);
}