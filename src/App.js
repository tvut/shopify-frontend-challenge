import {useState, useEffect} from 'react'
import Image from './components/image.js'
import './App.css';

function App() {
  const [images, setImages] = useState([])
  const [perSet, setPage] = useState(12)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)

  const getImages = async () => {
    setLoading(true)
    const tasksFromServer = await fetchImages()
    setImages(tasksFromServer)
    setLoading(false)
  }

  useEffect(() => {
    getImages()
  }, [])

  function formatDate(d){
    var date = new Date(d)
    var month = date.getMonth()+1
    var year = date.getFullYear()
    var day = date.getDate()

    if(month.length<2)month="0"+month
    if(day.length<2)day="0"+day
    return year+"-"+month+"-"+day;
  }

  const fetchImages = async () => {
    const date = new Date();
    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate()-offset)
    const startDay = formatDate(start)
    const lastDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()-perSet-offset)
    const endDay = formatDate(lastDay)

    const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=ylE9aPdweaa1eDTXz0GV4S1yeyNtq5IKa6m7bvLN&start_date=${endDay}&end_date=${startDay}`)
    const data = await res.json()
    console.log(data.reverse())
    return data
  }

  function backPage(){
    setOffset(offset+perSet);
    getImages();
  }

  function forwardPage(){
    setOffset(offset-perSet);
    getImages();
  }

  return (
    <div className="App">
      {!loading && <h1 style={{textAlign: "left"}}>Spacestagram</h1>}
      {loading && <div className='loading'><h1>Loading images...</h1></div>}
      <div className='row'>
      {!loading && images.filter((photo) => photo.url.includes(".jpg")).map((photo) => (<Image key={photo.title} url={photo.url} title={photo.title} date={photo.date} desc={photo.explanation}/>))}
      </div>
      <div className='container'>
      <button type="button" onClick={backPage} style={{float:"left"}} className="btn btn-primary">Go Back</button>
      {offset!==0 && <button type="button" onClick={forwardPage} style={{float:"right"}} className="btn btn-primary">Go Forward</button>}
      </div>
    </div>
  );
}

export default App;
