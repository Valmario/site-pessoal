const textDisplay = document.getElementById('digitando');
const phrases = [
  'Programador FrontEnd JR',
  'Desenvolvedor Web',
  'Desenvolvedor Full Stack JR',
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  textDisplay.innerHTML = currentPhrase.join('');

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      textDisplay.innerHTML = currentPhrase.join('');
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j]);
      j--;
      textDisplay.innerHTML = currentPhrase.join('');
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }
  const spedUp = Math.random() * 200;
  const normalSpeed = Math.random() * 300;
  const time = isEnd ? 200 : isDeleting ? spedUp : normalSpeed;
  setTimeout(loop, time);
}

loop();

const ativaMenu = document.querySelector('.fa-bars');
const navMenu = document.querySelector('header .navegacao-primaria');

ativaMenu.addEventListener('click', () => {
  ativaMenu.classList.toggle('fa-x');
  navMenu.classList.toggle('ativado');
});

/*FORMULARIO ENVIO PARA EMAIL*/

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute('action');
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError(message) {
    const errorElement = document.createElement('p');
    errorElement.textContent = message;
    this.form.appendChild(errorElement);
  }

  validateName(name) {
    if (/\d/.test(name)) {
      throw new Error('O campo nome não pode conter números.');
    }
  }

  validatePhone(phone) {
    const phoneRegex = /^(\d{10}|\d{11})$/;
    if (!phoneRegex.test(phone)) {
      throw new Error(
        'O campo telefone deve ser preenchido com um número válido (XXXXXXXXXX para celulares ou XXXXXXXXXX para telefones fixos).'
      );
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error(
        'O campo email deve ser preenchido com um endereço de email válido (exemplo: nome@dominio.com).'
      );
    }
  }

  validateMessage(message) {
    if (message.length > 300) {
      throw new Error('O campo mensagem deve ter no máximo 300 caracteres.');
    }
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll('[name]');
    fields.forEach(field => {
      formObject[field.getAttribute('name')] = field.value.trim();
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = 'Enviando...';
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);
      const formObject = this.getFormObject();
      this.validateName(formObject.nome);
      this.validatePhone(formObject.telefone);
      this.validateEmail(formObject.email);
      this.validateMessage(formObject.mensagem);

      await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formObject),
      });

      this.displaySuccess();
    } catch (error) {
      this.displayError(error.message);
      throw new Error(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener('click', this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  success:
    "<h3 class='success'>Mensagem enviada com SUCESSO! <br> Retornarei em breve!</h3>",
  error: "<h3 class='error'>Não foi possível enviar sua mensagem.</h3>",
});
formSubmit.init();
