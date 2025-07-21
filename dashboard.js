document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem("token");
  console.log("🟢 Token in dashboard:", token);

  if (!token) {
    alert("Session expired. Please log in again.");
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch("http://54.172.194.226:8000/api/v1/user/me", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("❌ Unauthorized or token expired");
    }

    const result = await response.json();
    const user = result.data;
    console.log("👤 User fetched:", user);

    // Update dashboard text
    document.querySelector(".username").textContent = user.first_name;
    document.querySelector("#dropdownMenu").innerHTML = `
      <div class="py-2">
        <p class="px-4 py-2 text-gray-700">Name: ${user.first_name}  ${user.last_name}</p>
        <p class="px-4 py-2 text-gray-700">Age: ${user.age}</p>
        <p class="px-4 py-2 text-gray-700">Initial Weight: ${user.weight}kg</p>
        <p class="px-4 py-2 text-gray-700">Initial Height: ${user.height}cm</p>
        <button onclick="signOutUser()" class="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">Sign out</button>
      </div>`;
      document.getElementById("user-weight").textContent = user.weight || "--";
      document.getElementById("user-height").textContent = user.height || "--";
      document.getElementById("user-goal").textContent = user.goal || "--";
    // Show modal if profile not complete
    if (!user.profile_completed) {
      console.log("🟨 Profile incomplete — showing modal");
      const modal = document.getElementById("profileModal");
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    } else {
      console.log("✅ Profile already completed");
    }

  } catch (error) {
    console.error("🔥 Fetch user error:", error);
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "login.html";
  }
});


// Handle profile modal form submit
const profileForm = document.getElementById('ProfileForm');
if (profileForm) {
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Session expired. Please log in again.");
      window.location.href = "login.html";
      return;
    }

    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const goal = document.getElementById('goal').value;
    const foods = document.getElementById('preferredFoods').value
      .split(',')
      .map(item => item.trim());

    const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

    console.log("📤 Submitting profile update with:", {
      age, height, weight, goal, foods, bmi
    });

    try {
      const response = await fetch("http://54.172.194.226:8000/api/v1/user/me", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age,
          height,
          weight,
          goal,
          foods,
          bmi,
          profile_completed: true
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Profile update failed");
      }

      const result = await response.json();
      console.log("✅ Profile update success:", result);
      alert("Profile updated successfully!");
      location.reload();

    } catch (error) {
      console.error("❌ Profile update error:", error);
      alert("Failed to update profile: " + error.message);
    }
  });
}

// Toggle dropdown menu
document.getElementById("menu-button").addEventListener("click", () => {
  const dropdown = document.getElementById("dropdownMenu");
  dropdown.classList.toggle("hidden");
});

// Signout helper (optional)
function signOutUser() {
  console.log("🚪 Signing out...");
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

document.getElementById('updateProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const age = document.getElementById('updateAge').value;
    const weight = document.getElementById('updateWeight').value;
    const height = document.getElementById('updateHeight').value;
    const goal = document.getElementById('updateGoal').value;

    const token = localStorage.getItem('token');
    if (!token) return alert('You are not logged in');

    try {
      const res = await fetch('http://54.172.194.226:8000/api/v1/user/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ age, weight, height, goal }),
      });

      if (!res.ok) throw new Error('Update failed');

      alert('Profile updated successfully');
      window.location.reload(); // Reload to reflect new values in the dashboard
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  });

 // dashboard.js

// Fetch Recommendations and display as a scrollable carousel
async function fetchRecommendations(token) {
  try {
    const res = await fetch('http://54.172.194.226:8000/api/v1/meal-plans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();
    console.log("🥗 AI Recommendations:", data);
    displayRecommendations(data);
  } catch (err) {
    console.error('Failed to fetch recommendations:', err);
  }
}

// Display Recommendations as a Carousel
function displayRecommendations(data) {
  const container = document.getElementById('recommendations');
  container.innerHTML = ''; // Clear existing content

  const scrollWrapper = document.createElement('div');
  scrollWrapper.className = 'flex space-x-4 overflow-x-auto p-4 scrollbar-hide';

  Object.entries(data).forEach(([day, meals]) => {
    const card = document.createElement('div');
    card.className = 'min-w-[250px] bg-white rounded-xl shadow p-4 flex-shrink-0 border border-gray-200';

    card.innerHTML = `
      <h3 class="text-lg font-bold text-blue-600 mb-2">${day}</h3>
      <ul class="text-sm text-gray-700 space-y-1">
        <li><strong>Breakfast:</strong> ${meals.breakfast}</li>
        <li><strong>Lunch:</strong> ${meals.lunch}</li>
        <li><strong>Dinner:</strong> ${meals.dinner}</li>
      </ul>
    `;

    scrollWrapper.appendChild(card);
  });

  container.appendChild(scrollWrapper);
}

// Call it on page load if token exists
const token = localStorage.getItem('token');
if (token) {
  fetchRecommendations(token);
}