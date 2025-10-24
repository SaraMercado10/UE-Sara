document.getElementById('contactForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const suggestion = document.getElementById('suggestion').value.trim();
      const successMessage = document.getElementById('successMessage');
      if (!suggestion) return;
      successMessage.style.display = 'block';
      let suggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
      suggestions.push({
        text: suggestion,
        date: new Date().toLocaleString()
      });
      localStorage.setItem('suggestions', JSON.stringify(suggestions));
      this.reset();
      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    });