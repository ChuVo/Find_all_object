(function() {

	let bg_can = document.getElementById('bg'),
			ctx = bg_can.getContext('2d'),
			imgBg = new Image(),
			box = document.querySelector('.content'),
			width = box.clientWidth,
			height = box.clientHeight;

	addBg();
	window.addEventListener('resize', getSizeScreen);
	window.addEventListener('resize', addBg);	

	function getSizeScreen(){
		width = box.clientWidth,
		height = box.clientHeight;
	}

	function addBg() {
		bg_can.width = width;
		bg_can.height = height;

		imgBg.onload = () => {
			ctx.drawImage(imgBg, 0, 0, bg_can.width, bg_can.height);
		};

		imgBg.src = bgBase64;		
	};

	function createCanvas(i) {
		const canvas = document.createElement('canvas');
		const bg = document.getElementById('bg');

		canvas.id = i + '_canvas';
		canvas.setAttribute('display', 'block');
		canvas.innerHTML = 'Your browser is not supported!';
		bg.after(canvas);
	}

	function addObject(i, x, y) {
		createCanvas(i);

		const el = document.getElementById(i + '_canvas'),
		 			context = el.getContext('2d'),
					img = new Image();			

		el.width = width * .06;
		el.height = width * .08;
		el.classList.add(i+'_c','object_c');

		img.onload = () => {
			context.drawImage(img, 0, 0, el.width , el.height);
		}

		img.src = `images/${i}.png`;
	};

	addObjects_c();

	function addObjects_c() {
		console.log(objects[2]);
		objects[level].forEach((i) => {
			addObject(i.id);
		});
	};

}());


