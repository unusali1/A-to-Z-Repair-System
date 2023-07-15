import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import ServiceDetail from "../ServiceDetail/ServiceDetail";
import "./Services.css";
import ServiceNav from "./ServiceNav";

const Services = () => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/all-services")
			.then((res) => {
				setServices(res.data);
				console.log(res.data);
			})
			.catch((error) => toast.error(error.message));
	}, []);


	const uniqueList = [
		...new Set(
			services.map((service) => {
				return service.category;
			})
		),
		"All",
	];
	
	const [menuData, setMenuData] = useState(services);
	const [menuList, setMenuList] = useState(uniqueList);

	const filterItem = (category) => {
		if (category === "All") {
			setMenuData(services);
			return;
		}
		const updatedList = services.filter((service) => {
			return service.category === category;
		});

		setMenuData(updatedList);
	};

	return (
		<>
		<section className="services" id="service">
		<div className="review-title text-center">
					<span>What We Do</span>
					<h3>Services We Provide</h3>
				</div>
				{/* <ServiceNav filterItem={filterItem} menuList={menuList}/> */}
			<div className="service-nav">
				<div className="btn-group">
					{uniqueList.map((service) => {
						return (
							<button
								className="btn-group__item"
								onClick={() => filterItem(service)}>
								{service}
							</button>
						);
					})}
				</div>
			</div>
			<ServiceDetail menuData={menuData} />
		</section>
		</>
	);
};

export default Services;

















// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Container, Row } from "react-bootstrap";
// import toast from "react-hot-toast";
// import spinner from "../../../images/loading.gif";
// import ServiceDetail from "../ServiceDetail/ServiceDetail";
// import ServiceNav from "./ServiceNav";
// import "./Services.css";

// const Services = () => {
// 	const [services, setServices] = useState([]);

// 	useEffect(() => {
// 		axios
// 			.get("http://localhost:5000/all-services")
// 			.then((res) => {
// 				setServices(res.data);
// 			})
// 			.catch((error) => toast.error(error.message));
// 	}, []);

// 	return (
// 		<section className="services" id="service">
// 			{/* <ServiceNav></ServiceNav> */}
// 			<Container>
// 				<h5>What We Do</h5>
// 				<h3>Services We Provide</h3>
// 				<Row className="mt-5 justify-content-center">
// 					{services.length > 0 ? (
// 						services.map((service) => (
// 							<ServiceDetail key={service._id} service={service} />
// 						))
// 					) : (
// 						<div className="m-auto">
// 							<img className="img-fluid" src={spinner} alt="..." />
// 						</div>
// 					)}
// 				</Row>
// 			</Container>
// 		</section>
// 	);
// };

// export default Services;
