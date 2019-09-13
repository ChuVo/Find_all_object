(function() {

	let bg_can = document.getElementById('bg'),
			ctx = bg_can.getContext('2d'),
			imgBg = new Image(),
			box = document.querySelector('.content'),
			width = box.clientWidth,
			height = box.clientHeight;

	addBg();
	addMirror();
	window.addEventListener('resize', addBg);

	function addBg() {
		bg_can.width = width;
		bg_can.height = height;

		imgBg.onload = () => {
			ctx.drawImage(imgBg, 0, 0, bg_can.width, bg_can.height);
		};

		imgBg.src = bgBase64;		
	};

	function addMirror() {
		const mirror = document.getElementById('mirror_canvas'),
				context = mirror.getContext('2d'),
				imgMirror = new Image();

		mirror.width = width * .06;
		mirror.height = height * .17;


		imgMirror.onload = () => {
			context.drawImage(imgMirror, 0, 0, width * .06, height * .17);
		}

		imgMirror.src = 'images/mirror.png';
	}
	


}());


