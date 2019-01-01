function fetchAPI() {
  fetch('/api/v1/reports/1')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function (data) {
      // Create and append the li's to the ul
      data.message.forEach(element => {
        const realDate = element.time.split('T')[0];
        const id_no = element.id;

        document.getElementById('tt').innerHTML += `<tr><td>${id_no}</td><td>${element.name}</td><td>${realDate}</td><td><span id=${id_no}>${element.latitude + ', ' + element.longitude}</span><textarea id=${id_no}>${element.latitude + ', ' + element.longitude}</textarea><br><a onclick='popedit(${id_no})' id="editLo">Edit</a></td><td><span id=${id_no}>${element.status}</span><textarea id=${id_no}>${element.status}</textarea><br><a onclick="popEditStatus(${id_no})" id="edit">Edit</a></td>
                 <td><button onclick='deleteForm(${id_no})'class="delete" id=${id_no}>Delete</button></td></tr>`;
      });
    });
}
fetchAPI();
function popedit(id) {
  const popup = document.getElementById('popupLoc');
  const overlay = document.getElementById('overlay-pop');
  const locs = document.getElementById(id);
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
}
function popEditStatus(id) {
  const popup = document.getElementById('popup');
  // const overlay = document.getElementById('overlay-pop');
  const stat = document.getElementById(id);
  const statuses = document.getElementById('statuses');
  const edit = document.getElementById('edit');
  const text = document.getElementsByTagName('textarea').id;

  if (edit.value === 'Edit') {
    console.log(text);
  }

  const status = stat.innerText;

  if (popup.style.display === 'block') {
    popup.style.display = 'none';
    // overlay.className = 'overlay-pops';
  } else {
    popup.style.display = 'block';
    // overlay.className = 'overlay-popup';
    statuses.value = status;

  }

}



function editLocation(id) {
  // e.preventDefault();
  const popup = document.getElementById('popupLoc');
  const overlay = document.getElementById('overlay-pop');
  const locs = document.getElementById(id);

  const lat = document.getElementById('lat').value;
  const log = document.getElementById('log').value;


  popup.style.display = 'none';
  overlay.className = 'overlay-pops';
  locs.innerHTML = lat + ', ' + log;

  const formData = {
    latitude: lat,
    longitude: log

  };
  console.log(formData);


  fetch('/api/v1/reports/2/edit', {
    method: 'PATCH',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      if (response) {
        redirect: window.location.replace("../profile.html")
        console.log(response);
      }
    }).catch(error => console.error('Error:', error));
}

// document.getElementById('saveLoc').addEventListener('submit', editLocation());






function deleteForm(id) {

  const formData = {
    status: 'Rejected',
  };

  fetch(`/api/v1/reports/${id}/cancel`, {
    method: 'PATCH',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }

  }).then(res => res.json())
    .then(response => {
      if (response) {
        redirect: window.location.replace("../profile.html")
      }
    }).catch(error => console.error('Error:', error));
}



document.getElementById('save').addEventListener('click', () => {
  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay-pop');
  const stat = document.getElementById('status');

  const statuses = document.getElementById('statuses').value;

  popup.style.display = 'none';
  overlay.className = 'overlay-pops';
  stat.innerHTML = statuses;

  const formData = {
    status: statuses,
  };

  fetch('/api/v1/reports/2/status', {
    method: 'PATCH',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(response => {
      if (response) {
        redirect: window.location.replace("../profile.html")
      }
    })
    .catch(error => console.error('Error:', error));
});



