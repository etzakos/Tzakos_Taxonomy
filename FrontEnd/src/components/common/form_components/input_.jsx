import React from "react";

const Input = ({ name, label, error, onChange, ...rest }) => {
	return (
		<div className="form-group">
			<label htmlFor={name}>{label}</label>
			<input
				{...rest}
				onChange={onChange}
				name={name}
				id={name}
				className="form-control"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
