import { Category, Component, Palette, Variant } from "@react-buddy/ide-toolbox";
import { Fragment } from "react";
import { CardListTemplate } from "./CardListTemplate";
import { GridCardListTemplate } from "./GridCardListTemplate";
import { SimpleCardListTemplate } from "./SimpleCardListTemplate";

export const PaletteTree = () => (
  <Palette>
    <Category name="App Templates">
      <Component name="Card List">
        <Variant name="One column" proto={CardListTemplate} />
        <Variant name="Grid" proto={GridCardListTemplate} />
      </Component>
      <Component name="Simple List">
        <Variant proto={SimpleCardListTemplate} />
      </Component>
    </Category>
  </Palette>
);

export function ExampleLoaderComponent() {
  return <Fragment>Loading...</Fragment>;
}
