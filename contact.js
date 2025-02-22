document.querySelectorAll('.overlay-content a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

    // Smooth scrolling and close menu on click
    document.querySelectorAll('.overlay-content a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
        closeNav(); // Close the menu after clicking
      });
    });

    // Function to open the side menu
    function openNav() {
      document.getElementById("myNav").style.width = "100%";
    }

    // Function to close the side menu
    function closeNav() {
      document.getElementById("myNav").style.width = "0%";
    }
 });
 
 