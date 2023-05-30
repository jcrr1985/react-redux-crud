import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTask } from './actions';

const TaskForm = ({ addTask }) => {
	const [taskName, setTaskName] = useState('');

	const handleTaskNameChange = (e) => {
		setTaskName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (taskName.trim() === '') {
			return;
		}

		const newTask = {
			id: new Date().getTime().toString(),
			name: taskName,
		};

		addTask(newTask);
		setTaskName('');
	};

	return (
		<div className="task-form">
			<h2>Add Task</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="New Task"
					value={taskName}
					onChange={handleTaskNameChange}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	);
};

export default connect(null, { addTask })(TaskForm);
