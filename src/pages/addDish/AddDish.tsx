import { useState } from "react";
import DishForm from "../../components/dishForm/DishForm"
import type { IDishShort } from "../../types";
import { useNavigate } from "react-router";
import { axiosApi } from "../../axios";

export const AddDish = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onAddDishClick = async (dishData: IDishShort) => {
        setLoading(true);
        try {
        await axiosApi.post('/dishes.json', dishData);
        } finally {
        setLoading(false);
        navigate('/');
        }
    };

    return (
        <div>
            <DishForm  onSubmit={onAddDishClick} loading={loading}/>
        </div>
    )
}