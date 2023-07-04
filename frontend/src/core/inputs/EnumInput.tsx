import { useMemo } from "react";
import { SelectInput, SelectInputProps } from "react-admin";

export interface EnumInputProps
  extends Omit<SelectInputProps, "choices" | "field" | "fieldState" | "formState"> {
  enum: Record<string, string>;
  enumTypeName: string;
}

/**
 * React Admin SelectInput fot enums with localized enum captions in dropdown.
 *
 * @param props
 * @constructor
 */
export const EnumInput = (props: EnumInputProps) => {
  const choices = useMemo(
    () =>
      Object.values(props.enum).map((value: string) => ({
        id: value,
        name: `enums.${props.enumTypeName}.${value}`,
      })),
    [props.enum, props.enumTypeName]
  );
  return <SelectInput choices={choices} {...props} />;
};
