import React, { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import '../../SCSS/Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	type?: 'submit' | 'button';
	isDisabled?: boolean;
	version?: 'primary' | 'secondary' | 'icon';
	className?: string;
}

const Button: FC<ButtonProps> = ({
	version = 'primary',
	type = 'button',
	isDisabled = false,
	children,
	className,
	...rest
}) => {
	return (
		<button
			disabled={isDisabled}
			className={`${className} btn btn--${version}`}
			type={type}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
