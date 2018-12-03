let quotes = document.getElementById('quotes');
let q1 = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis ipsum quisquam amet minima. Iusto alias dolor incidunt possimus veritatis accusamus! Saepe accusamus possimus vel reprehenderit sunt obcaecati sit iusto officiis voluptates id, quaerat ipsum autem eius fugit, animi fuga beatae!";
let q2 = "adipisicing elit. Omnis ipsum quisquam amet minima. Iusto alias dolor incidunt possimus veritatis accusamus! Saepe accusamus possimus vel reprehenderit sunt obcaecati sit iusto officiis voluptates id, quaerat ipsum autem eius fugit, animi fuga beatae!"
let q3 = "Iusto alias dolor incidunt possimus veritatis accusamus! Saepe accusamus possimus vel reprehenderit sunt obcaecati sit iusto officiis voluptates id, quaerat ipsum autem eius fugit, animi fuga beatae!"
const arr = [q1, q2, q3];
const rand =arr[Math.floor(Math.random() *arr.length)];

setInterval(() => {
    quotes.innerHTML = arr[Math.floor(Math.random() *arr.length)];
}, 10000);
