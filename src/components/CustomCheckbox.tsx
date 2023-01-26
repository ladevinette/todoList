import { Checkbox, styled } from "@mui/material";
import React from "react";

type Props = {};

const CheckboxIcon = styled("span")({
  background: "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)",
  width: "2px",
  height: "2px",
});

export const CustomCheckbox = (props: Props) => {
  return (
    <div>
      <CheckboxIcon />
    </div>
  );
};
