import { memo } from 'react';
function MenusProgrammers() {
    const programmer_names = ["Nithin", "Rakesh", "Maheswaran", "Viji", "Muralidharan"];
    return(        
        <div>
            <ul>
                {programmer_names.map( (name) => {
                return (<li style={{listStyleType: 'none', display: 'inline-block'}} key={name}>
                    <a href={`/programmer/${name}`}>Say Hi To {name}</a>&nbsp;|&nbsp;
                    </li>);
                } /* end each mapper HOF */
                ) /* end 'map' call*/} 
            </ul>
        </div>
    );
}
export default memo(MenusProgrammers);