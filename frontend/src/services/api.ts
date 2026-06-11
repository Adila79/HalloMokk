const API_URL = "http://192.168.56.1:5000";
export async function getLapangan() {
  const response = await fetch(`${API_URL}/lapangan`);

  console.log("STATUS :", response.status);

  const data = await response.json();

  console.log("DATA :", data);

  return data;
}

export async function getBooking() {
  const response = await fetch(`${API_URL}/booking`);

  return response.json();
}

export async function login(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function register(data: {
  nama: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}
