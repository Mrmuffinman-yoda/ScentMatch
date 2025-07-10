export async function GET(request) {
  // Get fragrance id from query params
  const { searchParams } = new URL(request.url);
  const fragranceId = searchParams.get("fragrance_id");
  if (!fragranceId) {
    return new Response(
      JSON.stringify({ detail: "fragrance_id is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const response = await fetch(
    `http://fastapi-server:8001/fragrance/${fragranceId}/top-clones`,
  );
  const topThreeFragrances = await response.json();

  return new Response(JSON.stringify(topThreeFragrances), {
    headers: { "Content-Type": "application/json" },
  });
}
