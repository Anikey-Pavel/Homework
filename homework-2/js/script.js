const rainbow = document.querySelector('.rainbow')
const red = document.querySelector('.red');
const orange = document.querySelector('.orange');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');
const blue = document.querySelector('.blue');
const indigo = document.querySelector('.indigo');
const violet = document.querySelector('.violet');

violet.remove()
blue.prepend(indigo);
green.prepend(blue);
yellow.prepend(green);
orange.prepend(yellow);
red.prepend(orange);