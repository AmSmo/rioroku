import React from 'react'

import YouTube from 'react-youtube'
function Rolled(props) {

    return (
        <div onClick={() => props.setOpen(false)}>
            <YouTube
                videoId={'dQw4w9WgXcQ'}
                opts={
                    {playerVars:{autoplay:1}}
                }
            />
        </div>
    )
}

export default Rolled