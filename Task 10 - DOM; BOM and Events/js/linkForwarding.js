const forwardToLink = function () {
    const _addLinkButton = document.querySelector('.link-forwarding__button_add-link');
    const _openLinkButton = document.querySelector('.link-forwarding__button_open-link');
    let href = window.location.href;

    _addLinkButton.addEventListener('click', function getLink() {
        href = prompt('Please enter a link address', 'https://');
    })
    _openLinkButton.addEventListener('click', function openLink() {
        window.open(href, '_self');
    })
}

forwardToLink();
