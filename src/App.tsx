import FeedbackList from './components/FeedbackList';
import React from 'react';

import styles from './index.module.scss';
import FeedbacksStats from './components/FeedbacksStats';
import Header from './components/Header';
import FeedbackForm from './components/FeedbackForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';
import { FeedbacksContextProvider } from './Context/FeedbacksContext';

function App() {
	return (
		<Router>
			<FeedbacksContextProvider>
				<Header text="Feedback UI" />
				<div className={styles.container}>
					<Routes>
						<Route
							path="/"
							element={
								<>
									<FeedbackForm />
									<FeedbacksStats />
									<FeedbackList />
								</>
							}
						/>
						<Route path="/about" element={<AboutPage />} />
					</Routes>
					<AboutIconLink />
				</div>
			</FeedbacksContextProvider>
		</Router>
	);
}

export default App;
