import './style.css';

// use this function to get all the inputs and its error message fields
function selectElements(elementClassNameArray, elementErrorClassNameArray) {
    const elementsAndelementsErrorArray = [];
    for (let i = 0; i < elementClassNameArray.length; i++) {
        const element = document.getElementById(elementClassNameArray[i]);
        const elementError = document.getElementsByClassName(elementErrorClassNameArray[i])[0];
        elementsAndelementsErrorArray.push({element, elementError});
    }
    return elementsAndelementsErrorArray;
}
const elementClassNameArray = ["email", "country", "zip-code", "password", "password-confirm"];

const elementErrorClassNameArray = ["email-error", "country-error", "zip-code-error", "password-error", "password-confirm-error"];

const elementsAndelementsErrorArray = selectElements(elementClassNameArray, elementErrorClassNameArray);

const email = elementsAndelementsErrorArray[0].element;
const emailError = elementsAndelementsErrorArray[0].elementError;
function checkEmail () {
    if (email.validity.valid) {
        emailError.textContent = "";
        email.className = "email";
    } else {
        showEmailError();
        email.className ="email-input-invalid";
    }
}
function showEmailError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
        emailError.textContent = "Entered value needs to be an email address.";
    } 
    
}
email.addEventListener("input", (e) => checkEmail() );


const country = elementsAndelementsErrorArray[1].element;
const countryError = elementsAndelementsErrorArray[1].elementError;

function checkCountry() {
    if (country.validity.valid) {
        countryError.textContent = "";
        country.className = "country";
    } else {
        showCountryError();
        country.className = "country-input-invalid";
    }
}
function showCountryError() {
    if (country.validity.valueMissing) {
        countryError.textContent = "You need to enter a country.";
    } 
    
}
country.addEventListener("input", (e) => checkCountry());

const zipCode = elementsAndelementsErrorArray[2].element;
const zipCodeError = elementsAndelementsErrorArray[2].elementError;
function checkZipCode() {
    if (zipCode.validity.valid) {
        zipCodeError.textContent = "";
        zipCode.className = "zip-code";
    } else {
        showZipCodeError();
        zipCode.className = "zip-code-input-invalid";
    }
}
function showZipCodeError() {
    if (zipCode.validity.valueMissing) {
        zipCodeError.textContent = "You need to enter a zipCode.";
    } 
}
zipCode.addEventListener("input", (e) => checkZipCode());

const password = elementsAndelementsErrorArray[3].element;
const passwordError = elementsAndelementsErrorArray[3].elementError;
// from stackoverflow...Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
function checkPassword() {
    const isValid =  password.value.length !== 0 && passwordRegExp.test(password.value);
    if (isValid) {
        passwordError.textContent = "";
        password.className = "password";
    } else {
        passwordError.textContent = "You need to enter a valid password(Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character).";
        password.className = "password-input-invalid";
        
    }
}
password.addEventListener("input", (e) => checkPassword());


const passwordConfirm = elementsAndelementsErrorArray[4].element;
const passwordConfirmError = elementsAndelementsErrorArray[4].elementError;

function checkPasswordConfrim() {
    const isValid =  password.value === passwordConfirm.value;
    if (isValid) {
        passwordConfirmError.textContent = "";
        passwordConfirm.className = "password-confirm";
    } else {
        passwordConfirmError.textContent = "Your passwords must match!";
        passwordConfirm.className = "password-confirm-input-invalid";
        
    }
}
passwordConfirm.addEventListener("input", (e) => checkPasswordConfrim());

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkEmail();
    checkCountry();
    checkZipCode();
    checkPassword();
    checkPasswordConfrim();
    const allPass = email.validity.valid && zipCode.validity.valid && country.validity.valid && password.value.length !== 0 && passwordRegExp.test(password.value) && password.value === passwordConfirm.value;
    if (allPass) {
        const element = document.createElement("div");
        element.innerHTML = "You passed all validations!"
        document.querySelector(".form-container").appendChild(element);
    }
});

