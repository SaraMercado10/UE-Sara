document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.select-function').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const obraTitle = this.getAttribute('data-title');
      const alertId = 'alert-' + obraTitle
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9-]/g, '');

      const alert = document.getElementById(alertId);

      if (isLoggedIn) {
        sessionStorage.setItem('selectedObra', obraTitle);
        window.location.href = 'comprar.html';
      } else {
        if (alert) {
          alert.textContent = 'Debes iniciar sesión para seleccionar una función.';
          alert.style.display = 'block';
          setTimeout(() => {
            alert.style.display = 'none';
          }, 4000);
        }
      }
    });
  });
});