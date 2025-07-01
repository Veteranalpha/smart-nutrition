  // Import the functions you need from the SDKs you need
  

  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";

  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBQ0IVqJfrC2oYH3zQr9yjkJZFh9CL3z30",
    authDomain: "smart-nutrition-system-b6bab.firebaseapp.com",
    projectId: "smart-nutrition-system-b6bab",
    storageBucket: "smart-nutrition-system-b6bab.firebasestorage.app",
    messagingSenderId: "526339972678",
    appId: "1:526339972678:web:7162666bf843214955b447"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  // submit button
const signupForm = document.getElementById('signupForm');
  signupForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent page reload

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  

  
 createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Signup successful! Welcome " + userCredential.user.name);
      window.location.href = "dashboard.html"
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
console.log("signup.js loaded");