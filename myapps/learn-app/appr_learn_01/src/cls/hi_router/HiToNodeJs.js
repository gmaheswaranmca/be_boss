import { Component } from 'react';
import WrapRouter from './WrapRouter';

class HiToNodeJsRouterLess extends Component {
    
    onGoToHiToNithin = (event) => {        
        this.params.router.navigate("/programmer/Nithin")
    }
    render () { 
        return(
            <>
            <h3>Hi Node JS!!!!</h3>
            <button type="button" 
                onClick={this.onGoToHiToNithin}>Hi To Nithin, a Node JS programmer</button>
            </>
        );
    }
}
const HiToNodeJs = WrapRouter(HiToNodeJsRouterLess);
export default HiToNodeJs;