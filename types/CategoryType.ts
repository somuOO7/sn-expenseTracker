import { Icon } from "@/constants";

interface CategoryType {
  title: string;
  icon: keyof typeof Icon;
}

export default CategoryType;