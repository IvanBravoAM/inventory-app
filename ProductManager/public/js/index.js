const socket = io();

socket.emit("connection", "new client connection");

document.getElementById("productForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const productCategory = document.getElementById("productCategory").value;
    const productTitle = document.getElementById("productTitle").value;
    const productDescription = document.getElementById("productDescription").value;
    const productPrice = document.getElementById("productPrice").value;
    const productThumbnail = document.getElementById("productThumbnail").value;
    const productStock = document.getElementById("productStock").value;
    const productCode = document.getElementById("productCode").value;

    socket.emit("addProduct", {
        category: productCategory,
        title: productTitle,
        description: productDescription,
        price: productPrice,
        thumbnail: productThumbnail,
        stock: productStock,
        code: productCode
    });
    document.getElementById("productCategory").value = "";
    location.reload();
});


// Agregar un nuevo producto a la lista
socket.on("newProductAdded", (newProduct) => {
    const productList = document.getElementById("productList");
    const li = document.createElement("li");
    li.textContent = newProduct;
    productList.appendChild(li);
});

//delete button func
const btnEliminar = li.querySelector(".btnEliminar");
btnEliminar.addEventListener("click", () => {
    deleteProduct(product.id);
});

//delete function
function deleteProduct(productID) {
    socket.emit("deleteProduct", productID);
}
