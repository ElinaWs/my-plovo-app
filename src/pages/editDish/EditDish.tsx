import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import type { IDishShort } from "../../types"
import { axiosApi } from "../../axios"
import DishForm from "../../components/dishForm/DishForm"

export const EditDish = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [ dish, setDish ] = useState<IDishShort | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDish = async() => {
            try {
                const response = await axiosApi.get(`/dishes/${id}.json`)
                setDish(response.data)
            } catch (e) {
                console.log(e)
            }
          
        }
          if (id) {
                getDish()
            }
    },[id])

    const handleEditDish = async(editDish: IDishShort) => {
        try {
            await axiosApi.put(`/dishes/${id}.json`, editDish)
            navigate(`/dish/${id}`)
        } catch (e) {
            console.log(e)
        }
    }
    return(
        <div>
            {
                dish && <DishForm 
                onSubmit={handleEditDish} 
                dish={dish} 
                loading={loading}/>
            }
        </div>
    )
}