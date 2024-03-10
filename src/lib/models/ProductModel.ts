export type Product ={
    _id?: string
    name: string
    slug: string
    image: string
    bannrt?: string
    price: number
    brand: string
    description: string
    category: string
    rating: number
    numReviews: number
    countInStock: number
    colors?: []
    sizes?: []
}