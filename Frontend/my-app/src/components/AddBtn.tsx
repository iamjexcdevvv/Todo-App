import React from "react";
import Filter from "./Filter";
import { TaskFilter } from "../enums";

interface Props {
	handleSubmit: (event: React.MouseEvent<HTMLFormElement>) => void;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleFilterClick: (filterBy: TaskFilter) => void;
	todoInput: string;
}

export default function AddBtn({
	handleSubmit,
	handleInputChange,
	handleFilterClick,
	todoInput,
}: Props) {
	return (
		<div className="p-4 space-x-3">
			<Filter handleClick={handleFilterClick} />
			<form onSubmit={handleSubmit} className="inline">
				<button type="submit" className="btn btn-soft btn-secondary">
					Add todo
				</button>
				<input
					value={todoInput}
					onChange={handleInputChange}
					type="text"
					placeholder="Type here"
					className="input input-primary"
				/>
			</form>
		</div>
	);
}
