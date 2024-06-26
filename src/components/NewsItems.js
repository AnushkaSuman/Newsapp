import React from 'react'

 const NewsItems =(props)=> {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
      <div className="my-3">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0 }}>
          <span className="badge rounded-pill bg-danger">
            {source}
          </span>
        </div>
          <img src={!imageUrl ? "https://c.ndtvimg.com/2024-04/vfcobf6o_mango-juice_625x300_10_April_24.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=738?ver-20240506.08" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItems
