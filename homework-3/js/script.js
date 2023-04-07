const data = [
	{
		type: "input",
		id: "name",
		value: "",
		placeholder: "name",
	},
	{
		type: "input",
		id: "surname",
		value: "",
		placeholder: "surname",
	},
	{
		type: "date",
		id: "birthday",
		value: "",
		placeholder: "date of birth",
	},
	{
		type: "toggle",
		id: "sex",
		value: "man",
		options: ["man", "woman"],
		placeholder: "sex",
	},
	{
		type: "checkbox",
		id: "time",
		value: "",
		options: ["9-10 AM", "11-102 AM", "1-2 PM", "3-4 PM", "5-6 PM"],
		placeholder: "select timeslot for assessment",
	},
];

const form = document.createElement('form');

document.body.prepend(form);

data.forEach((elem) => {
	if (elem.type === 'input') {

		const input = document.createElement('input');
		const label = document.createElement('label');

		input.value = elem.value;
		input.id = elem.id;

		label.setAttribute('for', elem.id)
		label.innerText = elem.id

		form.append(label);
		form.append(input);
	};
	if (elem.type === 'date') {
		const input = document.createElement('input');
		const label = document.createElement('label');

		input.type = elem.type;
		input.value = elem.value;
		input.id = elem.id;

		label.setAttribute('for', elem.id)
		label.innerText = elem.id

		form.append(label);
		form.append(input);
	}
	if (elem.type === 'toggle') {

		const input = document.createElement('input');
		const label = document.createElement('label');

		label.innerText = 'sex:'
		form.append(label)

		input.type = 'radio'
		// input.value = elem.value

		elem.options.map(function (item, index) {

			const input = document.createElement('input');
			const label = document.createElement('label');
			input.name = elem.id;
			input.type = 'radio';

			label.id = elem.options[index];
			label.textContent = elem.options[index];

			input.value = label.id;

			form.append(input);
			form.append(label);
		})
	}
	if (elem.type === 'checkbox') {
		const input = document.createElement('input');
		const label = document.createElement('label');

		label.innerText = 'time:'
		form.append(label)

		input.type = elem.type
		input.value = elem.value

		elem.options.map(function (item, index) {

			let input = document.createElement('input');
			let label = document.createElement('label');

			input.name = elem.options[index];
			input.type = elem.type;

			label.id = elem.options[index];
			label.textContent = elem.options[index];

			form.append(input);
			form.append(label);
		})
	}
})

const button = document.createElement('button');
const input = document.getElementsByTagName('input')
const label = document.getElementsByTagName('label')

button.type = 'submit';
button.innerText = 'submit';

form.append(button);

form.onsubmit = async (e) => {
	e.preventDefault();
};

button.addEventListener("click", () => {
	const arr = []
	data.forEach((elem) => {
		const obj = {};
		if (elem.id === "name") {

			obj.id = elem.id;
			obj.value = input[0].value

			arr.push(obj)
		}
		if (elem.id === "surname") {

			obj.id = elem.id;
			obj.value = input[1].value

			arr.push(obj)
		}
		if (elem.id === "birthday") {

			obj.id = elem.id;
			obj.value = input[2].value

			arr.push(obj)
		}
		if (elem.id === "sex") {

			const radio = document.getElementsByName('sex')

			obj.id = elem.id;

			radio.forEach((elem) => {

				if (elem.checked === true) {
					obj.value = elem.value
				}

			})

			arr.push(obj)
		}
		if (elem.id === "time") {
			const checkbox = document.querySelectorAll('[type="checkbox"]');

			obj.id = elem.id;

			checkbox.forEach((elem) => {

				if (elem.checked === true) {
					obj.value = elem.name;
				}

			});

			arr.push(obj);
		}
	})
	console.log(arr);
})