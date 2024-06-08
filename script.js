function saveCredentials() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Generate a random 2FA code
    const twoFACode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem("twoFACode", twoFACode);

    // Send the 2FA code to the user's email
    fetch('http://localhost:3000/send-2fa-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, twoFACode })
    })
        .then(response => {
            if (response.ok) {
                document.getElementById("loginForm").style.display = "none";
                document.getElementById("2faSection").style.display = "block";
            } else {
                return response.text().then(text => { throw new Error(text) });
            }
        })
        .catch(error => {
            console.error('Error during 2FA code send:', error);
            alert('Failed to send 2FA code: ' + error.message);
        });
}

function verify2FA() {
    const inputCode = document.getElementById("2faCode").value;
    const storedCode = localStorage.getItem("twoFACode");

    if (inputCode === storedCode) {
        alert("Login successful!");
        // Redirect to another page
        // window.location.href = "dashboard.html";
    } else {
        alert("Invalid 2FA code. Please try again.");
    }
}

function displayStoredCredentials() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    console.log("Stored Username:", storedUsername);
    console.log("Stored Password:", storedPassword);
}

displayStoredCredentials();
