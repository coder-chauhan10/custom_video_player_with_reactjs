import React, { useRef, useState } from 'react'
import {
	ArrowsExpandIcon,
	FastForwardIcon,
	PauseIcon,
	PlayIcon
} from '@heroicons/react/solid'
import timeFormater from './TimeFormater'

export const VideoPlayer = ({ video, type }) => {
	// ref
	const videoRef = useRef(0)
	const videoContainer = useRef(0)
	// states
	const [CurrentLocation, setCurrentLocation] = useState(0)
	const [TotalDuration, setTotalDuration] = useState(0)
	const [IsPaused, setIsPaused] = useState(true)

	const onTimeUpdate = (e) => {
		setCurrentLocation(e.target.currentTime)
		console.log(e.target.buffered.end(0))
	}
	const onCanPlay = (e) => {
		e.target.controls = false
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
			videoContainer.current.webkitRequestFullscreen()
		} else {
			videoContainer.current.requestFullscreen()
		}
	}

	return (
		<>
			<div ref={videoContainer} className="relative group">
				<video
					ref={videoRef}
					onTimeUpdate={onTimeUpdate}
					onCanPlay={onCanPlay}
					controls
				>
					<source src={video} type={type} />
				</video>
				<div className="absolute top-0 left-0 w-full h-full hidden group-hover:block">
					<div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-700 to-transparent opacity-30" />
					
					<div className="absolute flex top-0 left-0 w-full h-full flex-col">


						<div onClick={playPause} className="relative h-4/5 w-full">

							<div className="absolute top-1/2 w-full text-center transform -translate-y-1/2">
								{/* <button>
									{IsPaused ? (
										<PlayIcon className="w-20 h-20 text-white" />
									): (
										<PauseIcon className="w-20 h-20 text-white" />
									)}
								</button> */}
							</div>

						</div>


						<div className="relative flex flex-col justify-end h-1/5 w-full ">
							<div>
								<input
									type="range"
									value={CurrentLocation}
									min="0"
									max={TotalDuration}
									onChange={onSeeking}
									style={{width: "100%"}}
								/>
							</div>

							<div className="relative flex bottom-0 left-0 w-full justify-between">
								<div className="flex">

									<div className="mx-5">
										<button onClick={() => moveBackword(5)}><FastForwardIcon className="w-6 h-6 text-white transform rotate-180" /></button>
										<button onClick={playPause}>
											{IsPaused ? (
												<PlayIcon className="w-6 h-6 text-white" />
											): (
												<PauseIcon className="w-6 h-6 text-white" />
											)}
										</button>
										<button onClick={() => moveForeword(5)}><FastForwardIcon className="w-6 h-6 text-white" /></button>
									</div>
									<div className="text-white">{timeFormater(CurrentLocation)} / {timeFormater(TotalDuration)}</div>

								</div>
								<div>
									<button className="mx-5 text-white" onClick={() => onFullscreenRequest()}><ArrowsExpandIcon className="w-6 h-6 text-white" /></button>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
				
		</>
	)
}
