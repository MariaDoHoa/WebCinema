import React, { useEffect } from 'react'
import "./MovieNow.scss"
import { connect } from 'react-redux'
import actCenima from '../../Redux/actionCenima/actCenima'
import { Link, useNavigate } from 'react-router-dom'
import SlideShow from '../SlideShow/SlideShow'

function MovieNow(props) {
    const nav = useNavigate()

    useEffect(() => {
        props.GetDataCenima()
    }, [])

    const lsMovieNow = props.dataCenima.lsDataCenima.movieShowing

    const GetMovieId = (id, name, image) => {
        const ticket = {
            idMovie: id,
            nameMovie: name,
            imgMovie: image
        }
        sessionStorage.setItem('Ticket', JSON.stringify(ticket));

        nav("/movieticketidsoon")
    }
    return (
        <div className='MovieNow'>
            <SlideShow />
            <div className='tab'>
                <div className='tab1'>
                    <Link to={"/"} style={{ color: "salmon" }}>Phim Đang Chiếu</Link>
                </div>
                <div className='tab2'>
                    <Link to={"/moviesoon"}>Phim Sắp Chiếu</Link>
                </div>
            </div>
            <div className='Container'>
                {
                    lsMovieNow?.map((n, i) => {
                        return (
                            <div key={i} className='mainCarMovie'>
                                <div>
                                    <img src={n.imagePortrait} />
                                    <h3>{n.name}</h3>
                                    <p>{n.subName}</p>
                                    <button value={n.id} onClick={() => { GetMovieId(n.id, n.name, n.imageLandscape) }}>MUA VÉ</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
const mapStateToProps = (globalState) => {
    return {
        dataCenima: globalState.dataManage
    }
}
const mapDispatchToProps = (dispath) => {
    return {
        GetDataCenima: () => {
            dispath({
                type: actCenima.GET_DATA_CENIMA
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieNow);
