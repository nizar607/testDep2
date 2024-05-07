
import { Link, NavLink } from 'react-router-dom';


function Header() {
    return (
        <>

            <div className="site-mobile-menu site-navbar-target">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close">
                        <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
            </div>

            <header className="site-navbar py-4" role="banner">

                <div className="container">
                    <div className="d-flex align-items-center">

                        <div className="bg-primary">

                            <img className="position-absolute top-0 start-0" src="/src/assets/images/nnn.png" alt="logo" style={{width:'15%'}} />

                        </div>

                        <div className="ml-auto">

                            <nav className="site-navigation position-relative text-right" role="navigation">
                                <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                                    <li className="active"><NavLink to="/" className="nav-link">Home</NavLink></li>
                                    <li><NavLink to="/tournaments" className="nav-link">Tournaments</NavLink></li>
                                    <li><NavLink to="/teams" className="nav-link">Teams</NavLink></li>
                                    <li><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
                                    <li><NavLink to="/livematches" className="nav-link">Live Matches</NavLink></li>
                                </ul>
                            </nav>


                            <a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white"><span
                                className="icon-menu h3 text-white"></span></a>
                        </div>
                    </div>
                </div>

            </header >




        </>
    )
}

export default Header;