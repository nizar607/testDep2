import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

function Subtitution({ event, match }) {

    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        console.log("event ", event);
    }, [event]);

    return (
        < div >
            <div>
                <div className="imso_gf__bg-on">
                    <div className="imso_gf__gf-itm">
                        <div>
                            <div>
                                <div className="imso_gf__in-card-hr">
                                    <FontAwesomeIcon className="text-success ms-2" icon={faArrowUp} />
                                    <FontAwesomeIcon className="text-danger me-3" icon={faArrowDown} />
                                    <div className="imso_gf__nofold">
                                        <div className="imso_gf__fh-ttl">SUBSTITUTION
                                        </div>
                                        <div className="imso_gf__fh-sub">78'</div>
                                    </div>
                                </div>
                                <div className="imso_gf__hdr-div"></div>
                            </div>
                            <div>
                                <div className="imso_gf__in-card-hr">
                                    <div className="m-4">
                                        <div className="text-success">IN</div>

                                        <div className="text-white">
                                            {event?.player?.firstName} {event?.player?.lastName}

                                            <div className="imso_gf__pl-desc">

                                                <div
                                                    className="col-auto ms-auto">
                                                    <FontAwesomeIcon className="text-success" icon={faArrowUp} />

                                                </div>

                                                <div
                                                    className="imso_gf__pl-info imso-hide-overflow imso-loa">
                                                    Man City ·
                                                    Defender #82</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-auto ms-auto">
                                        <div className="border border-white rounded-circle" >
                                            <div className="imso_gf__pl-hd-ph">
                                                <img
                                                    id="dimg_JCYsZrWXGvyo9u8P78m1sAk_25"
                                                    src={`${apiUrl}/${event.player.avatar}`}
                                                    className="YQ4gaf zr758c"
                                                    height="48" width="48"
                                                    alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="imso_gf__in-card-hr">
                                    <div className="m-4">
                                        <div className="text-danger">OUT</div>

                                        <div className="text-white">
                                            {event?.substitute?.firstName} {event?.substitute?.lastName}

                                            <div className="imso_gf__pl-desc">

                                                <div className="col-auto ms-auto">
                                                    <FontAwesomeIcon className="text-danger" icon={faArrowDown} />
                                                </div>

                                                <div
                                                    className="imso_gf__pl-info imso-hide-overflow imso-loa">
                                                    Man City ·
                                                    Defender #82</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-auto ms-auto ">
                                        <div className="border border-white rounded-circle" >
                                            <div className="imso_gf__pl-hd-ph">
                                                <img
                                                    id="dimg_JCYsZrWXGvyo9u8P78m1sAk_25"
                                                    src={`${apiUrl}/${event.substitute?.avatar}`}
                                                    className="YQ4gaf zr758c"
                                                    height="48" width="48"
                                                    alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>
                                <div className="imso_gf__cs-div"></div>
                            </div>
                            <div className="imso_gf__xtxt"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default Subtitution;