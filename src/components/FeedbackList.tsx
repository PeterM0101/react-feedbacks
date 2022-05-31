import FeedbackItem from './FeedbackItem';
import React, { FC, useContext } from 'react';

import FeedbackI from '../Data/FeedbackI';
import styles from '../index.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbacksContext } from '../Context/FeedbacksContext';
import Spinner from './Shared/Spinner';

const FeedbackList: FC = () => {
	const { feedbacks, isLoading } = useContext(FeedbacksContext);
	if (!isLoading && (!feedbacks || feedbacks.length === 0))
		return <div className={styles.emptyList}>No feedback yet...</div>;

	return (
		<div>
			{isLoading && <Spinner />}
			<AnimatePresence>
				{feedbacks.map((feedback: FeedbackI) => {
					const { id, text, rating } = feedback;
					return (
						<motion.div
							key={id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<FeedbackItem feedback={feedback} />
						</motion.div>
					);
				})}
			</AnimatePresence>
		</div>
	);
};

export default FeedbackList;
