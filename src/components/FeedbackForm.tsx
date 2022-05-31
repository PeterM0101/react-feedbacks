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
import { FeedbacksContext } from '../Context/FeedbacksContext';
import { v4 as uuidv4 } from 'uuid';
import { createFeedback, updateFeedback } from '../Services/FeedbackServices';
import Spinner from './Shared/Spinner';

const FeedbackForm: FC = () => {
	const {
		onAddFeedback,
		currentFeedback,
		onEditFeedback,
		isLoading,
		startLoading,
	} = useContext(FeedbacksContext);
	const [text, setText] = useState('');
	const [btnDisabled, setBtnDisabled] = useState(true);
	const [message, setMessage] = useState<string | null>(null);
	const [rating, setRating] = useState(1);

	useEffect(() => {
		if (currentFeedback !== null) {
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

	const addFeedback = async (e: FormEvent) => {
		e.preventDefault();
		if (text.trim().length >= 10) {
			if (currentFeedback === null) {
				try {
					startLoading();
					const data = await createFeedback({
						text,
						rating,
						id: uuidv4(),
					});
					onAddFeedback(data);
				} catch (error) {
					console.warn(error);
				}
			} else {
				try {
					startLoading();
					const data = await updateFeedback({
						text,
						rating,
						id: currentFeedback.id,
					});
					onEditFeedback(data);
				} catch (error) {
					console.warn(error);
				}
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
