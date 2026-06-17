import React from "react";

const VideoDurationBadge = ({ video, className = "" }) => {
    if (!video?.lengthText) {
        return null;
    }

    return (
        <h5
            className={`${video.lengthText === "LIVE" ? "bg-red-600" : "bg-black"} px-1 rounded-[7px] ${className}`}
        >
            {video.isLive ? <p> • {video.lengthText}</p> : <p>{video.lengthText}</p>}
        </h5>
    );
};

export default VideoDurationBadge;
