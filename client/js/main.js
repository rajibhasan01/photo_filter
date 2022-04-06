const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area"),
image = document.getElementById('image'),
range = document.getElementById('range'),
inside = document.getElementById('inside'),
outside = document.getElementById('outside');
let value = 0;
let imgPath = null;


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
  const gray_data = {imgPath,grayscale:true}
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