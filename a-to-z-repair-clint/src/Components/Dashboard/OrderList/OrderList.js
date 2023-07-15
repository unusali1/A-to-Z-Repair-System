import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import TableSpinner from "../TableSpinner/TableSpinner";
import swal from "sweetalert";
import "./OrderList.css";

const OrderList = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/all-orders`)
			.then((res) => {
				setOrders(res.data);
			})
			.catch((error) => toast.error(error.message));
	}, []);


	const handleDeleteOrder = (id) => {

        swal({
			title: "Are you sure?",
			text: "Are you sure you want to delete this review?",
			icon: "warning",
			buttons: [true, "Yes"],
			dangerMode: true,
		}).then((wantDelete) => {
			if (wantDelete) {
				const loading = toast.loading("Deleting...Please wait!");
				const removedOrders = orders.filter((item) => item._id !== id);
				axios
					.delete(
						`http://localhost:5000/cancel-order/${id}`
					)
					.then((res) => {
						toast.dismiss(loading);
						if (res.data) {
							setOrders(removedOrders);
							return swal(
								"Successfully Deleted!",
								"This Review has been successfully deleted.",
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





	
	const handleStatusChange = (id, status,reason) => {
		let modifiedOrders = [];
		orders.forEach((order) => {
			if (order._id === id) {
				order.status = status;
				
			}
			if (order._id === id) {
				
				order.reason = reason;
			}
			modifiedOrders.push(order);
		});
		setOrders(modifiedOrders);

		const modifiedStatus = { id, status };
		const modifiedReason = { id, reason };
		const loading = toast.loading("Updating....Please wait!");

		axios
			.patch(
				"http://localhost:5000/update-order-status",
				modifiedStatus,modifiedReason
			)
			.then((res) => {
				toast.dismiss(loading);
				if (res.data) {
					toast.success(`Set to ${status} && ${reason}`);
				}
			})
			.catch((error) => toast.error(error.message));
	};




	const handleReasonChange = (id,reason) => {
		let modifiedOrders = [];
		orders.forEach((order) => {
		
			if (order._id === id) {
				
				order.reason = reason;
			}
			modifiedOrders.push(order);
		});
		setOrders(modifiedOrders);

	
		const modifiedReason = { id, reason };
		const loading = toast.loading("Updating....Please wait!");

		axios
			.patch(
				"http://localhost:5000/update-order-status",
				modifiedReason
			)
			.then((res) => {
				toast.dismiss(loading);
				if (res.data) {
					toast.success(`Set to ${reason}`);
				}
			})
			.catch((error) => toast.error(error.message));
	};

	return (
		<Container>
			<div className="shadow p-5 bg-white" style={{ borderRadius: "15px" }}>
				{orders.length > 0 ? (
					<table className="table-style " hover responsive>
						<thead className="bg-light ml-5px ">
							<tr>
								<th className="thead" >Sl. No</th>
								<th className="thead">Name</th>
								<th className="thead">Email</th>
								<th className="thead">Service</th>
								<th className="thead">Technician</th>
								<th className="thead">Pay With</th>
								<th className="thead">Status</th>
								<th className="thead">Reason</th>
								<th className="thead">Action</th>
								
							</tr>
						</thead>
						{orders.map((order, index) => {
							return (
								<tbody key={order._id} style={{ fontWeight: "500" }}>
									<tr>
										<td className="thead" >{index + 1}</td>
										<td className="thead">{order.name}</td>
										<td className="thead">{order.email}</td>
										<td className="thead">{order.order.name}</td>
										<td className="thead">{order.technician.fullname}</td>
										<td className="thead">{order.paymentMethod}</td>
										<td className="thead">
											<select
												className={
													order.status === "Pending"
														? "btn btn-danger"
														: order.status === "Done"
														? "btn btn-success"
														: "btn btn-warning"
												}
												defaultValue={order.status}
												onChange={(e) =>
													handleStatusChange(order._id, e.target.value)
												}
											>
												<option className="bg-white text-muted">Pending</option>
												<option className="bg-white text-muted">
													On Process
												</option>
												<option className="bg-white text-muted">Done</option>
											</select>
										</td>
										<td className="thead">
											<select
												className={
													order.reason === "No Isuue"
														? "btn btn-danger"
														: order.reason === "Chose Other Technician"
														? "btn btn-success"
														: "btn btn-warning"
												}
												defaultValue={order.reason}
												onChange={(e) =>
													handleReasonChange(order._id, e.target.value)
												}
											>
												<option className="bg-white text-muted">No Issue</option>
												<option className="bg-white text-muted">
													Technician Busy
												</option>
												<option className="bg-white text-muted">Chose Other Technician</option>
											</select>
										</td>
										<td className="thead">
											<Button
												variant="outline-danger"
												className="p-1 ml-3 mb-0"
												onClick={() => handleDeleteOrder(order._id)}
											>
												<FontAwesomeIcon icon={faTrash} className="mx-1" />
											</Button>
										</td>
									</tr>
								</tbody>
							);
						})}
					</table>
				) : (
					<TableSpinner />
				)}
			</div>
		</Container>
	);
};

export default OrderList;
