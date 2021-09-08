const timeFormater = (timeInSec) => {
	let totalSec = Math.floor(timeInSec);
	var seconds = 0;
	var minutes = 0;
	var hrs = 0;
	if (totalSec >= 60) {

		minutes = Math.floor(totalSec / 60);
		seconds = totalSec % 60;

		if (minutes >= 60) {

			hrs = Math.floor(minutes / 60);
			minutes = minutes % 60;
			return `${(hrs < 10) ? `0${hrs}` : hrs}:${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`

		} else {

			return `${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`

		};
	} else {

		seconds = totalSec;
		return `00:${(seconds < 10) ? `0${seconds}` : seconds}`

	};
}

export default timeFormater;