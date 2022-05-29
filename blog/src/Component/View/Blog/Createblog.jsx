import React, { useEffect, useState } from 'react'
import Header from '../../Header-Footer/Header'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import axios, { Axios } from 'axios';
import { message } from 'antd';
import { useParams } from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs';
const Createblog = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { id } = useParams()
  console.log(id, "id");
  const [fileimage, setFileimage] = useState(null);
  const [fileaudio, setFileaudio] = useState(null);
  const [filevideo, setFilevideo] = useState(null);

  const [data, setData] = useState({
    blogtitle: '',
    blogdescription: '',
    blogimage: '',
    blogaudio: '',
    blogvideo: '',
    imagepath: '',
    audiopath: '',
    videopath: '',

  })

  const [errormessage, setErrormessage] = useState(null)


  const validationcommon = (value, type) => {
    console.log(value, "value");
    switch (type) {

      case 'string': {
        if (value) {
          if (value && value.trim()) {
            return true;
          } else if (value && value.length() > 10) {
            return 'message'
          }
          else {
            return false;

          }
        }
        return 'empty';
      }



      case 'description': {
        if (value) {
          if (value && value.trim()) {
            return true;
          } else {
            return false;
          }
        }
        return 'empty';
      }


      case 'blogimage': {
        if (value) {
          if (value && value.trim()) {
            return true;
          } else {
            return false;
          }
        }
        return 'empty';
      }

      case 'blogaudio': {
        if (value) {
          if (value && value.trim()) {
            return true;
          } else {
            return false;
          }
        }
        return 'empty';
      }

      case 'blogvideo': {
        if (value) {
          if (value && value.trim()) {
            return true;
          } else {
            return false;
          }
        }
        return 'empty';
      }



      default:
        break;
    }

  }

  const keyupValdation = (e, type) => {
    const { name, value } = e.target
    const res = validationcommon(value, type)
    let error
    if (res === 'empty') {
      error = "* Enter your " + name
      return error;

    } else if (res === false) {
      error = "* Enter your valid " + name
      return error;
    }
    else if (res === 'message') {
      error = "* Enter less than 100 character in " + name
      return error;
    }
  }

  const onKeyDown = (e, type) => {
    if (e.key === "Tab") {
      const { name, value } = e.target
      keyupValdation(e, type)
      setData({
        ...data, [name]: value
      })
      console.log(e.target.files, "eeeeeeeee");
      if (e.target.name === "blogimage") {
        if (e.target.files) {
          setFileimage(e.target.files[0])
        }
      }
      if (e.target.name === "blogaudio") {
        if (e.target.files) {
          setFileaudio(e.target.files[0])
        }
      }
      if (e.target.name === "blogvideo") {
        if (e.target.files) {
          setFilevideo(e.target.files[0])
        }
      }
      let error = keyupValdation(e, type)
      if (error) {
        e.preventDefault();

        setErrormessage({ ...errormessage, [name]: error })
        return error;
      } else {
        setErrormessage({ ...errormessage, [name]: '' })
        return error;

      }
    }
  };

  const blogdata = (e, type) => {
    const target = e.target
    const name = target.name
    const value = target.value
    setData({
      ...data, [name]: value
    })
    if (e.target.name === "blogimage") {
      if (e.target.files) {
        setFileimage(e.target.files[0])
      }
    }
    if (e.target.name === "blogaudio") {
      if (e.target.files) {
        setFileaudio(e.target.files[0])
      }
    }
    if (e.target.name === "blogvideo") {
      if (e.target.files) {
        setFilevideo(e.target.files[0])
      }
    }

    let error = keyupValdation(e, type)
    if (error) {
      setErrormessage({ ...errormessage, [name]: error })
      return error;
    } else {
      setErrormessage({ ...errormessage, [name]: '' })
      return error;

    }
  }

  console.log(errormessage, "errormessage");
  console.log(data, "data");

  const submit = (e) => {
    e.preventDefault()
    if (
      errormessage.blogtitle != "") {
      message.error("Fill all the Input field")
    }
    else {
      if (!id) {
        let formData = new FormData();

        formData.append('token', sessionStorage.getItem("token"));
        formData.append('blogimage', document.querySelector('#blogimage').files[0]);
        formData.append('blogaudio', document.querySelector('#blogaudio').files[0]);
        // formData.append('blogvideo', document.querySelector('#blogvideo').files[0]);
        formData.append('blogtitle', data.blogtitle)
        formData.append('blogdescription', data.blogdescription);
        axios.post("http://localhost:8080/insert/blogadd", formData)
          .then(res => {
            message.success("Image insert successfully")
            console.log(res);
          })
          .catch(err => {
            console.log("error has occured while on update : " + err)
          })
      }
      else {
        let formData = new FormData();

        formData.append('id', id);
        formData.append('blogimage', document.querySelector('#blogimage').files[0]);
        formData.append('blogaudio', document.querySelector('#blogaudio').files[0]);
        // formData.append('blogvideo', document.querySelector('#blogvideo').files[0]);
        formData.append('blogtitle', data.blogtitle)
        formData.append('blogdescription', data.blogdescription);
        axios.post("http://localhost:8080/update/blogupdate", formData)
          .then(res => {
            message.success("data update successfully")
            console.log(res);

          })
          .catch(err => {
            console.log("error has occured while on update : " + err)
          })
      }

    }


  }

  useEffect(() => {
    if (id != null) {

      axios.get(`http://localhost:8080/fetch/blogdatabyid/${id}`)
        .then(res => {
          console.log(res.data.blogdatabyid, "res in id");
          setData({
            ...data,
            blogaudio: res.data.blogdatabyid.blogaudio,
            blogvideo: res.data.blogdatabyid.blogvideo,
            blogimage: res.data.blogdatabyid.blogimage,
            blogtitle: res.data.blogdatabyid.blogtitle,
            blogdescription: res.data.blogdatabyid.blogdescription,
            imagepath: res.data.blogdatabyid.blogimage,
            audiopath: res.data.blogdatabyid.blogaudio,
            videopath: res.data.blogdatabyid.blogvideo,
          })
          
        })
        .catch(err => {
          console.log("error has occured while on update : " + err)
        })
    }

  }, [])

  console.log(fileimage, "fileimaget");
  useEffect(() => {
    setData({
      ...data, blogdescription: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
  }, [editorState])

  console.log(editorState,"editorStateeditorState");
  return (
    <>
      <div className='createblog'>

        {/*Header start here  */}
        <Header></Header>

        {/* Add blog start here */}

        <div className="container">
          <h1>Create Blog</h1>
          <form action="" encType="multipart/form-data" className='createblogform' id='blogform'>
            <div className="form-group">
              <label for="blogtitle">Blog title <span>*</span></label>
              <input type="text"
                name="blogtitle"
                id='blogtitle'
                placeholder='Enter Blog Title Here.'
                value={data.blogtitle}
                onChange={(e) => blogdata(e, 'string')}
                onKeyDown={(e) => onKeyDown(e, 'string')}
              ></input>
            </div>
            {errormessage && errormessage.blogtitle !== '' ? <p className='errormessage'>{errormessage.blogtitle}</p> : null}


            <div className="form-group">
              <Editor
                id='texteditor'
                editorState={editorState}
                // toolbarClassName="toolbarClassName"
                // wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                placeholder="Enter Description Here"
                value={data.blogdescription}
               
              />
            </div>
           

            <div className="form-group">
              <label for="blogimage">Blog Image <span>*</span></label>
              <input
                className="form-control form-control-lg"
                type="file"
                id="blogimage"
                name='blogimage'
                accept='.jpeg,.jpg, .phg, .gif, .tiff, .psd, .pdf, .eps, .ai'
                onChange={(e) => blogdata(e)}
                onKeyDown={(e) => onKeyDown(e)}
              ></input>

            </div>
            {errormessage && errormessage.image !== '' ? <p className='errormessage'>{errormessage.image}</p> : null}
            {fileimage ? <img id="blogidImage" src={fileimage ? URL.createObjectURL(fileimage) : null} alt={fileimage ? fileimage.name : null} /> : <p>{data.imagepath === '' ? null : <img src={`${data.imagepath}`} id='blogidImage'></img>}</p>}


            <div className="form-group">
              <label for="blogaudio">Blog audio <span>*</span></label>
              <input
                className="form-control form-control-lg"
                type="file" id="blogaudio"
                name='blogaudio'

                accept='.m4a, .flac, .mp3, .mp4, .wav, .wma, .aac'
                onChange={(e) => blogdata(e)}
                onKeyDown={(e) => onKeyDown(e)}
              ></input>

            </div>
            {errormessage && errormessage.audio !== '' ? <p className='errormessage'>{errormessage.audio}</p> : null}
            <audio controls autoplay muted> <source src={`${data.audiopath}`} type="audio/mpeg"></source></audio>
            {fileaudio ?
              <audio controls autoplay muted> <source src={fileaudio ? URL.createObjectURL(fileaudio) : null} type="audio/mpeg"></source></audio> :
              <p>
                {data.audiopath === ''
                  ? null
                  : <audio controls autoplay muted> <source src={`${data.audiopath}`} type="audio/mpeg"></source></audio>}</p>}


            {/* <div className="form-group">
              <label for="blogvideo">Blog video <span>*</span></label>
              <input
                className="form-control form-control-lg"
                type="file"
                id="blogvideo"
                name='blogvideo'
                accept='.mp4, .mov, .wmv, .flv, .avi, .avchd, .webm, .mkv'
                onChange={(e) => blogdata(e)}
                onKeyDown={(e) => onKeyDown(e)}
              ></input>

            </div> */}
            {errormessage && errormessage.video !== '' ? <p className='errormessage'>{errormessage.video}</p> : null}
            {
              !id ? <button type="button" onKeyDown={onKeyDown} onClick={(e) => submit(e)} className="sub btn btn-primary">Create Blog</button> : <button type="button" onClick={(e) => submit(e)} onKeyDown={onKeyDown} className="sub btn btn-primary">Update Blog</button>
            }

          </form>

        </div>

      </div>

    </>
  )
}

export default Createblog