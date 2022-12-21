import { useState } from "react";
import { toast } from "react-toastify";

import { validateRegister } from "../../validations/userValidate";
import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";

function RegisterForm({ onSuccess }) {
    const { register } = useAuth();
    const { startLoading, stopLoading } = useLoading();

    const [input, setInput] = useState({
        firstName: "",
        lastName: "",
        emailOrMobile: "",
        password: "",
        confirmPassword: "",
    });

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value }); // if want to use variable as key of an object, use []
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const { error } = validateRegister(input);
        if (error) {
            return error.details.map((el) => toast.error(el.message));
        }

        try {
            startLoading();
            await register(input);
            toast.success("success register");
            onSuccess();
        } catch (err) {
            toast.error(err.response.data.message);
        } finally {
            stopLoading();
        }
    };

    return (
        <form className="row gx-2 gy-3" onSubmit={handleSubmitForm}>
            <div className="col-6">
                <input
                    className="form-control"
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={input.firstName}
                    onChange={handleChangeInput} // setInput({ ...input, firstName: e.target.value })
                />
            </div>
            <div className="col-6">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={input.lastName}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-12">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Mobile number or email address"
                    name="emailOrMobile"
                    value={input.emailOrMobile}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-12">
                <input
                    className="form-control"
                    type="text"
                    placeholder="New password"
                    name="password"
                    value={input.password}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="col-12">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={input.confirmPassword}
                    onChange={handleChangeInput}
                />
            </div>
            <div className="d-flex justify-content-center">
                <button
                    type="submit"
                    className="btn d-flex justify-content-center align-items-center btn-green text-4.5 h-9 tw-px-10"
                >
                    Sign Up
                </button>
            </div>
        </form>
    );
}

export default RegisterForm;
