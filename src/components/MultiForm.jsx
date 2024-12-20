import React, { useState } from "react";
import "tailwindcss/tailwind.css";

const MultiStepForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        wheels: "",
        vehicleType: "",
        model: "",
        dateRange: { startDate: "", endDate: "" },
    });
    const [error, setError] = useState("");

    const vehicleTypes = [
        { type: "4 wheeler", name: "SUV" },
        { type: "4 wheeler", name: "Sedan" },
        { type: "2 wheeler", name: "Sport" },
        { type: "2 wheeler", name: "Cruiser" },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            dateRange: { ...formData.dateRange, [name]: value },
        });
    };

    const handleNext = async () => {
        setError("");

        switch (step) {
            case 1:
                if (!formData.firstName || !formData.lastName) {
                    setError("Please provide both first and last name.");
                    return;
                }
                break;
            case 2:
                if (!formData.wheels) {
                    setError("Please select the number of wheels.");
                    return;
                }
                break;
            case 3:
                if (!formData.vehicleType) {
                    setError("Please select a vehicle type.");
                    return;
                }
                break;
            case 4:
                if (!formData.model) {
                    setError("Please select a model.");
                    return;
                }
                break;
            case 5:
                if (!formData.dateRange.startDate || !formData.dateRange.endDate) {
                    setError("Please select a valid date range.");
                    return;
                }
                break;
            default:
                break;
        }

        if (step < 5) {
            setStep(step + 1);
        } else {
            try {
                const response = await fetch("https://example.com/api/book", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error("Failed to submit the form. Please try again.");
                }

                const result = await response.json();
                alert("Form submitted successfully!");
                console.log("Response from server:", result);

                setFormData({
                    firstName: "",
                    lastName: "",
                    wheels: "",
                    vehicleType: "",
                    model: "",
                    dateRange: { startDate: "", endDate: "" },
                });
                setStep(1);
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">What is your name?</h2>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded w-full mb-2"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Number of wheels?</h2>
                        <div className="flex flex-col">
                            <label>
                                <input
                                    type="radio"
                                    name="wheels"
                                    value="2"
                                    checked={formData.wheels === "2"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                2
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="wheels"
                                    value="4"
                                    checked={formData.wheels === "4"}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                4
                            </label>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Type of vehicle?</h2>
                        <div className="flex flex-col">
                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleInputChange}
                                className="border border-gray-300 p-2 rounded w-full mb-2"
                            >
                                <option value="">Select Vehicle Type</option>
                                {vehicleTypes
                                    .filter((type) => type.type === (formData.wheels === "2" ? "2 wheeler" : "4 wheeler"))
                                    .map((type, index) => (
                                        <option key={index} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Specific Model?</h2>
                        <input
                            type="text"
                            name="model"
                            placeholder="Enter Model"
                            value={formData.model}
                            onChange={handleInputChange}
                            className="border border-gray-300 p-2 rounded w-full"
                        />
                    </div>
                );
            case 5:
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Date range picker</h2>
                        <div className="flex flex-col">
                            <label className="mb-2">
                                Start Date:
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.dateRange.startDate}
                                    onChange={handleDateChange}
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </label>
                            <label>
                                End Date:
                                <input
                                    type="date"
                                    name="endDate"
                                    value={formData.dateRange.endDate}
                                    onChange={handleDateChange}
                                    className="border border-gray-300 p-2 rounded w-full"
                                />
                            </label>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto sm:w-full">
            {renderStep()}
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full"
            >
                {step < 5 ? "Next" : "Submit"}
            </button>
        </div>
    );
};

export default MultiStepForm;
