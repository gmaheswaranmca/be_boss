import MenusProgrammers from "./MenusProgrammers";
import TopHeaderLeft from "./TopHeaderLeft";

export default function Menus({ programmer }) {
    return(
        <>
            <hr/>
            <div>
                <TopHeaderLeft/>
                {programmer && 
                (<div style={{display:'inline-block'}}>Welcome {programmer}!!!</div>)
                }
            </div>
            <hr/>
            <MenusProgrammers/>
        </>
    );
}