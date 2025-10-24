document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');
  const loginForm = document.getElementById('loginForm');

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
});

function handleRegister(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre')?.value.trim();
  const apellido = document.getElementById('apellido')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const confirmPassword = document.getElementById('confirmPassword')?.value;
  const terminos = document.getElementById('terminos')?.checked;
  const feedback = document.getElementById('feedbackMessage');

  if (feedback) {
    feedback.style.display = 'none';
    feedback.className = '';
    feedback.innerHTML = '';
  }

  if (!nombre || !apellido || !email || !password || !confirmPassword) {
    showFeedback('Por favor, completa todos los campos.', 'danger', feedback);
    return;
  }

  if (password !== confirmPassword) {
    showFeedback('Las contraseñas no coinciden.', 'danger', feedback);
    return;
  }

  if (!terminos) {
    showFeedback('Debes aceptar los términos y condiciones.', 'danger', feedback);
    return;
  }

  localStorage.setItem('registeredUser', JSON.stringify({
    nombre,
    apellido,
    email,
    password
  }));

  showFeedback('¡Registro exitoso! Redirigiendo...', 'success', feedback);
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 2000);
}

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById('email')?.value.trim();
  const password = document.getElementById('password')?.value;
  const feedback = document.getElementById('feedbackMessage');

  if (feedback) {
    feedback.style.display = 'none';
    feedback.className = '';
    feedback.innerHTML = '';
  }

  const userJSON = localStorage.getItem('registeredUser');
  let loginSuccess = false;

  if (userJSON) {
    try {
      const user = JSON.parse(userJSON);
      if (user.email === email && user.password === password) {
        loginSuccess = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', user.nombre);
      }
    } catch (err) {
      console.error('Error al leer usuario');
    }
  }

  if (loginSuccess) {
    showFeedback('¡Inicio de sesión exitoso! Redirigiendo...', 'success', feedback);
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
  } else {
    showFeedback('Credenciales incorrectas. Inténtalo de nuevo.', 'danger', feedback);
  }
}

function showFeedback(message, type, container) {
  if (!container) return;

  const bgColor = type === 'success' ? '#d1ecf1' : '#f8d7da';
  const textColor = type === 'success' ? '#0c5460' : '#721c24';
  const borderColor = type === 'success' ? '#bee5eb' : '#f5c6cb';

  container.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="
      background-color: ${bgColor};
      color: ${textColor};
      border-color: ${borderColor};
      padding: 0.75rem 1rem;
      font-size: 0.95rem;
    ">
      <strong>${type === 'danger' ? 'Error:' : '¡Éxito!'}</strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
  container.style.display = 'block';
}