const images = ['./img/1.png', './img/2.png', './img/3.png'];

const ul = document.createElement('ul');

ul.classList.add('list');
document.body.append(ul);

const promise = new Promise((resolve, reject) => {
	images.onload = () => resolve(images)
	images.onerror = (error) => reject(alert(error));
})

promise.then(images.forEach(function (element) {
	console.log(element)
	const li = document.createElement('li');
	const img = document.createElement('img');

	img.classList.add('list__image');
	li.classList.add('list__item');

	img.src = element;
	img.style.cursor = 'pointer'
	ul.append(li);
	li.append(img);
}))

const list = document.querySelector('.list');
const li = document.querySelector('.list__item');
const link = document.createElement('a');
const p = document.createElement('p');

list.addEventListener('click', function (event) {

	if (event.target.classList.value === 'list__image') {

		link.href = event.target.src;
		link.innerText = 'link';

		event.target.after(p);
		p.append(link);

	};
});