function getCharTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charTypes = [];

    if (uppercase) {
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVXWYZ');
    }

    if (lowercase) {
        charTypes.push('abcdefghijklmnopqrstuvxwyz');
    }

    if (number) {
        charTypes.push('0123456789');
    }

    if (specialCharacter) {
        charTypes.push("!@#$£%¢¬&*()-_=+[]{}´~`^ªº,<.>;:\\|/'\"");
    }

    return charTypes;
}

function getPasswordLength() {
    const length = document.querySelector('#length').value;
    if (isNaN(length) || length < 4 || length > 128) {
        message('Invalid length. Type a number between 4 and 128 characters.', '#d62626');
    }

    return length;
}

function message(text, background) {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: background,
            boxShadow: 'none'
        }
    }).showToast();
}

function randomCharType(charTypes) {
    const randomIndex = Math.floor(Math.random() * charTypes.length);

    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

function generatePassword(length, charTypes) {
    let passwordGenerated = '';

    while (passwordGenerated.length < length) {
        passwordGenerated += randomCharType(charTypes);
    }

    return passwordGenerated;
}

document.querySelector('#generate').addEventListener('click', function () {
    const length = getPasswordLength();
    const charTypes = getCharTypes();
    
    if (!length) {
        return
    }
    
    if (!charTypes.length) {
        message('Select at least one type of character.', '#dc2626');
        return;
    }
    
    const passwordGenerated = generatePassword(length, charTypes);

    document.querySelector('.password-container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
})

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Password copyed.', '#84cc16');
})