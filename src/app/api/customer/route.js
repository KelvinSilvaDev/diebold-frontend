import axios from "axios";
import { NextResponse } from "next/server";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export async function GET(request, res) {
  try {

    console.log(`${process.env.API_URL_LOCAL}/customer`)
    // Faça a requisição ao backend em C# usando axios
    const response = await axios.get(`${process.env.API_URL_LOCAL}/customer`);
    // console.log("Resposta da API C#:", response.data);
    // response.json(response.data);
    return NextResponse.json(response.data);
  } catch (error) {
    // Trate os erros se necessário
    console.log("Erro ao obter a lista de clientes:", error.message);
    NextResponse.status(500).json({
      error: "Erro ao obter a lista de clientes",
      error: error.message,
    });
  }
}
