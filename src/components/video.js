import React from 'react'

const Video = ({ videoSrcUrl, videoTitle, style, className }) => (
    /**
     * Video Component
     * Receieves video src, and shows a still image while video is loading
     */
    <div style={{ ...style }}>
        {/* video source url is trimmed and replaced with its thumbnail image (always in a .jpg format) */}
        <video poster={videoSrcUrl.replace(/\.[^/.]+$/, ".jpg")} preload="metadata" src={videoSrcUrl} title={videoTitle} muted style={{width: '100%', objectFit: 'cover', objectPosition: 'top'}} className={className} autoPlay loop lang="en">
            {/* <source src={videoSrcUrl} type="video/mp4" title={videoTitle} /> */}
        </video>
    </div>
)

export default Video
