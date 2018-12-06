
document.getElementById('edit').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const popupss = document.getElementById('popAdmin');
    const overlay = document.getElementById('overlay-pop');
    const locs = document.getElementById('loc');
    const stat = document.getElementById('status');
    const location = document.getElementById('location');
    const statuses = document.getElementById('statuses');

    // console.log(popupss);

    const loc = locs.innerText;
    const status = stat.innerText;

    //Split the value of Status to remove Edit from the text
    // let sta = status.split('E');
    // let statusValue = sta[0];


    if (popup.style.display == 'block' || popup.style.display == 'block') {
        popup.style.display = 'none';
        // popups.style.display = 'none';
        overlay.className = 'overlay-pops';


    } else {
        popup.style.display = 'block';
        // popups.style.display = 'block';
        overlay.className = 'overlay-popup';
        location.value = loc;
        statuses.value = status;


    }
console.log(popup, popups)
});

document.getElementById('save').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const popups = document.getElementById('popAdmin');
    const overlay = document.getElementById('overlay-pop');
    const locs = document.getElementById('loc');
    const stat = document.getElementById('status');
    
    const location = document.getElementById('location');
    const statuses = document.getElementById('statuses');


    popup.style.display = 'none';
    // popups.style.display = 'none';
    overlay.className = 'overlay-pops';
    locs.innerHTML = location.value;
    stat.innerHTML = statuses.value;

})

