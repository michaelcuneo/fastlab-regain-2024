export const calculateRealTime = (time: number | undefined) => {
	const minutes: number = Math.floor(time ? time / 60 : 0);
	const seconds: number = Math.floor(time ? time - minutes * 60 : 0);
	return minutes + ':' + seconds;
};
