// import React from 'react'
// import ShowModal from './MovieModal'

// const MovieCard = ({
//   title,
//   release_date,
//   poster_path,
//   overview,
//   popularity,
//   vote_count,
//   vote_average,
//   original_language,
// }) => {
//   return (
//     <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
//       <div className="card">
//         <div className="card-header">
//           <h4 className="card-title">{title}</h4>
//         </div>
//         <div className="card-image">
//           <figure className="image">
//             <img
//               src={`https://image.tmdb.org/t/p/w185/${poster_path}`}
//               alt={title}
//             />
//           </figure>
//           <div className="card-content">
//             <h5 className="subtitle">
//               {release_date}
//               <div id="showModalButton">
//                 <ShowModal
//                   title={title}
//                   release_date={release_date}
//                   poster_path={poster_path}
//                   overview={overview}
//                   popularity={popularity}
//                   vote_count={vote_count}
//                   vote_average={vote_average}
//                   original_language={original_language}
//                 />
//               </div>
//             </h5>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MovieCard