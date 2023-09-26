const socket = io();

socket.emit("connection", "new client connection");

// document.getElementById("productForm").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const productCategory = document.getElementById("productCategory").value;
//     const productTitle = document.getElementById("productTitle").value;
//     const productDescription = document.getElementById("productDescription").value;
//     const productPrice = document.getElementById("productPrice").value;
//     const productThumbnail = document.getElementById("productThumbnail").value;
//     const productStock = document.getElementById("productStock").value;
//     const productCode = document.getElementById("productCode").value;

//     socket.emit("addProduct", {
//         category: productCategory,
//         title: productTitle,
//         description: productDescription,
//         price: productPrice,
//         thumbnail: productThumbnail,
//         stock: productStock,
//         code: productCode
//     });
//     document.getElementById("productCategory").value = "";
//     location.reload();
// });


// // Agregar un nuevo producto a la lista
// socket.on("newProductAdded", (newProduct) => {
//     const productList = document.getElementById("productList");
//     const li = document.createElement("li");
//     li.textContent = newProduct;
//     productList.appendChild(li);
// });

// //delete button func
// const btnEliminar = li.querySelector(".btnEliminar");
// btnEliminar.addEventListener("click", () => {
//     deleteProduct(product.id);
// });

// //delete function
// function deleteProduct(productID) {
//     socket.emit("deleteProduct", productID);
// }

//events chat
//scrollToBottom();

const messageForm = document.getElementById('messageForm');
if(messageForm)
{
    messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user = userInput.value;
    const message = messageInput.value;
    if (user && message) {
        const messageObject = { user, message };
        socket.emit('addMessage', messageObject);
        messageInput.value = '';
    }
    });

    socket.on("newMessage", chat => {
        const {user,message} = chat;
        const messageList = document.getElementById('messagesList');
        const li = document.createElement("li");
        const h3 = document.createElement("h3");
        li.textContent = message;
        h3.textContent = user;
        li.classList = "bg-gray-200 max-w-m py-2 px-4 rounded-tl-lg rounded-br-lg";
        h3.classList ="text-left mb-4 mt-2 mr-2 text-sm text-gray-500";
        console.log('asdas'+user+message);
        messageList.appendChild(h3);
        messageList.appendChild(li);
        //scrollToBottom();
    });

    // function scrollToBottom() {
    //     chatMessages.scrollTop = chatMessages.scrollHeight;
    // }
}

///////////////////////////////////LOGIN///////////////////////////////
///////////////////////////////////LOGIN///////////////////////////////
async function postLogin(username, password) {
    const response = await fetch("/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    }).then(response => response.json())
    .then(data => {
        if (data.respuesta === "ok") {
            window.location.href = "/view/products";
        }
    })
    .catch(error => {
        console.error(JSON.stringify(error));
    });
    }
const loginForm = document.getElementById("login-form");
console.log('loginform '+loginForm);

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    postLogin(username, password).then((datos) => console.log(datos));
});
///////////////////////////////////LOGIN///////////////////////////////
///////////////////////////////////LOGIN///////////////////////////////
const cart = document.getElementById("addToCart");
console.log(cart);