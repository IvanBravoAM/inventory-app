document.addEventListener('DOMContentLoaded', function () {
    const productForm = document.getElementById('roleChangeForm');
    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userId = document.getElementById('user-id-input').value;
        const selectedRole = document.querySelector(`[name="role"]:checked`).value;;


        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify({ role: selectedRole }),
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(response => {
            // handle
        });
    });

    const deleteForm = document.getElementById('userDeleteForm');
    deleteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const userId = document.getElementById('user-id-del').value;


        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            }
        }).then(response => {
            // handle
        });
    });
});