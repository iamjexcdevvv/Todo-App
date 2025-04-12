import React from "react";

interface Props {
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	todoInput: string;
}

export default function AddBtn({
	handleClick,
	handleInputChange,
	todoInput,
}: Props) {
	return (
		<div className="p-4 space-x-3">
			<button
				onClick={handleClick}
				className="btn btn-soft btn-secondary"
			>
				Add todo
			</button>
			<input
				value={todoInput}
				onChange={handleInputChange}
				type="text"
				placeholder="Type here"
				className="input input-primary"
			/>
		</div>
	);
}
