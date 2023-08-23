import React, { useEffect, useState } from 'react'
import "./UpdateUser.scss"
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import actUser from '../../Redux/actionCenima/actUser'
import Popup from '../Popup/Popup'

function UpdateUser(props) {
    const email = localStorage.getItem("Email")
    const nav = useNavigate()
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPasswordNew] = useState("")

    const [emailErr, setEmailErr] = useState("")
    const [nameErr, setNameErr] = useState("")
    const [passwordErr, setPasswordErr] = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);

    const Update = () => {
        const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (re.test(Email) == false) {
            setEmailErr("Email không hợp lệ")
            return
        }
        else {
            setEmailErr("")
            if (Name == "") {
                setNameErr("Vui lòng nhập tên mới")
                return
            }
            else {
                setNameErr("")
                if (Password.length < 8) {
                    setPasswordErr("Vui lòng nhập mật khẩu")
                    return
                }
            }
        }
        const updateUser = {
            Email: Email,
            Name: Name,
            Password: Password,
        }
        fetch("https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/user/user", {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "PUT",
            body: JSON.stringify(updateUser)
        }).then(res => {
            if (res.status === 200) {
                setShowPopup2(true)
                //nav("/user")
            }
            else {
                setShowPopup(true)
            }
        })
    }
    useEffect(() => {
        props.GetUser()
    }, [Update])

    const handleClosePopup = () => {
        setShowPopup(false)
    }
    const handleClosePopup2 = () => {
        setShowPopup2(false)
        nav("/user")
    }
    return (
        <div className='UpdateUser'>
            <div className='Container'>
                <div className='tab'>
                    THÔNG TIN THÀNH VIÊN
                </div>
                <div className='Content'>
                    <p>Nhập Email của bạn</p>
                    <input
                        value={Email}
                        placeholder='Email'
                        type='text'
                        onChange={(e) => { setEmail(e.target.value) }}
                    /><br />
                    {emailErr && <span>{emailErr}</span>}
                    <p>Họ và tên mới</p>
                    <input
                        value={Name}
                        placeholder='Name'
                        type='text'
                        onChange={(e) => { setName(e.target.value) }}
                    /><br />
                    {nameErr && <span>{nameErr}</span>}
                    <p>Nhập mật khẩu xác nhận</p>
                    <input
                        value={Password}
                        placeholder='Password'
                        type='password'
                        onChange={(e) => { setPasswordNew(e.target.value) }}
                    /><br />
                    {passwordErr && <span>{passwordErr}</span>}
                    <button onClick={Update}>Cập Nhật</button>
                </div>
                {showPopup && <Popup noti="Email hoặc password không đúng" onClose={handleClosePopup} />}
                {showPopup2 && <Popup noti="Cập nhật thành công" onClose={handleClosePopup2} />}
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataUser: globalState.userManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetUser: () => {
            dispath({
                type: actUser.GET_USER
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
