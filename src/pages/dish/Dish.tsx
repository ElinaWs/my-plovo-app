import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { axiosApi } from "../../axios";
import type { IDish, IDishList } from "../../types";

export const Dish = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dish, setDish] = useState<IDish | null>(null);

  useEffect(() => {
    const fetchDish = async () => {
      if (!id) return;
      try {
        const response = await axiosApi.get<IDishList | null>("/dishes.json");
        const data = response.data;
        if (!data || !data[id]) {
          setDish(null);
          return;
        }
        setDish({ ...data[id], id });
      } catch (error) {
        console.error("Error fetching dish:", error);
        setDish(null);
      }
    };

    void fetchDish();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    try {
      await axiosApi.delete(`/dishes/${id}.json`); 
    } finally {
      navigate("/"); 
    }
  };

  if (!dish) {
    return <Typography variant="h6">Dish is not definded!</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h1" gutterBottom>
          {dish.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {dish.description}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Цена: {dish.price} $
        </Typography>

        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};