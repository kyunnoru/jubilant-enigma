// src/pages/api/generate-report.ts

import type { NextApiRequest, NextApiResponse } from 'next';

type GenerateReportResponse = {
	report_id: string;
	pdf_download_url: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<GenerateReportResponse | { message: string }>
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
	}

	// Simulasi proses analisis & pembuatan laporan
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const reportId = `report-${Date.now()}`;
	const pdfUrl = `/api/download-report/${reportId}`; // proxy ke route download simulasi

	return res.status(200).json({ report_id: reportId, pdf_download_url: pdfUrl });
}


