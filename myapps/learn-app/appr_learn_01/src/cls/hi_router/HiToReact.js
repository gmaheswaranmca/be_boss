import { Component } from 'react';
import WrapRouter from './WrapRouter';
class HiToReactRouterLess extends Component {
    onGoToHiToRakesh = (event) => {
        this.props.router.navigate("/programmer/Rakesh")
    }
    render () { 
        return(
            <>
            <h3>Hi React!!!!</h3>
            <button type="button" onClick={this.onGoToHiToRakesh}>Hi To Rakesh, a react programmer</button>
            </>
        );
    }
}
const HiToReact = WrapRouter(HiToReactRouterLess);
export default HiToReact;