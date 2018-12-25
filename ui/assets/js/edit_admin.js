function editStatus(edit, popup) {
  edit.addEventListener('click', () => {
    const overlay = document.getElementById('overlay-pop');
    const locs = document.getElementById('loc');
    const stat = document.getElementById('status');
    const location = document.getElementById('location');
    const statuses = document.getElementById('statuses');


    const loc = locs.innerText;
    const status = stat.innerText;

    if (popup.style.display == 'block') {
      popup.style.display = 'none';
      overlay.className = 'overlay-pops';
    } else {
      popup.style.display = 'block';
      overlay.className = 'overlay-popup';
      location.value = loc;
      statuses.value = status;
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const overlay = document.getElementById('overlay-pop');
    const locs = document.getElementById('loc');
    const stat = document.getElementById('status');

    const location = document.getElementById('location');
    const statuses = document.getElementById('statuses');


    popup.style.display = 'none';
    overlay.className = 'overlay-pops';
    locs.innerHTML = location.value;
    stat.innerHTML = statuses.value;
  });
}

const edit = document.getElementById('editAdmin');
const popup = document.getElementById('popAdmin');
editStatus(edit, popup);
