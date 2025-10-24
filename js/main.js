
function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authContainer = document.querySelector('.auth-buttons');

  if (!authContainer) return;

  if (isLoggedIn) {
    const userName = localStorage.getItem('userName') || 'Usuario';
    authContainer.innerHTML = `
      <span class="user-greeting me-3 text-black align-self-center">Hola, ${userName}</span>
      <a href="cartelera.html" class="btn btn-success display-4">Comprar Entrada</a>
      <a href="index.html" class="btn btn-outline-secondary display-4 ms-2" onclick="logout(event)">Cerrar Sesión</a>
    `;
  }
}

function logout(e) {
  e.preventDefault();
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('userName');
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
  checkAuth();
  document.querySelectorAll('.buy-ticket').forEach(button => {
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
          alert.textContent = 'Debes iniciar sesión para comprar entradas.';
          alert.style.display = 'block';
          setTimeout(() => {
            alert.style.display = 'none';
          }, 4000);
        }
      }
    });
  });

  if (window.location.pathname.endsWith('comprar.html')) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      alert('Debes iniciar sesión para acceder a esta página.');
      window.location.href = 'login.html';
    }
  }
});