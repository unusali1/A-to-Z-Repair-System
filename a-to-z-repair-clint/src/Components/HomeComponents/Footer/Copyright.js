import React from 'react';

const Copyright = () => {
    return (
			<div className="copyright">
				<small>
					Designed & Build by{" "}
					<a
						href="mailto:atozrepairingservice@gmail.com"
						style={{ color: "rgb(26 210 14)" }}
					>
						A To Z Repair Services
					</a>
				</small>
				<br />
				<small>
					{new Date().getFullYear()} &copy; copyright | A To Z Repair Services
				</small>
				<br />
			</div>
		);
};

export default Copyright;