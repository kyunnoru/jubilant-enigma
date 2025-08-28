import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Ambil data dari request body
    const questionnaireData = await request.json();
    
    console.log('Received report generation request:', {
      hasData: !!questionnaireData,
      dataKeys: Object.keys(questionnaireData)
    });

    // Validasi input
    if (!questionnaireData) {
      return NextResponse.json({
        status: 'error',
        message: 'Questionnaire data is required'
      }, { status: 400 });
    }

    // Kirim request ke backend Node.js
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const response = await fetch(`${backendUrl}/api/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(questionnaireData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to generate report');
    }

    const result = await response.json();

    console.log('Report generated successfully:', {
      pdfUrl: result.data?.pdf_url,
      processingTime: result.data?.processing_time
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error('Error in generate-report API:', error);
    
    let errorMessage = 'Terjadi kesalahan yang tidak diketahui.';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({
      status: 'error',
      message: `Gagal membuat laporan: ${errorMessage}`
    }, { status: 500 });
  }
}