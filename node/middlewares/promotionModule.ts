import { json } from 'co-body'

export async function postPromotionModule(ctx: Context, next: () => Promise<any>) {

    try {
        const data = await json(ctx.req)

        const response = await ctx.clients.promotionModule.postProductTag(data)

        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.status = 200
        ctx.body = response
    } catch (error) {
        console.log({ error })
        ctx.status = 400
        ctx.body = error
    }

    await next()
}

export async function getPromotionModule(ctx: Context, next: () => Promise<any>) {

    try {
        const response = await ctx.clients.promotionModule.getAllPromotionModule()

        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.status = 200
        ctx.body = response
    } catch (error) {
        console.log({ error })
        ctx.status = 400
        ctx.body = error
    }

    await next()
}

export async function deletePromotionModule(ctx: Context, next: () => Promise<any>) {

    try {
        const data = await json(ctx.req)

        if (!data) {
            ctx.status = 400
            ctx.body = { error: 'data is required' }

            return
        }

        await ctx.clients.promotionModule.deletePromotionModule(data.documentId)

        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.status = 200
        ctx.body = 'successful removal'
    } catch (error) {
        console.log(error)
        ctx.status = 400
        ctx.body = error
    }

    await next()
}

export async function patchPromotionModule(ctx: Context, next: () => Promise<any>) {

    try {
        const data = await json(ctx.req)

        if (!data) {
            ctx.status = 400
            ctx.body = { error: 'data is required' }

            return
        }

        if (!data.documentId) {
            ctx.status = 400
            ctx.body = { error: 'documentId is required' }

            return
        }

        const {
            documentId,
            promotionName,
            minimumAmount,
            typePromotion,
            startDate,
            endDate,
            active,
            category
        } = data;

        const body = {
            promotionName,
            minimumAmount,
            typePromotion,
            startDate,
            endDate,
            active,
            category
        }

        await ctx.clients.promotionModule.patchPromotionModule(documentId, body)

        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.status = 200
        ctx.body = "Succesful update"
    } catch (error) {
        console.log({ error })
        ctx.status = 400
        ctx.body = error
    }

    await next()
}

export async function promoCheck(ctx: Context, next: () => Promise<any>) {

    try {
        const data = await json(ctx.req)
        const allPromos = await ctx.clients.promotionModule.getAllPromotionModule()

        const validPromotions = ctx.clients.promotionModule.getValidPromotions(data, allPromos)
        
        ctx.set('Access-Control-Allow-Origin', '*')
        ctx.status = 200
        ctx.body = validPromotions
    } catch (error) {
        console.log({ error })
        ctx.status = 400
        ctx.body = error
    }

    await next()
}