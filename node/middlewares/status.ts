/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

export async function status(ctx: Context, next: () => Promise<any>) {

  console.log(ctx.clients, "HOLA MUNDO")

  /* try {
      const response = await ctx.clients.productTag.getAllProductTag()

      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.status = 200
      ctx.body = response
  } catch (error) {
      console.log({ error })
      ctx.status = 400
      ctx.body = error
  } */

  await next()
}