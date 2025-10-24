document.addEventListener('DOMContentLoaded', function () {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    alert('Debes iniciar sesión para comprar entradas.');
    window.location.href = 'login.html';
    return;
  }

  const obra = sessionStorage.getItem('selectedObra') || 'Obra no especificada';
  document.getElementById('obraSeleccionada').value = obra;

  const form = document.getElementById('purchaseForm');
  const successMessage = document.getElementById('successMessage');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const cantidad = document.getElementById('cantidad').value;
      const pago = document.getElementById('pago').value;

      if (!cantidad || !pago) {
        alert('Por favor completa todos los campos.');
        return;
      }
      successMessage.style.display = 'block';
      sessionStorage.removeItem('selectedObra');
      const compra = {
        obra,
        cantidad,
        pago,
        fecha: new Date().toLocaleString()
      };
      let historial = JSON.parse(localStorage.getItem('historialCompras') || '[]');
      historial.push(compra);
      localStorage.setItem('historialCompras', JSON.stringify(historial));
      setTimeout(() => {
        window.location.href = 'cartelera.html';
      }, 3000);
    });
  }
});