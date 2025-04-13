import React, { ChangeEvent, SyntheticEvent } from "react";
import { useEffect, useState, useMemo } from "react";

import AddBtn from "./AddBtn";

import { TaskFilter } from "../enums";
import Todo from "../interfaces/ITodo";
import {
	addNewTodo,
	updateTodoName,
	updateTodoStatus,
	deleteTodoById,
} from "../services/todo";

const URL = "https://localhost:7267/api/Todos";

export default function Todos() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [filterTodos, setFilterTodos] = useState<TaskFilter>(TaskFilter.All);
	const [todoItem, setTodoItem] = useState("");
	const [selectedTodo, setSelectedTodo] = useState<Todo>({
		id: 0,
		todoName: "",
		isCompleted: false,
	});

	const filteredTodos = useMemo(() => {
		if (filterTodos === TaskFilter.Completed)
			return todos.filter((t) => t.isCompleted);
		if (filterTodos === TaskFilter.NotCompleted)
			return todos.filter((t) => !t.isCompleted);
		return todos;
	}, [todos, filterTodos]);

	function handleFilterClick(filterBy: TaskFilter) {
		setFilterTodos(filterBy);
	}

	function handleSaveChangesClick() {
		const updatedTodoEntry = selectedTodo;
		const updatedTodo = todos.map((item) => {
			if (item.id === updatedTodoEntry.id) {
				item.todoName = updatedTodoEntry.todoName;
			}

			return item;
		});

		setTodos(updatedTodo);
		updateTodoName(updatedTodoEntry);
	}

	function handleEditInputChange(event: React.SyntheticEvent) {
		const target = event.target as HTMLInputElement;
		setSelectedTodo({
			id: selectedTodo.id,
			todoName: target.value,
			isCompleted: selectedTodo.isCompleted,
		});
	}

	function handleEditClick(todo: Todo) {
		const dialog = document.getElementById(
			"my_modal_1"
		) as HTMLDialogElement;
		dialog.showModal();
		setSelectedTodo(todo);
	}

	function handleInputAddTodoChange(event: ChangeEvent) {
		const target = event.target as HTMLInputElement;

		if (!target.value.trim()) {
			console.log("task name should not be empty");
		}

		setTodoItem(target.value);
	}

	function handleDeleteClick(todoId: number) {
		const newTodo = todos.filter((item) => item.id != todoId);
		setTodos(newTodo);
		deleteTodoById(todoId);
	}

	async function handleSubmit(event: SyntheticEvent) {
		event.preventDefault();

		const taskName = todoItem.trim();

		if (!taskName) {
			alert("Task name is required");
			return;
		}

		try {
			const newTodo: Todo = await addNewTodo(taskName);
			setTodos([...todos, newTodo]);
		} catch (error) {
			console.log(error);
		}

		setTodoItem("");
	}

	function handleChange(index: number) {
		const newTodo = [...todos];
		newTodo[index].isCompleted = !newTodo[index].isCompleted;
		setTodos(newTodo);
		updateTodoStatus(newTodo[index]);
	}

	useEffect(() => {
		async function FetchData() {
			try {
				const response = await fetch(URL);

				if (!response.ok) {
					throw new Error(`HTTP error: ${response.status}`);
				}

				const data = await response.json();

				setTodos(data);
			} catch (error) {
				console.log(error);
			}
		}

		FetchData();
	}, []);

	const todoEntry = filteredTodos.map((item, index) => {
		return (
			<tr key={item.id}>
				<td>{index + 1}</td>
				<td className={item.isCompleted ? "line-through" : ""}>
					{item.todoName}
				</td>
				<td>{item.isCompleted ? "Completed" : "Not completed"}</td>
				<td className="flex space-x-4 items-center">
					<input
						onChange={() => {
							handleChange(index);
						}}
						checked={item.isCompleted}
						type="checkbox"
						className="checkbox checkbox-primary"
					/>
					<button
						onClick={() => handleEditClick(item)}
						className="flex items-center btn btn-soft btn-primary"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>
						Edit
					</button>
					<button
						onClick={() => {
							handleDeleteClick(item.id);
						}}
						className="flex items-center btn btn-soft btn-primary"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
							/>
						</svg>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<>
			<div className="max-h-96 overflow-auto w-full flex justify-center">
				<div className="w-4/5 mx-auto">
					<table className="table">
						<thead className="text-neutral">
							<tr>
								<th>#</th>
								<th>Task</th>
								<th>Status</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody className="text-primary">{todoEntry}</tbody>
					</table>
				</div>

				<dialog id="my_modal_1" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Edit task name</h3>
						<div className="modal-action flex justify-start">
							<form method="dialog" className="space-y-7">
								<div>
									<label htmlFor="todo-name">Task name</label>
									<input
										onChange={handleEditInputChange}
										value={selectedTodo.todoName}
										id="todo-name"
										type="text"
										className="input input-primary"
									/>
								</div>

								<div className="flex space-x-5">
									<button
										onClick={handleSaveChangesClick}
										className="flex items-center btn btn-soft btn-primary"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
											/>
										</svg>
										Save Changes
									</button>
									<button className="flex items-center btn btn-soft btn-primary">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
											/>
										</svg>
										Cancel
									</button>
								</div>
							</form>
						</div>
					</div>
				</dialog>
			</div>
			<AddBtn
				handleFilterClick={handleFilterClick}
				handleInputChange={handleInputAddTodoChange}
				todoInput={todoItem}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}
