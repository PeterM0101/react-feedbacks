import { createContext, FC, ReactNode, useReducer } from 'react';
import FeedbackI from '../Data/FeedbackI';
import FeedbackData from '../Data/FeedbackData';
import feedbackI from '../Data/FeedbackI';

interface FeedbackInfo {
	text: string;
	rating: number;
}

type FeedbackActionTypes =
	| { type: 'ADD_FEEDBACK'; payload: FeedbackInfo }
	| { type: 'DELETE_FEEDBACK'; payload: number }
	| { type: 'EDIT_FEEDBACK'; payload: FeedbackI }
	| { type: 'CHANGE_CURRENT_FEEDBACK'; payload: FeedbackI };

interface FeedbacksContextI {
	feedbacks: FeedbackI[];
	currentFeedback: FeedbackI | null;
	onAddFeedback: (newFeedback: FeedbackInfo) => void;
	onDeleteFeedback: (id: number) => void;
	onEditFeedback: (newFeedback: FeedbackI) => void;
	onChangeCurrentFeedback: (newCurrentFeedback: FeedbackI) => void;
}

const feedbackContextInitial = {
	feedbacks: FeedbackData,
	currentFeedback: null,
	onAddFeedback: (newFeedback: FeedbackInfo) => {},
	onDeleteFeedback: (id: number) => {},
	onEditFeedback: (newFeedback: FeedbackI) => {},
	onChangeCurrentFeedback: (newCurrentFeedback: FeedbackI) => {},
};

export const FeedbacksContext = createContext<FeedbacksContextI>(
	feedbackContextInitial
);

interface FeedbacksContextProviderProps {
	children: ReactNode;
}

const feedbackReducer = (
	state: FeedbacksContextI = feedbackContextInitial,
	action: FeedbackActionTypes
) => {
	switch (action.type) {
		case 'ADD_FEEDBACK': {
			const newFeedback: FeedbackI = {
				text: action.payload.text,
				rating: action.payload.rating,
				id:
					state.feedbacks.length === 0
						? 1
						: state.feedbacks.reduce(
								(acc: number, current: FeedbackI) =>
									acc > +current.id ? acc : current.id,
								-Infinity
						  ) + 1,
			};
			return { ...state, feedbacks: [...state.feedbacks, newFeedback] };
		}
		case 'DELETE_FEEDBACK':
			return {
				...state,
				feedbacks: [
					...state.feedbacks.filter(
						(feedback) => feedback.id !== action.payload
					),
				],
			};
		case 'CHANGE_CURRENT_FEEDBACK':
			return {
				...state,
				currentFeedback: action.payload,
			};
		case 'EDIT_FEEDBACK': {
			const newFeedbacks = [...state.feedbacks];
			const ind = newFeedbacks.findIndex(
				(feedback) => feedback.id === action.payload.id
			);
			newFeedbacks[ind] = action.payload;
			return {
				...state,
				feedbacks: newFeedbacks,
				currentFeedback: null,
			};
		}
		default:
			return state;
	}
};

export const FeedbacksContextProvider: FC<FeedbacksContextProviderProps> = ({
	children,
}) => {
	const [{ feedbacks, currentFeedback }, dispatch] = useReducer(
		feedbackReducer,
		feedbackContextInitial
	);

	return (
		<FeedbacksContext.Provider
			value={{
				feedbacks,
				currentFeedback,
				onAddFeedback: (newFeedback) => {
					dispatch({ type: 'ADD_FEEDBACK', payload: newFeedback });
				},
				onEditFeedback: (changedFeedback) => {
					dispatch({ type: 'EDIT_FEEDBACK', payload: changedFeedback });
				},
				onDeleteFeedback: (id) => {
					dispatch({ type: 'DELETE_FEEDBACK', payload: id });
				},
				onChangeCurrentFeedback: (newCurrentFeedback) => {
					dispatch({
						type: 'CHANGE_CURRENT_FEEDBACK',
						payload: newCurrentFeedback,
					});
				},
			}}
		>
			{children}
		</FeedbacksContext.Provider>
	);
};
