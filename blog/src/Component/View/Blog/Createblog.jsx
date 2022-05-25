import React, { useEffect, useState } from 'react'
import Header from '../../Header-Footer/Header'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import { Axios } from 'axios';
import { message } from 'antd';
const Createblog = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());



  const [data, setData] = useState({
    blogtitle: '',
    blogdescription: '',
    image: '',
    audio: '',
    video: ''
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
    errormessage.blogtitle != ""  ) {
    // alert("Filled the all input fields")
    message.error("Fill all the Input field")
}
else{
  // let formData = new FormData();
  // var blogdetails = {
  //   'token': sessionStorage.getItem("token"),
  //   'image': document.querySelector('#blogimage').files[0],
  //   'audio': document.querySelector('#blogaudio').files[0],
  //   'video': document.querySelector('#blogvideo').files[0],
  //   'blogtitle': data.blogtitle,
  //   'blogdescription': data.blogdescription
  // }
  // formData.append('token', sessionStorage.getItem("token"));
  // formData.append('image', document.querySelector('#blogimage').files[0]);
  // formData.append('audio', document.querySelector('#blogaudio').files[0]);
  // formData.append('video', document.querySelector('#blogvideo').files[0]);
  // formData.append('blogtitle', data.blogtitle)
  // formData.append('blogdescription', data.blogdescription);
// console.log(formData,"formData");
console.log(data,"data");
  Axios.post("http://localhost:8080/insert/blogadd", {
      'token': sessionStorage.getItem("token"),
    'image': document.querySelector('#blogimage').files[0],
    'audio': document.querySelector('#blogaudio').files[0],
    'video': document.querySelector('#blogvideo').files[0],
    'blogtitle': data.blogtitle,
    'blogdescription': data.blogdescription
  })
  .then(res => {
    message.success("Image insert successfully")
    console.log(res);
  })
  .catch(err => {
    console.log("error has occured while on update : " + err)
})
}


  }
  useEffect(()=>{
    setData({
      ...data, blogdescription: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    })
  },[editorState])
  // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())), "blogdescription")

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
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={setEditorState}
                placeholder="Enter Description Here"
              />
            </div>


            <div className="form-group">
              <label for="blogimage">Blog Image <span>*</span></label>
              <input
                className="form-control form-control-lg"
                type="file"
                id="blogimage"
                name='image'
                accept='.jpeg,.jpg, .phg, .gif, .tiff, .psd, .pdf, .eps, .ai'
                onChange={(e) => blogdata(e)}
                onKeyDown={(e) => onKeyDown(e)}
              ></input>

            </div>
            {errormessage && errormessage.image !== '' ? <p className='errormessage'>{errormessage.image}</p> : null}



            <div className="form-group">
              <label for="blogaudio">Blog audio <span>*</span></label>
              <input
                className="form-control form-control-lg"
                type="file" id="blogaudio"
                name='audio'

                accept='.m4a, .flac, .mp3, .mp4, .wav, .wma, .aac'
                onChange={(e) => blogdata(e)}
                onKeyDown={(e) => onKeyDown(e)}
              ></input>

            </div>
            {errormessage && errormessage.audio !== '' ? <p className='errormessage'>{errormessage.audio}</p> : null}


            <div className="form-group">
              <label for="blogvideo">Blog video <span>*</span></label>
              <input
                className="form-control form-control-lg"
                type="file"
                id="blogvideo"
                name='video'
                accept='.mp4, .mov, .wmv, .flv, .avi, .avchd, .webm, .mkv'
                onChange={(e) => blogdata(e)}
                onKeyDown={(e) => onKeyDown(e)}
              ></input>

            </div>
            {errormessage && errormessage.video !== '' ? <p className='errormessage'>{errormessage.video}</p> : null}

            <button type="button "

              onClick={(e) => submit(e)}
              className="sub btn btn-primary">Create Blog</button>
          </form>

        </div>

      </div>

    </>
  )
}

export default Createblog