import '../style/tabs.scss';
import Feedback from './feedback/Feedback';
import Messenger from './messenger/Messenger';
import Home from './tour/Home';

function Tabs(){
    return(
        <div className="tab-content">
            <Home adminMode={false}/>
            <Messenger/>
            <Feedback adminMode={false}/>
        </div>
    );
}

export default Tabs;