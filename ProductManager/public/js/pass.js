document.addEventListener('DOMContentLoaded', function () {
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');

    forgotPasswordForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value;

        //POST al servidor
        fetch('/login/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = "/";

                } else {
                
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

