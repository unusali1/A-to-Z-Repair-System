import { motion } from "framer-motion";
import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import about from '../../../images/about-section.png';
import './About.css';

const About = () => {
    return (
			<section className="about-container">
				<Container>
					<Row className="align-items-center justify-content-center banner">
						<Col md={6}>
							<Fade left>
								<Image className="img-fluid" src={about} alt="..." />
							</Fade>
						</Col>
						<Col md={6}>
							<Fade right>
								<h6 className="text-info">About Us</h6>
								<h3>Why Choose Us For Repair ?</h3>
								<span className="animate-border border-black"></span>
								<p className="text-muted mt-2">
									{" "}
									<small>
										A to z Repair Services, guarantee that you receive the
										highest quality value for any of your appliance repair
										needs. We will make convenient appointments to fit your busy
										schedule and provide emergency service 24 hours a day, seven
										days a week and also provide same day service. We are
										specialising in ac repair, car repair, oven repair, bike
										repair, microwave repair, tv repair, refrigerator repair. We
										are qualified, highly trained, experienced technicians to
										provide you with fast diagnostics and the best quality home
										appliance repair possible. Fair pricing. No hourly rates. No
										hidden fees.Please also check out our customer reviews!
									</small>
								</p>
								<motion.button
									whileHover={{
										scale: 1.1,
										textShadow: "0px 0px 8px rgb(255 255 255)",
										boxShadow: "0px 0px 8px #17a2b8",
										transition: { duration: 0.4, yoyo: "Infinity" },
									}}
									className="main-button"
								>
									Learn More
								</motion.button>
							</Fade>
						</Col>
					</Row>
				</Container>
			</section>
		);
};

export default About;