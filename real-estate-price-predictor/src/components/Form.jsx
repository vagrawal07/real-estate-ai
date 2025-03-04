import { useState } from "react";
import PropTypes from "prop-types";

function PropertyForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        area: "",
        bedrooms: "",
        bathrooms: "",
        location: "",
        age: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            width: '100vw', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '20px' 
        }}>
            <div className="container card shadow-lg p-4" style={{ 
                width: '100%', 
                maxWidth: '600px', 
                backgroundColor: 'white', 
                borderRadius: '15px', 
                border: '1px solid #ddd', 
                textAlign: 'center',
                padding: '30px'
            }}>
                <h2 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#333' }}>🏡 Enter Property Details</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "📏 Area (sq ft)", name: "area", type: "number", placeholder: "Enter property area" },
                        { label: "🛏 Bedrooms", name: "bedrooms", type: "number", placeholder: "Enter number of bedrooms" },
                        { label: "🚿 Bathrooms", name: "bathrooms", type: "number", placeholder: "Enter number of bathrooms" },
                        { label: "📍 Location", name: "location", type: "text", placeholder: "Enter property location" },
                        { label: "🏗 Age of Property (years)", name: "age", type: "number", placeholder: "Enter age of property" }
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name} className="mb-3">
                            <label className="form-label" style={{ fontWeight: '600', color: '#555' }}>{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleChange}
                                className="form-control text-center"
                                required
                                placeholder={placeholder}
                            />
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 mt-3"
                        style={{ padding: '10px', fontSize: '16px', fontWeight: 'bold' }}
                    >
                        🚀 Predict Price
                    </button>
                </form>
            </div>
        </div>
    );
}

PropertyForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default PropertyForm;
