import React from 'react'
import style from "./Message.module.css"

export default function Message({ variant, message }) {
  return <div className={`${style.message} ${style[variant]}`}>{message}</div>
}
