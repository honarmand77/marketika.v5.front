import React from 'react'
import "./Inputs.scss"

export default function Inputs({Lable , Icon ,type , OnClick, Onchange }) {
  return (
    <div className='Inputs'>
    <div  className={`Inputs-container ${type}`} onClick={OnClick}>
    <span>
        {Icon}
    </span>
    <input placeholder={Lable} type={type}  onChange={Onchange}/>

    </div>
    </div>
  )
}
