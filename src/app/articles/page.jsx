// ArticleList.server.jsx (Server Component)
// Do not include "use client" here.
import ClientArticleList from "../../Client/ArticleList.client/ArticleList.client";

export default async function ArticleList({ searchParams }) {
    try {
        // Construct the API URL with query parameters
        const apiUrl = new URL("http://localhost:5500/api/v1/articles");
        if (searchParams.service) {
            apiUrl.searchParams.append("service", searchParams.service);
        }
        if (searchParams.area) {
            apiUrl.searchParams.append("area", searchParams.area);
        }
        if (searchParams.province) {
            apiUrl.searchParams.append("province", searchParams.province);
        }

        const res = await fetch(apiUrl.toString(), {
            cache: "no-store",
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