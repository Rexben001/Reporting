
// Check if the className includes "responsive"
// If false, add it
document.getElementById('fa-bars').addEventListener('click', () => {
  const menu = document.getElementById('navbar');

  if (menu.className === 'bar') {
    menu.className += ' responsive';
  } else {
    menu.className = 'bar';
  }
});
