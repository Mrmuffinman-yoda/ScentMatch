// return whats from http://fastapi:8001/fragrance/top-fragrances
import { NextResponse } from "next/server";

export async function GET(request) {
  const response = await fetch(
    "http://fastapi-server:8001/fragrance/top-fragrances"
  );
  const data = await response.json();
  return NextResponse.json(data);
}
