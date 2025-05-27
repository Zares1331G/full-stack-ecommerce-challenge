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

getPromotionModule

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