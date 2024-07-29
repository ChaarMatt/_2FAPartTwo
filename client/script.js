function showSignupForm() {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("signupContainer").style.display = "block";
}

function showLoginForm() {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("signupContainer").style.display = "none";
}

async function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    try {
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        alert('Signup successful, please login.');
    } catch (error) {
        alert('Error during signup: ' + error.message);
    }
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        window.location.href = '/auth/success';
    } catch (error) {
        alert('Error during login: ' + error.message);
    }
}

function verify2FA() {
    const code = document.getElementById("2faCode").value;

    fetch('http://localhost:3000/auth/verify-2fa', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    })
        .then(response => {
            if (response.ok) {
                alert('2FA verification successful!');
                // Redirect to the next page
                // window.location.href = "/dashboard";
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => {
            console.error('Error during 2FA verification:', error);
            alert('Failed to verify 2FA: ' + error.message);
        });
}

