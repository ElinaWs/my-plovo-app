import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { axiosApi } from "../../axios";
import type { IBasketState } from "../../types";

interface Props {
  basketState: IBasketState;
  clearBasket: () => void;
}

export const OrderForm = ({ basketState, clearBasket }: Props) => {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: ""
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const submitHandler = async () => {
    const order = {
      items: basketState.items,
      totalPrice: basketState.totalPrice,
      totalCount: basketState.totalCount,
      customer: form
    };

    await axiosApi.post("/orders.json", order);
    clearBasket();
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 400
      }}
    >
      <Typography variant="h6">
        Total count: {basketState.totalCount}
      </Typography>

      <Typography variant="h6">
        Total price: {basketState.totalPrice} сом
      </Typography>

      <Typography variant="h5">
        Order details
      </Typography>

      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={changeHandler}
        fullWidth
      />

      <TextField
        label="Address"
        name="address"
        value={form.address}
        onChange={changeHandler}
        fullWidth
      />

      <TextField
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={changeHandler}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        onClick={submitHandler}
      >
        Submit the order
      </Button>
    </Box>
  );
};