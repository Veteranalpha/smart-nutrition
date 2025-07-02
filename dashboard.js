
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


  const menuButton = document.getElementById('menu-button');
  const dropdownMenu = document.getElementById('dropdownMenu');

  menuButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('hidden');
  });

  // Optional: Close the dropdown if clicked outside
  document.addEventListener('click', (event) => {
    if (!menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.classList.add('hidden');
    }
  });

