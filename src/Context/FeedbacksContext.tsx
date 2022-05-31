import { createContext, FC, ReactNode, useEffect, useReducer } from 'react';
import FeedbackI from '../Data/FeedbackI';
import feedbackI from '../Data/FeedbackI';
import { v4 as uuid } from 'uuid';
import { fetchFeedbacks } from '../Services/FeedbackServices';

type FeedbackActionTypes =
	| { type: 'ADD_FEEDBACK'; payload: FeedbackI }
	| { type: 'GET_FEEDBACKS'; payload: FeedbackI[] }
	| { type: 'DELETE_FEEDBACK'; payload: string }
	| { type: 'EDIT_FEEDBACK'; payload: FeedbackI }
	| { type: 'START_LOADING' }
	| { type: 'CHANGE_CURRENT_FEEDBACK'; payload: FeedbackI };

interface FeedbacksContextI {
	feedbacks: FeedbackI[];
	isLoading: boolean;
	currentFeedback: FeedbackI | null;
	onAddFeedback: (newFeedback: FeedbackI) => void;
	onDeleteFeedback: (id: string) => void;
	onEditFeedback: (newFeedback: FeedbackI) => void;
	onChangeCurrentFeedback: (newCurrentFeedback: FeedbackI) => void;
	startLoading: () => void;
}

const feedbackContextInitial = {
	feedbacks: [],
	isLoading: false,
	currentFeedback: null,
	onAddFeedback: (newFeedback: FeedbackI) => {},
	onDeleteFeedback: (id: string) => {},
	onEditFeedback: (newFeedback: FeedbackI) => {},
	onChangeCurrentFeedback: (newCurrentFeedback: FeedbackI) => {},
	startLoading: () => {},
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
			return {
				...state,
				feedbacks: [action.payload, ...state.feedbacks],
				isLoading: false,
			};
		}
		case 'GET_FEEDBACKS': {
			return { ...state, feedbacks: action.payload, isLoading: false };
		}
		case 'DELETE_FEEDBACK':
			return {
				...state,
				isLoading: false,
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
		case 'START_LOADING':
			return {
				...state,
				isLoading: true,
			};
		case 'EDIT_FEEDBACK': {
			const newFeedbacks = [...state.feedbacks];
			const ind = newFeedbacks.findIndex(
				(feedback) => feedback.id === action.payload.id
			);
			newFeedbacks[ind] = action.payload;
			return {
				...state,
				isLoading: false,
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
	const [{ feedbacks, currentFeedback, isLoading }, dispatch] = useReducer(
		feedbackReducer,
		feedbackContextInitial
	);

	useEffect(() => {
		const getFeedbacks = async () => {
			dispatch({ type: 'START_LOADING' });
			try {
				const data = await fetchFeedbacks();
				dispatch({ type: 'GET_FEEDBACKS', payload: data as FeedbackI[] });
			} catch (error) {
				console.warn(error);
			}
		};
		getFeedbacks();
	}, []);

	return (
		<FeedbacksContext.Provider
			value={{
				feedbacks,
				isLoading,
				currentFeedback,
				startLoading: () => {
					dispatch({ type: 'START_LOADING' });
				},
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
