document.addEventListener('DOMContentLoaded', function () {
    const cartForm = document.getElementById('cartForm');

    cartForm.addEventListener('submit', function (e) {
        e.preventDefault();

    const cartid = document.getElementById('btnCheck').dataset.cartid;
    const postData = {cid : cartid};
    console.log(postData);
      
      fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if needed
        },
        body: JSON.stringify(postData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          let ticketButton = document.getElementById('ticketButton');
          ticketButton.style.display = 'block';
          ticketButton.href=`/view/checkout/${data.data.code}`;
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors
        });
    });
});  