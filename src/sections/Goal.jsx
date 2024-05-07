import React from 'react';
import { useEffect, useState } from "react";

function Goal({ event, match }) {

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
                    <div className="container-fluid pt-3"
                        style={{ backgroundColor: "#003399" }} >
                        <div className="row d-flex justify-content-center">
                            <img
                                className="col-auto img-fluid"
                                src="https://ssl.gstatic.com/onebox/sports/game_feed/goal_icon.svg" />
                            <div className="dgDgVc">GOOOAAALLL!!!</div>
                            <div className="MmmFqe">62'</div>
                        </div>
                        <div className="row text-white d-flex align-items-center" style={{ minHeight: "50px", backgroundColor: "#2954a9" }}>
                            <div className="imso_gf__scr">
                                <div className="imso_gf__scr-t1 imso_gf__nemph">
                                    {match.team1.name}
                                </div>
                                <div className="imso_gf__scr-val imso_gf__nemph">
                                    {event?.score?.team1}
                                </div>
                                <div className="imso_gf__nemph"> - </div>
                                <div className="imso_gf__scr-val imso_gf__emph">
                                    {event?.score?.team2}
                                </div>
                                <div className="imso_gf__scr-t2 imso_gf__emph">
                                    {match.team2.name}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container">

                        <div className="row my-3 d-flex align-items-center">


                            <img className="col-auto img-fluid"
                                alt="team logo"
                                src={`${apiUrl}/${getTeamImage()}`}
                                style={{ height: "30px", width: "auto" }} />


                            <div className="col-auto text-white">
                                {event.player.firstName} {event.player.lastName}
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
        </div>

    )
}


export default Goal;