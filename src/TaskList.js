import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteTask, updateTask } from './actions';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
	const [selectedTask, setSelectedTask] = useState(null);
	const [editingTask, setEditingTask] = useState(null);
	const [updatedTaskName, setUpdatedTaskName] = useState('');

	const handleDelete = (taskId) => {
		deleteTask(taskId);
	};

	const handleUpdate = (e) => {
		e.preventDefault();

		if (updatedTaskName.trim() === '') {
			return;
		}

		updateTask(editingTask, { ...selectedTask, name: updatedTaskName });
		setEditingTask(null);
	};

	const handleEdit = (task) => {
		setSelectedTask(task);
		setEditingTask(task.id);
		setUpdatedTaskName(task.name);
	};

	return (
		<div className="task-list">
			<h2>Task List</h2>
			{tasks.map((task) => (
				<div key={task.id}>
					<span>{task.name}</span>
					<button onClick={() => handleEdit(task)}>Edit</button>
					<button onClick={() => handleDelete(task.id)}>Delete</button>
				</div>
			))}
			{editingTask && (
				<div className="modal">
					<form onSubmit={handleUpdate}>
						<input
							type="text"
							value={updatedTaskName}
							onChange={(e) => setUpdatedTaskName(e.target.value)}
						/>
						<button type="submit">Save</button>
						<button onClick={() => setEditingTask(null)}>Cancel</button>
					</form>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
	deleteTask: (taskId) => dispatch(deleteTask(taskId)),
	updateTask: (taskId, updatedTask) => dispatch(updateTask(taskId, updatedTask)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);