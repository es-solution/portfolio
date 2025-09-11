// src/components/blogcard.jsx
import { Card, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material";

const BlogCard = ({ title, description, date, image, link }) => {
  return (
    <Card sx={{ maxWidth: 345, margin: "auto" }}>
      <CardActionArea component="a" href={link} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BlogCard;
