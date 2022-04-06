const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area"),
image = document.getElementById('image'),
range = document.getElementById('range'),
inside = document.getElementById('inside'),
outside = document.getElementById('outside'),
input_div = document.getElementById("input-div"),
tint_div = document.getElementById('tint'),
gray_div = document.getElementById('gray');

let value = 0;
let imgPath = null;
let red_value = 0, blue_value = 0, green_value = 0;


// file upload
form.addEventListener("click", () =>{
  fileInput.click();
});

fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){
    uploadFile(file);
  }
}

const uploadFile = (file) =>{
    const formData = new FormData()
    formData.append('image', file)

    fetch(`http://localhost:5000/img/upload`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        imgPath = data.imgPath;
        image.src=`http://localhost:5000/${imgPath}`;
        form.classList.add("display_hidden");
        console.log(data);
      })
      .catch(error => {
        console.error(error)
      })  
}


// range calculate
function myFunction(val) {
  value = val;
  document.getElementById("range_value").innerHTML = val;
  
}


// range calculate
function redValue(val) {
  red_value = val;
  document.getElementById("red").innerHTML = val;
  
}

// range calculate
function blueValue(val) {
  blue_value = val;
  document.getElementById("blue").innerHTML = val;
  
}

// range calculate
function greenValue(val) {
  green_value = val;
  document.getElementById("green").innerHTML = val;
  
}

document.getElementById('range').addEventListener("change", () => {
  value = parseInt(value);
  let inside = 0;
  
  if (value < 0){
    inside = 1;
  }
  value = Math.abs(value);
  let top = value, bottom = value, left = value, right= value,
  color = [255,0,0,1];

  const border = {top, bottom, left, right, color, inside, imgPath};

  fetch(`http://localhost:5000/img/border`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(border)
      })
      .then(response => response.json())
      .then(data => {
        imgPath = data.imgPath;
        image.src=`http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath)
      })
      .catch(error => {
        console.error(error)
      }) 
});


document.getElementById('gray').addEventListener('click', ()=>{
  const gray_data = {imgPath,grayscale:true};
  input_div.classList.add('display_hidden');
  tint_div.classList.remove('active');
  gray_div.classList.add('active');
  fetch(`http://localhost:5000/img/gray`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gray_data)
      })
      .then(response => response.json())
      .then(data => {
        imgPath = data.imgPath;
        image.src=`http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath)
      })
      .catch(error => {
        console.error(error)
      }) 
})


// Tint api call
const tintFilterApi = (tint_data) =>{
  fetch(`http://localhost:5000/img/tint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tint_data)
      })
      .then(response => response.json())
      .then(data => {
        imgPath = data.imgPath;
        image.src=`http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath)
      })
      .catch(error => {
        console.error(error)
      }) 
}

document.getElementById('tint').addEventListener('click', ()=>{
  const color=[255,0,1];
  const tint_data = {imgPath,color};
  input_div.classList.remove("display_hidden");
  tint_div.classList.add('active');
  gray_div.classList.remove('active');
  tintFilterApi(tint_data);
})


document.getElementById('green_color').addEventListener("change", () => {
  const color = [red_value,blue_value,green_value];

  const tint_data = {imgPath,color};
  tintFilterApi(tint_data);
  
});

document.getElementById('blue_color').addEventListener("change", () => {
  const color = [red_value,blue_value,green_value];

  const tint_data = {imgPath,color};
  tintFilterApi(tint_data);
  
});

document.getElementById('red_color').addEventListener("change", () => {
  const color = [red_value,blue_value,green_value];

  const tint_data = {imgPath,color};
  tintFilterApi(tint_data);
  
});