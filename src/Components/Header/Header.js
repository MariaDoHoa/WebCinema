import React, { useEffect, useState } from 'react'
import "./Header.scss"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { connect } from "react-redux";
import actUser from '../../Redux/actionCenima/actUser';
import SlideShow from '../SlideShow/SlideShow';

function Header(props) {
    const email = localStorage.getItem("Email")
    const location = useLocation();
    const isHomePages = location.pathname === "/"
    const nav = useNavigate()

    useEffect(() => {
        props.GetUser()
    }, [])


    const Login = () => {
        nav("login")
    }

    const Logout = () => {
        localStorage.removeItem("Email")
        nav("/")
    }

    const BackHome = () => {
        nav("/")
    }
    const [searchKeyword, setSearchKeyword] = useState('')


      const handleEnterPress = event => {
        if (event.key === 'Enter') {
          nav(`/search/${searchKeyword}`);
          setSearchKeyword('')
        }
      };

    const userName = props.dataUser.lsUser.find(n => n.Email == email)
    return (
        <div className='Header'>
            <div className='Container'>
                <div className='Logo'>
                    <img onClick={BackHome} href="/" src="./img/logoheader.png" alt='Logo' />
                    <input
                        type="text"
                        value={searchKeyword}
                        onChange={e => setSearchKeyword(e.target.value)}
                        onKeyDown={handleEnterPress}
                        placeholder="Nhập tên phim để tìm kiếm"
                    />
                    {
                        userName ? <button onClick={Logout}>Đăng Xuất</button> : <button onClick={Login}>Đăng Nhập</button>
                    }
                </div>
            </div>
            {isHomePages && ( // Chỉ hiển tị component SlideShow ở trang chủ những trang khác không hiện
                <div className='Slider'>
                    <SlideShow />
                </div>
            )}
            <div className='NavBar'>
                <ul>
                    <li><Link to="/">Trang Chủ</Link></li>
                    <li><Link to="/ticket">Mua vé</Link></li>
                    <li><Link to="/ticketcenima">Rạp</Link></li>
                    <li style={{ borderRight: "unset" }}>
                        {userName ? <Link to="user">Chào mừng {userName.Name} trở lại</Link> : <Link to="user">Thành viên</Link>}
                    </li>
                </ul>
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataUser: globalState.userManage,
        dataCenima: globalState.dataManage,

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
export default connect(mapStateToProps, mapDispatchToProps)(Header);
