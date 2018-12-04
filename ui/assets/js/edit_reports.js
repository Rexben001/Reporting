
document.getElementById('edit').addEventListener('click', () => {
    const popup = document.getElementById('popup');
    // let popStyle = popup.style.display;

    if(popup.style.display == 'block'){
        popup.style.display = 'none';
    }else{
        popup.style.display = 'block';
    }
    console.log('working')
})