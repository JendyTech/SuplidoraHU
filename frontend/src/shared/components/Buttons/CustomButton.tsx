import React from "react";
import css from "@shared/styles/components/button.module.css";

type buttonStyle = "filled" | "outlined" | "icon" | "text";

interface ButtonProps {
  text: string;
  style?: buttonStyle;
  onClick?: () => void
  buttonType?: "button" | "submit" | "reset";
  backgroundColor?: string;
  textColor?: string;
  maxWidth?: string;
  icon?: string;
  styles?: React.CSSProperties
}

export default function CustomButton(props: ButtonProps) {
  const { text, buttonType, textColor = '#ffffff', icon, maxWidth = '330px', style, backgroundColor = 'var(--primary-color)', onClick, styles } = props;
  return (
    <button
      onClick={onClick}
      style={{ color: textColor, maxWidth, backgroundColor, ...styles }}
      className={css.button} type={buttonType ?? "button"}>
      {text}
    </button>
  );
}
