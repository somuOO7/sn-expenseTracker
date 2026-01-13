import { Icon } from "@/constants";

interface CategoryType {
  id: string;
  title: string;
  icon: keyof typeof Icon;
}

export default CategoryType;