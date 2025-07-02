// Standard API call for fetching fragrance data using either the slug or directly the fragrance_id value
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const fragrance_id = searchParams.get("fragrance_id");

  let url;
  if (fragrance_id) {
    url = `http://fastapi-server:8001/fragrance/?fragrance_id=${fragrance_id}`;
  } else if (slug) {
    url = `http://fastapi-server:8001/fragrance/?slug=${slug}`;
  } else {
    return new Response(
      JSON.stringify({ detail: "slug or fragrance_id required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const response = await fetch(url);
  const fragrance = await response.json();

  return new Response(JSON.stringify(fragrance), {
    headers: { "Content-Type": "application/json" },
  });
}
