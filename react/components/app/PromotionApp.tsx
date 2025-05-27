import React, { useEffect, useState } from 'react'
import { useOrderForm } from "vtex.order-manager/OrderForm";
import { promoCheck } from '../../utils/fetchPromtions';

const PromotionApp = () => {

    const [dataPromoAplied, setDataPromoAplied] = useState([])

    const { orderForm, loading } = useOrderForm();

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

    }, [orderForm])

    return dataPromoAplied.length && (
        <div>
            Promociones a las que puedes acceder
            {dataPromoAplied.length && dataPromoAplied.map((promo: any, index: number) => {
                return (
                    <>
                        <p key={index}>{promo.promotionName}</p>
                    </>
                )
            })}
        </div>
    )
}

export default PromotionApp