import React from "react";
import css from "@shared/styles/components/button.module.css";

type buttonStyle = "filled" | "outlined" | "icon" | "text";

interface ButtonProps {
  text: string;
  style?: buttonStyle;
  onClick?: () => void;
  buttonType?: "button" | "submit" | "reset";
  backgroundColor?: string;
  textColor?: string;
  maxWidth?: string;
  icon?: React.ReactNode;
  styles?: React.CSSProperties;
  disabled?: boolean; 
}

export default function CustomButton(props: ButtonProps) {
  const { text, buttonType, textColor = '#ffffff', icon, maxWidth = '330px', backgroundColor = 'var(--primary-color)', onClick, styles, disabled } = props;

  return (
    <button
      onClick={disabled ? undefined : onClick} 
      style={{ color: textColor, maxWidth, backgroundColor, ...styles }}
      className={css.button} 
      type={buttonType ?? "button"}
      disabled={disabled} 
    >
      {text}
    </button>
  );
}
