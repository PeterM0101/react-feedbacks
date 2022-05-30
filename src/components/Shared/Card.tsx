import React, { FC, ReactNode } from 'react';

import '../../SCSS/Card.scss';

interface CardProps {
	children: ReactNode;
	className?: string;
}

const Card: FC<CardProps> = ({ children, className }) => {
	return <div className={`card ${className && className}`}>{children}</div>;
};

export default Card;
