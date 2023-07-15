import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import spinner from "../../../images/loading.gif";
import ServiceDetail from "../ServiceDetail/ServiceDetail";
import "../Services/Services.css";
import TechDetail from "./TechnicianDetail";
import Navbar from "../NavBar/NavBar.js"
const Tech = () => {
    const [technicians, setTechnicians] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:5000/all-technicians")
			.then((res) => {
				setTechnicians(res.data);
			})
			.catch((error) => toast.error(error.message));
	}, []);

	const uniqueList = [
		...new Set(
			technicians.map((technician) => {
				return technician.expert;
			})
		),
		"All",
	];
	
	const [menuData, setMenuData] = useState(technicians);
	const [menuList, setMenuList] = useState(uniqueList);

	const filterItem = (expert) => {
		if (expert === "All") {
			setMenuData(technicians);
			return;
		}
		const updatedList = technicians.filter((technician) => {
			return technician.expert === expert;
		});

		setMenuData(updatedList);
	};

	return (
		<>
<Navbar   />
		
		  <section className="services" id="service">
		  <div className="review-title text-center">
					
					<h3>SELECT TECNICIANS</h3>
				</div>
				<div className="service-nav">
				<div className="btn-group">
					{uniqueList.map((technician) => {
						return (
							<button
								className="btn-group__item"
								onClick={() => filterItem(technician)}>
								{technician}
							</button>
						);
					})}
				</div>
			</div>
			<TechDetail menuData={menuData} />
		</section>
		
		</>
	);
};


export default Tech;