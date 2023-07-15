import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { UserContext } from "../../../App";
import TableSpinner from "../TableSpinner/TableSpinner";

const MangeTechnicians = () => {
	const {
		loggedInUser: { email },
	} = useContext(UserContext);
	const [technicians, setTechnicians] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/all-technicians")
			.then((res) => {
				setTechnicians(res.data);
			})
			.catch((error) => toast.error(error.message));
	}, []);

	const restrictPermission = (id) => {
		let matchedID = false;
		for (let i = 0; i < 6; i++) {
			const { _id } = technicians[i];
			if (id === _id) {
				matchedID = true;
			}
		}
		if (email === "admin@test.gmail" && matchedID) {
			return true;
		}
		return false;
	};

	const handleUpdateService = (id) => {
		if (restrictPermission(id)) {
			return swal(
				"Permission restriction!",
				"As a test-admin, you don't have permission to update 6 core services. But you can update your added services.",
				"info"
			);
		} else {
			return swal(
				"Permission restriction!",
				"This feature will coming soon...",
				"info"
			);
		}
	};



	const handleDeleteService = (id) => {
		if (email === "admin@test.gmail") {
			return swal(
				"Permission restriction!",
				"As a test-admin, you don't have this permission.",
				"info"
			);
		}

		swal({
			title: "Are you sure?",
			text: "Are you sure you want to delete thid Technicians?",
			icon: "warning",
			buttons: [true, "Yes"],
			dangerMode: true,
		}).then((wantDelete) => {
			if (wantDelete) {
				const loading = toast.loading("Deleting...Please wait!");
				const removedtechnicians = technicians.filter((item) => item._id !== id);
				axios
					.delete(
						`http://localhost:5000/technician-delete/${id}`
					)
					.then((res) => {
						toast.dismiss(loading);
						if (res.data) {
							setTechnicians(removedtechnicians);
							return swal(
								"Successfully Deleted!",
								"This Technician has been successfully deleted.",
								"success"
							);
						}
						swal(
							"Failed!",
							"Something went wrong! Please try again.",
							"error",
							{ dangerMode: true }
						);
					})
					.catch((err) => {
						toast.dismiss(loading);
						swal(
							"Failed!",
							"Something went wrong! Please try again.",
							"error",
							{ dangerMode: true }
						);
					});
			}
		});
	};


	return (
		<Container>
			<div className="shadow p-5 bg-white" style={{ borderRadius: "15px" }}>
				{technicians.length > 0 ? (
					<Table className="table-style" hover responsive>
						<thead className="bg-light">
							<tr>
								<th>Sl. No</th>
								<th>Name</th>
								<th>Expert</th>
                                <th>Phone</th>
								<th className="text-center">Action</th>
							</tr>
						</thead>
						{technicians.map((technician, index) => {
							return (
								<tbody key={technician._id} style={{ fontWeight: "500" }}>
									<tr>
										<td>{index + 1}</td>
										<td>{technician.fullname}</td>
										<td> {technician.expert}</td>
                                        <td> {technician.phone}</td>
										<td className="text-center">
											
											<Button
												variant="outline-danger"
												className="p-1 ml-3 mb-0"
												onClick={() => handleDeleteService(technician._id)}
											>
												<FontAwesomeIcon icon={faTrash} className="mx-1" />
											</Button>
										</td>
									</tr>
								</tbody>
							);
						})}
					</Table>
				) : (
					<TableSpinner />
				)}
			</div>
		</Container>
	);
};

export default MangeTechnicians;
