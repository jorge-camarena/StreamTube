import ReactPlayer from "react-player/youtube";
import "../styles/Video.scss";
import { useUserContext } from "../context/DashboardContext";
import { useEffect, useState, useRef } from "react";
import { socket } from "../socket";

function Video() {
    const ref = useRef<ReactPlayer>(null);

    const player = ref.current;
    const [isPlaying, setIsPlaying] = useState(false);

    function handlePause() {
        socket.emit("pause_video", user.roomName);
        setIsPlaying(false);
    }
    function handlePlay() {
        const currentTime = ref.current?.getCurrentTime();
        socket.emit("play_video", user.roomName, currentTime);
        setIsPlaying(true);
    }

    useEffect(() => {
        socket.on("server_pause_video", () => {
            setIsPlaying(false);
        });
        return () => {
            socket.off("server_pause_video");
        };
    }, []);

    useEffect(() => {
        socket.on("server_play_video", (currentTime) => {
            setIsPlaying(true);
            player?.seekTo(currentTime);
        });
        return () => {
            socket.off("server_play_video");
        };
    });

    const user = useUserContext();
    return (
        <div className="player-wrapper">
            <ReactPlayer
                ref={ref}
                className="react-player"
                url={user.youtubeLink}
                width="80vh"
                height="60vh"
                controls={true}
                onPause={handlePause}
                onPlay={handlePlay}
                playing={isPlaying}
            />
        </div>
    );
}

export default Video;
