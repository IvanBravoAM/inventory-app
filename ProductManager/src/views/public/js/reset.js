document.addEventListener('DOMContentLoaded', function () {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const token = window.location.pathname.split('/').pop();

    resetPasswordForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword !== confirmPassword) {
            console.log('Las contraseñas no coinciden');
        } else {
            fetch(`/login/reset/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newPassword }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('Contraseña restablecida con éxito');
                } else {
                    console.log('Error al restablecer la contraseña');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });
});