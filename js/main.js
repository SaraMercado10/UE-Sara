function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authContainer = document.querySelector('.auth-buttons');

  if (!authContainer) return;

  if (isLoggedIn) {
    const userName = localStorage.getItem('userName') || 'Usuario';
    authContainer.innerHTML = `
      <span class="user-greeting me-3 text-black align-self-center">Hola, ${userName}</span>
      <a href="comprar.html" class="btn btn-success display-4">Comprar Entrada</a>
      <a href="#" class="btn btn-outline-secondary display-4 ms-2" onclick="logout(event)">Cerrar Sesión</a>
    `;
  }
}

function logout(e) {
  e.preventDefault();
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('userName');
  window.location.reload();
}

document.addEventListener('DOMContentLoaded', checkAuth);