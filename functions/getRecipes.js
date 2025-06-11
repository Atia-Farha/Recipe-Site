export async function onRequest(context) {
    const url = new URL(context.request.url);
    const query = url.searchParams.get('query');

    if (!query) {
        return new Response("Missing query parameter", { status: 400 });
    }

    const apiKey = context.env.RECIPE_API_KEY;
    const apiUrl = `https://api.spoonacular.com/recipes/autocomplete?apiKey=${apiKey}&query=${query}&number=25`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        return new Response('Error fetching recipes', { status: 500 });
    }
}