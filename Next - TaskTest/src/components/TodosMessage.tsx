"use client";
import {useTodos} from "@/context/todo";
import {useSearchParams} from "next/navigation";
import React from "react";

type Props = {};

const TodosMessage = (props: Props) => {
	const {
		todos,
		toggleTodoCompleted,
		handleTodoDelete,
	} = useTodos();

	const searchParams = useSearchParams();
	const todosFilter = searchParams.get("todos");

	let filteredTodos = todos;

	if (todosFilter === "active") {
		filteredTodos = filteredTodos.filter((todo) => !todo.completed);
	} else if (todosFilter === "completed") {
		filteredTodos = filteredTodos.filter((todo) => todo.completed);
	}

	return (
		<section>
			
			<ul className="flex flex-col justify-center items-center">
				{filteredTodos.map((todos) => (
					<li
						key={todos.id}
						className="min-h-[4rem] w-full px-6 grid grid-cols-3 items-center border-y border-gray-600 my-3"
					>
						<label>Title</label>
						<input
							type="checkbox"
							className="w-5 h-5 cursor-pointer justify-self-start"
							id={`todo-${todos.id}`}
							checked={todos.completed}
							onChange={() => toggleTodoCompleted(todos.id)}
						/>
						<label
							htmlFor={`todo-${todos.id}`}
							className={` ${
								todos.completed ? "line-through text-red-600 " : ""
							} justify-self-start`}
						>
							{todos.task}
						</label>
						{todos.completed && (
							<button
								className="p-2 text-sm w-28 inline-block rounded-full text-white bg-blue-600 hover:bg-blue-600 justify-self-end"
								type="button"
								onClick={() => handleTodoDelete(todos.id)}
							>
								Delete Task
							</button>
						)}
					</li>
				))}
			</ul>
		</section>
	);
};

export default TodosMessage;
