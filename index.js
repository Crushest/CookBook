//Firebase Setup Start
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAMx5Txlm2VbxLUKL-xsJVMEvvJ2YcZSoc",
  authDomain: "familycookbook-580bf.firebaseapp.com",
  projectId: "familycookbook-580bf",
  storageBucket: "familycookbook-580bf.appspot.com",
  messagingSenderId: "365501345761",
  appId: "1:365501345761:web:9bd74d44cd7a458a156ca0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
//Firebase Setup End

// HTML elements
const signOutButton = document.getElementById("signOutBtn");
const viewLoggedOut = document.getElementById("loggedOutView");
const viewLoggedIn = document.getElementById("loggedInView");
const emailInputEl = document.getElementById("email-input");
const passwordInputEl = document.getElementById("password-input");
const signInButtonEl = document.getElementById("sign-in-btn");
const createAccountButtonEl = document.getElementById("create-account-btn");
const signInWithGoogleButtonEl = document.getElementById("sign-in-with-google-btn");
const userPicEl = document.getElementById("userPic");
const closeForm = document.querySelector(".closeForm");
const formContainer = document.querySelector(".loginForm");
const loginBtn = document.getElementById("login");
const overlay = document.getElementById("overlay");
const userNameEl = document.getElementById("userName");


// Event Listeners
signOutButton.addEventListener("click", authSignOut);
signInWithGoogleButtonEl.addEventListener("click", authSignInWithGoogle);
signInButtonEl.addEventListener("click", authSignInWithEmail);
createAccountButtonEl.addEventListener("click", authCreateAccountWithEmail);

loginBtn.addEventListener("click", (e) => {
  formContainer.classList.toggle("active");
  overlay.classList.remove("hidden");
});

closeForm.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.classList.add("hidden");
  formContainer.classList.toggle("active");
});

function authSignInWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("Signed in with Google");
      clearAuthFields();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authCreateAccountWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearAuthFields();
    })
    .catch((error) => {
      console.error(error.Message);
    });
}

function authSignInWithEmail() {
  const email = emailInputEl.value;
  const password = passwordInputEl.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      clearAuthFields();
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function authSignOut() {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.error(error.message);
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    showLoggedInView();
    showProfilePicture(userPicEl, user)
    showUserName(userNameEl, user)
  } else {
    showLoggedOutView();
  }
});

function clearInputField(field) {
  field.value = "";
}

function clearAuthFields() {
  clearInputField(emailInputEl);
  clearInputField(passwordInputEl);
}

function showLoggedOutView() {
  hideView(viewLoggedIn);
  showView(viewLoggedOut);
}

function showLoggedInView() {
  hideView(viewLoggedOut);
  showView(viewLoggedIn);
}

function showView(view) {
  view.style.display = "flex";
}

function hideView(view) {
  view.style.display = "none";
}

function showProfilePicture(imgElement, user) {
  const photoURL = user.photoURL
  const defaultPic = "images/default.png"

  if (photoURL) {
      imgElement.src = photoURL
  } else {
      imgElement.src = defaultPic
  }
}

function showUserName(element, user) {
  const displayName = user.displayName
  
  if (displayName) {
      
      
      element.textContent =  displayName
  } else {
      element.textContent = `Welcome!`
  }
}