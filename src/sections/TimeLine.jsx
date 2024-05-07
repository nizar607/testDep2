// complete simple 

import React from 'react';
import MatchEvent from './MatchEvent';
import EndOfMatch from './EndOfMatch';
import Subtitution from './Subtitution';
import YellowCard from './YellowCard';
import RedCard from './RedCard';
import Goal from './Goal';

import { useEffect, useState, useRef } from "react";
import io from 'socket.io-client';



function TimeLine({ match }) {

    const [loading, setLoading] = useState(true);





    useEffect(() => {
        if (!match) return;
        console.log("matchProps ", match);
        setLoading(false);
    }, [match]);




    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>

            {match.events?.map((event, i) => {

                return <>
                    {event.action === "imageEvent" && <MatchEvent event={event} match={match} />}
                    {event.action === "goal" && <Goal event={event} match={match} />}
                    {event.action === "red" && <RedCard event={event} match={match} />}
                    {event.action === "yellow" && <YellowCard event={event} match={match} />}
                    {event.action === "substitution" && <Subtitution event={event} match={match} />}
                </>

            })}
            <EndOfMatch />



        </>
    )
}

export default TimeLine;