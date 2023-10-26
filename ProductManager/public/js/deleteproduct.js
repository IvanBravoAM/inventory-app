document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('deleteproduct');
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const code = codeInput.value;

        //POST al servidor
        fetch('/api/products', {
            method: 'POST',
            body: code,
        })
        .then(response => response.json())
        .then(data => {
            // Cambiar a logger
            if (data.success) {
                console.log('Producto eliminado con éxito');
            } else {
                console.error('Error al eliminar el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});