document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.addToCartBtn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Access the data attributes using dataset
            const cartId = document.getElementById('user-id-input').value;
            const productId = button.dataset.productId;

            // Your logic to handle the Add to Cart action
            console.log('Add to Cart clicked. Cart ID:', cartId, 'Product ID:', productId);

        // Send a POST request to the endpoint
        fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any additional headers if needed
            },
            // Add any request body if needed
            // body: JSON.stringify({ /* your request body */ }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response as needed
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
});