
//Check if the className includes "responsive"
//If false, add it
document.getElementById('fa-bars').addEventListener('click', () =>{
let menu = document.getElementById('navbar');

if(menu.className === 'bar'){
    menu.className += ' responsive';
}else{
    menu.className = 'bar'  
}

console.log('working')
})