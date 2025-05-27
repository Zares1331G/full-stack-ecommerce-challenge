import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Table, Toggle, Button, IconDelete, IconEdit } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { getPromotionModule, updatePromotionModule } from '../../utils/fetchPromtions'
import ModalPromotion from './ModalPromotion'


const AdminPromotions = () => {
    const [data, setData] = useState<any[]>([])
    const [modalAction, setModalAction] = useState<string>('')
    const [openModal, setOpenModal] = useState(false)
    const [selectedPromo, setSelectedPromo] = useState<any>()

    const fetchDataPromo = async () => {
        try {
            const dataProductTag = await getPromotionModule()

            setData(dataProductTag)

        } catch (error) {
            console.error('Error al obtener tags:', error)
            setData([])
        }
    }

    const handleToggleActive = async (rowData: any) => {
        const { id, active } = rowData

        try {
            const body = {
              documentId: id,
              active: !active,
            }

            await updatePromotionModule(body)
            // Actualizas el estado en lugar de recargar
            setData(prev =>
                prev.map(data =>
                    data.id === id ? { ...data, active: !active } : data
                )
            )
        } catch (err) {
            console.error('Error actualizando estado activo:', err)
        }
    }

    const handleCreatePromotion = () => {
        setOpenModal(prev => !prev)
        setModalAction('create')
    }

    const customSchema = {
        properties: {
            promotionName: {
                title: "Name",
                width: 200
            },
            typePromotion: {
                title: "Type",
                width: 100
            },
            minimumAmount: {
                title: "Amount",
                width: 100
            },
            category: {
                title: "Categoría",
                width: 100
            },
            active: {
                title: "Active",
                width: 100,
                cellRenderer: ({ cellData, rowData }: any) => {

                    return (
                        <Toggle
                            checked={cellData}
                            onChange={() => handleToggleActive(rowData)}
                        />
                    )
                },
            },
            actions: {
                title: 'Actions',
                width: 100,
                cellRenderer: (({ rowData }: any) => {
                    return (
                        <div>
                            <span
                                className='mr5'
                                style={{ cursor: 'pointer', marginRight: '10px' }}
                                onClick={() => {
                                    setOpenModal(prev => !prev)
                                    setModalAction('edit')
                                    setSelectedPromo(rowData)
                                }}
                            >
                                <IconEdit />
                            </span>
                            <span
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setOpenModal(prev => !prev)
                                    setModalAction('delete')
                                    setSelectedPromo(rowData)
                                }}
                            >
                                <IconDelete />
                            </span>
                        </div>
                    )
                })
            }
        }
    }

    useEffect(() => {

        fetchDataPromo()

        return () => { }
    }, [])

    return (
        <Layout
            pageHeader={
                <PageHeader
                    title={<FormattedMessage id="admin-promotions.hello-world" />}
                />
            }
        >
            <Button onClick={handleCreatePromotion}>Nueva promoción</Button>
            <ModalPromotion
                modalAction={modalAction}
                setOpenModal={setOpenModal}
                openModal={openModal}
                selectedPromo={selectedPromo}
                fetchDataPromo={fetchDataPromo}
            />
            <Table
                schema={customSchema}
                items={data}
                indexColumnLabel="Index"
            />
        </Layout>
    )
}

export default AdminPromotions