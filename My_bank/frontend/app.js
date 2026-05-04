const BASE_URL = "http://localhost:3000";

// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } else {
    alert("Login Failed: " + (data.message || "Invalid credentials"));
  }
}

// TOKEN
function getToken() {
  return localStorage.getItem("token");
}

// AUTO LOAD ACCOUNT
window.onload = () => {
  const acc = localStorage.getItem("accountNumber");
  if (acc) {
    const input = document.getElementById("accountNumber");
    if (input) input.value = acc;
  }
};

// DEPOSIT
async function deposit() {
  const accountNumber = document.getElementById("accountNumber").value;
  const amount = document.getElementById("amount").value;
  const res = await fetch(`${BASE_URL}/transaction/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ accountNumber, amount })
  });
  const data = await res.json();
  alert(data.message);
}

// WITHDRAW
async function withdraw() {
  const accountNumber = document.getElementById("accountNumber").value;
  const amount = document.getElementById("amount").value;
  const res = await fetch(`${BASE_URL}/transaction/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`
    },
    body: JSON.stringify({ accountNumber, amount })
  });
  const data = await res.json();
  alert(data.message);
}

// BALANCE
async function getBalance() {
  const accountNumber = document.getElementById("accountNumber").value;
  const res = await fetch(`${BASE_URL}/transaction/balance?accountNumber=${accountNumber}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  const data = await res.json();
  document.getElementById("balance").innerText = "Balance: " + data.balance;
}

// TRANSACTIONS
async function getTransactions() {
  const accountNumber = document.getElementById("accountNumber").value;
  const res = await fetch(`${BASE_URL}/transaction/transactions/${accountNumber}`, {
    headers: {
      "Authorization": `Bearer ${getToken()}`
    }
  });
  const data = await res.json();
  console.log(data);
}