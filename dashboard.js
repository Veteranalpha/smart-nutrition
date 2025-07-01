document.getElementById('profileModal').classList.remove("hidden");

function toggleDropdown() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('hidden');
  }

  function signOutUser() {
    // Firebase or custom sign-out logic
    alert("Signed out!");
    window.location.href = "index.html";
  }