import FeedbackI from '../Data/FeedbackI';

export const fetchFeedbacks = async () => {
	const response = await fetch('/feedbacks/?_sort=rating&_order=desc');
	if (!response.ok) throw new Error('Something goes wrong...');
	const data = await response.json();
	return data;
};

export const createFeedback = async (newFeedback: FeedbackI) => {
	const response = await fetch(`/feedbacks`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newFeedback),
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error('Something went wrong...');
	}
};

export const updateFeedback = async (updatedFeedback: FeedbackI) => {
	const response = await fetch(`/feedbacks/${updatedFeedback.id}`, {
		method: 'PUT',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			text: updatedFeedback.text,
			rating: updatedFeedback.rating,
		}),
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error('Something went wrong...');
	}
};

export const removeFeedback = async (id: string) => {
	const response = await fetch(`/feedbacks/${id}`, {
		method: 'DELETE',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	if (response.ok) {
		return await response.json();
	} else {
		throw new Error('Something went wrong...');
	}
};
