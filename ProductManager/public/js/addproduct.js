document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const codeInput = document.getElementById('code');
    const priceInput = document.getElementById('price');
    const stockInput = document.getElementById('stock');
    const categoryInput = document.getElementById('category');
    const statusInput = document.getElementById('status');
    const thumbnailsInput = document.getElementById('thumbnails');

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = titleInput.value;
        const description = descriptionInput.value;
        const code = codeInput.value;
        const price = parseFloat(priceInput.value); 
        const stock = parseInt(stockInput.value); 
        const category = categoryInput.value;
        const status = statusInput.value;
        const thumbnails = thumbnailsInput.files;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('code', code);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category', category);
        formData.append('status', status);
        for (let i = 0; i < thumbnails.length; i++) {
            formData.append('thumbnails', thumbnails[i]);
        }

        //POST al servidor
        fetch('/api/products', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            // Cambiar a logger
            if (data.success) {
                console.log('Producto creado con éxito');
            } else {
                console.error('Error al crear el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
