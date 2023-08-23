
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// export default function Booking() {
//   const [cinema, setCinema] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const {id} = useParams();
//   useEffect(() => {
//     fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movie/${id}`)
//       .then(res => res.json())
//       .then(dt => setCinema(dt))
//       setLoading(false);
//   }, [])
//   console.log(cinema)

//   if (loading) {
//     return <div>Loading...</div>;
//   }
  
//   return (
//   <>
//       {cinema?.map((v, i) => (
//         <div className="container">
//           <div className="left-column">
//               <p>id: {v.id}</p>
//               <p>name: {v.name}</p>
//               <p>code: {v.code}</p>
//           </div>
//           <div className="right-column">
//           {
//             v.dates?.map((v, i) => {
//               return (
//                 <tr>
//                   <td key={i}>
//                       <p>{v.showDate},{v.dayOfWeekLabel}</p>
//                         <p>{v.bundles[0].version} - {v.bundles[0].caption == 'sub' ? 'phụ đề' : ''} {v.bundles[0].sessions.map((v1, i1) => {
//                             return (
//                               <button key={i1}>{v1.showTime}</button>
//                                   )
//                               })}</p>
//                           </td>
//                       </tr>
//                   )
//               })
//             } 
//           </div>
//           </div>
//       ))}
// </>
// )
// }
