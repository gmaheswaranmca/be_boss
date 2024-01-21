import { memo } from 'react';
function TopHeaderLeft() {
    return(
        <>
            <a href="/react">Say Hi To React!!!</a>&nbsp;|&nbsp;
            <a href="/node">Say Hi To Node JS!!!</a>&nbsp;|&nbsp;
        </>
    );
}

export default memo(TopHeaderLeft);