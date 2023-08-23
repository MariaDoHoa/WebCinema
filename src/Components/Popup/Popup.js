import React, { useState } from 'react'
import './Popup.scss'
export default function Popup({ noti, onClose }) {

  return (
    <div className='Popup'>
      <div className="popup-container">
        <div className="popup">
          <div className="content">
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
            <div style={{color:'black'}} dangerouslySetInnerHTML={{ __html: noti.replace(/\n/g, '<br/>') }} />
          </div>
        </div>
      </div>
    </div>
  )
}
