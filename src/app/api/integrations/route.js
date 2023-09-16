import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(NextRequest, NextResponse) {
  const customerId = NextRequest.nextUrl.searchParams.get("idCustomer");

  try {
    // Faça a requisição ao backend em C# usando o customerId como parâmetro
    const response = await axios.get(`https://localhost:44312/${customerId}`);

    // Envie a resposta recebida do backend em C# para o frontend
    return NextResponse.json(response.data);
  } catch (error) {
    // Trate os erros se necessário
    NextResponse.status(500).json({
      error: `Erro ao obter as integrações Mensagem: ${error.message} TEM QUE PASSAR UM ID: ${customerId}`,
    });
  }
}
