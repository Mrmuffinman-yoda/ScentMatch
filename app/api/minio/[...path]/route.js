// ui/app/api/minio/[...path]/route.js
import { NextResponse } from "next/server";

// This route handles requests to the MinIO server
// Its required to obfuscate MiniIO server
// and be accessible from the frontend
export async function GET(req, context) {
  const { params } = context;
  const path = params.path;
  const minioUrl = `http://minio:9000/${path.join("/")}`;

  const minioRes = await fetch(minioUrl, {
    method: "GET",
    headers: {},
  });

  const body = minioRes.body;
  const headers = new Headers(minioRes.headers);
  return new NextResponse(body, { status: minioRes.status, headers });
}
