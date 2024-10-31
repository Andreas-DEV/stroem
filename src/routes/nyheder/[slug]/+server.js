import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    try {
        // Replace this with your actual database query
        const article = await db.articles.findUnique({
            where: {
                slug: params.slug
            }
        });
        
        if (!article) {
            return new Response('Not found', { status: 404 });
        }
        
        return json(article);
    } catch (error) {
        return new Response('Server error', { status: 500 });
    }
}