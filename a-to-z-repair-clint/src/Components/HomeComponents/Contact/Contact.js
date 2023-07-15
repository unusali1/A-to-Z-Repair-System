import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import React from "react";
// import Fade from "react-reveal/Fade";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import swal from "sweetalert";
 import { BiSend } from "react-icons/bi";
// import Social from "../Social/Social";
import "./Contact.css";
import Map from "../../../Components/Map/Map";

const ContactMe = () => {
	const { register, handleSubmit, reset } = useForm();

	const onSubmit = (data) => {
		const loading = toast.loading("Please wait...!");
		emailjs.send("gmail", "template_z5supyi", data, "dNzo52YXkCEt6n4GL").then(
			(res) => {
				toast.dismiss(loading);
				if (res.text === "OK") {
					reset();
					return swal(
						"Thank you!",
						"Your message was sent successfully.",
						"success"
					);
				}
				swal("Sorry!", "Something went wrong. Please try again later", "error");
			},
			(err) => {
				toast.dismiss(loading);
				swal("Sorry!", "Something went wrong. Please try again later", "error");
			}
		);
	};

	return (
		<section className="contact-container pb-5 mt-5" id="contact">
			<Container className="pt-5 news-container">
				<h3 className="text-center text-lobster">
					Get In<span> Touch</span>
				</h3>
				<div className="mt-4">
					<form onSubmit={handleSubmit(onSubmit)} className="contact-form">
						<Row>
							<Col md="6">
								<div>
									<p className="p-text">
										If you want to know more us you can contact us. You can also
										give us your opinion about our service. Our inbox is always
										open for you. We will try our best to reply to all of your
										messages. Thank you for visiting our servicing site.
									</p>
									<br />
									<ul class="list-unstyled">
										<li>
											<strong>Email: </strong> atozrepairingservice@gmail.com
										</li>
										<li>
											<strong>Phone: </strong> +8801xxxxxxxxx
										</li>
										<li>
											<strong>Address: </strong> Dhaka, Bangladesh
										</li>
									</ul>
									{/* <Fade bottom>
										<Social></Social>
									</Fade> */}
									<Map></Map>
								</div>
							</Col>

							<Col md="6">
								<div className="contact-group">
									<label>Your Name</label>
									<input
										type="text"
										name="name"
										placeholder="Enter Your Name"
										{...register("name", { required: true })}
										required
									/>
								</div>

								<div className="contact-group">
									<label>Email</label>
									<input
										type="email"
										name="email"
										placeholder="Enter Your Email"
										{...register("email", { required: true })}
										required
									/>
								</div>

								<div className="contact-group">
									<label>Subject</label>
									<input
										type="text"
										name="subject"
										placeholder="Subject"
										{...register("subject", { required: true })}
										required
									/>
								</div>
								<div className="contact-group">
									<label>Message</label>
									<textarea
										name="message"
										placeholder="Write a message..."
										{...register("message", { required: true })}
										required
									/>
								</div>
								<motion.button
									whileHover={{
										scale: 1.1,
										textShadow: "0px 0px 8px rgb(255 255 255)",
										boxShadow: "0px 0px 8px #17a2b8",
										transition: { duration: 0.4, yoyo: "Infinity" },
									}}
									id="contact-button"
									className="mt-3 text-center"
								>
									Send
									<BiSend className="send-icon" />
								</motion.button>
							</Col>
						</Row>
					</form>
				</div>
			</Container>
		</section>
	);
};

export default ContactMe;

// import { motion } from "framer-motion";
// import React from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import './Contact.css';

// const Contact = () => {
//     return (
//         <section className="contact-container  pb-5" id='contact'>
//             <Container className="pt-5">
//                     <h3 className="text-center">Get In Touch</h3>
//                     <p className="row col-md-8 text-center m-auto">I'd Love to hear from you . Whether you have a question or just want to say hi, fell free to drop a message. I'll try my best to get back to you</p>
//                     <div className="mt-4">
//                         <form className="contact-form">
//                             <Row>
//                                 <Col md="6">
//                                     <div className="contact-group">
//                                         <label >Your Name</label>
//                                         <input type="text"  name="name" placeholder="Enter Your Name"/>
//                                     </div>

//                                     <div className="contact-group"  >
//                                         <label>Email</label>
//                                         <input type="email" name="email" placeholder="Enter Your Email"/>
//                                     </div>

//                                     <div className="contact-group">
//                                         <label>Phone</label>
//                                         <input type="phone" name="subject" placeholder="Enter Your Phone Number"/>
//                                     </div>
//                                 </Col>

//                                 <Col md="6">
//                                     <div className="contact-group">
//                                         <label>Message</label>
//                                         <textarea name="message" placeholder='Give me a mail' />
//                                     </div>
//                                 </Col>

//                             </Row>
//                             <div className="mt-3 text-center">
//                             <motion.button whileHover={{scale:1.1, textShadow:'0px 0px 8px rgb(255 255 255)', boxShadow:'0px 0px 8px rgb(255 255 255)'}} className='main-button'>Send Message</motion.button>
//                             </div>
//                         </form>
//                     </div>
//              </Container>
//         </section>
//     );
// };

// export default Contact;
