function toggleDarkMode() {
    var body = document.body;
    var button = document.getElementById("dark-mode-button");
  
    body.classList.toggle("dark-mode");
  
    if (body.classList.contains("dark-mode")) {
      button.innerHTML = "Light Mode";
    } else {
      button.innerHTML = "Dark Mode";
    }
  }
  