import React, { useState } from 'react'
import Footer from '../Header-Footer/Footer'
import Header from '../Header-Footer/Header'
import registerlogo from '../assets/image/wallpaperflare.com_wallpaper.jpg'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
const Login = () => {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',

    })

    const [errormessage, setErrormessage] = useState(null)

    let {  email, password,  username } = data;

    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    const validationcommon = (value, type) => {

        switch (type) {

            case 'email': {
                if (value) {
                    const strings = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (value && value.match(strings) && value.trim()) {
                        return true;
                    } else {
                        return false;
                    }
                }
                return 'empty';
            }
            case 'username': {
                if (value) {
                    if (value && value.trim()) {
                        return true;
                    }

                    else {
                        return false;
                    }
                }
                return 'empty';
            }
            case 'password': {
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

   

    //in this function we call validation common function to set error message
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
    }


    //this function is used to show error by clicking on tab
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
    const update = (e, type) => {
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




    const submit = () => {
        // e.preventDefault();
        if ( errormessage.email != "" ||
            errormessage.password != "" ||
            errormessage.username != "" ) {
            // alert("Filled the all input fields")
            message.error("Fill all the Input field")
        }
        else {

            Axios.post("http://localhost:8080/update/authuser", {
                'email': data.email,
                'username': data.username,
                'password': data.password
            })
                .then(res => {
                    console.log(res.data.data)
                    message.success('login successfully.');
                    console.log(res.data.logindata.token);
                    sessionStorage.setItem("token",res.data.logindata.token)
                    sessionStorage.setItem("UserName",res.data.logindata.username)
                    sessionStorage.setItem("First_Name",res.data.logindata.fname)
                    sessionStorage.setItem("Last_Name",res.data.logindata.lname)

                    navigate("/")
                    

                })
                .catch(err => {
                    console.log("error has occured while insert new member : " + err)
                    message.error("Error while Login")
                })

        }

    }


    return (
        <>
            <div className='loginform'>
                {/* Header file start here */}
                <Header></Header>
                {/* Header file end here */}

                {/* register form start here */}
                <div className="container">
                    <div className="row row-no-gutters" id='loginform'>
                        <div className="col-6 m-0 p-0" id='loginlogoimage'>
                            <img src={registerlogo}></img>
                        </div>
                        <div className="col-6 m-0 p-0">
                            <div encType="multipart/form-data" className='loginformuserdetails'>
                                <div class="form-group">
                                    <label>UserName <span>*</span></label>
                                    <input type="text"
                                        id='username'
                                        onChange={(e) => update(e, 'username')}
                                        name="username"
                                        value={data.username}
                                        placeholder="Enter Username"
                                        className="username"
                                        onKeyDown={(e) => onKeyDown(e, 'username')}

                                    />
                                    {errormessage && errormessage.username !== '' ? <p className='errormessage'>{errormessage.username}</p> : null}
                                </div>

                                <div class="form-group">

                                    <label>Email <span>*</span></label>

                                    <input type="email"
                                        id='email'
                                        onChange={(e) => update(e, 'email')}
                                        name="email"
                                        value={data.email}
                                        placeholder="Enter Email Address"
                                        className="email"
                                        onKeyDown={(e) => onKeyDown(e, 'email')}

                                    />
                                    {errormessage && errormessage.email !== '' ? <p className='errormessage'>{errormessage.email}</p> : null}

                                </div>
                                <div class="form-group">
                                    <label>Password <span>*</span></label>
                                    <br></br>

                                    <input type={passwordType}
                                        id='password'
                                        onChange={(e) => update(e, 'password')}
                                        name="password"
                                        //  value={data.phone}
                                        placeholder="Enter password here"
                                        className="pasword"
                                        onKeyDown={(e) => onKeyDown(e, 'password')}

                                    />
                                    <button className="btn" id='passwordhide' onClick={togglePassword}>
                                        {passwordType === "password" ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
                                    </button>
                                    {errormessage && errormessage.password !== '' ? <p className='errormessage'>{errormessage.password}</p> : null}

                                </div>

                                <button type="button "

                                    onClick={(e) => submit(e)}
                                    className="sub btn btn-primary">Login</button>

                            </div>
                        </div>
                    </div>
                </div>

                {/* footer */}
                <Footer></Footer>
            </div>

        </>
    )
}

export default Login