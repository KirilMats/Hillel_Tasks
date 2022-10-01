const toggleTextColor = function() {
    const _text = document.querySelector('.js--text');
    const _button = document.querySelector('.js--button');

    const buttonHandler = function() {
        const textClasses = _text.classList;
        textClasses.toggle('red');
        textClasses.contains('red') ? this.innerHTML = 'Change to Green' : this.innerHTML = 'Change to Red';
    }

    _button.addEventListener('click', buttonHandler);
}

toggleTextColor();