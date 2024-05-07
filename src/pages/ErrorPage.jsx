import { Component, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorImage from '../assets/images/404.png';


const title = 'Oops! This Page Not Found';
const desc = 'We are Really Sorry But the Page you Requested is Missing';
const btnText = 'Go Back to Home';


function ErrorPage() {


    return (
    

        <div className="hero d-flex align-items-center justify-content-center">
            <div className="container text-center">
                <div className="section-wrapper">
                    <div className="zero-item">
                        <div className="zero-thumb">
                            <img src={ErrorImage} className="img-fluid" alt="404" />
                        </div>
                       

                        <div className="zero-content">
                            <h2>{title}</h2>
                            <p>{desc} <i className="icofont-worried"></i></p>
                            <Link to="/" className="default-button reverse-effect"><span>{btnText} <i className="icofont-double-right"></i></span> </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default ErrorPage;