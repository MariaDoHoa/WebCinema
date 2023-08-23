import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./User.scss"
import { connect } from 'react-redux'
import actUser from '../../Redux/actionCenima/actUser'

function User(props) {
    const nav = useNavigate()
    const email = localStorage.getItem("Email")
    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    useEffect(() => {
        sessionStorage.clear()
        props.GetUser()
        const UserInfo = props.dataUser.lsUser.find(n => n.Email == email)
        setEmail(UserInfo?.Email)
        setName(UserInfo?.Name)
    }, [])

    const ToUpdateUser = () => {
        nav("/updateuser")
    }
    const ToUpdatePassword = () => {
        nav("/updatepass")
    }
    return (
        <div className='User'>
            <div className='Container'>
                <div className='tab'>
                    <div className='tab1'>
                        <Link to={"/user"} style={{ color: "salmon" }}>Thông Tin Thành Viên</Link>
                    </div>
                    <div className='tab2'>
                        <Link to={"/history"}>Thông Tin Giao Dịch</Link>
                    </div>
                </div>
                <div className='Content'>
                    <p>Email</p>
                    <input
                        value={Email}
                        className='ip1'
                        placeholder='Email'
                        type='text' /><br />
                    <p>Họ & Tên</p>
                    <input
                        value={Name}
                        className='ip2'
                        placeholder='Name'
                        type='text' /><br />
                    <div className='btn'>
                        <button onClick={ToUpdateUser}>Chỉnh Sửa Tên</button>
                        <button onClick={ToUpdatePassword}>Thay Đổi Mật Khẩu</button>
                    </div>

                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(User);
