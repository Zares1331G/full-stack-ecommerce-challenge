import React, { useState } from 'react'
import { ModalDialog, Button } from 'vtex.styleguide'


const ModalPromotion = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleCloseModal = () => {
        setOpenModal(false)
        //resetTagInfo()
    }

    return (
        <div>
            <Button onClick={() => setOpenModal(true)}>Nueva promoción</Button>
            <ModalDialog
                centered
                isOpen={openModal}
                onClose={handleCloseModal}
                cancelation={{
                    onClick: handleCloseModal,
                    label: 'Cancelar',
                }}
                confirmation={{
                    onClick: ()=>{
                        console.log("SEND")
                    },
                    label: 'Enviar',
                }}
            >
                <div className="flex flex-column flex-row-ns">
                    <div className="w-100 w-50-ns mv4">
                        <div className="w-100 mv6">
                            Column 1
                        </div>
                    </div>
                    <div className="w-100 w-50-ns mv4">
                        <div className="w-100 mv6">
                            Column 2
                        </div>
                    </div>
                </div>
            </ModalDialog>
        </div>
    )
}

export default ModalPromotion