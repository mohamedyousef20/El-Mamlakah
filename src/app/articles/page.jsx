// ArticleList.server.jsx (Server Component)
// Do not include "use client" here.
import ClientArticleList from "../../Client/ArticleList.client/ArticleList.client";

export default async function ArticleList() {
    try {
        const res = await fetch("http://localhost:5500/api/v1/article", {
            cache: "no-store", // Prevents Next.js from caching the response
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const result = await res.json();
        console.log("API Response:", result);

        // Ensure articles is an array even if the response doesn't have data.
        const articles = result.message === "Success" && Array.isArray(result.data) ? result.data : [];

        return <ClientArticleList articles={articles} />;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return <ClientArticleList articles={[]} />;
    }
}
