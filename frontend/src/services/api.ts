import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data: {
  nama: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/register", data);
  return response.data;
};

export const getLapangan = async () => {
  const response = await api.get("/lapangan");
  return response.data.data;
};

export const createBooking = async (
  data: {
    lapangan_id: number;
    tanggal: string;
    jam: string;
  },
  token: string
) => {
  const response = await api.post(
    "/booking",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// TAMBAHKAN INI
export const getBooking = async (
  token: string
) => {
  const response = await api.get(
    "/booking",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

export const getBookingDetails = async (
  id: string | number,
  token: string
) => {
  const response = await api.get(
    `/booking/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

export const createPayment = async (
  data: {
    booking_id: number;
    metode_pembayaran: string;
    jumlah_bayar: number;
    bukti_pembayaran?: string;
  },
  token: string
) => {
  const response = await api.post(
    "/pembayaran",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const uploadPaymentProof = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export default api;