"use client";
import AddTodo from "@/components/AddTodo";
import {useRouter} from "next/navigation";
import Navbar from "@/components/Navbar";
import TodosMessage from "@/components/TodosMessage";
import axios from "axios";
import { getCookie, setCookie } from 'cookies-next'
import { useSearchParams } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const todosFilter = searchParams.get("todos");
	const logout = async () => {
		try {
			setCookie("token", '')
			// toast.success(`User logged out`, successState);
			router.push("/login");
		} catch (error: any) {
			console.log("Error logging out:", error.message);
		}
	};

	return (
		<>
			<main className="p-5 inset-0 mx-auto">
				<div className="flex justify-end p-2">
					<button onClick={logout} className="bg-red-600 rounded-md p-2">
						Logout
					</button>
				</div>
				<h1 className="font-bold text-2xl flex flex-col justify-center items-center border-b my-5 py-5 border-gray-600 ">
					Task Sharing
				</h1>
				<Navbar />
				{todosFilter === "create" ?
				<AddTodo /> :
				<TodosMessage />

			}
			</main>
		</>
	);
};

export default Page;
