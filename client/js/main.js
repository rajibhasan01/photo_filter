const form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area"),
image = document.getElementById('image'),
range = document.getElementById('range'),
inside = document.getElementById('inside'),
outside = document.getElementById('outside');


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
        image.src=`http://localhost:5000/${data.imgPath}`;
        form.classList.add("display_hidden");
        console.log(data);
      })
      .catch(error => {
        console.error(error)
      })  
}


// range calculate
function myFunction(val) {
  document.getElementById("range_value").innerHTML = val;
}