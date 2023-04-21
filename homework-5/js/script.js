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

		const buttons = document.querySelectorAll('.task__delete');

		for (let button of buttons) {
			button.addEventListener("click", (event) => {
				fetch('https://jsonplaceholder.typicode.com/todos', {
					method: 'DELETE'
				})
					.then(response => response.json())
					.then(json => {
						const btn = event.target.closest('.task');
						btn.remove()
					})
			})
		}

		const inputs = document.querySelectorAll('.task__completed');

		for (let input of inputs) {
			input.addEventListener("click", (event) => {
				fetch('https://jsonplaceholder.typicode.com/todos', {
					method: 'PUT'
				})
					.then(response => response.json())
					.then(json => {
						const checkbox = event.target.closest('.task')
						if (input.checked) {
							conteiner.prepend(checkbox)
						} else {
							conteiner.append(checkbox)
						}
					})
			})
		}


		const add = document.createElement('div');
		const button = document.createElement('button');

		add.classList.add('task');
		button.classList.add('task__add');

		button.innerText = 'Add a task';

		conteiner.after(add);
		add.append(button);

		button.addEventListener("click", () => {

			fetch('https://jsonplaceholder.typicode.com/todos', {
				method: 'POST'
			})
				.then(response => response.json())
				.then(json => {

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
					title.innerText = 'new task';
					checkbox.type = 'checkbox';
					checkbox.checked = false;

					conteiner.append(block);
					block.append(user);
					block.append(checkbox);
					block.append(title);
					block.append(buttonDelete);
				})

		})
	});