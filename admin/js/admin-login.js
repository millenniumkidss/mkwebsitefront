document.addEventListener("DOMContentLoaded", function () {

    const loginForm =
        document.getElementById("adminLoginForm");

    const loginButton =
        document.getElementById("loginButton");

    const errorMessage =
        document.getElementById("errorMessage");


    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const password =
            document.getElementById("password").value;


        errorMessage.style.display = "none";

        loginButton.disabled = true;
        loginButton.textContent = "Logging in...";


        try {

            const response = await fetch(
                "http://localhost:8080/api/admin/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );


            const result = await response.json();


            if (!response.ok) {

                throw new Error(
                    result.message ||
                    "Invalid username or password"
                );

            }


            // Save login status

            sessionStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            sessionStorage.setItem(
                "adminUsername",
                result.username
            );

            sessionStorage.setItem(
                "adminRole",
                result.role
            );


            // Redirect

            window.location.href =
                "admin-dashboard.html";


        } catch (error) {

            console.error("Login Error:", error);

            errorMessage.textContent =
                error.message;

            errorMessage.style.display =
                "block";

        } finally {

            loginButton.disabled = false;

            loginButton.textContent =
                "Login";
        }

    });

});