import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";

// Your Firebase config (same as signup)
const firebaseConfig = {
  apiKey: "AIzaSyBQ0IVqJfrC2oYH3zQr9yjkJZFh9CL3z30",
  authDomain: "smart-nutrition-system-b6bab.firebaseapp.com",
  projectId: "smart-nutrition-system-b6bab",
  storageBucket: "smart-nutrition-system-b6bab.firebasestorage.app",
  messagingSenderId: "526339972678",
  appId: "1:526339972678:web:7162666bf843214955b447"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('Logged in successfully!');
      window.location.href = "dashboard.html";
      // Redirect or update UI here
    })
    .catch((error) => {
      alert(`Error: ${error.message}`);
    });
});
