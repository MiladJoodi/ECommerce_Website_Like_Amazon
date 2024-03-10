import data from "@/lib/models/data";
import Link from "next/link";

const ProductDetails = ({ params }: { params: { slug: string } }) => {

    const product = data.products.find((item) => item.slug === params.slug)

    if (!product) {
        return <div>Product not found</div>
    }
    return (
        <>
            <div className="my-2">
                <Link href="/">back to products</Link>
            </div>
            <div className="grid md:grid-cols-4 md:gap-3">

            </div>
        </>
    );
}

export default ProductDetails;