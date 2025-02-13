// File: app/articles/page.jsx
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Skeleton,
  Alert,
} from "@mui/material";
import Link from "next/link";

// This is a server component: Next.js will pass `searchParams` automatically
const AllArticlePage = async ({ searchParams }) => {
  // Extract filters from searchParams (they come as strings)
  const { service, area, province } = searchParams || {};

  // Build the API URL using the provided filters
  const apiUrl = new URL("http://localhost:5500/api/v1/articles");
  if (service) apiUrl.searchParams.append("service", service);
  if (area) apiUrl.searchParams.append("area", area);
  if (province) apiUrl.searchParams.append("province", province);

  // Fetch articles from the backend with cache disabled
  const res = await fetch(apiUrl.toString(), { cache: "no-store" });
  const data = await res.json();

  // Ensure we have an array to work with
  const articles = Array.isArray(data?.data) ? data.data : [];

  // Optionally, you can also check if filters exist:
  const hasFilters = service || area || province;

  return (
    <Box sx={{ backgroundColor: "#F4F4F4", py: 6, minHeight: "100vh" }}>
      <Container>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{
            color: "#006C35",
            fontWeight: "bold",
            mb: 6,
            fontFamily: "'Noto Sans Arabic', sans-serif",
          }}
        >
          المدونة
        </Typography>

        {/* Display a message if filters are applied */}
        {hasFilters && (
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ mb: 4, fontFamily: "'Noto Sans Arabic', sans-serif" }}
          >
            نتائج البحث وفق الفلاتر: {service && `الخدمة: ${service} `}
            {area && `المنطقة: ${area} `} {province && `المحافظة: ${province}`}
          </Typography>
        )}

        {/* If no articles, show an Alert; otherwise, display the articles */}
        {articles.length === 0 ? (
          <Alert severity="info" sx={{ mt: 4 }}>
            {hasFilters
              ? "لا توجد مقالات مطابقة للفلاتر المحددة."
              : "لا توجد مقالات متاحة."}
          </Alert>
        ) : (
          <Grid container spacing={4} dir="rtl">
            {articles.map((article) => {
              // Use the first paragraph (if available) for an excerpt
              const firstParagraph =
                article.paragraphs && article.paragraphs.length > 0
                  ? article.paragraphs[0]
                  : null;
              return (
                <Grid item xs={12} sm={6} md={4} key={article._id}>
                  <Link href={`/articles/${article._id}`} passHref>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      {firstParagraph && firstParagraph.image ? (
                        <CardMedia
                          component="img"
                          height="200"
                          image={firstParagraph.image}
                          alt={firstParagraph.title}
                        />
                      ) : (
                        <Skeleton variant="rectangular" height={200} />
                      )}
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          sx={{
                            color: "#333333",
                            fontWeight: "bold",
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                          }}
                        >
                          {article.title}
                        </Typography>
                        {firstParagraph && (
                          <Typography
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              fontFamily: "'Noto Sans Arabic', sans-serif",
                            }}
                          >
                            {firstParagraph.content.substring(0, 100)}...
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions
                        sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#006C35",
                            color: "white",
                            "&:hover": { backgroundColor: "#004d00" },
                            fontFamily: "'Noto Sans Arabic', sans-serif",
                          }}
                        >
                          اقرأ المزيد
                        </Button>
                      </CardActions>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default AllArticlePage;
