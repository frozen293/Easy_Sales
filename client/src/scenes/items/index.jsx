import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  styled,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "0.75rem",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  padding: "1rem",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "scale(1.1)",
  },
}));

const Product = ({ _id, name, description, price, rating, category, supply, stat }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2" paragraph>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "See Less" : "See More"}
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">id: {_id}</Typography>
          <Typography variant="body2">Supply Left: {supply}</Typography>
          {/* <Typography variant="body2">
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography variant="body2">
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography> */}
        </CardContent>
      </Collapse>
    </StyledCard>
  );
};

const Items = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Items" subtitle="See your list of items." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap="20px"
        >
          {data.map(({ _id, name, description, price, rating, category, supply, stat }) => (
            <Product
              key={_id}
              _id={_id}
              name={name}
              description={description}
              price={price}
              rating={rating}
              category={category}
              supply={supply}
              stat={stat}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Items;
