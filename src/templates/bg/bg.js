(function() {

	let bg_can = document.getElementById('bg'),
			ctx = bg_can.getContext('2d'),
			imgBg = new Image(),
			box = document.querySelector('.content'),
			width = box.clientWidth,
			height = box.clientHeight;

	getSizeScreen();
	addObjects();
	window.addEventListener('resize', getSizeScreen);

	function getSizeScreen(){
		width = box.clientWidth;
		height = box.clientHeight;

		addBg();		
	}

	function addBg() {
		bg_can.width = width;
		bg_can.height = height;

		imgBg.onload = () => {
			ctx.drawImage(imgBg, 0, 0, bg_can.width, bg_can.height);
		};

		imgBg.src = bgBase64;			
	};

	function addObjects() {
		objects[level].forEach((i) => {			
			addObject(i);	
		});
	};
	
	function addObject(i) {
		createCanvas(i.id);
		getCanvasCoordinates(i);

		const img = new Image(),
					el = document.getElementById(i.id),
					context = el.getContext('2d');

		el.height = width * i.h;
		el.width = width * i.w;

		img.onload = () => {
			if(i.r) {
				el.height = width * i.h * 1.2;
				el.width = width * i.w * 1.5;
				context.rotate(i.r);
				context.translate(el.width/3, 0);
				context.drawImage(img, 0, 0, el.width/1.5, el.height/1.2);
			} else {
				context.drawImage(img, 0, 0, el.width, el.height);
			}			
		};

		img.src = `images/${i.id}.png`;
	}

	function createCanvas(id) {
		const canvas = document.createElement('canvas');
		const bg = document.getElementById('bg');

		canvas.id = id;
		canvas.setAttribute('display', 'block');
		canvas.classList.add(id,'object');
		bg.after(canvas);
	}

	function getCanvasCoordinates(i) {
		const	posX = width * i.x,
					posY = height * i.y,
					canvas = document.getElementById(i.id);

		canvas.style.top = `${posY}px`;
		canvas.style.left = `${posX}px`;
	}

}());


