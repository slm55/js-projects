const button = document.querySelector('#login-btn');

//frontend
button.addEventListener('click', (e) => {
    const email = document.querySelector('#email-input');
    const password = document.querySelector('#pswd-input');
    const user = { email: email.value, password: password.value };
    const userJson = JSON.stringify(user);
    if (backend(userJson)) {
        window.location.href = 'index.html';
    } else {
        email.value = '';
        password.value = ''
    }
})

function backend(userJson) {
    const user = JSON.parse(userJson);
    return user.email.startsWith('i'); 
}