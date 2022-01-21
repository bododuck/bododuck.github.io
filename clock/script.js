const afternoon = 12;
const morning = 1;
const night = 18;
let am = false;

// const chour = 18;

let switches = true;
body();
setTimeout(body, 1000);

function body() {
  const cdate = new Date();
  const chour = cdate.getHours();
  const cmin = cdate.getMinutes();
  const csec = cdate.getSeconds();
  if (chour >= night) {
    document.querySelector(".greeting").textContent = "Good Night!";
    document.querySelector(".time").textContent = "pm";
    am = false;
  } else if (chour >= afternoon && !(chour >= night)) {
    document.querySelector(".greeting").textContent = "Good Afternoon!";
    document.querySelector(".time").textContent = "pm";
    am = false;
  } else if (chour <= afternoon) {
    document.querySelector(".greeting").textContent = "Good Morning!";
    document.querySelector(".time").textContent = "am";
    am = true;
  }
  document.querySelector(".minute").textContent = cmin;
  if (am) {
    document.querySelector(".hour").textContent = chour;
  } else {
    document.querySelector(".hour").textContent = chour - 12;
  }
  setTimeout(body, 1000);
}
j;
