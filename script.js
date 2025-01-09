// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const visibilityIcon = document.getElementById("visibility-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        visibilityIcon.classList.remove("fa-eye");
        visibilityIcon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        visibilityIcon.classList.remove("fa-eye-slash");
        visibilityIcon.classList.add("fa-eye");
    }
}

// Check password strength
function checkStrength() {
    const password = document.getElementById("password").value;
    const feedback = document.getElementById("feedback");
    const suggestions = document.getElementById("suggestions");
    const strengthBar = document.getElementById("strength-bar-fill");
    const requirements = document.getElementById("requirements");
    
    const result = zxcvbn(password);
    const score = result.score;
    let strengthText = "";
    let color = "";
    let suggestionText = "";
    let iconClass = "";

    // Check password complexity requirements
    checkRequirements(password);

    switch (score) {
        case 0:
            strengthBar.style.width = "20%";
            strengthText = "Very Weak";
            color = "danger";
            suggestionText = "Try using a mix of uppercase and lowercase letters, numbers, and symbols.";
            break;
        case 1:
            strengthBar.style.width = "40%";
            strengthText = "Weak";
            color = "warning";
            suggestionText = "Consider adding more characters and special characters.";
            break;
        case 2:
            strengthBar.style.width = "60%";
            strengthText = "Fair";
            color = "info";
            suggestionText = "Add more variety to your password (e.g., special characters, numbers).";
            break;
        case 3:
            strengthBar.style.width = "80%";
            strengthText = "Good";
            color = "success";
            suggestionText = "Great! Your password is getting stronger.";
            break;
        case 4:
            strengthBar.style.width = "100%";
            strengthText = "Strong";
            color = "success";
            suggestionText = "Excellent! Your password is strong.";
            break;
        default:
            strengthBar.style.width = "0%";
            strengthText = "Enter a password";
            color = "secondary";
            suggestionText = "";
            break;
    }

    strengthBar.classList.remove("bg-danger", "bg-warning", "bg-info", "bg-success", "bg-secondary");
    strengthBar.classList.add("bg-" + color);
    feedback.innerText = strengthText;
    suggestions.innerText = suggestionText;
}

// Check password requirements (length, uppercase, number, special)
function checkRequirements(password) {
    const lengthRequirement = document.getElementById("length");
    const uppercaseRequirement = document.getElementById("uppercase");
    const numberRequirement = document.getElementById("number");
    const specialRequirement = document.getElementById("special");

    // Length check
    if (password.length >= 8) {
        lengthRequirement.classList.add("valid");
        lengthRequirement.classList.remove("invalid");
    } else {
        lengthRequirement.classList.add("invalid");
        lengthRequirement.classList.remove("valid");
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
        uppercaseRequirement.classList.add("valid");
        uppercaseRequirement.classList.remove("invalid");
    } else {
        uppercaseRequirement.classList.add("invalid");
        uppercaseRequirement.classList.remove("valid");
    }

    // Number check
    if (/\d/.test(password)) {
        numberRequirement.classList.add("valid");
        numberRequirement.classList.remove("invalid");
    } else {
        numberRequirement.classList.add("invalid");
        numberRequirement.classList.remove("valid");
    }

    // Special character check
    if (/[^A-Za-z0-9]/.test(password)) {
        specialRequirement.classList.add("valid");
        specialRequirement.classList.remove("invalid");
    } else {
        specialRequirement.classList.add("invalid");
        specialRequirement.classList.remove("valid");
    }
}

// Generate a random password
function generateRandomPassword() {
    const randomPassword = generatePassword();
    document.getElementById("password").value = randomPassword;
    checkStrength();
}

// Random password generator function
function generatePassword() {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}
