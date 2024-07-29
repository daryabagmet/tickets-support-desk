import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import NewTicket from './pages/newTicket';
import Tickets from './pages/tickets';
import Ticket from './pages/ticket';
import Header from './components/header';
import PrivateRoute from './components/privateRoute';

function App() {
	return (
		<>
			<Router>
				<div className='container'>
					<Header />
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/new-ticket' element={<PrivateRoute />}>
							<Route path='/new-ticket' element={<NewTicket />} />
						</Route>
						<Route path='/tickets' element={<PrivateRoute />}>
							<Route path='/tickets' element={<Tickets />} />
						</Route>
						<Route path='/ticket/:id' element={<PrivateRoute />}>
							<Route path='/ticket/:id' element={<Ticket />} />
						</Route>
					</Routes>
				</div>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
