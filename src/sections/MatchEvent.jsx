function MatchEvent({ event, match }) {

    const ApiUrl = "http://localhost:3001";

    return (

        < div >
            <div className="imso_gf__bg-off">
                <div className="imso_gf__gf-itm">
                    <div className="imso_gf__gf-pht">
                        <div className="imso_gf__photo-img-cs">
                            <img
                                className="imso_gf__photo-img"
                                src={`${ApiUrl}/${event.imageEvent}`}
                                alt="" /></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MatchEvent;