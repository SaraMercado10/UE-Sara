// auth.js - Simulación básica de autenticación con localStorage

function checkAuth() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authButtons = document.querySelector('.auth-buttons');
  const userGreeting = document.querySelector('.user-greeting');

  if (isLoggedIn && authButtons) {
    const userName = localStorage.getItem('userName') || 'Usuario';
    authButtons.innerHTML = `
      <span class="user-greeting">Hola, ${userName}</span>
      <a href="comprar.html" class="btn-primary">Comprar Entrada</a>
      <a href="#" class="btn-outline" onclick="logout()">Cerrar Sesión</a>
    `;
  }
}

function logout() {
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('userName');
  window.location.href = 'index.html';
}

// Ejecutar al cargar cualquier página
document.addEventListener('DOMContentLoaded', checkAuth);