// src/pages/api/chat.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type ChatMessage = { sender: 'user' | 'ai'; text: string; timestamp: number };
type ChatRequest = {
	report_id: string;
	conversation_history: ChatMessage[];
	current_question: string;
};

type ChatResponse = {
	ai_response: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ChatResponse | { message: string }>
) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', ['POST']);
		return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
	}

	const { report_id, conversation_history, current_question } = req.body as ChatRequest;

	if (!report_id || !current_question) {
		return res.status(400).json({ message: 'report_id dan current_question wajib diisi' });
	}

	// Simulasi panggilan LLM: tunggu sebentar, lalu kembalikan jawaban sederhana
	await new Promise((r) => setTimeout(r, 800));

	const lastContext = conversation_history?.slice(-1)[0]?.text ?? '';
	const ai_response = `Menjawab berdasarkan laporan ${report_id}. Anda bertanya: "${current_question}"` +
		(lastContext ? ` (mengacu pada konteks: "${lastContext}")` : '');

	return res.status(200).json({ ai_response });
}


