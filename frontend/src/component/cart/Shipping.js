import React, { Fragment, useState } from "react";
import "./Shipping.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import HomeIcon from "@material-ui/icons/Home";
import PinDropIcon from "@material-ui/icons/PinDrop";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { saveShippingInfo } from "../../redux/slices/cartSlice";
import { Country, State } from "country-state-city";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const alert = useAlert();
	const { shippingInfo } = useSelector((state) => state.cart);

	const [address, setAddress] = useState(shippingInfo.address);
	const [city, setCity] = useState(shippingInfo.city);
	const [state, setState] = useState(shippingInfo.state);
	const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
	const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
	const [country, setCountry] = useState(shippingInfo.country);

	const shippingSubmit = (e) => {
		e.preventDefault();
		if (phoneNo.length !== 10) {
			alert.error("Phone Number must be 10 digits long");
			return;
		}
		dispatch(
			saveShippingInfo({
				address,
				city,
				state,
				phoneNo,
				pinCode,
				country,
			})
		);
		navigate("/order/confirm");
	};

	return (
		<Fragment>
			<MetaData title={"Shipping Info"} />
			<CheckoutSteps activeStep={0} />

			<div className="shippingContainer">
				<div className="shippingBox">
					<h2 className="shippingHeading">Shipping Details</h2>

					<form
						className="shippingForm"
						encType="multipart/form-data"
						onSubmit={shippingSubmit}
					>
						<div>
							<HomeIcon />
							<input
								type="text"
								placeholder="Address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
						</div>

						<div>
							<LocationCityIcon />
							<input
								type="text"
								placeholder="City"
								value={city}
								onChange={(e) => setCity(e.target.value)}
								required
							/>
						</div>

						<div>
							<PinDropIcon />
							<input
								type="number"
								placeholder="Pin Code"
								value={pinCode}
								onChange={(e) => setPinCode(e.target.value)}
								required
							/>
						</div>

						<div>
							<PhoneIcon />
							<input
								type="number"
								placeholder="Phone Number"
								value={phoneNo}
								onChange={(e) => setPhoneNo(e.target.value)}
								required
								size={10}
							/>
						</div>

						<div>
							<PublicIcon />
							<select
								value={country}
								onChange={(e) => setCountry(e.target.value)}
								required
							>
								<option value="">Select Country</option>
								{Country &&
									Country.getAllCountries().map((country) => (
										<option
											key={country.isoCode}
											value={country.isoCode}
										>
											{country.name}
										</option>
									))}
							</select>
						</div>

						{country && (
							<div>
								<TransferWithinAStationIcon />
								<select
									value={state}
									onChange={(e) => setState(e.target.value)}
									required
								>
									<option value="">Select State</option>
									{State &&
										State.getStatesOfCountry(country).map(
											(state) => (
												<option
													key={state.isoCode}
													value={state.isoCode}
												>
													{state.name}
												</option>
											)
										)}
								</select>
							</div>
						)}

						<input
							type="submit"
							value="Continue"
							className="shippingBtn"
							disabled={state ? false : true}
						/>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Shipping;
