import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const URL = window.location.pathname;
  const [usercollection, setUsercollection] = useState("")

  useEffect(() => {
    if (sessionStorage.length != 0) {
      setUsercollection({
        "Username": sessionStorage.getItem("UserName"),
        "token": sessionStorage.getItem("token"),
        "fname": sessionStorage.getItem("First_Name"),
        "lname": sessionStorage.getItem("Last_Name"),

      })
    }
    else {
      setUsercollection("")
    }
  }, [])

  const logoutuser = () => {
    sessionStorage.clear()
    setUsercollection("")
    navigate("/")

  }
  const [filepath, setfilepath] = useState("")
  useEffect(() => {
    Axios.post("http://localhost:8080/fetch/imagecollection", {
      "token": sessionStorage.getItem("token")
    }).then(res => {
      console.log(res);
      setfilepath(res.data.imagecollection.image)
    })
      .catch(err => {
        console.log("imagecollection err : ", err);
      })
  }, [])


  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#"> <i class="fa-solid fa-house-user"></i>AG SOCIAL BLOG</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {usercollection === "" ?
            <ul className="navbar-nav mr-auto">
              {URL && URL === "/signup" ?
                <span>
                  <NavLink className="navbar-item" to="/" exact ><i className="fa fa-home"></i> Home </NavLink>
                  <NavLink className="navbar-item" to="/login" exact> <ion-icon name="log-in-outline"></ion-icon> Login</NavLink></span> :
                <span>{URL && URL === "/login" ?
                  <span>
                    <NavLink className="navbar-item" to="/" exact ><i className="fa fa-home"></i> Home </NavLink>
                    <NavLink className="navbar-item" to="/signup" exact><ion-icon name="arrow-redo-circle-outline"></ion-icon>Sign Up </NavLink>
                  </span> :
                  <span>
                    <NavLink className="navbar-item" to="/" exact ><i className="fa fa-home"></i> Home </NavLink>
                    <NavLink className="navbar-item" to="/signup" exact><ion-icon name="arrow-redo-circle-outline"></ion-icon>Sign Up </NavLink>
                    <NavLink className="navbar-item" to="/login" exact> <ion-icon name="log-in-outline"></ion-icon> Login</NavLink>
                  </span>}</span>}

              {/* <NavLink className="navbar-item" to="/" exact > Home </NavLink>
            <NavLink className="navbar-item" to="/signup" exact>Sign Up </NavLink>
            <NavLink className="navbar-item" to="/login" exact>  Login</NavLink> */}

            </ul>
            :
            <ul className="navbar-nav  my-2 my-lg-0">
              <li className='imagelist'>
                {filepath != '' ? <img id="accountimage" src={filepath}></img> : <ion-icon name="person-circle-outline" size="large" id="icon" ></ion-icon>}
              </li >

              <li className='' ><h3 className='text-white ml-3  username'>{usercollection.fname} {""} {""} {usercollection.lname}</h3></li >
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <ion-icon name="key-outline"></ion-icon> Account
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link class="dropdown-item" to="/imageupload"><ion-icon name="create-outline"></ion-icon>Edit Image</Link>
                  <button class="dropdown-item" onClick={() => logoutuser()} ><ion-icon name="log-out-outline"></ion-icon>Logout</button>
                </div>
              </li>


              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <ion-icon name="book"></ion-icon> Blog
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <Link class="dropdown-item" to="/createblog"><ion-icon name="duplicate-outline"></ion-icon>Create Blog</Link>
                  <Link class="dropdown-item" to="/listblog"><ion-icon name="folder-open-outline"></ion-icon>List Blog</Link>

                </div>
              </li>
            </ul>

            
          }

        </div>
      </nav>
    </>
  )
}

export default Header