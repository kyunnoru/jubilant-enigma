// src/pages/api/recommend.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Tipe untuk data respons yang diharapkan
type ApiResponse = {
  message: string;
  id?: string; // ID laporan yang dihasilkan
  pdfUrl?: string; // URL untuk mengunduh PDF
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  // 1. Hanya izinkan metode POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const userData = req.body;
    
    // 2. Ambil URL endpoint Node-RED dari environment variables
    // Ini adalah praktik keamanan terbaik. JANGAN hardcode URL di sini.
    const nodeRedEndpoint = process.env.NODE_RED_API_ENDPOINT;

    if (!nodeRedEndpoint) {
      console.error("NODE_RED_API_ENDPOINT environment variable is not set.");
      throw new Error("Konfigurasi server tidak lengkap.");
    }
    
    console.log("Meneruskan data ke Node-RED di:", nodeRedEndpoint);
    // console.log("Payload:", JSON.stringify(userData, null, 2)); // Untuk debugging

    // ============================================================================
    // BAGIAN PENTING: Pilih salah satu blok di bawah ini (Simulasi atau Real)
    // ============================================================================

    // --- BLOK 1: KONEKSI NYATA KE NODE-RED (Gunakan ini di produksi) ---
    /*
    const nodeRedResponse = await axios.post(nodeRedEndpoint, userData, {
      headers: {
        'Content-Type': 'application/json',
        // Tambahkan header otentikasi jika diperlukan (misal: API Key)
        // 'Authorization': `Bearer ${process.env.NODE_RED_API_KEY}`
      },
      timeout: 180000 // Timeout 3 menit (sesuaikan dengan waktu proses AI Anda)
    });

    // Kirim kembali respons dari Node-RED ke klien
    return res.status(200).json(nodeRedResponse.data);
    */

    // --- BLOK 2: SIMULASI UNTUK PENGEMBANGAN (Gunakan ini sekarang) ---
    // Mensimulasikan jeda waktu seolah-olah AI sedang bekerja keras.
    await new Promise(resolve => setTimeout(resolve, 3000)); // Jeda 3 detik

    // Membuat respons palsu seolah-olah dari Node-RED
    const mockResponse = {
      message: "Laporan berhasil dibuat.",
      id: `report-${Date.now()}`,
      pdfUrl: `/api/download-report/report-${Date.now()}` // Contoh URL download
    };
    
    return res.status(200).json(mockResponse);

  } catch (error) {
    console.error("Error di API route /api/recommend:", error);
    
    // Memberikan pesan error yang lebih informatif ke frontend
    const errorMessage = axios.isAxiosError(error) 
      ? error.message 
      : "Terjadi kesalahan internal pada server.";
      
    return res.status(500).json({ message: "Gagal memproses permintaan.", error: errorMessage });
  }
}