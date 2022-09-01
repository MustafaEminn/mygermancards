import { Select, SelectProps } from "antd";
import { ArticlesSelectEnum } from "../../../constants/components/UI/articles_select";

const { Option } = Select;

export const ArticlesSelect = (props: SelectProps) => {
  return (
    <Select {...props}>
      <Option value={ArticlesSelectEnum.empty}>-</Option>
      <Option value={ArticlesSelectEnum.der}>der</Option>
      <Option value={ArticlesSelectEnum.die}>die</Option>
      <Option value={ArticlesSelectEnum.das}>das</Option>
    </Select>
  );
};
