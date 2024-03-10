import { create } from 'zustand'
import { round2 } from '../utils'
import { OrderItem } from '../models/OrderModel'
import { exit } from 'process'

type Cart = {
    items: OrderItem[]
    itemsPrice: number
    taxPrice: number
    shippingPrice: number
    totalPrice: number
}
const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0
}

// Create the store with Zustand, combining the status interface and actions
export const cartStore = create<Cart>(() => initialState)

export default function useCartService() {
    const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore();
    return {
        items,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        increase: (item: OrderItem) => {
            const exist = items.find((x) => x.slug === item.slug)
            const updatedCartItems = exist
                ? items.map((x) =>
                    x.slug === item.slug ? { ...exist, qty: exist.qty + 1 } : x
                )
                :
                [...items, { ...item, qty: 1 }]
            const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calcPrice(updatedCartItems)
        }
    }
}

const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
        shippingPrice = round2(itemsPrice > 100 ? 0 : 100),
        taxPrice = round2(Number(0.15 * itemsPrice)),
        totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}