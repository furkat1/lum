"use server";
import { ProductPage } from "@/features/products/components/product-page";

interface Props {
  params: Promise<{
    productId: string;
  }>;
}

export default async function Product({ params }: Props) {
  const { productId } = await params;

  return <ProductPage productId={productId} />;
}
