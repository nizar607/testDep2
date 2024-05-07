import Players from './Players';
import Stats from './Stats';
import Matches from './Matches';
import { useEffect } from 'react';
import DivisionStats from './DivisionStats';



function DivisionContent({ division, divisionLink }) {

    useEffect(() => {
    }, [division]);

    return (
        <div className="row">
            {divisionLink === "composition" && <Stats divisionId={division._id} />}
            {divisionLink === "stats" && <DivisionStats divisionId={division._id} />}
            {divisionLink === "matches" && <Matches divisionId={division._id} />}
            {divisionLink === "players" && <Players division={division} />}
        </div>
    )
}

export default DivisionContent;