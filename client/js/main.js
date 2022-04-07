const form = document.querySelector("form"),
  fileInput = document.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploadedArea = document.querySelector(".uploaded-area"),
  image = document.getElementById("image"),
  range = document.getElementById("range"),
  inside = document.getElementById("inside"),
  outside = document.getElementById("outside"),
  input_div = document.getElementById("input-div"),
  tint_div = document.getElementById("tint"),
  gray_div = document.getElementById("gray");
  border_button = document.getElementById("border"),
  border_range_div = document.getElementById("border_range_div"),
  image_container_div = document.getElementById("image-container"),
  img_1 = document.getElementById("img_1"),
  img_2 = document.getElementById("img_2"),
  img_3 = document.getElementById("img_3"),
  img_4 = document.getElementById("img_4"),
  sharpen = document.getElementById("sharpen"),
  custom_range = document.getElementById("custom-input-range"),
  custom_btn = document.getElementById("custom");

let value = 0;
let imgPath = null;
let red_value = 0,
  blue_value = 0,
  green_value = 0,
  a1 = 70, a2 = 67, a3 = 34,
  b1 = 33, b2 = 45, b3 = 25,
  c1 = 59, c2 = 65, c3 = 39;


// file upload
form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    uploadFile(file);
  }
};

const uploadFile = (file) => {
  const formData = new FormData();
  formData.append("image", file);

  fetch(`http://localhost:5000/img/upload`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      setTimeout(() => {
        imgPath = data.imgPath;
        image.src = `http://localhost:5000/${imgPath}`;
        img_1.src = `http://localhost:5000/${data.filter_1}`;
        img_2.src = `http://localhost:5000/${data.filter_2}`;
        img_3.src = `http://localhost:5000/${data.filter_3}`;
        img_4.src = `http://localhost:5000/${data.filter_4}`;
        form.classList.add("display_hidden");
        image_container_div.classList.remove("display_hidden");
        document.getElementById('btn_box').classList.remove("display_hidden");
        console.log(data);
      }, 1000);
    })
    .catch((error) => {
      console.error(error);
    });
};

document.getElementById('btn_box').addEventListener('click', ()=>{
  window.location.reload();

})

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

// range calculate
function a1Value(val) {
  a1 = val;
  document.getElementById("a1").innerHTML = val/100;
}

// range calculate
function a2Value(val) {
  a2 = val;
  document.getElementById("a2").innerHTML = val/100;
}

// range calculate
function a3Value(val) {
  a3 = val;
  document.getElementById("a3").innerHTML = val/100;
}


// range calculate
function b1Value(val) {
  b1 = val;
  document.getElementById("b1").innerHTML = val/100;
}

// range calculate
function b2Value(val) {
  b2 = val;
  document.getElementById("b2").innerHTML = val/100;
}

// range calculate
function b3Value(val) {
  b3 = val;
  document.getElementById("b3").innerHTML = val/100;
}

// range calculate
function c1Value(val) {
  c1 = val;
  document.getElementById("c1").innerHTML = val/100;
}

// range calculate
function c2Value(val) {
  c2 = val;
  document.getElementById("c2").innerHTML = val/100;
}

// range calculate
function c3Value(val) {
  c3 = val;
  document.getElementById("c3").innerHTML = val/100;
}



border_button.addEventListener("click", () => {
  border_range_div.classList.remove("display_hidden");
  border_button.classList.add("active");
  input_div.classList.add("display_hidden");
  tint_div.classList.remove("active");
  gray_div.classList.remove("active");
  sharpen.classList.remove("active");
  custom_range.classList.add('display_hidden');
  custom_btn.classList.remove("active");

  let top = 15,
    bottom = 15,
    left = 15,
    right = 15,
    inside = 0,
    color = [255, 0, 0, 1];

  const border = { top, bottom, left, right, color, inside, imgPath };
  border_api(border);
});

document.getElementById("range").addEventListener("change", () => {
  value = parseInt(value);
  let inside = 0;

  if (value < 0) {
    inside = 1;
  }
  value = Math.abs(value);
  let top = value,
    bottom = value,
    left = value,
    right = value,
    color = [255, 0, 0, 1];

  const border = { top, bottom, left, right, color, inside, imgPath };
  border_api(border);
});

