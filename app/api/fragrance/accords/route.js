export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const response = await fetch(
    `http://fastapi-server:8001/fragrance/${slug}/accords`,
  );

  const accords = await response.json();
  return new Response(JSON.stringify(accords), {
    headers: { "Content-Type": "application/json" },
  });
}
