import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

function EndOfMatch() {
    return (
        <div>
            <div className="imso_gf__bg-to-off">
                <div className="row text-white d-flex justify-content-center">
                    <FontAwesomeIcon className="my-2" icon={faStopwatch} />
                    
                    <div className="imso_gf__fdiv text-white">
                        <span className="imso_gf__fdiv-hr"></span>
                        <span className="imso_gf__fdiv-cnt text-white">END OF MATCH</span>
                        <span className="imso_gf__fdiv-hr"> </span>
                    </div>
                    <div className="imso_gf__fdiv-sub imso_gf__fdiv-sub-txt">90+6'</div>
                </div>
            </div>
        </div>
    );
}

export default EndOfMatch;