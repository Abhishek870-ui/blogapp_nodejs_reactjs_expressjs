import React, { useEffect, useState } from 'react'
import Header from '../Header-Footer/Header'
import Footer from '../Header-Footer/Footer'
import { message } from 'antd';
import Axios from 'axios';
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";


function ImageUpload() {
    const [imagedata, setimageData] = useState({
        image: '',
        filepath: '',
    })

    const [fileimage, setFileimage] = useState(null);

    let { image } = imagedata;

    const update = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value
        setimageData({
            ...imagedata, [name]: value
        })
        if (e.target.files) {
            setFileimage(e.target.files[0])
        }

    }

    const updateimage = (e) => {
        e.preventDefault();
        if (fileimage) {
            let formData = new FormData();
            formData.append('username', sessionStorage.getItem("UserName"));
            formData.append('token', sessionStorage.getItem("token"));
            formData.append('image', document.querySelector('#image').files[0]);


            console.log("form data for update above : ", formData)

            Axios.post(`http://localhost:8080/update/imageupdated`, formData).then(res => {
                // console.log("update the data by id : ", res.data)
                //console.log("form data of an id : " + formData)
                message.success("Image insert successfully")
                console.log(res);

            })
                .catch(err => {
                    console.log("error has occured while on update : " + err)
                })
        }

        else {
            message.error("Image not instered")
        }
    }


    useEffect(()=>{
        Axios.post("http://localhost:8080/fetch/imagecollection",{
            "token" : sessionStorage.getItem("token")
        }).then(res => {
            console.log(res);
            setimageData({...imagedata, filepath : res.data.imagecollection.image})
        })
        .catch(err => {
            console.log("imagecollection err : ",  err);
        })
    },[])


    const deleteimage = (e) => {
        e.preventDefault();
        console.log("dddddd");
        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="alert">
                <h1 className="alert__title">Are you sure?</h1>
                <p className="alert__body">You want to delete this file?</p>
                <button onClick={onClose} className="alert__btn alert__btn--no">No</button>
                <button
                  onClick={() => {
                    handleClickDelete(e);
                    onClose();
                  }}
                  className="alert__btn alert__btn--yes"
                >
                  Yes, Delete it!
                </button>
              </div>
            );
          }
        });
      
      }

      const handleClickDelete = (e) => {
        Axios.post("http://localhost:8080/delete/imagedelete",{
            "token" : sessionStorage.getItem("token")
        }).then(res => {
            console.log(res);
            setimageData({...imagedata, filepath : ""})
        })
        .catch(err => {
            console.log("imagecollection err : ",  err);
        })
      }


    return (
        <>
            {/* Header */}
            <Header></Header>

            {/* Image Upload */}
            <div className="container">



                <div className='imageshow'>
                    <h2 className='imageshowheading'>Edit Profile Image</h2>
                    {fileimage ?
                        <img id="selectImage" src={fileimage ? URL.createObjectURL(fileimage) : null} alt={fileimage ? fileimage.name : null} />
                        :
                        <p>{imagedata.filepath === '' ?
                            <ion-icon name="person-circle-outline" id="Imageicon"  ></ion-icon>

                            :
                            <img src={`${imagedata.filepath}`} id='selectImage'></img>}</p>}
                </div>

                <div className='imagebutton' >
                    <form action="" encType="multipart/form-data">
                        <div className="row justify-content-center">
                            <div className="form-group">
                                
                                {fileimage ?
                                    <button className='btn btn-primary' onClick={(e) => updateimage(e)} >Update Image</button>
                                    :
                                    <label for="image" className=" btn btn-primary text-white text-center" >Upload Image</label>

                                }
                                <input id="image" style={{ display: "none" }} type="file" accept=".jpeg, .jpg, .png, .gif" name='image' onChange={(e) => update(e)}></input>
                            </div>

                            <div className="form-group">
                                <button className='btn btn-danger ml-3' onClick={(e) => deleteimage(e)}>Delete Image</button>

                            </div>
                        </div>
                    </form>



                </div>

            </div>

            {/* footer */}
            <Footer></Footer>
        </>
    )
}

export default ImageUpload