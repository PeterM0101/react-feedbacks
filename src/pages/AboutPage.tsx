import React from 'react';
import Card from '../components/Shared/Card';
import { Link } from 'react-router-dom';

const AboutPage = () => {
	return (
		<Card>
			<div className="about-page">
				<h1>About this project</h1>
				<p>
					This is a React App to leave a feedback to a product or service
				</p>
				<p>Version: 1.0.0.</p>
				<Link to="/">Back to Home</Link>
			</div>
		</Card>
	);
};

export default AboutPage;
