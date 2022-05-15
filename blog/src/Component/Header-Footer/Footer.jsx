import React from 'react'

function Footer() {
    return (
        <>
        <div className="d-flex flex-column ">
        <footer className="page-footer footer dashFooter  mt-auto">
                <div className="container d-flex align-items-center justify-content-between w-100 ">
                    <div className="copytext">
                        © {new Date().getFullYear()}
                        <a href="#" target="_blank">AG Blog</a>
                        | All Rights Reserved.
                    </div>
                    <ul className="quicklinks d-flex flex-wrap">
                        <li><a href="#">Privacy Policy</a ></li>
                        <li><a href="#">Terms of Services</a ></li>
                    </ul>
                </div>
            </footer >
        </div>
           
        </>
    )
}

export default Footer