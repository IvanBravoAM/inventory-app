document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const code = document.getElementById('code').value;
        const price = parseFloat(document.getElementById('price').value);
        const stock = parseInt(document.getElementById('stock').value);
        const category = document.getElementById('category').value;
        const status = document.getElementById('status').value;
        const thumbnailsInput = document.getElementById('thumbnails');

        const successIcon = document.getElementById('successIcon');

        // Create an object with the data
        const productData = {
            title,
            description,
            code,
            price,
            stock,
            category,
            status,
            thumbnailsInput
        };

        console.log('product data', productData);

        // POST to the server
        fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Producto creado con éxito');
                successIcon.style.display = 'inline-block';
            } else {
                console.error('Error al crear el producto');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
