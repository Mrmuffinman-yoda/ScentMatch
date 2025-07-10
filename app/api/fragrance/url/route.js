// function to retrieve the fragrance URL based on slug or fragrance_id
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const fragrance_id = searchParams.get("fragrance_id");

  let url;
  if (fragrance_id) {
    url = `http://fastapi-server:8001/fragrance/page-url/?fragrance_id=${fragrance_id}`;
  } else if (slug) {
    url = `http://fastapi-server:8001/fragrance/page-url/?slug=${slug}`;
  } else {
    return new Response(
      JSON.stringify({ detail: "slug or fragrance_id required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const response = await fetch(url);
  if (!response.ok) {
    return new Response(
      JSON.stringify({ detail: "Failed to fetch fragrance URL" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
  const fragranceUrl = await response.json();
  return new Response(JSON.stringify(fragranceUrl), {
    headers: { "Content-Type": "application/json" },
  });
}
