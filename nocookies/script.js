function showCookiePopup() {
    const popup = document.createElement('div');
    popup.id = 'cookie-popup';
    document.body.appendChild(popup);
}

window.onload = showCookiePopup;

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('cookie-popup');
    const okButton = document.getElementById('ok-button');
    const modeSwitch = document.getElementById('mode-switch');

    okButton.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    modeSwitch.addEventListener('change', function() {
        document.body.classList.toggle('dark-mode');
    });
});