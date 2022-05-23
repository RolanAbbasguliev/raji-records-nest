const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	if (checkInputs())  {
		postRegistration();

	}

});

function checkInputs() {
	// trim to remove the whitespaces

	var emailCheck = false, passwordCheck = false, password2Check = false;
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	

	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		emailCheck = true;
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		passwordCheck = true;
		setSuccessFor(password);
	}
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		password2Check = true;
		setSuccessFor(password2);
	}
	return emailCheck && passwordCheck && password2Check;
}

async function postRegistration() {
    const url = '/auth/signup';
    const data = {
        password: document.getElementById("password").value,
        email: document.getElementById("email").value,
    };

	try {
		const response = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data), 
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const json = await response.json();
		if (json.message == "Credentials taken"){
			setErrorFor(email, "Account already exists");
			setErrorFor(password, "");
			setErrorFor(password2, "");
			throw new Error(json.message);
		}
		window.location.href = "/";
	}
	catch (error) {
		console.error(error);
	}
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

