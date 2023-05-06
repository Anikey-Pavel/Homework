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

		function createTask(arr) {
			arr.forEach(e => {
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

				conteiner.append(block);
				block.append(user);
				block.append(checkbox);
				block.append(title);
				block.append(buttonDelete);
			})
		}

		createTask(finished)

		finished.forEach((e) => {
			const checkbox = document.querySelectorAll('.task__completed');
			for (let check of checkbox) {
				check.type = 'checkbox';
				if (e.completed) {
					check.checked = true;
				} else {
					check.checked = false;
				}
			}
		});

		createTask(unfinished)

		unfinished.forEach(e => {
			const checkbox = document.querySelectorAll('.task__completed');
			for (let check of checkbox) {
				check.type = 'checkbox';
				if (e.completed === 'false') {
					check.checked = false;
				}
			}
		});

		document.body.addEventListener("click", (event) => {
			if (event.target.className != 'task__delete') return;

			let task = event.target.closest('.task');

			fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'DELETE'
			})
				.then(response => response.json())
				.then(json => {
					task.remove();
				})
		})

		conteiner.addEventListener("change", (event) => {
			if (event.target.className != 'task__completed') return;
			const task = event.target.closest('.task');

			fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'PUT'
			})
				.then(response => response.json())
				.then(json => {
					const clone = task.cloneNode(true);

					if (document.querySelector('.task__completed').checked) {
						task.remove()
						conteiner.prepend(clone)
					}

					if (document.querySelector('.task__completed').checked === false) {
						task.remove()
						conteiner.append(clone)
					}
				})
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