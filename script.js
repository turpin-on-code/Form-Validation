const myForm = document.getElementById('myForm')
const overlay = document.getElementById('overlay')
const icon = document.querySelector('.icon')
let formData;

const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const email = document.getElementById('email')
const statusEle = document.getElementById('status')
const selectContainer = document.querySelector('.select-container')
const radioButtons = document.getElementsByName('sex')
const radioField = document.querySelector('.radio-field')
const checkboxes = document.getElementsByName('code')
const checkboxField = document.querySelector('.checkbox-field')
const button = document.querySelector('button')

let hasFirstName = false
let hasLastName = false
let hasEmail = false
let isRadioChecked = false
let isCheckboxChecked = false
let isSelected = false

function formFilled(...args) {
    for(const arg of args) {
        if (arg === false) {
            return button.disabled = true
        }
    }
    return button.disabled = false
}

function checkFormFilled() {
    formFilled(hasFirstName, hasLastName, hasEmail, isRadioChecked, isCheckboxChecked, isSelected)
}

firstName.addEventListener('keyup', () => {
    if (firstName.value.length < 3 || firstName.value.length > 28) {
        document.querySelector('.first-name-hint').style.display = 'block'
        firstName.classList.add('invalid')
        hasFirstName = false
    } else {
        document.querySelector('.first-name-hint').style.display = 'none'
        firstName.classList.remove('invalid')
        hasFirstName = true
    }
})

lastName.addEventListener('keyup', () => {
    if (lastName.value.length < 3 || lastName.value.length > 28) {
        document.querySelector('.last-name-hint').style.display = 'block'
        lastName.classList.add('invalid')
        hasLastName = false
    } else {
        document.querySelector('.last-name-hint').style.display = 'none'
        lastName.classList.remove('invalid')
        hasLastName = true
    }
})

email.addEventListener('keyup', () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        document.querySelector('.email-hint').style.display = 'none'
        email.classList.remove('invalid')
        hasEmail = true
    } else {
        document.querySelector('.email-hint').style.display = 'block'
        email.classList.add('invalid')
        hasEmail = false
    }
   
})

radioField.addEventListener('click', () => {
    for(let radio of radioButtons) {
        if (radio.checked) {
            isRadioChecked = true
            document.querySelector('.radio-hint').style.display = 'none'
        }
    }
})

checkboxField.addEventListener('click', () => {
    if (checkboxes[0].checked || checkboxes[1].checked || checkboxes[2].checked) {
        document.querySelector('.checkbox-hint').style.display = 'none'
        isCheckboxChecked = true 
    } else {
        document.querySelector('.checkbox-hint').style.display = 'block'
        isCheckboxChecked = false
    }
})

selectContainer.addEventListener('click', () => {
    if (statusEle.value !== 'choose') {
        document.querySelector('.select-hint').style.display = 'none'
        isSelected = true
    } else {
        document.querySelector('.select-hint').style.display = 'block'
        isSelected = false
    }
})

myForm.addEventListener('submit', function(e) {
    e.preventDefault()

    formData = new FormData(this)
    const nameAndValues = [...formData.entries()]

    let languagesAndCode = nameAndValues.filter((item) => {
        if (item[0] === 'code') {
            return item
        }
    })
    // Just the languages
    let languages = languagesAndCode.join().replaceAll('code,', ' ')

    // All values except the languages
    let nameAndValuesNotLangs = nameAndValues.filter(([name, value]) => {
        if (name !== 'code') {
            return [name, value]
        }
    })

    overlay.style.display = 'block'
    overlay.classList.remove('fade-out')
    overlay.classList.add('fade-in')
    const results = document.querySelector('.results')
    nameAndValuesNotLangs.forEach(function(value) {
        let [name, val] = value
        results.innerHTML += '<div class="result"><div class="cell">'
        + name + '</div><div class="cell">' + val + '</div></div>'
    })
    results.innerHTML += '<div class="result"><div class="cell">languages</div><div class="cell">'
    + languages.toString() + '</div></div>'
})

myForm.addEventListener('click', checkFormFilled)
myForm.addEventListener('keyup', checkFormFilled)

icon.addEventListener('click', () => {
    setTimeout(function() {
        location.reload()
    }, 500)
    

    overlay.classList.add('fade-out')
    overlay.classList.remove('fade-in')
})