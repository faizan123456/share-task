"use client";

import {useTodos as useTodo} from "@/context/todo";
import axios from "axios";
import {useFormik} from "formik";
import {BiLoaderAlt} from "react-icons/bi";
import {useEffect, useState} from "react";
import * as yup from "yup";
import {useToast} from "./ui/use-toast";
import Select from 'react-select';
import { getCookie, setCookie } from 'cookies-next'
// import { jwtDecode, JwtPayload } from 'jwt-decode';
import jwt_decode from 'jwt-decode';

const baseUrl = process.env.NEXT_PUBLIC_API_URL

type Props = {};

const taskSchema = yup.object().shape({
	todo: yup.string().min(5).required(" Vaild task is required"),
});

const AddTodo = (props: Props) => {
	const {toast} = useToast();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const {handleAddTodo, isLoading, setIsLoading} = useTodo();
	const [permissions, setPermissions] = useState([]);
	const [assignee, setAssignee] = useState('');
	const [users, setUsers] = useState([]);

	const getUsers = async () => {
		try {
			const response = await axios.get(`${baseUrl}auth/users`);
			const responseData = response.data;
			if (!responseData.error && responseData.success) {
				setUsers(responseData.users)
				}
		} catch (error: any) {
			// Handle network errors or other exceptions
			const errorMessage =
				error.response?.data?.error || "An error occurred during login.";

			toast({title: errorMessage});
		}
	};
	useEffect(() => {
		getUsers();

	}, [])
	
	const token = getCookie("token")
	console.log('token--->', token)
	// const logggedin = jwt_decode(token)
	// const loggedinUser:any = jwtDecode<JwtPayload>(token);

  const options:any = [
    { value: 'view', label: 'View' },
    { value: 'edit', label: 'Edit' }
];

	const handlePermissions = (selectedValues:any) => {
		setPermissions(selectedValues);
	  };

	//fix tost message and data not saved in server
	const onTaskAdded = async () => {
		try {
			setIsLoading(true);
			const obj = {
				assignedTo: assignee,
				// assignedFrom: loggedinUser._id,
				title: values.title,
				status: 'created'
			}
			const response = await axios.post(`${baseUrl}task`, obj, {
				headers: {
					'Content-Type': 'application/json',
					authorization: token
				}
			});
			console.log(response);
			if (response.data.success) {
				toast({title: "Task added successfully"});
				console.log(response.data);
			} else {
				console.error("Empty response data received");
			}
		} catch (error) {
			console.error("Error adding task:", error);
			// toast({title: "Failed to add task. Please try again later."});
		} finally {
			setIsLoading(false);
		}
	};

	const {
		values,
		touched,
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		isValid,
	} = useFormik({
		initialValues: {
			title: "",
		},
		validationSchema: taskSchema,
		onSubmit: (values: {title: string}, formikHelpers: any) => {
			handleAddTodo(values.title);
			formikHelpers.resetForm();
		},
	});

	useEffect(() => {
		setIsSubmitting(isValid);
	}, [isValid]);

	return (
		<form
			className="grid gap-5 grid-cols-3 grid-rows-1 px-5 my-8 items-center"
			onSubmit={handleSubmit}
		>
			<section>
			<label>Title</label>
			<input
				className={` ${
					errors.title && touched.title
						? ` rounded-lg p-3 placeholder:text-black/30 block w-full shadow-sm focus:outline-none focus:border-red-600 border-2 bg-transparent border-red-600 placeholder:text-gray-400 transition-all`
						: ``
				}  rounded-lg p-3 lg:mr-5 placeholder:text-black/30 block py-1.5 w-full
          shadow-sm  focus:outline-none border-2 bg-transparent border-gray-600
           placeholder:text-gray-400  focus:border-blue-600 transition-all col-span-3 lg:col-span-2 row-span-1`}
				type="text"
				name="title"
				placeholder="Write your task...."
				value={values.title}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			</section>
			<br />
			<section>
			<label>Assign To</label>
			{/* <Select
				options={options}
				isMulti
				value={permissions}
				onChange={handlePermissions}
			/> */}
			<select onChange={(e) => setAssignee(e.target.value)}>
				<option>Select Assignee</option>
				{users.map((el:any) => (
					<option value={el._id}>{el.username}</option>
				))}
			</select>
			</section>
			<br />
			<section>
			<button
				onClick={onTaskAdded}
				className={`px-6 py-2 hover:opacity-70 rounded-full col-span-3 lg:col-span-1 ${
					errors.todo && touched.todo ? "bg-red-600 shake-horizontal" : "bg-blue-600"
				} ${
					(isSubmitting && !errors.todo) || touched.todo
						? "bg-blue-600"
						: "bg-red-600 shake-horizontal"
				}`}
			>
				<p className="flex justify-center items-center gap-3">
					Add task
					<span>{isLoading ? <BiLoaderAlt className="animate-spin" /> : ""}</span>
				</p>
			</button>
			</section>
			{errors.todo && touched.todo && (
				<p className="text-red-600 row-span-1 col-span-3">{errors.todo}</p>
			)}
		</form>
	);
};

export default AddTodo;
