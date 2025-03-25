'use strict';
let currentScore, scores, activePlayer, playing;

const init = function () {
  //inicijalizacija igre, pocetno stanje
  scores = [0, 0]; //glavni scores igraca
  currentScore = 0;
  activePlayer = 0; //pocinjemo od prvog
  playing = true;
  document.querySelector('#score--0').textContent = 0;
  document.querySelector('#score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  document.querySelector('.dice').classList.add('hidden');

  //za slucaj da se igra ponovo sklanjamo active i winner klase
  document.querySelector('.player--0').classList.remove('player-winner');
  document.querySelector('.player--1').classList.remove('player-winner');
  document.querySelector('.player--0').classList.add('player-active');
  document.querySelector('.player--1').classList.remove('player-active');
};
init();
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    const number = Math.trunc(Math.random() * 6) + 1; // random broj kocke, unutar funkcije zato sto se uvek na klik generise novi broj
    document.querySelector('.dice').classList.remove('hidden'); //ucinimo da je kocka vidljiva nakon inicijalizacije
    document.querySelector('.dice').src = `dice-${number}.png`; // na osnovu broja kocke prikazujemo sliku
    if (number !== 1) {
      currentScore += number; // dodajemo broj na trenutni score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // postavljanje trenutnog score-a igracu koji igra, 0 je prvi 1 je drugi
    } else {
      // ako je broj na kocki 1 menja se igrac
      switchPlayer();
    }
  }
});

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // kada se zamene igraci igracu pre zamene je trenutni score 0
  currentScore = 0; // novom takodje
  activePlayer = activePlayer === 0 ? 1 : 0; // ovde se menja trenutni igrac
  document.querySelector('.player--0').classList.toggle('player--active'); //ako je bio prvi, dodaje mu se ili sklanja klasa player active
  document.querySelector('.player--1').classList.toggle('player--active'); // ako je bio drugi
}
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; // dodali smo trenutni score na glavni igracu
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //igra se zavrsava kada je score veci ili jednak 100
    if (scores[activePlayer] >= 100) {
      playing = false; // onemogucava nastavak igre, bacanje kockice i hold
      document.querySelector('.dice').classList.add('hidden'); // sklanjamo kocku
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
document.querySelector('.btn--new').addEventListener('click', init); // nova igra
