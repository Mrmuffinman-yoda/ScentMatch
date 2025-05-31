// Dedicated video streaming proxy for MinIO with Range support
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { params } = context;
  const path = params.path;
  const minioUrl = `http://minio:9000/${path.join("/")}`;

  // Forward Range header if present
  const range = req.headers.get("range");
  const headers = {};
  if (range) {
    headers["range"] = range;
  }

  // Fetch from MinIO with Range support
  const minioRes = await fetch(minioUrl, {
    method: "GET",
    headers,
  });

  // Prepare response headers
  const resHeaders = new Headers(minioRes.headers);
  // Ensure Accept-Ranges is set for video streaming
  resHeaders.set("Accept-Ranges", "bytes");

  // Pass through status (206 for partial, 200 for full)
  return new NextResponse(minioRes.body, {
    status: minioRes.status,
    headers: resHeaders,
  });
}
