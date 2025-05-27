import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

interface propsPromotionModule {
    active: boolean
    category: string
    endDate: string
    minimumAmount: string
    promotionName: string
    startDate: string
    typePromotion: string
}

export default class PromotionModule extends ExternalClient {
    constructor(ctx: IOContext, options?: InstanceOptions) {
        super(`http://${ctx.account}.vtexcommercestable.com.br`, ctx, {
            ...options,
            headers: {
                ...(options?.headers ?? {}),
                'X-Vtex-Use-Https': 'true',
                VtexIdClientAutCookie: ctx.adminUserAuthToken ?? ctx.authToken,
                'user-agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
    }

    public postProductTag(body: propsPromotionModule) {
        return this.http.post('/api/dataentities/PM/documents', body)
    }

    public getAllPromotionModule() {
        return this.http.get('/api/dataentities/PM/search', {
            params: {
                _fields: '_all',
                _size: 1000,
            },
            headers: {
                'REST-Range': 'resources=0-1000',
            },
        })
    }

    public deletePromotionModule(documentId: string) {        
        return this.http.delete(`/api/dataentities/PM/documents/${documentId}`)
    }

    /* 
        public patchProductTag(documentId: string, body: propsProductTad) {
            return this.http.patch(`/api/dataentities/PT/documents/${documentId}`, body)
        }
    
        public deleteProductTag(documentId: string) {        
            return this.http.delete(`/api/dataentities/PT/documents/${documentId}`)
        } */

}
