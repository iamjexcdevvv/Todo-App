export function Todo({ todos, handleChange }) {
	const todoEntry = todos.map((item, index) => {
		return (
			<tr key={item.id}>
				<td>{index + 1}</td>
				<td>{item.todoName}</td>
				<td>{item.isCompleted ? "Completed" : "Not completed"}</td>
				<td>
					<input
						onChange={() => {
							handleChange(index);
						}}
						checked={item.isCompleted}
						type="checkbox"
						className="checkbox checkbox-primary"
					/>
				</td>
			</tr>
		);
	});

	return (
		<div className="max-h-96 overflow-auto w-full flex justify-center">
			<div className="w-full">
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
		</div>
	);
}
