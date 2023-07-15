import React from "react";
import Fade from "react-reveal/Fade";
import "./Map.css";

const Map = () => {
	return (
		<>
			<Fade bottom>
				<div className="map-section">
					<iframe
						className="map-style"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0807390077466!2d90.40624741498125!3d23.74450008459231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b88bfd0133c5%3A0xfde0a96bf5fecf99!2sStamford%20University%20Bangladesh!5e0!3m2!1sen!2sbd!4v1666378310126!5m2!1sen!2sbd"
						style={{ border: "0" }}
						allowFullScreen=""
						loading="lazy"
						title="This is a unique title"
					></iframe>
				</div>
			</Fade>
		</>
	);
};

export default Map;
