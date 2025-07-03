
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

  const foodData = {
  eba: 250,
  rice: 200,
  beans: 180,
  // Add more
};

let totalCalories = 0;
const foodSelect = document.getElementById('foodSelect');
const quantityInput = document.getElementById('quantityInput');
const addFoodBtn = document.getElementById('addFoodBtn');
const foodLog = document.getElementById('foodLog');
const totalCaloriesText = document.getElementById('totalCalories');

addFoodBtn.addEventListener('click', () => {
  const food = foodSelect.value;
  const qty = parseInt(quantityInput.value);

  if (!food || isNaN(qty) || qty <= 0) return alert('Please select food and enter quantity');

  const foodName = foodSelect.options[foodSelect.selectedIndex].text;
  const calories = foodData[food] * qty;
  totalCalories += calories;

  const listItem = document.createElement('li');
  listItem.textContent = `${qty} x ${foodName} = ${calories} kcal`;
  foodLog.appendChild(listItem);

  totalCaloriesText.textContent = `Total: ${totalCalories} kcal`;

  // Reset input
  foodSelect.value = '';
  quantityInput.value = '';
});

