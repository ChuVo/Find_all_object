let count = null,
    level = 0;

const bg = document.querySelector('.bg'),
      box = document.querySelector('.object__box'),
      win = document.querySelector('.win'),
      list = document.querySelector('.list__items'),
      content = document.querySelector('.content'),
      tutorial = document.querySelector('.tutorial'),         
      container = document.getElementById('box');

const lightInterval = setInterval(() => {
        highlightObject();
      }, 5000);

document.body.onload = () => {
  playSound('music', 'Caribbean Blue'); 
  gameStart();
  hideSpiner();
  bg.classList.remove('bg_blur');
  content.classList.remove('bg_blur');
};

class Game {
  constructor() {
    this.count = 0;
    this.runing = false;
  }

  createObjects() {
    objects[level].forEach((i) => {
      const img = document.createElement('img'),
            images = document.createElement('img'),//added because append does not work with copy
            div = document.createElement('div'),
            clone = document.createElement('div'),
            box = document.querySelector('.object__box');
  
      img.src = i.src;
      images.src = i.src;
      div.id = i.id;
      div.append(img);
      div.className = 'object filter';
      
      clone.id = i.id + '_clone';
      clone.append(images);
      clone.className = `object object_clone filter is-opacity ${i.id}`;
      clone.addEventListener('click', this.onClickObject, false);
  
      lightInterval;
      container.append(div);
      box.append(clone);
      addTitleList(i);    
    });
  }

  addedPlace() {
    const bg = document.createElement('div'),
          div = document.createElement('div'); 
    
    bg.className = 'object__box';    
    div.className = 'bg_cut';
    container.append(bg, div);    
  
    this.createObjects();
  };

  levelUp() {
    ++level;

    if(level > 3) {
      level = 0;
    }
  };

  onClickObject() {
    const object = document.getElementById(this.id.substr(0, this.id.length - 6));
  
    playSound('sound', 'bell');
    showFoundObject(this.id, this.count);
    object.classList.remove('filter');
    this.removeEventListener('click', this.onClickObject, false);
    count++;

    if(count === 3) {
      createdWin();
    }
    if (count === 4) {
      const playBtn = document.querySelector('.win__btn_pf');
      
      clearTimeout(lightInterval);
      victory();
      playBtn.addEventListener('click', gameStop);
    }
  };
};

function gameStart() { 
  const game = new Game;
  
  game.addedPlace();  
  hideTutorial();
  game.levelUp();
}

function hideSpiner() {  
  const spiner = document.querySelector('.spiner');
  
  spiner.classList.add('is-hidden');
};

function hideTutorial() {  
  setTimeout(() => tutorial.classList.add('is-opacity'), 2000);  
};

function showTutorial() {  
  tutorial.classList.add('is-opacity');  
};

function showFoundObject(i) {
  const clone = document.getElementById(i);
  recolorTitle(i.substr(0, i.length - 6));
  clone.classList.add('object_found');
  clone.classList.remove('is-opacity');

  setTimeout(() => {
    clone.classList.remove('object_found');
    clone.classList.add('found-top');

    setTimeout(() => {
      clone.className = '';
      clone.classList.add('object_width');
    },1000);
  }, 2000);
}

function addTitleList(i) {
  const item = document.createElement('span');

  item.id = i.id + '_title';
  item.innerHTML = i.title;
  item.className = 'list__item';
  list.append(item);
}

function recolorTitle(i) {
  const elem = document.getElementById(`${i}_title`);

  elem.classList.add('list__items_found');
}

function victory() {
  setTimeout(() => {
    win.style.display = 'flex';
    playSound('music','score');
  }, 4000 );  
};

function highlightObject() {
  const objects = document.querySelectorAll('#box > .filter'),
        objectsFound = document.querySelectorAll('#box > .object'),
        object = objects[0];

  objectsFound.forEach((i) => {
    if( i.classList.contains('light')) {
      i.classList.remove('light');
    }
  });

  setTimeout(() => object.classList.add('light'), 4700);
};

//musik and sound - two boxes used.
//first argument "sound" or "music" (meaning), second argument - track name
function playSound(meaning, trackName) { 
  const sound = document.querySelector(`.${meaning}`);
  const player = new Audio(`media/${trackName}.mp3`);  

  if (meaning === 'music') {
    player.volume = .3;
    player.loop = 'loop';
  }
  if (trackName === 'score') {
    player.loop = '';
    player.addEventListener('ended', () => playSound('music', 'Alan Silvestri - Super Mario Bros. Theme _ Police Car Chase'));
  }

  player.autoplay = 'autoplay';        
  sound.innerHTML = '';
  sound.append(player);  
};

function createdWin() {
  const box = document.querySelector('.win'),
        html = `<div class="bg bg_blur"></div>
                <div class="win__logo">
                  <img src="images/logo.png" alt="">
                </div>
                <a class="win__btn_pf">
                  <img src="images/button.png" class="win__btn-pf_position" alt="Play free now!">
                  <h1>Play free</h1>    
                </a>
                <a href="index.html" class="win__btn-google">
                  <img src="images/google.png" alt="" >
                </a>`;

  box.innerHTML = html;
};

function gameStop() {
  showTutorial();
  container.innerHTML = '';
  list.innerHTML = '';
  playSound('music', 'Caribbean Blue');  
  win.style.display = '';
  count = 0;
  gameStart();

  console.log('stop');
}