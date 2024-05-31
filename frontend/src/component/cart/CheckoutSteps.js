import { Stepper, StepLabel, Step, Typography } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import React, { Fragment } from "react";

const CheckoutSteps = ({ activeStep }) => {
	const steps = [
		{
			label: <Typography>Shipping Info</Typography>,
			icon: <LocalShippingIcon />,
		},
		{
			label: <Typography>Confirm Order</Typography>,
			icon: <LibraryAddCheckIcon />,
		},
		{
			label: <Typography>Payment</Typography>,
			icon: <AccountBalanceIcon />,
		},
	];

	const stepStyles = {
		boxSizing: "border-box",
	};

	return (
		<Fragment>
			<Stepper
				alternativeLabel
				activeStep={activeStep}
				style={stepStyles}
			>
				{steps.map((step, index) => (
					<Step
						key={index}
						active={activeStep === index ? true : false}
						completed={activeStep >= index ? true : false}
					>
						<StepLabel
							icon={step.icon}
							style={{
								color:
									activeStep >= index
										? "tomato"
										: "rgba(0, 0, 0, 0.649)",
							}}
						>
							{step.label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Fragment>
	);
};

export default CheckoutSteps;
