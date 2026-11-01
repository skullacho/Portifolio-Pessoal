/**
 * ===================================================================
 * PORTFÓLIO PEDRO SANTE MARIA BUENO SILVA
 * Interatividade, Animações, Validação e Envio Real de Formulário
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* -----------------------------------------------------------------
   * 1. CONFIGURAÇÃO DO FORMULÁRIO (MECANISMO REAL DE ENVIO)
   * -----------------------------------------------------------------
   * O endpoint abaixo pode ser substituído pelo ID de formulário do Formspree,
   * Formkeep ou Web3Forms do Pedro (ex: https://formspree.io/f/seu-id).
   */
  const FORM_ENDPOINT = 'https://formspree.io/f/xbjnqevl';
  const DIRECT_EMAIL = 'pedrosmbsilva@gmail.com';

  /* -----------------------------------------------------------------
   * 2. SISTEMA DE TEMA (CLARO / ESCURO) COM LOCALSTORAGE
   * ----------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Recupera preferência salva ou detecta preferência do sistema
  const savedTheme = localStorage.getItem('ps-portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  const initialTheme = savedTheme ? savedTheme : (systemPrefersLight ? 'light' : 'dark');
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('ps-portfolio-theme', newTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    }
  }

  /* -----------------------------------------------------------------
   * 3. HEADER FIXO & SCROLL
   * ----------------------------------------------------------------- */
  const header = document.getElementById('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Efeito de blur/sombra no header ao rolar
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Botão Voltar ao Topo
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* -----------------------------------------------------------------
   * 4. MENU MOBILE (HAMBÚRGUER)
   * ----------------------------------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('active');
      toggleMobileMenu(!isOpen);
    });

    // Fechar ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMobileMenu(false);
        }
      });
    });

    // Fechar ao pressionar tecla ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        toggleMobileMenu(false);
      }
    });
  }

  function toggleMobileMenu(open) {
    if (open) {
      navMenu.classList.add('active');
      mobileToggleBtn.classList.add('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('active');
      mobileToggleBtn.classList.remove('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  /* -----------------------------------------------------------------
   * 5. SCROLL SPY (INDICADOR DE SEÇÃO ATIVA NA NAVBAR)
   * ----------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (matchingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          matchingLink.classList.add('active');
        } else {
          matchingLink.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* -----------------------------------------------------------------
   * 6. CANVAS DE PARTÍCULAS / CONSTELAÇÃO NO HERO
   * ----------------------------------------------------------------- */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Posição do cursor do mouse para interação
    const mouse = {
      x: null,
      y: null,
      radius: 120
    };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function initParticles() {
      particles = [];
      const numberOfParticles = Math.floor((width * height) / 16000);
      const purplePalette = ['#A855F7', '#C084FC', '#9333EA', '#D8B4FE', '#E879F9'];

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const speedX = (Math.random() - 0.5) * 0.7;
        const speedY = (Math.random() - 0.5) * 0.7;
        const color = purplePalette[Math.floor(Math.random() * purplePalette.length)];

        particles.push({ x, y, size, speedX, speedY, color });
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      const isLight = htmlRoot.getAttribute('data-theme') === 'light';
      const lineColor = isLight ? 'rgba(126, 34, 206,' : 'rgba(192, 132, 252,';

      // Atualiza e desenha partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;

        // Rebater nas bordas
        if (p.x < 0 || p.x > width) p.speedX = -p.speedX;
        if (p.y < 0 || p.y > height) p.speedY = -p.speedY;

        // Reação ao mouse
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            p.x -= forceDirectionX * force * 2;
            p.y -= forceDirectionY * force * 2;
          }
        }

        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Conectar partículas próximas
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < 110) {
            const opacity = 1 - dist / 110;
            ctx.beginPath();
            ctx.strokeStyle = `${lineColor}${opacity * 0.25})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Debounce no redimensionamento
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
      }, 200);
    });

    // Pausar animação quando a aba estiver inativa
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animateParticles();
      }
    });

    initParticles();
    animateParticles();
  }

  /* -----------------------------------------------------------------
   * 7. SPOTLIGHT HOVER EFFECT NOS CARDS
   * ----------------------------------------------------------------- */
  const spotlightCards = document.querySelectorAll('.spotlight-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* -----------------------------------------------------------------
   * 8. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL)
   * ----------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.card, .section-header, .highlight-item, .skills-wrapper');
  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback caso IntersectionObserver não seja suportado
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  /* -----------------------------------------------------------------
   * 9. FORMULÁRIO DE CONTATO: VALIDAÇÃO RIGOROSA & ENVIO REAL
   * ----------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const charCounter = document.getElementById('char-counter');
  const submitBtn = document.getElementById('submit-btn');
  const feedbackBox = document.getElementById('form-feedback');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackMessage = document.getElementById('feedback-message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');

  // Regex estrito para validação de e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Contador de caracteres para a mensagem
  if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
      const length = messageInput.value.length;
      charCounter.textContent = `${length} / 1000`;
      if (length > 950) {
        charCounter.style.color = '#EF4444';
      } else {
        charCounter.style.color = '';
      }
    });
  }

  // Validação em tempo real ao digitar ou sair do campo
  if (nameInput) {
    nameInput.addEventListener('input', () => validateName(false));
    nameInput.addEventListener('blur', () => validateName(true));
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => validateEmail(false));
    emailInput.addEventListener('blur', () => validateEmail(true));
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => validateMessage(false));
    messageInput.addEventListener('blur', () => validateMessage(true));
  }

  function validateName(showImmediateError = true) {
    const val = nameInput.value.trim();
    if (val.length === 0) {
      if (showImmediateError) {
        setFieldError(nameInput, nameError, 'Por favor, informe seu nome completo.');
      }
      return false;
    }
    if (val.length < 3) {
      if (showImmediateError) {
        setFieldError(nameInput, nameError, 'O nome deve conter pelo menos 3 caracteres.');
      }
      return false;
    }
    clearFieldError(nameInput, nameError);
    return true;
  }

  function validateEmail(showImmediateError = true) {
    const val = emailInput.value.trim();
    if (val.length === 0) {
      if (showImmediateError) {
        setFieldError(emailInput, emailError, 'Por favor, informe seu endereço de e-mail.');
      }
      return false;
    }
    if (!emailRegex.test(val)) {
      if (showImmediateError) {
        setFieldError(emailInput, emailError, 'Digite um e-mail válido (ex: seuemail@exemplo.com).');
      }
      return false;
    }
    clearFieldError(emailInput, emailError);
    return true;
  }

  function validateMessage(showImmediateError = true) {
    const val = messageInput.value.trim();
    if (val.length === 0) {
      if (showImmediateError) {
        setFieldError(messageInput, messageError, 'Por favor, digite sua mensagem.');
      }
      return false;
    }
    if (val.length < 10) {
      if (showImmediateError) {
        setFieldError(messageInput, messageError, 'A mensagem precisa ter pelo menos 10 caracteres.');
      }
      return false;
    }
    clearFieldError(messageInput, messageError);
    return true;
  }

  function setFieldError(input, errorElement, msg) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    if (errorElement) errorElement.textContent = msg;
  }

  function clearFieldError(input, errorElement) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    if (errorElement) errorElement.textContent = '';
  }

  // Envio Real via fetch com fallback inteligente
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Executa validação de todos os campos
      const isNameValid = validateName(true);
      const isEmailValid = validateEmail(true);
      const isMessageValid = validateMessage(true);

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        // Foca no primeiro campo com erro
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isMessageValid) messageInput.focus();
        return;
      }

      // Prepara dados para envio
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        sentAt: new Date().toISOString()
      };

      // Estado de Carregamento
      setLoadingState(true);
      hideFeedback();

      try {
        // Requisição HTTP real para o endpoint de mensagens
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          // Sucesso comprovado pela resposta do servidor
          showFeedback('success', 'Mensagem enviada com sucesso! Obrigado pelo contato, Pedro responderá o mais breve possível.');
          contactForm.reset();
          if (charCounter) charCounter.textContent = '0 / 1000';
          nameInput.classList.remove('valid');
          emailInput.classList.remove('valid');
          messageInput.classList.remove('valid');
        } else {
          // Tratamento autêntico de erro da API
          let errorMsg = 'Não foi possível concluir o envio automatizado pelo servidor.';
          try {
            const data = await response.json();
            if (data && data.errors && data.errors.length > 0) {
              errorMsg = data.errors.map(err => err.message).join(', ');
            }
          } catch (_) {}

          showFeedback('error', `${errorMsg} Você pode enviar diretamente para ${DIRECT_EMAIL}.`, true, formData);
        }
      } catch (networkError) {
        // Em caso de falha de conexão ou restrição de CORS local
        showFeedback(
          'error',
          `Houve uma oscilação na rede ao conectar ao servidor de envio. Clique abaixo para enviar diretamente pelo seu cliente de e-mail.`,
          true,
          formData
        );
      } finally {
        setLoadingState(false);
      }
    });
  }

  function setLoadingState(loading) {
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('.btn-text');

    if (loading) {
      submitBtn.classList.add('loading');
      submitBtn.setAttribute('disabled', 'disabled');
      if (btnText) btnText.textContent = 'Enviando...';
    } else {
      submitBtn.classList.remove('loading');
      submitBtn.removeAttribute('disabled');
      if (btnText) btnText.textContent = 'Enviar mensagem';
    }
  }

  function showFeedback(type, message, showMailFallback = false, data = null) {
    if (!feedbackBox) return;

    feedbackBox.hidden = false;
    feedbackBox.className = `form-feedback ${type}`;

    let html = `<span>${message}</span>`;

    if (showMailFallback && data) {
      const subject = encodeURIComponent(`Contato pelo Portfólio de ${data.name}`);
      const body = encodeURIComponent(`Nome: ${data.name}\nE-mail: ${data.email}\n\nMensagem:\n${data.message}`);
      const mailtoUrl = `mailto:${DIRECT_EMAIL}?subject=${subject}&body=${body}`;

      html += `<div style="margin-top: 10px;">
        <a href="${mailtoUrl}" class="btn btn-primary btn-sm" style="display: inline-flex; margin-top: 6px;">
          Abrir no meu aplicativo de e-mail
        </a>
      </div>`;
    }

    feedbackMessage.innerHTML = html;
    feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideFeedback() {
    if (feedbackBox) {
      feedbackBox.hidden = true;
      feedbackBox.className = 'form-feedback';
      feedbackMessage.innerHTML = '';
    }
  }

  /* -----------------------------------------------------------------
   * 10. MODAL INFORMATIVO (GITHUB DE PROJETOS)
   * ----------------------------------------------------------------- */
  const githubButtons = document.querySelectorAll('.github-notice-btn');
  const githubModal = document.getElementById('github-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalOkBtn = document.getElementById('modal-ok');
  const modalProjectText = document.getElementById('modal-project-text');

  if (githubButtons.length && githubModal) {
    githubButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectName = btn.getAttribute('data-project') || 'este projeto';
        if (modalProjectText) {
          modalProjectText.innerHTML = `O repositório do projeto <strong>${projectName}</strong> é mantido por Pedro Sante. Caso o código esteja privado para avaliação do TCC ou em fase de documentação final, solicite acesso imediato através dos canais de contato.`;
        }
        if (typeof githubModal.showModal === 'function') {
          githubModal.showModal();
        } else {
          // Fallback para navegadores sem dialog nativo
          githubModal.setAttribute('open', '');
        }
      });
    });

    const closeModal = () => {
      if (typeof githubModal.close === 'function') {
        githubModal.close();
      } else {
        githubModal.removeAttribute('open');
      }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

    // Fechar ao clicar fora do card
    githubModal.addEventListener('click', (e) => {
      if (e.target === githubModal) {
        closeModal();
      }
    });

    const modalContactBtn = githubModal.querySelector('.modal-contact-btn');
    if (modalContactBtn) {
      modalContactBtn.addEventListener('click', () => {
        closeModal();
      });
    }
  }

  /* -----------------------------------------------------------------
   * 11. LOG DE INICIALIZAÇÃO AMIGÁVEL NO CONSOLE
   * ----------------------------------------------------------------- */
  console.log(
    '%c Pedro Sante %c Portfólio Inicializado com Sucesso! ',
    'background: #9333EA; color: #fff; padding: 4px 8px; border-radius: 4px 0 0 4px; font-weight: bold;',
    'background: #C084FC; color: #0D0714; padding: 4px 8px; border-radius: 0 4px 4px 0; font-weight: bold;'
  );
});
