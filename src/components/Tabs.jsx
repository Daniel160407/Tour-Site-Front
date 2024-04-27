import '../style/tabs.scss';
import Home from './tour/Home';

function Tabs(){
    return(
        <div className="tab-content">
            <Home adminMode={false}/>
        </div>
    );
}

export default Tabs;