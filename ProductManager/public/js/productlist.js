document.addEventListener('click', function (event) {
    const prdForm = document.getElementById('delete-product-form');
    console.log('prdd ', prdForm);

    if (event.target.closest('.delete-product-btn') && prdForm) {
        event.preventDefault();

        const productId = event.target.closest('.delete-product-btn').getAttribute('data-product-id');

        fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al eliminar el producto: ${response.status}`);
            }
            console.log('Producto eliminado con éxito');
            location.reload(true);
            return response.json();
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
    }
});
