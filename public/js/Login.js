const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	if (checkInputs())  {
        postLogin();

    }

   
});

function checkInputs() {
	// trim to remove the whitespaces
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();

    var emailCheck= false;
    var passwordCheck = false;

	
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

    return emailCheck && passwordCheck;
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

async function postLogin() {
    const url = 'http://localhost:5432/auth/signin';

    const data = {
        email: email.value,
        password: password.value,
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
          if (json.message == "Password incorrect") {
              setErrorFor(password, "Incorrect password");
              throw new Error(json.message);
          }  
          else if (json.message == "Email incorrect") {
              setErrorFor(email, "Incorrect email");
              setErrorFor(password, "");
              throw new Error(json.message);
          }
          window.location.href = '/';
    }
    catch (error) {
        console.error(error);
    }

}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


