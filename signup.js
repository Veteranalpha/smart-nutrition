document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const first_name = document.getElementById('first_name').value.trim();
    const last_name = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    console.log(last_name);
    console.log(first_name);
    console.log(password);
    console.log(email);

    try {
      const response = await fetch("http://54.172.194.226:8000/api/v1/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ first_name, last_name, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      alert("Signup successful! 🎉 You can now log in.");
      window.location.href = "login.html";

    } catch (error) {
      alert("Error: " + error.message);
      console.error("Signup error:", error);
    }
  });
});
