import React, { FC } from 'react';
import '../SCSS/Header.scss';
import { Link } from 'react-router-dom';

interface HeaderProps {
	bgColor?: string;
	textColor?: string;
	text: string;
}

const Header: FC<HeaderProps> = ({
	text,
	textColor = '#ff6a95',
	bgColor = 'rgba(0,0,0,0.4)',
}) => {
	const HeaderStyles = {
		backgroundColor: bgColor,
		color: textColor,
	};

	return (
		<header className="header" style={HeaderStyles}>
			<Link to="" style={{ textDecoration: 'none', color: '#DC487E' }}>
				<h2>{text}</h2>
			</Link>
		</header>
	);
};

export default Header;
