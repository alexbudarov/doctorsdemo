import { useMemo } from "react";
import { SelectField, SelectFieldProps } from "react-admin";

export interface EnumFieldProps extends Omit<SelectFieldProps, "choices"> {
  enum: Record<string, string>;
  enumTypeName: string;
}

/**
 * React Admin SelectField fot enums with localized enum captions.
 *
 * @param props
 * @constructor
 */
export const EnumField = (props: EnumFieldProps) => {
  const choices = useMemo(
    () =>
      Object.values(props.enum).map((value: string) => ({
        id: value,
        name: `enums.${props.enumTypeName}.${value}`,
      })),
    [props.enum, props.enumTypeName]
  );
  return <SelectField choices={choices} {...props} />;
};
