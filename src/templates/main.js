  const spiner = document.querySelector('.spiner'),
        tutorial = document.querySelector('.tutorial');  

  document.body.onload = () => {
    hideSpiner();
  };
  
  playSound('music', 'Caribbean Blue');

  function hideSpiner() {
    spiner.classList.add('is-hidden');
    hideTutorial();
  };

  function hideTutorial() {
    setTimeout(() => tutorial.classList.add('is-opacity'), 2000);   
  };

  // first argument "sound" or "music" (meaning), second argument - track name;
  function playSound(meaning, trackName) { 
    const sound = document.querySelector(`.${meaning}`);
    const player = new Audio(`media/${trackName}.mp3`);

    if (meaning === 'music') {
      player.volume = .3;
      player.loop = 'loop';
    }
    if (trackName === 'score') {
      player.loop = '';
      player.addEventListener('ended', () => { playSound('music', 'Caribbean Blue') });
    }
    
    player.play();
    player.autoplay = 'autoplay';        
    sound.innerHTML = '';
    sound.append(player);
  }