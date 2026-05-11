const BASE_URL = "http://localhost:3000";

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();

  console.log(data);

  const otp = prompt("Enter OTP");

  const verifyRes = await fetch(`${BASE_URL}/api/auth/verify-login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    phone: "+917973441373",
    otp
  })
});

  const verifyData = await verifyRes.json();

  if (verifyData.token) {
    localStorage.setItem("token", verifyData.token);

    alert("Login Successful");

    window.location.href = "dashboard.html";
  }
}