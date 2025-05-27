import React, { useEffect, useState } from 'react'
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { promoCheck } from '../../utils/fetchPromtions';

const PromotionApp = () => {

    const [dataPromoAplied, setDataPromoAplied] = useState([])

    const { orderForm, loading } = useOrderForm();

    console.log("----> ORDER", dataPromoAplied)

    useEffect(() => {
        if (loading) return

        const handleValidatePromo = async () => {
            try {
                const body = {
                    value: orderForm.value,
                    items: orderForm.items
                }

                const data = await promoCheck(body)

                if (data.length) {
                    setDataPromoAplied(data)
                }

            } catch (error) {
                setDataPromoAplied([])
            }
        }

        handleValidatePromo()


        return () => { }
    }, [orderForm])

    return (
        <div>PromotionApp</div>
    )
}

export default PromotionApp