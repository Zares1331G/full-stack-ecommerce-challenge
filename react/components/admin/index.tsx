import React, { useState, useEffect } from 'react'
import { Layout, PageHeader, Table, Toggle } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'
import { getPromotionModule } from '../../utils/fetchPromtions'
import ModalPromotion from './ModalPromotion'


const AdminPromotions = () => {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const fetchDataTags = async () => {
            try {
                const dataProductTag = await getPromotionModule()

                setData(dataProductTag)

            } catch (error) {
                console.error('Error al obtener tags:', error)
                setData([])
            }
        }

        fetchDataTags()

        return () => {

        }
    }, [])


    const handleToggleActive = async (rowData: any) => {
        const { id, active } = rowData

        try {
            /* const body = {
              documentId: id,
              active: !active,
            } */

            //await updateProductTags(body)
            // Actualizas el estado en lugar de recargar
            setData(prev =>
                prev.map(tag =>
                    tag.id === id ? { ...tag, active: !active } : tag
                )
            )
        } catch (err) {
            console.error('Error actualizando estado activo:', err)
        }
    }

    const customSchema = {
        properties: {
            promotionName: {
                title: "Name",
                with: 50
            },
            typePromotion: {
                title: "Type",
                with: 50
            },
            minimumAmount: {
                title: "Minimum Amount",
                with: 50
            },
            active: {
                title: "Active",
                with: 100,
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
                cellRenderer: (()=>{
                    return (
                        <div>
                            Actions
                        </div>
                    )
                })
            }
        }
    }

    return (
        <Layout
            pageHeader={
                <PageHeader
                    title={<FormattedMessage id="admin-promotions.hello-world" />}
                />
            }
        >
            <ModalPromotion />
            <Table
                schema={customSchema}
                items={data}
                indexColumnLabel="Index"
                toolbar={{
                    label: 'New',
                    handleCallback: () => alert('handle new line callback')
                }}
            />
        </Layout>
    )
}

export default AdminPromotions