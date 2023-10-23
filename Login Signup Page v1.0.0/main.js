var password = document.getElementById('Password');
var toggler = document.getElementById('toggler');
var eyeIcon = document.querySelector('.uil-eye-slash');
showHidePassword = () => {
if (password.type == 'password') {
password.setAttribute('type', 'text');
toggler.classList.replace('uil-eye-slash', 'uil-eye');
} else {
toggler.classList.replace('uil-eye', 'uil-eye-slash');
// toggler.classList.remove('fa-eye-slash');
password.setAttribute('type', 'password');
}
};
toggler.addEventListener('click', showHidePassword);