import React, { useRef, useState } from 'react'
import timeFormater from './TimeFormater'

export const VideoPlayer = ({ video, type }) => {
	// ref
	const videoRef = useRef(0)
	// states
	const [CurrentLocation, setCurrentLocation] = useState(0)
	const [TotalDuration, setTotalDuration] = useState(0)
	const [IsPaused, setIsPaused] = useState(true)

	const onTimeUpdate = (e) => {
		setCurrentLocation(e.target.currentTime)
		console.log(e.target.buffered.end(0))
	}
	const onCanPlay = (e) => {
		setTotalDuration(e.target.duration)
		setIsPaused(videoRef.current.paused)
	}


	const moveBackword = (byHowMuchSec) => {
		if (CurrentLocation < byHowMuchSec) {
			videoRef.current.currentTime = (0).toString();
		} else {
			videoRef.current.currentTime = (CurrentLocation - byHowMuchSec).toString();
		}
	}
	const playPause = () => {
		(videoRef.current.paused) ? videoRef.current.play() : videoRef.current.pause()
		setIsPaused(videoRef.current.paused)
	}
	const moveForeword = (byHowMuchSec) => {
		videoRef.current.currentTime = (CurrentLocation + byHowMuchSec).toString();
	}

	const onSeeking = (e) => {
		videoRef.current.currentTime = e.target.value;
	}
	const onFullscreenRequest = () => {
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
		else if (document.webkitFullscreenElement) {
			document.webkitExitFullscreenElement()
		}
		else if (videoRef.current.webkitRequestFullscreen) {
			videoRef.current.webkitRequestFullscreen()
		} else {
			videoRef.current.requestFullscreen()
		}
	}

	return (
		<>
			<div className="relative group">
				<video
					ref={videoRef}
					onTimeUpdate={onTimeUpdate}
					onCanPlay={onCanPlay}
					controls
				>
					<source src={video} type={type} />
				</video>
				<div>
					<button onClick={() => moveBackword(5)}>backword</button>
					<button onClick={playPause}>{IsPaused ? "play" : "pause"}</button>
					<button onClick={() => moveForeword(5)}>Forword</button>
				</div>
				<div>{timeFormater(CurrentLocation)}</div>
				<div>{timeFormater(TotalDuration)}</div>
				<div><input
					type="range"
					value={CurrentLocation}
					max={TotalDuration}
					onChange={onSeeking}
					style={{width: "100%"}}
				/></div>
				<button onClick={() => onFullscreenRequest()}>fullscreen</button>
			</div>
		</>
	)
}
