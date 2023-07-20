/* eslint-disable @next/next/no-img-element */

import React, { useContext } from "react";
import AppMenuitem from "./AppMenuitem";
import { LayoutContext } from "./context/layoutcontext";
import { MenuProvider } from "./context/menucontext";
import Link from "next/link";
import { AppMenuItem } from "../types/types";

const AppMenu = () => {
  const { layoutConfig } = useContext(LayoutContext);

  const model: AppMenuItem[] = [
    {
      label: "Home",
      items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
    },
    {
      label: "UI Components",
      items: [
        {
          label: "Form Layout",
          icon: "pi pi-fw pi-id-card",
          to: "/uikit/formlayout",
        },
        {
          label: "Input",
          icon: "pi pi-fw pi-check-square",
          to: "/uikit/input",
        },
        {
          label: "Float Label",
          icon: "pi pi-fw pi-bookmark",
          to: "/uikit/floatlabel",
        },
        {
          label: "Invalid State",
          icon: "pi pi-fw pi-exclamation-circle",
          to: "/uikit/invalidstate",
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={item.label} />
          ) : (
            <li className="menu-separator"></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
