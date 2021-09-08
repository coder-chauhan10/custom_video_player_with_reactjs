import React from 'react'
import video from '../video/macbookarc.mp4';
import { VideoPlayer as Vp2 } from '../components/VideoPlayerProtoType';
import { VideoPlayer as Vp } from '../components/VideoPlayer';

const Home = () => {
	return (
		<>
			<div className="flex justify-evenly">
				<div className="w-5/12 mt-10">
					<Vp2 video={video} />
				</div>
				<div className="w-5/12 mt-10">
					<Vp video={process.env.PUBLIC_URL + "/video/macbookarc.mp4"} />
				</div>
			</div>
		</>
	)
}

export default Home
