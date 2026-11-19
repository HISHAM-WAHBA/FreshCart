import { Link, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import ProductInfo from "../../Components/ProductInfo/ProductInfo";
import ProductDetailsTabs from "../../Components/ProductDetailsTabs/ProductDetailsTabs";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";
import ProductDetailsSkeleton from "../../Components/Skeleton/ProductDetailsSkeleton";
import UseProductDetails from "../../Hooks/UseProductDetails";

export function ProductDetails() {
  const { id } = useParams();
  const { isLoading, productDetails, isError } = UseProductDetails(id);

  if (isLoading) return <ProductDetailsSkeleton />;

  if (isError || !productDetails) {
    return (
      <main className="page-enter min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <p className="text-gray-500 mb-6">
            This product may have been removed or is temporarily unavailable.
          </p>
          <Link
            to="/"
            className="btn bg-primary-600 text-white hover:bg-primary-700"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <PageMetaData
        title={`${productDetails.title} | MartCart`}
        description={productDetails.description}
      />
      <div className="page-enter">
        <ProductInfo productDetails={productDetails} />
        <ProductDetailsTabs productDetails={productDetails} />
        <RelatedProducts productDetails={productDetails} />
      </div>
    </>
  );
}

export default ProductDetails;
