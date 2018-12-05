
document.getElementById('edit').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay-pop');

    if(popup.style.display == 'block'){
        popup.style.display = 'none';
        overlay.className = 'overlay-pops'

    }else{
        popup.style.display = 'block';
        overlay.className = 'overlay-popup';

    }
    console.log('working')
});

document.getElementById('save').addEventListener('click', () =>{
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay-pop');
    popup.style.display = 'none';
        overlay.className = 'overlay-pops'
})