// border fetch
const border_api = (border) => {
  if (imgPath) {
    fetch(`http://localhost:5000/img/border`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(border),
    })
      .then((response) => response.json())
      .then((data) => {
        imgPath = data.imgPath;
        image.src =
          `http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

document.getElementById("gray").addEventListener("click", () => {
  const gray_data = { imgPath, grayscale: true };
  input_div.classList.add("display_hidden");
  tint_div.classList.remove("active");
  gray_div.classList.add("active");
  sharpen.classList.remove("active");
  border_button.classList.remove("active");
  border_range_div.classList.add("display_hidden");
  custom_range.classList.add('display_hidden');
  custom_btn.classList.remove("active");

  if (imgPath) {
    fetch(`http://localhost:5000/img/gray`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gray_data),
    })
      .then((response) => response.json())
      .then((data) => {
        imgPath = data.imgPath;
        image.src =
          `http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }
});

// Tint api call
const tintFilterApi = (tint_data) => {
  if (tint_data.imgPath) {
    fetch(`http://localhost:5000/img/tint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tint_data),
    })
      .then((response) => response.json())
      .then((data) => {
        imgPath = data.imgPath;
        image.src =
          `http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

document.getElementById("tint").addEventListener("click", () => {
  const color = [255, 0, 1];
  const tint_data = { imgPath, color };
  input_div.classList.remove("display_hidden");
  tint_div.classList.add("active");
  gray_div.classList.remove("active");
  sharpen.classList.remove("active");
  border_button.classList.remove("active");
  border_range_div.classList.add("display_hidden");
  custom_range.classList.add('display_hidden');
  custom_btn.classList.remove("active");

  tintFilterApi(tint_data);
});

document.getElementById("green_color").addEventListener("change", () => {
  const color = [red_value, blue_value, green_value];

  const tint_data = { imgPath, color };
  tintFilterApi(tint_data);
});

document.getElementById("blue_color").addEventListener("change", () => {
  const color = [red_value, blue_value, green_value];

  const tint_data = { imgPath, color };
  tintFilterApi(tint_data);
});

document.getElementById("red_color").addEventListener("change", () => {
  const color = [red_value, blue_value, green_value];

  const tint_data = { imgPath, color };
  tintFilterApi(tint_data);
});

sharpen.addEventListener('click', ()=>{
  sharpen.classList.add('active');
  tint_div.classList.remove("active");
  gray_div.classList.remove("active");
  border_button.classList.remove("active");
  border_range_div.classList.add("display_hidden");
  custom_range.classList.add('display_hidden');
  input_div.classList.add("display_hidden");
  custom_btn.classList.remove("active");
  const sharpen_data = {
    imgPath,
    sigma: 3,
    sharpen_m1: 0,
    sharpen_m2: 5,
    sharpen_x1: 5,
    sharpen_y2: 50,
    sharpen_y3: 50,
  }

  sharpenApi(sharpen_data);

})


const sharpenApi = (sharpen_data) =>{
  if (sharpen_data.imgPath) {
    fetch(`http://localhost:5000/img/sharpen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sharpen_data),
    })
      .then((response) => response.json())
      .then((data) => {
        imgPath = data.imgPath;
        image.src =
          `http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

custom_btn.addEventListener('click', ()=>{
  custom_range.classList.remove('display_hidden');
  sharpen.classList.remove('active');
  tint_div.classList.remove("active");
  gray_div.classList.remove("active");
  border_button.classList.remove("active");
  border_range_div.classList.add("display_hidden");
  input_div.classList.add("display_hidden");
  custom_btn.classList.add("active");
});


document.getElementById("a1_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
  
});


document.getElementById("a2_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});


document.getElementById("a3_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});

document.getElementById("b1_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});

document.getElementById("b2_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});


document.getElementById("b3_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});


document.getElementById("c1_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});

document.getElementById("c2_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});

document.getElementById("c3_value").addEventListener("change", () => {
  let a = [a1/100, a2/100, a3/100], b = [b1/100, b2/100, b3/100], c = [c1/100, c2/100, c3/100];

  
  custom_data = {imgPath,a,b,c};
  customFilterApi(custom_data );
});


const customFilterApi = (custom_data) =>{
  console.log('Got Hit')
  if (custom_data.imgPath) {
    fetch(`http://localhost:5000/img/custom_filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(custom_data),
    })
      .then((response) => response.json())
      .then((data) => {
        imgPath = data.imgPath;
        image.src =
          `http://localhost:5000/${imgPath}?t=` + new Date().getTime();
        console.log(imgPath);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}