const afternoon = 12;
const morning = 1;
const night = 18;

// const chour = 7;

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
  } else if (chour >= afternoon && !(chour >= night)) {
    document.querySelector(".greeting").textContent = "Good Afternoon!";
    document.querySelector(".time").textContent = "pm";
  } else if (chour <= afternoon) {
    document.querySelector(".greeting").textContent = "Good Morning!";
    document.querySelector(".time").textContent = "am";
  }
  document.querySelector(".minute").textContent = cmin;
  document.querySelector(".hour").textContent = chour;
  setTimeout(body, 1000);
}
