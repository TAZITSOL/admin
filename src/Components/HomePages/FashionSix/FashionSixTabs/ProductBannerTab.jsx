import CheckBoxField from "@/Components/InputFields/CheckBoxField";
import FileUploadField from "@/Components/InputFields/FileUploadField";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";
import SimpleInputField from "@/Components/InputFields/SimpleInputField";
import { mediaConfig } from "@/Data/MediaConfig";
import { getHelperText } from "@/Utils/CustomFunctions/getHelperText";
import { useTranslation } from "react-i18next";
import { RiArrowDownLine } from "react-icons/ri";

const SliderProductsTab = ({ values, setFieldValue, helpertext, productData, setSearch }) => {
  const { t } = useTranslation("common");
  return (
    <>
      <CheckBoxField name={`[content][product_banner][status]`} title="status" />
      <FileUploadField paramsProps={{ mime_type: mediaConfig.image.join(",") }} name="sliderProductImage" title="image" id="sliderProductImage" showImage={values["sliderProductImage"]} type="file" values={values} setFieldValue={setFieldValue} helpertext={getHelperText(helpertext || "806x670px")} />
      <div className="shipping-accordion-custom">
        <div className="p-3 rule-dropdown d-flex justify-content-between">
          {values["content"]?.["product_banner"]?.["product_slider_1"]?.["title"] || "Text Here"}
          <RiArrowDownLine />
        </div>
        <div className="rule-edit-form">
          <SimpleInputField nameList={[{ name: "[content][product_banner][product_slider_1][title]", placeholder: t("enter_title"), title: "title" }]} />
          <SearchableSelectInput
            nameList={[
              {
                name: "sliderProduct1",
                title: "products",
                inputprops: {
                  name: "sliderProduct1",
                  id: "sliderProduct1",
                  options: productData || [],
                  setsearch: setSearch,
                },
              },
            ]}
          />
          <CheckBoxField name="[content][product_banner][product_slider_1][status]" title="status" />
        </div>
      </div>
    </>
  );
};
export default SliderProductsTab;
