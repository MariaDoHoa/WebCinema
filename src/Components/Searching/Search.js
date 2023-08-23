import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import actCenima from '../../Redux/actionCenima/actCenima';
import './Search.scss'

function Search(props) {

  const { searchKeyword } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const nav = useNavigate()

  useEffect(() => {
    props.GetDataCenima()
  }, [])

  const lsMovieNow = props.dataCenima.lsDataCenima?.movieShowing
  const lsMovieSoon = props.dataCenima.lsDataCenima?.movieCommingSoon

  useEffect(() => {
    const MovieAll = [...lsMovieNow, ...lsMovieSoon];
    const filteredMovies = MovieAll.filter(movie =>
      movie.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    setSearchResult(filteredMovies);
  }, [searchKeyword])

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
    <div className='Search'>
      <div className='Container'>
        <div className='infoMovie'>
          {searchResult.length > 0 ? (
            searchResult.map(movie => (
              <>
                <img src={movie.imageLandscape} alt='poster movies' />
                <div className='content'>
                  <div>
                    <h2>{movie.name}</h2>
                    <h3>{movie.subName}</h3>
                    <p>Khởi chiếu: <span>{new Date(`${movie.startdate}`).toLocaleString()}</span></p>
                    <p>Lượt xem: <span>{movie.views}</span></p>
                    <div>
                      <span dangerouslySetInnerHTML={{ __html: movie.description }} />
                    </div>
                  </div>
                  <button className="btnMuave" value={movie.id} onClick={() => {GetMovieId(movie.id, movie.name, movie.imageLandscape)}}>MUA VÉ</button>
                </div>
              <br/>

              </>
            ))
          ) : (
            <p>Phim bạn tìm không tồn tại.</p>
          )}
        </div>
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
    GetDataCenima: () => {
      dispath({
        type: actCenima.GET_DATA_CENIMA
      })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
