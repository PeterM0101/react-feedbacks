import Card from './Shared/Card';
import React, { FC, useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import Button from '../components/Shared/Button';

import '../SCSS/FeedbackItem.scss';
import { FeedbacksContext } from '../Context/FeedbacksContext';
import FeedbackI from '../Data/FeedbackI';

interface FeedbackItemProps {
	feedback: FeedbackI;
}

const FeedbackItem: FC<FeedbackItemProps> = ({ feedback }) => {
	const { onDeleteFeedback, onChangeCurrentFeedback } =
		useContext(FeedbacksContext);
	const { id, text, rating } = feedback;

	const handleDelete = (id: number) => {
		if (window.confirm('Are you sure you want to delete?')) {
			onDeleteFeedback(id);
		}
	};

	return (
		<Card>
			<h2 className="feedback-item__rating">{rating}</h2>
			<p className="feedback-item__text">{text}</p>
			<div className="feedback-item__cta">
				<Button
					className="feedback-item__btn"
					version="icon"
					type="button"
					onClick={onChangeCurrentFeedback.bind(null, feedback)}
				>
					<FaEdit color="purple" />
				</Button>
				<Button
					className="feedback-item__btn"
					version="icon"
					type="button"
					onClick={handleDelete.bind(null, id)}
				>
					<FaTimes color="purple" />
				</Button>
			</div>
		</Card>
	);
};

export default FeedbackItem;
