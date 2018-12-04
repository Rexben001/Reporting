
document.getElementById('edit').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay-pop');

    if(popup.style.display == 'block'){
        popup.style.display = 'none';
        overlay.blur();

    }else{
        popup.style.display = 'block';

    }
    console.log('working')
    overlay.blur();
    console.log(overlay.blur())
})