// import React, { useEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom';
// import './Booking.scss'

// export default function BookingMovies() {
//     const {id, name} = useParams()

//     const [data, setData] = useState([]);
//     const [cinemaId, setcinameId] = useState('');
//     const [selectedCinema, setSelectedCinema] = useState(null);
//     const [selectshowCode , setselectshowCode] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const res = await fetch(`https://teachingserver.org/U2FsdGVkX18MaY1VB6bVfvVBm0wdPflO/cinema/movie/${id}`);
//             if (!res.ok) {
//               throw new Error('Error fetching movie data');
//             }
//             const data = await res.json();
//             setData(data)
//             console.log(data)
//           } catch (error) {
//             console.log(error)
//           }
//         };
    
//         fetchData();
//       }, []);

//     // const handlecinemaId = (id) => {
//     //     setcinameId(id)
//     // }

//     const handleCinemaId = (cinemaId) => {
//         const selectedCinema = data.find((cinema) => cinema.id === cinemaId);
//         setSelectedCinema(selectedCinema);
//       };

//     const handleshowCode = (showCode) => {
//         setselectshowCode(showCode)
//     }

//   return (
//     <>
//     <section>
//     <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
//     <header style={{backgroundColor:'white', textAlign:'center'}}>
//       <h2 className="text-xl font-bold text-white-900 sm:text-3xl">
//       Bạn đang chọn phim <b>"{name}"</b><br/>Hãy chọn rạp bạn muốn xem phim
//       </h2>

//       <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
 
// { selectedCinema && (
    
//     <div className="bg-white p-4 sm:p-6">

//     <img
//     alt="Office"
//     src={selectedCinema.imageUrls[0]}
//     className="h-56 w-full object-cover"
//   />

//     <p className="block text-xs text-gray-500">
//       Thông tin vé
//     </p>

//       <h3 className="mt-0.5 text-lg text-gray-900">
//       Tên phim: {name}
//       </h3>
   
//     <h3 className="mt-0.5 text-lg text-gray-900">
//         Rạp: {selectedCinema.name}
//       </h3>

//       <h3 className="mt-0.5 text-lg text-gray-900">
//       Địa chỉ: {selectedCinema.address}
//       </h3>

//     <div className="mx-auto">
//   <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//     <thead className="ltr:text-left rtl:text-right">
//       <tr>
//         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//           Ngày
//         </th>
//         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//           Thứ
//         </th>
//         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//           Phiên bản
//         </th>
//         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//           Caption
//         </th>
//         <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//           Khung giờ
//         </th>
//       </tr>
//     </thead>

//     <tbody className="divide-y divide-gray-200">
//     {
//         selectedCinema.dates?.map((v, i) => {
//             return (
//                 <tr>
//                     <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                     {v.showDate}</td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{v.dayOfWeekLabel}</td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{v.bundles[0].version}</td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">{v.bundles[0].caption == 'sub' ? 'phụ đề' : ''}</td>
//                     <td className="whitespace-nowrap px-4 py-2 text-gray-700">
//                         {v.bundles[0].sessions.map((v1, i1) => {
//                             return (
//                                 <button onClick={() => handleshowCode(v1.id)} style={{border:'1', padding:'5px 10px', backgroundColor:'lightcoral', marginRight:'5px'}}key={i1}>{v1.showTime}</button>
//                             )
//                             })}
//                     </td>
//                 </tr>
//                 )
//             })
//         }
//     </tbody>
//   </table>
// </div>

//   </div>
  
//   )
// }
// </article>
//     </header>

//     <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
//     {data?.slice(0, Math.ceil(data.length / 2)).map(cinema => (
//         <li>
//         <a href="#" className="block overflow-hidden group" onClick= {() => handleCinemaId(cinema.id)}>
//           <img
//             src={cinema.imageUrls[0]}
//             alt=""
//             className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"/>

//           <div className="relative pt-3 bg-white">
//             <h2 className="text-sm text-gray-700 font-bold text-center group-hover:underline group-hover:underline-offset-4">
//               {cinema.name}
//             </h2>

//             <p className="mt-2 text-center pb-3">
//             <button onClick= {() => handleCinemaId(cinema.id)} className="text-lg lg:text-sm font-bold text-center tepy-2 px-4 rounded bg-orange-200 text-orange-700">Choice Cinema</button>
//             </p>
//           </div>
//         </a>
//       </li>
//         ))} 
//         {data?.slice(Math.ceil(data.length / 2)).map(cinema => (
//         <li>
//         <a href="#" className="block overflow-hidden group" onClick= {() => handleCinemaId(cinema.id)}>
//           <img
//             src={cinema.imageUrls[0]}
//             alt=""
//             className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"/>

//           <div className="relative pt-3 bg-white">
//             <h2 className="text-sm text-gray-700 font-bold text-center group-hover:underline group-hover:underline-offset-4">
//               {cinema.name}
//             </h2>

//             <p className="mt-2 text-center pb-3">
//             <button onClick= {() => handleCinemaId(cinema.id)} className="text-lg lg:text-sm font-bold text-center tepy-2 px-4 rounded bg-orange-200 text-orange-700">Choice Cinema</button>
//             </p>
//           </div>
//         </a>
//       </li>
//         ))}

     
//     </ul>
//   </div>
// </section>
//     </> 
//   )
// }
