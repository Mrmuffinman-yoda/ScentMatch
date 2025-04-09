export async function GET() {
  try {
    // Make a request to the FastAPI server
    const fastapiResponse = await fetch("http://fastapi-server:8001/user/1");

    // Check if the response is OK
    if (!fastapiResponse.ok) {
      throw new Error(
        `FastAPI server responded with status: ${fastapiResponse.status}`
      );
    }

    const data = await fastapiResponse.json();

    // Validate the structure of the response
    if (!data.username || !data.email) {
      throw new Error("Invalid API response structure");
    }

    // Return the response as JSON
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle errors and return an appropriate response
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}