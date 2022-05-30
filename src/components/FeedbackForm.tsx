import React, {
	ChangeEvent,
	FC,
	FormEvent,
	useContext,
	useEffect,
	useState,
} from 'react';
import Card from './Shared/Card';
import '../SCSS/FeedbackForm.scss';
import Button from './Shared/Button';
import SetRating from './SetRating';
import FeedbackI from '../Data/FeedbackI';
import { FeedbacksContext } from '../Context/FeedbacksContext';

const FeedbackForm: FC = () => {
	const { onAddFeedback, currentFeedback, onEditFeedback } =
		useContext(FeedbacksContext);
	const [text, setText] = useState('');
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState<string | null>(null);
	const [rating, setRating] = useState(1);

	useEffect(() => {
		if (currentFeedback !== null) {
			console.log('Hi');
			setRating(currentFeedback.rating);
			setText(currentFeedback.text);
			if (currentFeedback.text.trim().length <= 10) {
				setMessage('Text must be at least 10 characters...');
			} else {
				setBtnDisabled(false);
				setMessage(null);
			}
		}
	}, [currentFeedback]);

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (text === '') {
			setBtnDisabled(true);
			setMessage(null);
		} else if (text.trim().length <= 10) {
			setMessage('Text must be at least 10 characters...');
		} else {
			setBtnDisabled(false);
			setMessage(null);
		}
		setText(e.target.value);
	};

	const addFeedback = (e: FormEvent) => {
		e.preventDefault();
		if (text.trim().length >= 10) {
			if (currentFeedback === null) {
				onAddFeedback({ text, rating });
			} else {
				onEditFeedback({ text, rating, id: currentFeedback.id });
			}
			setRating(1);
			setText('');
		}
	};

	return (
		<Card>
			<form className="feedback-form" onSubmit={addFeedback}>
				<h2 className="feedback-form__title">
					How would you rate our service?
				</h2>
				<SetRating
					handleSetRating={(id) => {
						setRating(id);
					}}
					currentRating={rating}
				/>
				<div className="feedback-form__input-group">
					<input
						placeholder="Write a review"
						type="text"
						onChange={handleTextChange}
						value={text}
					/>
					<Button type="submit" isDisabled={btnDisabled}>
						Send
					</Button>
				</div>
				{message && <div className="feedback-form__message">{message}</div>}
			</form>
		</Card>
	);
};

export default FeedbackForm;
