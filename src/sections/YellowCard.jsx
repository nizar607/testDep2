import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
function YellowCard({ event, match }) {

    const apiUrl = import.meta.env.VITE_API_URL;

    if (!event) return null;

    function getTeamImage() {
        console.log("event.player.id ", match.team1.players.filter((player) => player._id == event.player._id))
        return match.team1.players.filter((player) => player._id == event.player._id).length > 0 || match.team1.subtitutes.find((player) => player._id == event.player._id) > 0 ? match.team2.logo : match.team1.logo
    }
    return (

        <div className="imso_gf__bg-on">
            <div className="imso_gf__gf-itm">
                <div>

                    <div className="container-fluid">

                        <div className="row my-3">
                            <FontAwesomeIcon className="col-auto text-warning ms-3" icon={faSquare} />

                            <div className="col-auto imso_gf__fh-ttl">YELLOW CARD</div>
                            <div className="col-auto imso_gf__fh-sub ms-auto">76'</div>

                        </div>

                        <hr className="row" />

                    </div>


                    <div className="container">

                        <div className="row my-3 d-flex align-items-center ps-3">




                            <img className="col-auto img-fluid"
                                alt="team logo"
                                src={`${apiUrl}/${getTeamImage()}`}
                                style={{ height: "30px", width: "auto" }} />


                            <div className="col-auto text-white">
                                erling halland
                            </div>

                            <div
                                className="col-auto ms-auto ">
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
                    </div>
                </div>
            </div>
        </div >
    )
}


export default YellowCard;