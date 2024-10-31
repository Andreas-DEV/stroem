export async function load({ params }) {
    try {

        const response = await fetch(`http://127.0.0.1:5333/news/${params.slug}`);
        
        if (!response.ok) {
            throw new Error('Arktiklen findes ikke.');
        }
        
        const article = await response.json();
        return {
            article
        };
    } catch (error) {
        return {
            status: 404,
            error: 'Artiklen findes ikke'
        };
    }
}