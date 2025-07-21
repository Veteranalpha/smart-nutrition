document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
      const response = await fetch("http://54.172.194.226:8000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      const token = result.data.access_token;
      console.log("TOKEN TO BE SAVED:", token);

      if (!token) {
        throw new Error("No token received from server.");
      }

      // ✅ Save token and user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(result.data.user));

      alert("Login successful! 🎉");
      window.location.href = "dashboard.html";

    } catch (error) {
      alert("Login error: " + error.message);
      console.error("Login error:", error);
    }
  });
});