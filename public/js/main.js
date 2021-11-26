let success = document.getElementById("success");
setTimeout(() => {
  success.style.opacity = 0;
  success.style.visibility = "hidden";
}, 4000);

let error = document.getElementById("error");
setTimeout(() => {
  error.style.opacity = 0;
  error.style.visibility = "hidden";
}, 4000);

//

let toggle = document.getElementById("toggle");
let select = document.getElementById("select");

document.onclick = (e) => {
  if (e.target != toggle) {
    select.classList.remove("active");
  }
};

toggle.onclick = () => {
  select.classList.toggle("active");
};
