import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header-Footer/Header'

const  Home = () => {
  const [bloglistdata,setbloglistdata] = useState('')
  useEffect(()=>{
    axios.get("http://localhost:8080/fetch/bloglist")
    .then(res => {
      console.log(res,"res");
      setbloglistdata(res.data.blogcollection)
    })
    .catch(err => {
      console.log("error while fetch blog list",err);
    },[bloglistdata])

  })
  // console.log(bloglistdata,"bloglistdata");
  return (
    <>
    {/* Header */}
    <Header></Header>

    <div className="conatiner">
      <div className="row">
      <div className="col-12 m-5">
          {bloglistdata && bloglistdata.length > 0 ?
          bloglistdata.map((data,i) => {
            return (
              
              <div className="card mt-3">
                <h5 class="card-title">{data.blogtitle}</h5>
                {data.blogimage ?<img class="card-img-top" src={data.blogimage} ></img> : null }
                <p class="card-text"><div dangerouslySetInnerHTML={{__html: data.blogdescription}}></div></p>
                {data.blogaudio ? <audio className='card-footer' controls> <source src={data.blogaudio} type="audio/ogg"></source>
                    </audio> : "Not Provided"}
              </div>
            
            )
          })
          : "No Blog Found"}
         </div>
      </div>
    </div>
    </>
  )
}

export default Home