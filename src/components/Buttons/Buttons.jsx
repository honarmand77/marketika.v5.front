import React,  { useState, useEffect } from 'react';
import './Buttons.scss'

export default function Buttons({Lable , type , Icon , OnClick , name ,id }) {


  return (
    <>
        <button id={id} className={`Buttons-Container ${type}`} onClick={OnClick} name={name}>
           {Icon ?<span name={name}>{Icon}</span> : ""}
           {Lable ? <strong id={id} name={name}>{Lable} </strong> : ''}

        </button>
    </>
  )
}
