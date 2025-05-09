import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, TabContent, TabPane } from "reactstrap";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import request from "@/Utils/AxiosUtils";
import { product } from "@/Utils/AxiosUtils/API";
import Loader from "@/Components/CommonComponent/Loader";
import HomeBannerTab from "./SingleProductTabs/HomeBannerTab";
import ServicesTab from "./SingleProductTabs/ServicesTab";
import GridBannerTab from "./SingleProductTabs/GridBannerTab";
import ProductVideoTab from "./SingleProductTabs/ProductVideoTab";
import SingleProductTab from "./SingleProductTabs/SingleProductTab";
import ProductListTab from "./SingleProductTabs/ProductListTab";
import TestimonialTab from "./SingleProductTabs/TestimonialTab";
import SocialMediaTab from "./SingleProductTabs/SocialMediaTab";
import BrandTab from "./SingleProductTabs/BrandTab";

const AllTabsSingleProduct = forwardRef(({ activeTab, values, setFieldValue, apiData = {} }, ref) => {
  const { categoryData, blogData, brandData, categoryLoader, brandLoader, categoryRefetch } = apiData;
  const [search, setSearch] = useState(false);
  const [customSearch, setCustomSearch] = useState("");
  const [tc, setTc] = useState(null);

  const {
    data: productData,
    isLoading: productLoader,
    refetch,
  } = useQuery(
    [product],
    () =>
      request({
        url: product,
        params: {
          status: 1,
          search: customSearch ? customSearch : "",
          paginate: values["content"]?.["products_ids"]?.length > 15 ? values["content"]?.["products_ids"]?.length : 15,
          ids: customSearch ? null : values["content"]["products_ids"].join() || null,
          with_union_products: values["content"]?.["products_ids"]?.length ? (values["content"]?.["products_ids"]?.length >= 15 ? 0 : 1) : 0,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (res) =>
        res?.data?.data.map((elem) => {
          return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage, slug: elem?.slug };
        }),
    }
  );

  useImperativeHandle(ref, () => ({
    call() {
      refetch();
    },
  }));

  // Added debouncing
  useEffect(() => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setCustomSearch(search), 500));
  }, [search]);
  // Getting users data on searching users
  useEffect(() => {
    refetch();
  }, [customSearch]);

  if (productLoader || categoryLoader) return <Loader />;

  return (
    <Col xl="7" lg="8">
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <HomeBannerTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} />
        </TabPane>
        <TabPane tabId="2">
          <ServicesTab values={values} setFieldValue={setFieldValue} />
        </TabPane>
        <TabPane tabId="3">
          <GridBannerTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} />
        </TabPane>
        <TabPane tabId="4">
          <ProductVideoTab values={values} setFieldValue={setFieldValue} />
        </TabPane>
        <TabPane tabId="5">
          <SingleProductTab setSearch={setSearch} productData={productData} />
        </TabPane>
        <TabPane tabId="6">
          <ProductListTab setSearch={setSearch} productData={productData} />
        </TabPane>
        <TabPane tabId="7">
          <TestimonialTab values={values} setFieldValue={setFieldValue} />
        </TabPane>
        <TabPane tabId="8">
          <SocialMediaTab values={values} setFieldValue={setFieldValue} setSearch={setSearch} productData={productData} categoryData={categoryData} />
        </TabPane>
        <TabPane tabId="9">
          <BrandTab values={values} setFieldValue={setFieldValue} brandData={brandData} brandLoader={brandLoader} />
        </TabPane>
      </TabContent>
    </Col>
  );
});
export default AllTabsSingleProduct;
