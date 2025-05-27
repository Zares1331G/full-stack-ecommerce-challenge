import React, { useEffect, useState } from 'react'
import { ModalDialog, Input, Dropdown, DatePicker, Toggle } from 'vtex.styleguide'
import { deletePromotionModule, postPromotionModule, updatePromotionModule } from '../../utils/fetchPromtions'

/* interface propsSelectedPromo {
    id: string
} */
/* interface propsModalPromotion {
    modalAction: string
    setOpenModal: any
    openModal: boolean
    selectedPromo: any
    fetchDataPromo: any
} */

interface propsData {
    promotionName: string;
    minimumAmount: string;
    typePromotion: string;
    startDate: string;
    endDate: string;
    active: boolean;
    category: string;
}

const typeOptions = [
    { value: 'gift', label: 'Regalo' },
    { value: 'discount', label: 'descuento' },
    { value: 'freeShipping', label: 'Envío gratis' }
]

const ModalPromotion = ({ modalAction, setOpenModal, openModal, selectedPromo, fetchDataPromo }: any) => {

    const [dataInfo, setDataInfo] = useState<propsData>({
        promotionName: '',
        minimumAmount: '',
        typePromotion: '',
        startDate: '',
        endDate: '',
        active: false,
        category: ''
    })

    const splitCollections = (text: string | null | undefined): string[] => {
        if (!text || typeof text !== 'string') return []
        return text.split(',').map(item => item.trim()).filter(Boolean)
    }

    const resetDataInfo = () => {
        setDataInfo({
            promotionName: '',
            minimumAmount: '',
            typePromotion: '',
            startDate: '',
            endDate: '',
            active: false,
            category: ''
        })
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        resetDataInfo()
    }

    const handleUpdatePromo = async () => {
        const { id } = selectedPromo

        try {
            const body = {
                documentId: id,
                ...dataInfo
            }

            await updatePromotionModule(body)

            alert('La promoción a sido actualizada con exito')
            fetchDataPromo()
            setOpenModal(false)
            resetDataInfo()

        } catch (error) {
            alert('Ocurrio un error borrando la promoción')
        }
    }

    const handleDeletePromo = async () => {

        const { id } = selectedPromo
        try {
            await deletePromotionModule(id)

            alert('La promoción a sido eliminada con exito')
            fetchDataPromo()
            setOpenModal(false)
            resetDataInfo()

        } catch (error) {
            alert('Ocurrio un error borrando la promoción')
        }
    }

    const handleCreatePromo = async () => {
        try {
            const body = {
                ...dataInfo,
                category: splitCollections(dataInfo.category)
            }

            await postPromotionModule(body)

            alert('La promoción a sido creada con exito')
            fetchDataPromo()
            setOpenModal(false)
            resetDataInfo()
        } catch (error) {
            alert('Ocurrio un error creando la promoción')
        }
    }

    const handleConfirmationModal = () => {

        switch (modalAction) {
            case 'create':
                handleCreatePromo()
                break;

            case 'delete':
                handleDeletePromo()
                break;

            case 'edit':
                handleUpdatePromo()
                break;

            default:
                break;
        }
    }

    useEffect(() => {

        if (modalAction !== 'edit') return
        
        setDataInfo({
            ...dataInfo,
            promotionName: selectedPromo.promotionName,
            minimumAmount: selectedPromo.minimumAmount,
            typePromotion: selectedPromo.typePromotion,
            active: selectedPromo.active,
            category: selectedPromo.category
        })


        return () => {
            console.log("Se desmonta el componente")
            resetDataInfo()
        }
    }, [selectedPromo])

    return (
        <div>
            <ModalDialog
                centered
                isOpen={openModal}
                onClose={handleCloseModal}
                cancelation={{
                    onClick: handleCloseModal,
                    label: 'Cancelar',
                }}
                confirmation={{
                    onClick: handleConfirmationModal,
                    label: 'Envíar',
                }}
            >
                {modalAction === 'create' || modalAction === 'edit' ? (
                    <div className="flex flex-column flex-row-ns">
                        <div className="w-100 w-50-ns mv4 mr5">
                            <div className="w-100 mv6">
                                <Input
                                    label="Nombre"
                                    placeholder="Nombre de la promoción"
                                    size="large"
                                    onChange={(e: any) => {
                                        e.persist();
                                        setDataInfo(prev => ({ ...prev, promotionName: e?.target?.value }))
                                    }
                                    }
                                    value={dataInfo.promotionName}
                                />
                            </div>
                            <div className="w-100 mv6">
                                <Input
                                    label="Monto minimo"
                                    placeholder="Monto minimo"
                                    type="number"
                                    size="large"
                                    onChange={(e: any) => {
                                        e.persist();
                                        setDataInfo(prev => ({ ...prev, minimumAmount: e?.target?.value }))
                                    }
                                    }
                                    value={dataInfo.minimumAmount}
                                />
                            </div>
                            <div className="w-100 mv6">
                                <Dropdown
                                    label="Tipo de promoción"
                                    options={typeOptions}
                                    value={dataInfo.typePromotion}
                                    onChange={(e: any) =>
                                        setDataInfo(prev => ({ ...prev, typePromotion: e?.target?.value }))
                                    }
                                />
                            </div>
                            <div className="w-100 mv6">
                                <Input
                                    label="Categoría (Separar por comas para muchas categorías)"
                                    placeholder="Categoría"
                                    size="large"
                                    onChange={(e: any) => {
                                        e.persist();
                                        setDataInfo(prev => ({ ...prev, category: e?.target?.value }))
                                    }
                                    }
                                    value={dataInfo.category}
                                />
                            </div>
                        </div>
                        <div className="w-100 w-50-ns mv4">
                            <div className="w-100 mv6">
                                <DatePicker
                                    label="Fecha inico"
                                    size="large"
                                    value={dataInfo.startDate}
                                    onChange={(date: any) => setDataInfo(prev => ({ ...prev, startDate: date }))}
                                    locale="es-US"
                                />
                            </div>
                            <div className="w-100 mv6">
                                <DatePicker
                                    label="Fecha fin"
                                    size="large"
                                    value={dataInfo.endDate}
                                    onChange={(date: any) => setDataInfo(prev => ({ ...prev, endDate: date }))}
                                    locale="es-US"
                                />
                            </div>
                            <div className="w-100 mv6">
                                <Toggle
                                    label="Activo"
                                    checked={dataInfo.active}
                                    onChange={() =>
                                        setDataInfo(prev => ({ ...prev, active: !prev.active }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ) : modalAction === 'delete' ? (
                    <div>
                        <p className="f3 f3-ns fw3 gray">
                            ¿Estas seguro que quieres eliminar esta promoción?
                        </p>
                        <p>
                            Una vez eliminado no se puede volver a recuperar y debe ser creado desde cero.
                        </p>
                    </div>
                ) : null
                }

            </ModalDialog>
        </div>
    )
}

export default ModalPromotion