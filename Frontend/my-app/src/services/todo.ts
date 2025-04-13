import Todo from "../interfaces/ITodo";

export async function updateTodoName(newTodo: Todo) {
	try {
		const response = await fetch(
			`https://localhost:7267/api/Todos/${newTodo.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(newTodo),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function updateTodoStatus(newTodo: Todo) {
	try {
		const response = await fetch(
			`https://localhost:7267/api/Todos/${newTodo.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(newTodo),
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}
	} catch (error) {
		console.log(error);
	}
}

export async function addNewTodo(taskName: string): Promise<Todo> {
	const newTodo: Todo = { id: 0, todoName: taskName, isCompleted: false };

	const request = await fetch(`https://localhost:7267/api/Todos`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: JSON.stringify(newTodo),
	});

	if (!request.ok) {
		throw new Error(`HTTP error: ${request.status}`);
	}

	const response = await request.json();

	return response;
}

export async function deleteTodoById(id: number) {
	try {
		const response = await fetch(`https://localhost:7267/api/Todos/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}
	} catch (error) {
		console.log(error);
	}
}
