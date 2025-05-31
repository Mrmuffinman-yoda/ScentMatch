//  lets make a route that takes input of slug and returns a fragrance object
// from http://fastapi-server:8001/fragrance/?slug=dior-homme-intense-2025

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const response = await fetch(
    `http://fastapi-server:8001/fragrance/?slug=${slug}`
  );
  const fragrance = await response.json();

  return new Response(JSON.stringify(fragrance), {
    headers: { "Content-Type": "application/json" },
  });
}
