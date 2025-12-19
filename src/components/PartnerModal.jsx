import React, { useState } from 'react';
import '../styles/PartnerModal.css';
import API from '../services/api';
import { toast } from 'react-toastify';

const PartnerModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        businessName: '',
        businessType: 'Retail',
        city: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post('/partners', formData);
            if (res.data.success) {
                toast.success("Application Submitted Successfully!");
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    businessName: '',
                    businessType: 'Retail',
                    city: '',
                    message: ''
                });
                onClose();
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to submit application");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`partner-modal-overlay ${isOpen ? 'active' : ''}`}>
            <div className="partner-modal-content">
                <button className="modal-close" onClick={onClose}>&times;</button>

                <div className="modal-header">
                    <h2>Become a Partner</h2>
                    <p>Fill in your details and we'll get back to you shortly</p>
                </div>

                <form onSubmit={handleSubmit} className="partner-form-grid">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Business Name</label>
                        <input type="text" name="businessName" className="form-control" required value={formData.businessName} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Business Type</label>
                        <select name="businessType" className="form-control" value={formData.businessType} onChange={handleChange}>
                            <option value="Retail">Retail Store</option>
                            <option value="Restaurant">Restaurant / Cafe</option>
                            <option value="Distributor">Distributor</option>
                            <option value="Cloud Kitchen">Cloud Kitchen</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input type="text" name="city" className="form-control" required value={formData.city} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" className="form-control" required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Message (Optional)</label>
                        <textarea name="message" className="form-control" rows="3" value={formData.message} onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PartnerModal;
