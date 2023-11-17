function uploadFile() {
    const form = document.getElementById('uploadForm');
    const formData = new FormData(form);
  
    fetch('http://localhost:8000/api/users/documents/', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('response').innerHTML = data.message;
      })
      .catch(error => {
        console.error('Error:', error);
        document.getElementById('response').innerHTML = 'Error al subir el archivo.';
      });
  }
  