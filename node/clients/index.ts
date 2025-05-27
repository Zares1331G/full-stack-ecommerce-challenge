import { IOClients } from '@vtex/api'
import PromotionModule from './promotionModule'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get promotionModule() {
    return this.getOrSet('promotionModule', PromotionModule)
  }
}
