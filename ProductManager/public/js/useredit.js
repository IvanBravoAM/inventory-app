document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('deleteproduct');
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userId = document.querySelector(`[name="role"]:checked`).value;
        const selectedRole = document.querySelector(`[name="id"]`).value;


        fetch(`/user/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ role: selectedRole }),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(response => {
            // handle
        });
    });
});