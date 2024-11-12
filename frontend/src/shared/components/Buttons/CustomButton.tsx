import React from "react";
import styles from "@shared/styles/components/button.module.css";

type buttonStyle = "filled" | "outlined" | "icon" | "text";

interface ButtonProps {
  style: buttonStyle;
  text: string;
  onClick?: () => void
  buttonType?: "button" | "submit" | "reset";
  backgroundColor?: string;
  textColor?: string;
  maxWidth?: string;
  icon?: string;
}

export default function CustomButton(props: ButtonProps) {
  const { text, buttonType, textColor = '#ffffff', icon, maxWidth = '330px', style, backgroundColor = '#2b57d8', onClick } = props;
  return (
    <button onClick={onClick} style={{ color: textColor, maxWidth, backgroundColor, }} className={styles.button} type={buttonType ?? "button"}>
      {text}
    </button>
  );
}
