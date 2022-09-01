import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "../../../selection.json";

const Icon = (props: IconProps) => (
  <IcoMoon iconSet={iconSet} size={18} {...props} />
);

export default Icon;
