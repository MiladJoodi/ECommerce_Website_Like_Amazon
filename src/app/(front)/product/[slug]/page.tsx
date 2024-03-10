import data from "@/lib/models/data";
import Image from "next/image";
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
                <div className="md:col-span-2">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={600}
                        height={640}
                        sizes="100vw"
                        style={{
                            width: '100%',
                            height: 'auto'
                        }}
                    />
                </div>

                <div>
                    <ul className="space-y-4">
                        <li>
                            <h1 className="text-xl">
                                {product.name}
                            </h1>
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
}

export default ProductDetails;