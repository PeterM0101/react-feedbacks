import React, { FC, useContext } from 'react';
import FeedbackI from '../Data/FeedbackI';
import '../SCSS/FeedbacksStats.scss';
import { FeedbacksContext } from '../Context/FeedbacksContext';

const FeedbacksStats: FC = () => {
	const { feedbacks } = useContext(FeedbacksContext);
	const feedbacksLength = feedbacks.length;
	let average: number | string =
		feedbacks.reduce((total, feedback) => total + feedback.rating, 0) /
		feedbacksLength;
	average = average.toFixed(1).replace(/[.,]0$/, '');

	return (
		<div className="feedbacks-stats">
			<h4 className="feedbacks-stats__info">
				{`${feedbacksLength} ${
					feedbacksLength !== 1 ? 'Reviews' : 'Review'
				}`}
			</h4>
			<h4>{`Average rating: ${isNaN(+average) ? 0 : average}`}</h4>
		</div>
	);
};

export default FeedbacksStats;
