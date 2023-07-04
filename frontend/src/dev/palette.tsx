import { Category, Component, Palette, Variant } from "@react-buddy/ide-toolbox";
import { CardListTemplate } from "./CardListTemplate";
import { DataGridTableTemplate } from "./DataGridTableTemplate";
import { GridCardListTemplate } from "./GridCardListTemplate";
import { SimpleCardListTemplate } from "./SimpleCardListTemplate";
import { TreeTableTemplate } from "./TreeTableTemplate";

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
      <Component name="Table">
        <Variant name="DataGrid" proto={DataGridTableTemplate} />
        <Variant name="Tree Data" proto={TreeTableTemplate} />
      </Component>
    </Category>
  </Palette>
);
