
    const profileForm = document.getElementById("ProfileForm");
    const profileModal = document.getElementById("profileModal");

    profileForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const age = document.getElementById("age").value;
      const height = document.getElementById("height").value;
      const weight = document.getElementById("weight").value;
      const goal = document.getElementById("goal").value;

      // Save to localStorage for now (can change to Firebase later)
      console.log(age, height,weight)
      localStorage.setItem("profileData", JSON.stringify({ age, height, weight, goal }));

      // Hide modal
      profileModal.classList.add("hidden");

      alert("Profile saved!");
    });