import * as React from 'react';

interface ContactFormEmailTemplateProps {
	name: string;
	email: string;
	phone: string;
	goal: string;
	message: string;
}

export const ContactFormEmailTemplate: React.FC<Readonly<ContactFormEmailTemplateProps>> = ({
	name,
	email,
	phone,
	goal,
	message,
}) => (
	<div>
		<h1>New Contact Form Submission</h1>
		<p>Someone just filled out the contact form, here is their information.</p>
		<table>
			<tbody>
				<tr>
					<td><strong>Name:</strong></td>
					<td>{name}</td>
				</tr>
				<tr>
					<td><strong>Email:</strong></td>
					<td>{email}</td>
				</tr>
				<tr>
					<td><strong>Phone:</strong></td>
					<td>{phone}</td>
				</tr>
				<tr>
					<td><strong>Goal:</strong></td>
					<td>{goal}</td>
				</tr>
				<tr>
					<td><strong>Message:</strong></td>
					<td>{message}</td>
				</tr>
			</tbody>
		</table>
		<p>This was an automated email.</p>
	</div>
);
