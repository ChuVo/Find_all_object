//playSound() from main.js
let count = null;

const objects = [
  {
    id: 'mirror',
    title: 'Mirror',
    src: 'images/mirror.png'
  },
  {
    id: 'balerina',
    title: "Ballet Danser",
    src: "images/balerina.png"
  },
  {
    id: 'perfume',
    title: "Perfume",
    src: "images/perfume.png"
  },
  {
    id: 'comb',
    title: "Comb",
    src: "images/comb.png"
  }
];
const container = document.getElementById('box'),
      box = document.querySelector('.object__box');

const lightInterval = setInterval(() => {
  highlightObject();
}, 15000);

addObjects();

function addObjects() {
  objects.forEach((i) => {
    const img = document.createElement('img'),
          images = document.createElement('img'),//added because append does not work with copy
          div = document.createElement('div'),
          clone = document.createElement('div');

    img.src = i.src;
    images.src = i.src;
    div.id = i.id;
    div.append(img);
    div.className = 'object filter';   
    clone.addEventListener('click', onClickObject, false);//div
    
    clone.id = i.id + '_clone';
    clone.append(images);
    clone.className = `object object_clone filter is-opacity ${i.id}`;

    lightInterval;
    box.append(clone);
    container.append(div);
    addTitleList(i);    
  });
};

function onClickObject() {
  playSound('sound', 'bell');
  showFoundObject(this.id);
  this.classList.remove('filter');
  this.removeEventListener('click', onClickObject, false);
  count++;
  if (count === 4) {
    clearTimeout(lightInterval);
    victory();
  }
};

function showFoundObject(i) {
  const clone = document.getElementById(i);
  console.log(clone);
  recolorTitle(i.substr(0, i.length - 6));
  clone.classList.add('found-object');
  clone.classList.remove('is-opacity');

  setTimeout(() => {
    clone.classList.remove('found-object');
    clone.classList.add('found-top');

    setTimeout(() => {
      clone.className = '';
      clone.classList.add('object_width');
    },1000);
  }, 2000);
}

function addTitleList(i) {
  const list = document.querySelector('.list__items'),
        item = document.createElement('span');

  item.id = i.id + '_title';
  item.innerHTML = i.title;
  item.className = 'list__item';
  list.append(item);
}

function recolorTitle(i) {
  console.log(i);
  const elem = document.getElementById(`${i}_title`);

  elem.classList.add('list__items_found');
}

function victory() {
  const win = document.querySelector('.win');

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

  setTimeout(() => object.classList.add('light'), 14700);
}
