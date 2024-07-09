// ^ varibles
var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var welcome = document.getElementById("welcome");
var logOutBtn = document.getElementById("logOutBtn");
var exist = document.getElementById("exist");
var incorrect = document.getElementById("incorrect");
var userData = [];

// ^ Condition to avoid missing users data
if (localStorage.getItem("userData")) {
  userData = JSON.parse(localStorage.getItem("userData"));
}

// ^ function to check empty signup inputs
function isSignUpEmpty() {
  return (
    userName.value === "" || userEmail.value === "" || userPassword.value === ""
  );
}

// ^ function to check email is exist

function isExist() {
  for (var i = 0; i < userData.length; i++) {
    if (userEmail.value.toLowerCase() === userData[i].email.toLowerCase()) {
      return false;
    }
  }
  return true;
}

// ^ function to register a user
function signUp() {
  if (isSignUpEmpty()) {
    exist.innerHTML = `<span class="fs-5 text-danger my-3 d-block">All inputs are required</span>`;
    return false;
  }

  if (!isExist()) {
    exist.innerHTML = `<span class="fs-5 text-danger my-3 d-block">Email aleardy exists</span>`;
    return false;
  }

  var user = {
    name: userName.value,
    email: userEmail.value.toLowerCase(),
    password: userPassword.value,
  };

  userData.push(user);
  localStorage.setItem("userData", JSON.stringify(userData));
  exist.innerHTML = `<span class="fs-5 text-success my-3 d-block">Success</span>`;

  userName.value = "";
  userEmail.value = "";
  userPassword.value = "";

  return true;
}

// ^ function to check login inputs
function isLoginEmpty() {
  if (loginEmail.value === "" || loginPassword.value === "") {
    return true;
  }
}

// ^ function to login a user
function login() {
  if (isLoginEmpty()) {
    incorrect.innerHTML = `<span class="fs-5 text-danger my-3 d-block">All inputs are required</span>`;
    return false;
  }
  for (var i = 0; i < userData.length; i++) {
    if (
      loginEmail.value.toLowerCase() === userData[i].email.toLowerCase() &&
      loginPassword.value.toLowerCase() === userData[i].password.toLowerCase()
    ) {
      localStorage.setItem("userName", userData[i].name);
      window.location.href = "home.html";
      return true;
    }
  }
  incorrect.innerHTML = `<span class="fs-5 text-danger my-3 d-block">Incorrect email or password</span>`;
}

// ^ function to welcome user
function welcomeUser() {
  if (localStorage.getItem("userName")) {
    welcome.innerHTML = `Welcome ${localStorage.getItem("userName")}`;
  }
}
welcomeUser();

// ^ function to logout user

function logOut() {
  localStorage.removeItem("userName");
  window.location.href = "login.html";
}
