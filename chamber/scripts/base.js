// Responsive main menu
const hamButton = document.querySelector('#menu');
const navigationSmall = document.querySelector('#navigation-small');

hamButton.addEventListener('click', () => {
	navigationSmall.classList.toggle('open');
	hamButton.classList.toggle('open');
});


