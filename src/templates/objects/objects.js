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
    div.addEventListener('click', onClickObject, false);

    clone.id = i.id + '_clone';
    clone.append(images);
    clone.className = `object filter ${i.id}`;
    
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
    victory();
  }
};

function showFoundObject(i) {
  const clone = document.getElementById(i + '_clone');

  recolorTitle(i);
  clone.classList.add('found-object');

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
  const elem = document.getElementById(`${i}_title`);

  elem.classList.add('list__items_found');
}

function victory() {
  const win = document.querySelector('.win');

  setTimeout(() => {
    win.style.display = 'flex';
    playSound('music','score');
  }, 4000 );  
}
