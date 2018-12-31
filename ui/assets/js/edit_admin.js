

fetch('/api/v1/reports/')
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    // Create and append the li's to the ul
    data.message.forEach(element => {
      const realDate = element.time.split('T')[0];
      document.getElementById('tt').innerHTML += `<tr><td>${element.id}</td><td>${element.name}</td><td>${realDate}</td><td>${element.latitude + ', ' + element.longitude}</span><br><a href="#" id="editLo">Edit</a></td><td><span id="status">${element.status}</span><br><a href="#" id="edit">Edit</a></td>
               <td><button class="delete" id="del">Delete</button></td></tr>`
    });
  });


function editLocation(e) {
  e.preventDefault();
  const loc = document.getElementById('loc').innerHTML;
  const storeLoc = loc.split(',');
  const lats = storeLoc[0].trim();
  const logs = storeLoc[1].trim();

  const lat = document.getElementById('lat').value = lats;
  const log = document.getElementById('log').value = logs;

  const formData = {
    latitude: lat,
    longitude: log
  };

  fetch('/api/v1/reports/1/edit', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(formData), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

document.getElementById('saveLoc').addEventListener('submit', editLocation);

function editStatus(e) {
  e.preventDefault();

  const formData = {
    status: document.getElementById('statuses'),
  };

  fetch('/api/v1/reports/1/edit', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(formData), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

document.getElementById('save').addEventListener('submit', editStatus);

function deleteForm(e) {
  e.preventDefault();

  const formData = {
    status: 'Rejected',
  };

  fetch('/api/v1/reports/1/cancel', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(formData), // data can be `string` or {object}!
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
}

document.getElementById('del').addEventListener('submit', deleteForm);

document.getElementById('edit').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay-pop');
  const stat = document.getElementById('status');
  const statuses = document.getElementById('statuses');

  const status = stat.innerText;

  if (popup.style.display === 'block') {
    popup.style.display = 'none';
    overlay.className = 'overlay-pops';
  } else {
    popup.style.display = 'block';
    overlay.className = 'overlay-popup';
    // location.value = loc;
    statuses.value = status;
  }
});

document.getElementById('save').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay-pop');
  const stat = document.getElementById('status');

  const statuses = document.getElementById('statuses');

  popup.style.display = 'none';
  overlay.className = 'overlay-pops';
  stat.innerHTML = statuses.value;
});

document.getElementById('editLo').addEventListener('click', () => {
  const popup = document.getElementById('popupLoc');
  const overlay = document.getElementById('overlay-pop');
  const locs = document.getElementById('loc');
  const lat = document.getElementById('lat');
  const log = document.getElementById('log');


  const loc = locs.innerText;
  const storeLoc = loc.split(',');
  const lats = storeLoc[0].trim();
  const logs = storeLoc[1].trim();

  if (popup.style.display === 'block') {
    popup.style.display = 'none';
    overlay.className = 'overlay-pops';
  } else {
    popup.style.display = 'block';
    overlay.className = 'overlay-popup';
    lat.value = lats;
    log.value = logs;
  }
});

document.getElementById('saveLoc').addEventListener('click', () => {
  const popup = document.getElementById('popupLoc');
  const overlay = document.getElementById('overlay-pop');
  const locs = document.getElementById('loc');

  const lat = document.getElementById('lat');
  const log = document.getElementById('log');


  popup.style.display = 'none';
  overlay.className = 'overlay-pops';
  locs.innerHTML = lat.value + ', ' + log.value;
});
