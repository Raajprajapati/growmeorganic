import React, { useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import './Form.css';

interface UserInfo {
	name: string;
	phoneNumber: string;
	email: string;
}

const Form: React.FC = () => {
	const [formData, setFormData] = useState<UserInfo>({
		name: '',
		phoneNumber: '',
		email: '',
	});
	let navigate = useNavigate();
	let location = useLocation();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		localStorage.setItem('userData', JSON.stringify(formData));

		setFormData({
			name: '',
			phoneNumber: '',
			email: '',
		});
		navigate('/second');

	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<div>
			<h1>Login</h1>

			{location.state?.message ? <p className='login-warning'> {location.state?.message}</p>: null}
			<form onSubmit={handleSubmit}>
				<label className='label'>
					Name:
					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleInputChange}
						className='inp'
						required
					/>
				</label>

				<label className='label'>
					Phone Number:
					<input
						type="tel"
						name="phoneNumber"
						value={formData.phoneNumber}
						onChange={handleInputChange}
						className='inp'
						required
					/>
				</label>

				<label className='label'>
					Email:
					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleInputChange}
						className='inp'
						required
					/>
				</label>

				<button type="submit" className='btn'>
					Submit
				</button>
			</form>
		</div>
	);
};



export default Form;
