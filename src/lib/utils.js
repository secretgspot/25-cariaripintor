export function getLocalTime() {
	const now = new Date();
	return now.toLocaleTimeString('en-US', { hour12: false }); // Ensure 24-hour format
}

export function timeToPercentage(time) {
	const [hours, minutes, seconds] = time.split(':').map(Number);
	const totalSeconds = hours * 3600 + minutes * 60 + (seconds || 0); // Handle cases where seconds might be missing
	const percentage = (totalSeconds / 43200) * 100; // 43200 seconds in 12 hours
	return Math.min(Math.max(percentage, 0), 100);
}

// Example usage:
// const localTime = getLocalTime();
// const percentage = timeToPercentage(localTime);
// console.log(`Local time: ${localTime}, Percentage: ${percentage}`);

export function percentageToHue(percentage) {
	// Map percentage to a hue range between black (0) and sky blue (197)
	const hue = Math.round((percentage / 100) * 201); // 0 for black, 197 for sky blue
	const lightness = Math.round((percentage / 100) * 50); // Gradual lightness from 0% to 50%
	return `hsl(${hue}, 100%, ${lightness}%)`; // Saturation fixed at 100%
}

// Example usage:
// const colorHue = percentageToHue(percentage);
// console.log(`Color hue for percentage ${percentage}: ${colorHue}`);

export function onInterval(callback, interval) {
	const intervalId = setInterval(() => {
		callback();
	}, interval);

	return () => clearInterval(intervalId); // Return a function to clear the interval
}

export function generateRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Example usage:
// const stopInterval = onInterval(() => {
// 	const localTime = getLocalTime();
// 	const percentage = timeToPercentage(localTime);
// 	const colorHue = percentageToHue(percentage);
// 	console.log(`Local time: ${localTime}, Percentage: ${percentage}, Color hue: ${colorHue}`);
// }, 1000);

// To stop the interval, call stopInterval()
// stopInterval();

export function playSequentialVideos(videoElement, videoFiles) {
	let currentVideoIndex = 0;
	console.log('Video files:', videoFiles);
	console.log('VideoElement:', videoElement);

	function playNextVideo() {
		// Pick a random video index using generateRandomNumber
		currentVideoIndex = generateRandomNumber(0, videoFiles.length - 1);
		// videoElement.src = videoFiles[currentVideoIndex];
		// videoElement.play();
	}

	// Play the initial video when the page loads
	videoElement.src = videoFiles[currentVideoIndex];
	videoElement.load();
	videoElement.play();

	// Add an event listener to play the next video when the current one ends
	videoElement.addEventListener('ended', playNextVideo);
}

// Example usage:
// const videoElement = document.getElementById('myVideo'); // Ensure there's a <video> element with this ID in your HTML
// const videoFiles = [
// 	'video1.mp4',
// 	'video2.mp4',
// 	'video3.mp4'
// ];

// playSequentialVideos(videoElement, videoFiles);