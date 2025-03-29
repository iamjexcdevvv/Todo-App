import { useEffect, useState } from "react";
import AddBtn from "./components/AddBtn";
import { Todo } from "./components/todo";

function App() {
	const URL = "https://localhost:7267/api/Todos";
	const [todos, setTodos] = useState([]);

	async function updateTodo(newTodo) {
		const request = await fetch(
			`https://localhost:7267/api/Todos/${newTodo.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(newTodo),
			}
		);
	}

	function handleChange(index) {
		const newTodo = [...todos];
		newTodo[index].isCompleted = !newTodo[index].isCompleted;
		setTodos(newTodo);
		updateTodo(newTodo[index]);
	}

	useEffect(() => {
		async function FetchData() {
			const response = await fetch(URL);
			const data = await response.json();

			setTodos(data);
		}

		FetchData();
	}, []);

	return (
		<div className="h-screen w-screen font-mono bg-base-100">
			<Todo todos={todos} handleChange={handleChange} />
			<AddBtn />
		</div>
	);
}

export default App;
