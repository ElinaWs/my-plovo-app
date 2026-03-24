import { useCallback, useEffect, useState } from 'react';
import type { IDish, IDishList } from '../../types';
import { axiosApi } from '../../axios';
import { DishCard } from '../../components/dishCard/DishCard';
import styles from "./styles.module.css"
import { Typography } from '@mui/material';

interface Props {
  addDishToBasket: (dish: IDish) => void
}

export const Home = ({addDishToBasket}:Props) => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDishes = useCallback(async () => {
    try {
      setLoading(true); 
      const dishesResponse = await axiosApi.get<IDishList | null>('/dishes.json'); 
      const dishes = dishesResponse.data; 

      if (!dishes) {
        return;
      }
      const newDishes:IDish[] = Object.keys(dishes).map(key => {
        const dish = dishes[key];
        return {
          ...dish,
          id: key,
        };
      });
      setDishes(newDishes);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    void fetchDishes()
  }, [fetchDishes]);

  console.log(dishes)

  return (
    <div>
        <Typography variant={"h3"} align={'center'}>
            Dishes list:
        </Typography>
    <div className={styles.wrapper}>
      
    {
        dishes.map((dishItem) => (
                <DishCard 
                  dish = {dishItem} 
                  key = {dishItem.id} 
                  addDishToBasket={addDishToBasket}
                />
        ))
    }
    </div>
    </div>
    
  );
};

export default Home;
