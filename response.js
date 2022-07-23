const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);

const startWebCam = () => {
	webcam.start()
	.then((result) => {
		console.log("Web Cam Started")
	})
	.catch(e => {
		console.log(e);
		alert("Requested device not found ")
	});
}

const stopWebCam = () => {
	webcam.stop();
}

const capture = () => {
	const screenshotTarget = document.body;

	html2canvas(screenshotTarget,{scrollY: -window.scrollY}).then(canvas => {
		const base64image = canvas.toDataURL("image/png");
		var baseString = base64image;
		var data = atob(baseString.substring("data:image/png;base64,".length)),
			asArray = new Uint8Array(data.length);

		for (var i = 0, len = data.length; i < len; ++i) {
			asArray[i] = data.charCodeAt(i);
		}

		var blob = new Blob([asArray.buffer], { type: "image/png" });
		var anchorTag = document.createElement("a");
		anchorTag.href = URL.createObjectURL(blob);
		anchorTag.download = "image";
		anchorTag.click();
	});
};
