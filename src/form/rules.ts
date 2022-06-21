import { ValidationRule } from "react-hook-form";

type Rules = {
  required?: boolean | ValidationRule<boolean>;
  min?: number | ValidationRule<number>;
  max?: number | ValidationRule<number>;
  minLength?: number | ValidationRule<number>;
  maxLength?: number | ValidationRule<number>;
  pattern?: RegExp | ValidationRule<RegExp>;
  validate?: (value: any) => boolean | object;
};

export default Rules;
