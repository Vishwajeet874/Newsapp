
import React, { Component } from 'react'

export class Newsitem extends Component {
    render() {
        let {title,description,imageurl,newsurl,author,date,source}=this.props;
        return (
            <div className="my-3">
                <div className="card" style={{width: "18rem",backgroundColor:'cornsilk'}}>
                    <img src={imageurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {source.slice(0,5)}..
                            <span className="visually-hidden">unread messages</span>
                        </span>
                        </h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsurl} target="#" className="btn btn-sm btn-dark">Read More..</a>
                    </div>
                    </div>
            </div>
        )
    }
}

export default Newsitem
