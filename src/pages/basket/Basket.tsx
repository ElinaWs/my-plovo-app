import { Container, Typography } from "@mui/material";
import type { IBasketState } from "../../types";
import { Link } from "react-router";
import { OrderForm } from "../../components/orderForm/OrderForm";
import { BasketItems } from "./BasketItems";

interface Props {
  basketState: IBasketState;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  clearBasket: () => void;
}

export const Basket = ({ basketState, onIncrease, onDecrease, clearBasket }: Props) => {
  const { items } = basketState;

  if (items.length === 0) {
    return (
      <Container>
        <Typography variant="h5" align="center">
          Your basket is empty
        </Typography>
        <Typography variant="h5" align="center">
          <Link to="/">Go to Home page</Link>
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <BasketItems
        items={items}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      <OrderForm
        basketState={basketState}
        clearBasket={clearBasket}
      />
    </Container>
  );
};