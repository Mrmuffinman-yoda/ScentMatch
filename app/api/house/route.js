export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const response = await fetch(
    "http://fastapi-server:8001/house/?slug=" + slug,
  );

  const houses = await response.json();
  return new Response(JSON.stringify(houses), {
    headers: { "Content-Type": "application/json" },
  });
}
