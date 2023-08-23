import "./Home.scss"
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { Link, useNavigate } from 'react-router-dom'
import actCenima from "../../Redux/actionCenima/actCenima"
import actUser from "../../Redux/actionCenima/actUser"

function Home(props) {
  const nav = useNavigate()
  const email = localStorage.getItem("Email")
  // const userName = props.dataUser.lsUser.find(n => n.Email == email)

  useEffect(() => {
    sessionStorage.clear()
    props.GetDataCenima()
    props.GetUser()
  }, [])



  const lsMovieNow = props.dataCenima.lsDataCenima.movieShowing?.slice(0, 8)

  const GetMovieId = (id, name, image) => {
    const ticket = {
      idMovie: id,
      nameMovie: name,
      imgMovie: image
    }
    sessionStorage.setItem('Ticket', JSON.stringify(ticket));
    nav("/movieticketid")
  }


  return (
    <div className='Home'>
      <div className='tab'>
        <div className='tab1'>
          <Link to={"/"}>Phim Đang Chiếu</Link>
        </div>
        <div className='tab2'>
          <Link to={"/moviesoon"}>Phim Sắp Chiếu</Link>
        </div>
      </div>
      <div className='Container'>
        {
          lsMovieNow?.map((n, i) => (
            <div key={i} className='mainCarMovie'>
              <div>
                <img src={n.imagePortrait} alt={n.name} />
                <h3>{n.name}</h3>
                <p>{n.subName}</p>
                <button
                  value={n.id}
                  onClick={() => {
                    GetMovieId(n.id, n.name, n.imageLandscape);
                  }}
                >
                  MUA VÉ
                </button>
              </div>
            </div>
          ))
        }
        <div className="seemore">
          <div>
            <Link to='movienow'>Xem thêm...</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (globalState) => {
  return {
    dataCenima: globalState.dataManage,
    dataUser: globalState.userManage
  }
}
const mapDispatchToProps = (dispath) => {
  return {
    GetDataCenima: () => {
      dispath({
        type: actCenima.GET_DATA_CENIMA
      })
    },
    GetUser: () => {
      dispath({
        type: actUser.GET_USER
      })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
