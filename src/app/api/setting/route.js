import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export async function GET(request) {
  const customerId = request.nextUrl.searchParams.get('idCustomer')
  console.log('Nome do cliente recebido:', customerId)
  try {
    const response = await axios.get(`https://localhost:44312/setting?idCustomer=${customerId}`)
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
  }
}

export async function POST(NextRequest) {
  const body = await NextRequest.json()

  try {
    const response = await axios.post('https://localhost:44312/setting', body)
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
  }
}

export async function PUT(NextRequest) {
  const body = await NextRequest.json()

  try {
    const response = await axios.put('https://localhost:44312/setting', body)
    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)
  }
}

// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// export async function GET(NextRequest, NextResponse) {
//   const customerId = NextRequest.nextUrl.searchParams.get("idCustomer");
//   console.log("Nome do cliente recebido:", customerId);
//   try {
//     const response = await axios.get(
//       `https://localhost:44312/setting?idCustomer=${customerId}`
//     );
//     return NextResponse.json(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// }
