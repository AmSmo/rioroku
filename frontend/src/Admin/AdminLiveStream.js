import ReactPlayer from 'react-player'

export default function AdminLiveStream(props){
return(
<ReactPlayer
    url = { props.videoId }
    opts = {
                    {
        playerVars: { autoplay: 1 },
        Volume: 1
    }
              }
    controls
    muted={true}
    playing={true}
    width="100%"
    height="100%"
/>)
}