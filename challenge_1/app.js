const cross = `<svg width="50" height="42" viewBox="0 0 50 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 2L21.587 17.2331L48 38.8801M3 38.8801C3 40.8471 33 18.118 48 6.50757" stroke="#BEDB38" stroke-width="5"/>
</svg>`;

const circle = `<svg width="53" height="55" viewBox="0 0 53 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d)">
<path d="M46.5 23.5C46.5 35.2015 37.4444 44.5 26.5 44.5C15.5556 44.5 6.5 35.2015 6.5 23.5C6.5 11.7985 15.5556 2.5 26.5 2.5C37.4444 2.5 46.5 11.7985 46.5 23.5Z" stroke="#F27404" stroke-width="5"/>
</g>
<defs>
<filter id="filter0_d" x="0" y="0" width="53" height="55" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="2"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
</filter>
</defs>
</svg>`;

const cell = document.getElementById('4');
const cell1 = document.getElementById('2');
const playerx = document.getElementsByClassName('playerx');
console.log(playerx[0]);

window.addEventListener('click', function() {
  cell.innerHTML = cross;
  playerx[0].className += ' active';
  cell1.innerHTML = circle;
});

