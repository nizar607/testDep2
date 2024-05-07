import { Horizontal } from "../../../wizards/components/Horizontal";
import { useParams } from "react-router-dom";


const DivisionConfig = () => {

    const  {id : divisionId}  = useParams();
    const  {tournamentid : tournamentId}  = useParams();
    console.log('tournament id dans compoenent division id', tournamentId);
    console.log('division id dans compoenent division id', divisionId);
    return (
        <>
        
        <Horizontal divisionId={divisionId} tournamentId={tournamentId} />
        </>
    )
};

export default DivisionConfig;