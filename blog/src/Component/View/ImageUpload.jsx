import React, { useState } from 'react'
import Header from '../Header-Footer/Header'
import Footer from '../Header-Footer/Footer'
import { message } from 'antd';
import  Axios  from 'axios';


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
        if(fileimage){
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
            
        else{
            message.error("Image not instered")
        }
    }
    console.log(imagedata, "imagedata");
    console.log(fileimage, "fileimage");

    return (
        <>
            <div className="container">
                {/* Header */}
                <Header></Header>

                {/* Image Upload */}


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
                                    <label for="image"  className=" btn btn-primary text-white text-center" >Upload Image</label>

                                }
                                <input id="image" style={{ display: "none" }} type="file" accept=".jpeg, .jpg, .png, .gif" name='image' onChange={(e) => update(e)}></input>
                            </div>

                            <div className="form-group">
                                <button className='btn btn-danger ml-3'>Delete Image</button>

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