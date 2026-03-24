import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import type { IDish } from '../../types';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { addDishToBasket } from '../../utils/BasketHelpers';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface Props {
    dish: IDish
    addDishToBasket: (dish: IDish) => void
}

export const DishCard = ({dish, addDishToBasket}: Props) => {
    const navigate = useNavigate();
    
    const goToDishPage = (id: string) => {
        navigate(`/dish/${id}`)
    }

    const handleAddDishToBasket = (dish: IDish) => {
        addDishToBasket(dish)
    }
    return(
        <Card>
            <CardContent>
                <Typography>
                    {dish.name}
                </Typography>
                <Typography variant='body2'>
                    Price:{dish.price} $
                </Typography>

                <CardActions>
                    <Button onClick={() => handleAddDishToBasket(dish)}>
                        Add to basket
                    </Button>
                    <Button onClick={() => goToDishPage(dish.id)}>
                        Show more
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}