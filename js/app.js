// hide preloader
// all the images scripts links have finished loading

// window event listener
function eventListener() {
    // after window loading
    const ui = new UI();
    window.addEventListener('load', function(e) {
        ui.hidePreloader();
    });

    // nav btn
    document.querySelector('.navBtn').addEventListener('click', function() {
        ui.showNav();
    });

    // control the video
    document.querySelector('.video__switch').addEventListener('click', function(e) {
        ui.videoControls();
    });

    // submit the form
    document.querySelector('.drink-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.querySelector('.input-name').value;
        const lastname = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastname, email);

        if (value) {
            const customer = new Customer(name, lastname, email);
            ui.addCustomer(customer);
            ui.showFeedback('You added to the list', 'success');
            ui.clearField();
        } else {
            ui.showFeedback('Some form values missing', 'error');
        }
    });

    // display modal
    const links = document.querySelectorAll('.work-item__icon');
    links.forEach(function (link) {
       link.addEventListener('click', function (event) {
           ui.showModal(event);
       });
    });

    // close modal
    document.querySelector('.work-modal__close').addEventListener('click', function(event) {
        ui.closeModal();
    });
}

eventListener();

// constructor function
function UI() {

}

// hide preloader
UI.prototype.hidePreloader = function () {
    document.querySelector('.preloader').style.display = 'none';
};

// show Nav
UI.prototype.showNav = function() {
    document.querySelector('.nav').classList.toggle('nav__show');
};

// control video

// play/pause video
UI.prototype.videoControls = function () {
    let btn = document.querySelector('.video__switch-btn');
    let videoPlayer = document.querySelector('.video__item');
    if (btn.classList.contains('btnSlide')) {
        btn.classList.remove('btnSlide');
        videoPlayer.play();
    } else {
        btn.classList.add('btnSlide');
        videoPlayer.pause();
    }
};

// check empty
UI.prototype.checkEmpty = function (name, lastname, email) {
    let result;
    if (name === '' || lastname === '' || email === '') {
        result = false;
    } else {
        result = true;
    }
    return result;
};

UI.prototype.showFeedback = function(text, type) {
    const feedback = document.querySelector('.drink-form__feedback');

    if (type === 'success') {
      feedback.classList.add('success');
      feedback.innerText = text;
      this.removeAlert('success');
    } else if(type === 'error') {
      feedback.classList.add('error');
      feedback.innerText = text;
      this.removeAlert('error');
    }
};

// remove alert
UI.prototype.removeAlert = function(type) {
    setTimeout(function () {
        document.querySelector('.drink-form__feedback').classList.remove(type);
    }, 3000)
};

// add customer
UI.prototype.addCustomer = function (customer) {
    const images = [1, 2, 3, 4, 5];
    let random = Math.floor(Math.random()*images.length);
    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `
        <img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
        <h4 class="person__name">${customer.name}</h4>
        <h4 class="person__last-name">${customer.lastname}</h4>
    `;
    document.querySelector('.drink-card__list').appendChild(div);

};

// clear field
UI.prototype.clearField = function () {
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
};

// show modal
UI.prototype.showModal = function(event) {
    event.preventDefault();
    if(event.target.parentElement.classList.contains('work-item__icon')) {
       let id = event.target.parentElement.dataset.id;

       const modal = document.querySelector('.work-modal');
       const modalItem = document.querySelector('.work-modal__item');

       modal.classList.add('work-modal__show');
       modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;
    } else {

    }
};

UI.prototype.closeModal = function() {
   document.querySelector('.work-modal').classList.remove('work-modal__show');
};


// customer constructor
function Customer(name, lastname, email) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
}


