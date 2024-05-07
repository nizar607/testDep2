import React, { useEffect } from 'react';
import { useState } from 'react';
import { SingleEliminationBracket, Match, SVGViewer } from '@g-loot/react-tournament-brackets';

function MixedBracket({ stages }) {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        if (!stages) return;
        console.log("hani houni")
        let index = 1;
        const stagesCopy = [...stages].splice(1);

        const transformedData = stagesCopy.flatMap((stage, stageIndex) =>
            stage.groups.flatMap((group, groupIndex) =>
                group.matches.map((match, matchIndex) => {
                    const nextStage = stagesCopy[stageIndex + 1];
                    const nextMatch = nextStage
                        ? nextStage.groups.flatMap(group => group.matches).find(
                            nextMatch => nextMatch.team1._id === match.winner || nextMatch.team2._id === match.winner
                        )
                        : null;
                    const date = new Date(match.time);
                    const formattedDate = date.toLocaleString();
                    return {
                        id: match._id,
                        name: `Match ${index++}`,
                        nextMatchId: nextMatch?._id || null,
                        tournamentRoundText: `Stage ${stageIndex + 1} - Group ${groupIndex + 1}`,
                        startTime: formattedDate,
                        state: "DONE",
                        participants: [
                            {
                                _id: match.team1._id,
                                resultText: "",
                                isWinner: match.winner === match.team1._id,
                                status: null,

                                name: match.team1.name,
                                // picture: match.team1.logo,
                            },
                            {
                                _id: match.team2._id,
                                resultText: "",
                                isWinner: match.winner === match.team2._id,
                                status: null,
                                name: match.team2.name,
                                // picture: match.team2.logo,
                            },
                        ],
                    };
                })
            )
        );
        console.log("transformedData", transformedData);
        setMatches(transformedData);
    }, []);

    if (matches.length === 0) {
        return <div>Loading...</div>
    }

    return (
        <div className="latest-news">
            <div className="container">
                <div className="row">
                    <SingleEliminationBracket
                        width={1050} height={800}
                        matchComponent={Match}
                        matches={matches}
                        svgWrapper={({ children, ...props }) => (
                            <SVGViewer width={1050} height={800} {...props}>
                                {children}
                            </SVGViewer>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default MixedBracket;