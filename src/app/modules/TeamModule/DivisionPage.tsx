
function DivisionPage(props) {
    return (
        <div>
            <h1>Division Page</h1>
            <p>
                {JSON.stringify(props.tournament)}
            </p>
        </div>
    );
}

export default DivisionPage;