console.log("foo");

window.addEventListener("load", (event) => {
  if (localStorage.getItem("loggedin") === "TRUE") {
    document.body.className = "logged";
  } else {
    document.body.className = "notlogged";
  }
});

const button = document.getElementById("btn");

button.addEventListener("click", () => {
  localStorage.setItem("loggedin", "TRUE");
  window.location.reload();
});

setInterval(() => {
  window.location.reload();
}, 5000);
