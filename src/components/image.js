
import {useState, useEffect} from 'react'
import Button from './button.js'

const Image = ({url,title,date,desc}) => {
    const [showShort, setShort] = useState(true)
    const [liked, setLike] = useState(false)
    var maxLength = 300;

    function onClick(){
        setShort(!showShort)
    }

    return(
        <div className="col-md-4">
            <div className="card">
                <img className="card-img-top" alt={title} src={url}/>
                <h5 className="card-title">{title}</h5>
                <div className='flex'>
                    <h6>{date}</h6>
                    <button type="button" onClick={(() => setLike(!liked))} className={liked ? "btn btn-danger" : "btn btn-light"}>{!liked ? "Like" : "Unlike" }</button>
                </div>
                <p className="card-text">{desc.length>maxLength && showShort && desc.substring(0,maxLength)+"..."}
                {(desc.length<maxLength || !showShort) && desc}</p>
                {desc.length>maxLength && <Button onClick={onClick} showShort={showShort}/>}
            </div>
        </div>
    )
}

export default Image;