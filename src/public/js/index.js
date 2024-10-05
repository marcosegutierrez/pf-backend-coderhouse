const socketClient = io();

const productsDiv = document.getElementById('products');
const hbsProducts = document.getElementById('hbsProducts');

socketClient.on('newProduct', (newProduct)=>{
    let newProducts = `<ul>
            <li>${newProduct.id}</li>
            <li>${newProduct.title}</li>
            <li>${newProduct.description}</li>
            <li>${newProduct.code}</li>
            <li>${newProduct.price}</li>
            <li>${newProduct.status}</li>
            <li>${newProduct.stock}</li>
            <li>${newProduct.category}</li>
            <li>${newProduct.thumbnails}</li>
        </ul>`;
    products.innerHTML += newProducts;
})

socketClient.on('deleteProduct', (products) => {
    let newProducts = '';
    products.forEach(newProduct => {
        newProducts += `<ul>
            <li>${newProduct.id}</li>
            <li>${newProduct.title}</li>
            <li>${newProduct.description}</li>
            <li>${newProduct.code}</li>
            <li>${newProduct.price}</li>
            <li>${newProduct.status}</li>
            <li>${newProduct.stock}</li>
            <li>${newProduct.category}</li>
            <li>${newProduct.thumbnails}</li>
        </ul>`
    });

    productsDiv.innerHTML = newProducts;
    hbsProducts.innerHTML = "";
})

//--- CHAT HANDLEBARS ---//

let username = null;

if(!username) {
    Swal.fire({
      title: "¡Welcome to chat!",
      input: "Insert your username:",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Your username is required";
        }
      }
    }).then((input) => {
        username = input.value;
        socketClient.emit('newUser', username);
    })
}

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', ()=>{
    socketClient.emit('chat:message', {
        username,
        message: message.value
    })
    message.value = '';
})

socketClient.on('messages', (data)=>{
    actions.innerHTML = ''
    const chatRender = data.map((msg)=>{
        return `<p><strong>${msg.user}</strong>: ${msg.message}</p>`
    }).join(' ')

    output.innerHTML = chatRender
})

socketClient.on('newUser', (username)=>{
  console.log('username', username)
    Toastify({
        text: `${username} is logged in`,
        duration: 3000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){}
      }).showToast();
})

message.addEventListener('keypress', ()=>{
    socketClient.emit('chat:typing', username)
})

socketClient.on('chat:typing', (data)=>{
    actions.innerHTML = `<p>${data} is writing a message...</p>`
})