import { useParams } from "react-router-dom";
import Assignments from '../components/Assignments';
import Navbar from '../components/Navbar';

function Facilities(){
    const {type} = useParams();

    return(
        
        <div className="Assignments">
            <Navbar />
            {
                {
                    'homeworks': <Assignments type={type} />,
                    'supplies': <Assignments type={type} />,
                    'cafe': null,
                }[type]
            }
        </div>
    );
}

export default Facilities;