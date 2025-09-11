import React, { useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Pagination, Tabs, Tab, Box } from "@mui/material";
import blogData from "../blogData";

const Blog = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");

  const blogsPerPage = 6;

  // Filter blogs by category
  const filteredBlogs =
    category === "All" ? blogData : blogData.filter((blog) => blog.category === category);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (page - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Container sx={{ py: 6 }}>
      {/* Heading */}
      <Typography variant="h3" sx={{ mb: 4, textAlign: "center", fontWeight: "bold" }}>
        Our Blogs
      </Typography>

      {/* Category Tabs */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Tabs
  value={category}
  onChange={(e, newValue) => {
    setCategory(newValue);
    setPage(1);
  }}
  TabIndicatorProps={{ style: { display: "none" } }} // remove underline
  sx={{
    "& .MuiTab-root": {
      textTransform: "none",
      borderRadius: "20px",
      px: 2,
      py: 0.5,
      mx: 0.5,
      minHeight: "32px",
      fontWeight: 500,
      border: "1px solid",
      borderColor: "divider",
      "&.Mui-selected": {
        bgcolor: "primary.main",
        color: "white"
      }
    }
  }}
>
  <Tab label="All" value="All" />
  <Tab label="Education" value="Education" />
  <Tab label="Tech" value="Tech" />
  <Tab label="Case Study" value="Case Study" />
</Tabs>

      </Box>

      {/* Blog Grid */}
      <Grid container spacing={4}>
        {currentBlogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { transform: "scale(1.03)", boxShadow: 6 }
              }}
            >
              <CardMedia component="img" image={blog.image} alt={blog.title} height="200" />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {blog.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 2 }}>
                  {blog.date} • {blog.category}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary" />
        </Box>
      )}
    </Container>
  );
};

export default Blog;
