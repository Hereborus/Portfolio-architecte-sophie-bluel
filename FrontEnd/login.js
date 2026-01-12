let loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", async function (loginSubmite) {
    loginSubmite.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log("Email:", email);
    console.log("Password:", password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email) || !password) {
        console.error("Invalid email or password");
        return;
    }

    try {
        const logincredential = await fetch(
            "http://localhost:5678/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );

        if (!logincredential.ok) {
            throw new Error("Login failed");
        }

        const loginData = await logincredential.json();
        console.log("Login successful:", loginData);

        // You can store the token or redirect the user here
        localStorage.setItem("token", loginData.token);
        window.location.href = "index.html";
    } catch (error) {
        console.error("Login error:", error);
    }
});
