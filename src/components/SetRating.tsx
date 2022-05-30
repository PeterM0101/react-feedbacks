import React, { FC } from 'react';
import '../SCSS/SetRating.scss';

interface SetRatingProps {
	handleSetRating: (id: number) => void;
	currentRating: number;
}

const SetRating: FC<SetRatingProps> = ({ handleSetRating, currentRating }) => {
	return (
		<div className="set-rating">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, ind) => (
				<div
					className={`set-rating__item ${
						ind + 1 === currentRating ? 'set-rating__item--active' : ''
					}`}
					key={ind}
					onClick={handleSetRating.bind(null, item)}
				>
					{item}
				</div>
			))}
		</div>
	);
};

export default SetRating;
