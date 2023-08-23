import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Register.scss"
import Popup from '../Popup/Popup'

export default function Register() {
    const nav = useNavigate()
    const [showPopup, setShowPopup] = useState(false)

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [Role, setRole] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [roleErr, setRoleErr] = useState("")


    const DangKy = () => {
        const re = /^[a-z][\w-\.]*@([a-z0-9-]+\.)+[a-z-]{2,4}$/;
        const text = /^[\p{L}\s]+$/u;
        if (re.test(Email) == false) {
            setEmailErr("Email không hợp lệ")
            return
        }
        else {
            setEmailErr("")
            if (text.test(Name) == false) {
                setNameErr("Vui lòng nhập Tên, là chữ không nhập số")
                return
            }
            else {
                setNameErr("")
                if (Password.length < 8) {
                    setPasswordErr("Password trên 8 kí tự")
                    return
                }
                else {
                    setPasswordErr("")
                    if (Role == "") {
                        setRoleErr("Vui lòng nhập role")
                        return
                    }
                }
            }
        }
        const requesRegister = {
            Email: Email,
            Name: Name,
            Password: Password,
            Role: Role
        }
        fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user", {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(requesRegister)
        }).then(res => {
            if (res.status === 200) {
                setShowPopup(true)
            }
        })
    }
    const handleClosePopup = () => {
        setShowPopup(false)
        nav("/login")
    }
    return (
        <div className='Register'>
            <div className='Container'>
                <div className='tab'>
                    <div className='tab1'>
                        <Link to={"/login"} style={{ color: "white" }}>Đăng Nhập</Link>
                    </div>
                    <div className='tab2'>
                        <Link to={"/register"} style={{ color: "salmon" }}>Đăng Ký</Link>
                    </div>
                </div>
                <div className='Content'>
                    <input value={Email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' /><br />
                    {emailErr && <span className="error" id="EmailError">{emailErr}</span>}
                    <input value={Name} onChange={(e) => { setName(e.target.value) }} placeholder='Name' /><br />
                    {nameErr && <span className="error" id="EmailError">{nameErr}</span>}
                    <input value={Password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' type='password' /><br />
                    {passwordErr && <span className="error" id="EmailError">{passwordErr}</span>}
                    <input value={Role} onChange={(e) => { setRole(e.target.value) }} placeholder='Role' /><br />
                    {roleErr && <span className="error" id="EmailError">{roleErr}</span>}
                    <p>Tôi đã đọc và đồng ý với <span>CHÍNH SÁCH</span> của chương trình.</p>
                    <button onClick={DangKy}>Đăng Ký</button>
                </div>
                {showPopup && <Popup noti="Đăng kí thành công" onClose={handleClosePopup} />}
            </div>
        </div>
    )
}
