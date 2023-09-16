import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(NextRequest) {
  const idCustomer = NextRequest.nextUrl.searchParams.get("idCustomer");

  //   console.log("Nome do cliente recebido:", idCustomer);

  try {
    const response = await axios.get(
      `https://localhost:44312/dashboard?idCustomer=${idCustomer}`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    // Trate os erros se necessário
    NextResponse.status(500).json({ error: "Erro ao obter as integrações" });
  }
}
