import CheckBoxField from "@/Components/InputFields/CheckBoxField";
import SearchableSelectInput from "@/Components/InputFields/SearchableSelectInput";

const AttributeTab = ({ attributeData, setSearch }) => {
  return (
    <>
      <SearchableSelectInput
        nameList={[
          {
            name: "attribute",
            title: "attribute",
            inputprops: {
              name: "attribute",
              id: "attribute",
              options: attributeData || [],
              setsearch: setSearch,
            },
          },
        ]}
      />
      <CheckBoxField name={`[content][attribute][status]`} title="status" />
    </>
  );
};

export default AttributeTab;
