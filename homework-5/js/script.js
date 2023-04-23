fetch('https://jsonplaceholder.typicode.com/todos')
	.then(response => response.json())
	.then(json => {

		const conteiner = document.createElement('div');
		conteiner.classList.add('conteiner')

		document.body.prepend(conteiner)

		const { finished, unfinished } = json.reduce((prev, cur) => {
			if (cur.completed) {
				prev.finished.push(cur)
			} else {
				prev.unfinished.push(cur)
			}

			return prev;
		}, {
			unfinished: [],
			finished: []
		});

		finished.forEach(e => {
			const block = document.createElement('div');
			const checkbox = document.createElement('input');
			const buttonDelete = document.createElement('button');
			const title = document.createElement('h2');
			const user = document.createElement('p');

			block.classList.add('task');
			user.classList.add('task__user-name');
			checkbox.classList.add('task__completed');
			buttonDelete.classList.add('task__delete');
			title.classList.add('task__title');

			buttonDelete.innerText = 'Delete';
			user.innerText = 'userId' + ': ' + e.id;
			title.innerText = e.title;

			checkbox.type = 'checkbox';
			if (e.completed) {
				checkbox.checked = true;
			}

			conteiner.append(block);
			block.append(user);
			block.append(checkbox);
			block.append(title);
			block.append(buttonDelete);
		});

		unfinished.forEach(e => {
			const block = document.createElement('div');
			const checkbox = document.createElement('input');
			const buttonDelete = document.createElement('button');
			const title = document.createElement('h2');
			const user = document.createElement('p');

			block.classList.add('task');
			user.classList.add('task__user-name');
			checkbox.classList.add('task__completed');
			buttonDelete.classList.add('task__delete');
			title.classList.add('task__title');

			buttonDelete.innerText = 'Delete';
			user.innerText = 'userId' + ': ' + e.id;
			title.innerText = e.title;

			checkbox.type = 'checkbox';
			if (e.completed === 'false') {
				checkbox.checked = false;
			}

			conteiner.append(block);
			block.append(user);
			block.append(checkbox);
			block.append(title);
			block.append(buttonDelete);
		});

		document.body.addEventListener("click", (event) => {
			const block = document.querySelector('.task')
			const buttonDelete = document.querySelectorAll('.task__delete')
			const btn = event.target.closest('.task');
			for (let button of buttonDelete) {
				if (event.target === button) {
					fetch('https://jsonplaceholder.typicode.com/todos', {
						method: 'DELETE'
					})
						.then(response => response.json())
						.then(json => {
							btn.remove()
						})
				}
				if (!btn) return
			}
		})

		document.body.addEventListener("change", (event) => {
			const inputs = document.querySelectorAll('.task__completed');
			const checkbox = event.target.closest('.task');
			for (let input of inputs) {
				if (event.target === input) {
					fetch('https://jsonplaceholder.typicode.com/todos', {
						method: 'PUT'
					})
						.then(response => response.json())
						.then(json => {
							if (input.checked) {
								conteiner.prepend(checkbox)
							} else {
								conteiner.append(checkbox)
							}
						})
				}
				if (!checkbox) return
			}
		})

		const add = document.createElement('div');
		const button = document.createElement('button');
		const input = document.createElement('input')

		add.classList.add('task__add');
		button.classList.add('task__button');
		input.classList.add('task__input')

		input.placeholder = 'Task name'
		button.innerText = 'Add a task';

		conteiner.after(add);
		add.append(button);
		add.prepend(input);

		function addTask() {
			const block = document.createElement('div');
			const checkbox = document.createElement('input');
			const buttonDelete = document.createElement('button');
			const title = document.createElement('h2');
			const user = document.createElement('p');

			block.classList.add('task');
			user.classList.add('task__user-name');
			checkbox.classList.add('task__completed');
			buttonDelete.classList.add('task__delete');
			title.classList.add('task__title');

			buttonDelete.innerText = 'Delete';
			user.innerText = 'userId';
			title.innerText = input.value;
			checkbox.type = 'checkbox';
			checkbox.checked = false;

			conteiner.append(block);
			block.append(user);
			block.append(checkbox);
			block.append(title);
			block.append(buttonDelete);
		}

		input.addEventListener('keydown', function (e) {
			if (e.keyCode === 13) {
				addTask()
				input.value = ''
			}
		});

		button.addEventListener("click", () => {

			fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST'
			})
				.then(response => response.json())
				.then(json => {
					addTask()
					input.value = ''
				})

		})
	});