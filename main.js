const canvas = document.getElementById("canvas");
const div_color = document.getElementsByClassName("color-field");
const size = document.getElementById("range");

canvas.width = window.innerWidth - 60;
canvas.height = 400;
let start_background_color = "white";
let ctx = canvas.getContext("2d");
ctx.fillStyle = start_background_color;
ctx.fillRect(0, 0, canvas.width, canvas.height);

let draw_color = "black";
let draw_width = "100";
let is_drawing = false;
let restore_array = [];
let index = -1;

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
size.addEventListener('change', fsize);
canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);


function start(e){
    is_drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, 
               e.clientY - canvas.offsetTop);
    e.preventDefault();
}

function draw(e){
    if(is_drawing){
        ctx.lineTo(e.clientX - canvas.offsetLeft, 
                   e.clientY - canvas.offsetTop)
        ctx.strokeStyle = draw_color;
        ctx.linewidth = 50;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }
    e.preventDefault();
}

function stop(e){
    if(is_drawing){
        ctx.stroke();
        ctx.closePath();
        is_drawing = false;
    }
    e.preventDefault();

    if(e.type != 'mouseout'){
        restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
    
    // console.log(restore_array);
}

const change_color = (element) => {
    draw_color = element.style.background;

    console.log(draw_color);
}

const clear_canvas = () =>{
    ctx.fillStyle = start_background_color;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    restore_array = [];
    index = -1;
}

function fsize(e){
   draw_width = e.target.value;
   ctx.linewidth = draw_width;
}

const undo_last = () =>{
    if(index <= 0){
        clear_canvas();
    }else{
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0)
    }
}

for (let prop of div_color){
    prop.addEventListener('click', (e) => {
        draw_color = e.target.dataset.id;
    });
}
