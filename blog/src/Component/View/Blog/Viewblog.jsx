import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../Header-Footer/Header'
import Footer from '../../Header-Footer/Footer'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from 'react-router-dom';
const Viewblog = () => {

  const [bloguserlist, setbloguserlist] = useState('')
  useEffect(() => {
    axios.post("http://localhost:8080/fetch/bloglistuser", {
      "token": sessionStorage.getItem("token")
    })
      .then(res => {
        console.log(res);
        setbloguserlist(res.data.blogusercollection)
      })
      .catch(err => {
        console.log("error has occured while on update : " + err)
      })
  }, [])
  const deleterow = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert border border-dark rounded">
            <h1 className="alert__title">Are you sure?</h1>
            <p className="alert__body">You want to delete this file?</p>
            <button onClick={onClose} className="btn alert__btn alert__btn--no btn-primary p-2 m-2">No</button>
            <button 
              onClick={() => {
                handleClickDelete(id);
                onClose();
              }}
              className="btn alert__btn alert__btn--yes btn-danger  p-2 m-2"
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });

  }

  const handleClickDelete = (id) => {
    console.log(id);
    axios.post("http://localhost:8080/delete/deleteblog", {
      "id": id
    })
      .then(res => {
        console.log(res);
        window.location.reload();
      })
      .catch(err => {
        console.log("error has occured while on update : " + err)
      })
  }
  console.log(bloguserlist, "bloguserlist");
  return (
    <>
      <Header></Header>
      <div className="bloglist-user mt-5">
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Blog Title</th>
              <th scope="col">Blog Description</th>
              <th scope="col">Blog Image</th>
              <th scope="col">Blog Audio</th>
              <th scope="col">Actio</th>

              {/* <th scope="col">Blog Video</th> */}


            </tr>
          </thead>
          <tbody>
            {bloguserlist && bloguserlist.length > 0 ?
              bloguserlist.map((data, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{data.blogtitle}</td>
                  
                    <td>  <div dangerouslySetInnerHTML={{__html: data.blogdescription}}></div></td>

                    <td> {data.blogimage ? <img className='blogimage' src={data.blogimage}></img> : "Not Provided"}</td>
                    <td> {data.blogaudio ? <audio className='blogaudio' controls> <source src={data.blogaudio} type="audio/ogg"></source>
                    </audio> : "Not Provided"}</td>
                    {/* <td> {data.blogvideo ? <video className='blogimage' controls> <source src={data.blogvideo} type="video/mp3"></source>
                    </video> : "Not Provided"}</td> */}
                    <td>
                    <Link className='editicon'
                          to={{
                            pathname: `/editblog/${data._id}`,
                            // state: { users: e }
                          }}
                        >
                          <ion-icon name="create-outline"></ion-icon>
                        </Link>
                      
                      <span className='delteicon' id={data._id} onClick={() => deleterow(data._id)}> <ion-icon name="trash-outline"></ion-icon></span>
                     
                      </td>


                  </tr>
                )
              })
              : <span>"No record Found"</span>}

          </tbody>
        </table>
      </div>


      <Footer></Footer>

    </>
  )
}

export default Viewblog