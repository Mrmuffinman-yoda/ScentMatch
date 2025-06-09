export async function GET(request) {
  // get fragrance image count using slug
  const { searchParams } = new URL(request.url);
  const fragranceSlug = searchParams.get("fragrance_slug");

  if (!fragranceSlug) {
    return new Response(
      JSON.stringify({ detail: "fragrance_slug is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const response = await fetch(
    `http://fastapi-server:8001/fragrance/${fragranceSlug}/carousel`
  );
  const carouselImages = await response.json();

  return new Response(JSON.stringify(carouselImages), {
    headers: { "Content-Type": "application/json" },
  });
}
