export default function AddBtn() {
	return (
		<div className="p-4 space-x-3">
			<button className="btn btn-soft btn-secondary">Add todo</button>
			<input type="text" placeholder="Type here" className="input input-primary" />
		</div>
	);
}
