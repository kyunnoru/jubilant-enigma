// src/pages/api/download-report/[id].ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query; // Mengambil ID dari URL, misal: 'report-1678886400000'

  // Pastikan metode adalah GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  // ============================================================================
  // LOGIKA DI DUNIA NYATA
  // ============================================================================
  // 1. Validasi ID: Pastikan ID valid dan pengguna berhak mengaksesnya.
  // 2. Ambil File:
  //    - Ambil path file dari database berdasarkan ID.
  //    - Atau, fetch file dari layanan penyimpanan cloud (seperti AWS S3).
  //    const fileStream = fs.createReadStream(filePath);
  // 3. Set Header:
  //    res.setHeader('Content-Type', 'application/pdf');
  //    res.setHeader('Content-Disposition', `attachment; filename="Laporan_Neurvia_${id}.pdf"`);
  // 4. Kirim File:
  //    fileStream.pipe(res);
  // ============================================================================
  
  // ============================================================================
  // LOGIKA SIMULASI UNTUK PENGEMBANGAN
  // ============================================================================
  // Karena kita tidak punya PDF asli, kita hanya akan mengirim respons teks
  // untuk membuktikan bahwa endpoint ini bekerja.
  
  res.setHeader('Content-Type', 'text/plain');
  res.status(200).send(`Ini adalah simulasi unduhan untuk laporan dengan ID: ${id}. Di produksi, ini akan menjadi file PDF.`);
}