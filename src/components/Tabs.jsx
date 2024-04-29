import '../style/tabs.scss';
import Messenger from './messenger/Messenger';
import Home from './tour/Home';

function Tabs(){
    return(
        <div className="tab-content">
            <Home adminMode={false}/>
            <Messenger/>
        </div>
    );
}

export default Tabs;