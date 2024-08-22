import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { getContact, createContact, updateContact } from './api';
import axios from 'axios';

interface Contact {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    contactFrequency: string;
    phoneNumber: string;
}

const ContactForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [contact, setContact] = useState<Contact>({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        contactFrequency: '',
        phoneNumber: ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (id) {
        axios.get<Contact>(`http://localhost:5281/api/contacts/${id}`)
            .then(response => setContact(response.data))
            .catch(error => console.error('Error fetching contact', error));
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;
        if (name === 'firstName' || name === 'lastName' || name === 'city') {
        formattedValue = value.charAt(0).toUpperCase() + value.slice(1);
        }

        setContact(prev => ({ ...prev, [name]: formattedValue }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        value = value.replace(/\D/g, ''); // Remove all non-digits
        if (value.length <= 3) {
        value = value.replace(/^(\d{0,3})/, '($1)');
        } else if (value.length <= 6) {
        value = value.replace(/^(\d{0,3})(\d{0,3})/, '($1) $2');
        } else if (value.length <= 10) {
        value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '($1) $2-$3');
        } else {
        value = value.substring(0, 14); // Restrict to 14 characters including formatting
        }
    
        setContact(prev => ({ ...prev, phoneNumber: value }));
    };

    const validateForm = () => {
        let formIsValid = true;
        let errors: { [key: string]: string } = {};

        // Email validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/;
        if (!emailRegex.test(contact.email)) {
        formIsValid = false;
        errors["email"] = "Please enter a valid email address with a supported domain (gmail.com, yahoo.com, outlook.com).";
        }

        // Phone number validation (assuming US format)
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(contact.phoneNumber)) {
        formIsValid = false;
        errors["phoneNumber"] = "Please enter a valid 10-digit phone number.";
        }

        // ZIP code validation (assuming US format)
        const zipRegex = /^\d{5}$/;
        if (!zipRegex.test(contact.zip)) {
        formIsValid = false;
        errors["zip"] = "Please enter a valid 5-digit ZIP code.";
        }

        setErrors(errors);
        return formIsValid;
    };

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }
    
        if (id) {
            axios.put(`http://localhost:5281/api/contacts/${id}`, contact)
                .then(() => {
                    alert('Contact updated successfully');
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error updating contact:', error);
                    alert('There was an error updating the contact.');
                });
        } else {
            axios.post('http://localhost:5281/api/contacts', contact)
                .then(() => {
                    alert('Contact created successfully');
                    navigate('/');
                })
                .catch(error => {
                    console.error('Error creating contact:', error);
                    alert('There was an error creating the contact.');
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <div>
            <label>First Name:</label>
            <input 
            type="text" 
            name="firstName" 
            value={contact.firstName} 
            onChange={handleChange} 
            maxLength={20} 
            required 
            />
            <span className="char-counter">{contact.firstName.length}/20</span>
        </div>
        <div>
            <label>Last Name:</label>
            <input 
            type="text" 
            name="lastName" 
            value={contact.lastName} 
            onChange={handleChange} 
            maxLength={20} 
            required 
            />
            <span className="char-counter">{contact.lastName.length}/20</span>
        </div>
        <div>
            <label>Email:</label>
            <input 
            type="email" 
            name="email" 
            value={contact.email} 
            onChange={handleChange} 
            required 
            />
            {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
            <label>Street:</label>
            <input 
            type="text" 
            name="street" 
            value={contact.street} 
            onChange={handleChange} 
            maxLength={100} 
            required 
            />
            <span className="char-counter">{contact.street.length}/100</span>
        </div>
        <div>
            <label>City:</label>
            <input 
            type="text" 
            name="city" 
            value={contact.city} 
            onChange={handleChange} 
            maxLength={50} 
            required 
            />
            <span className="char-counter">{contact.city.length}/50</span>
        </div>
        <div>
            <label>State:</label>
            <select 
            name="state" 
            value={contact.state} 
            onChange={handleChange} 
            required
            >
            <option value="">Select State</option>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
            {/* Continue to add other states here */}
            </select>
        </div>
        <div>
            <label>Zip:</label>
            <input 
            type="text" 
            name="zip" 
            value={contact.zip} 
            onChange={handleChange} 
            maxLength={5} 
            required 
            />
            {errors.zip && <span className="error">{errors.zip}</span>}
        </div>
        <div>
            <label>Contact Frequency:</label>
            <select 
            name="contactFrequency" 
            value={contact.contactFrequency} 
            onChange={handleChange} 
            required
            >
            <option value="">Select Contact Frequency</option>
            <option value="AccountInfo">Contact only about account information</option>
            <option value="MarketingInfo">OK to contact with marketing information</option>
            <option value="ThirdPartyMarketingInfo">OK to contact with third-party marketing information</option>
            </select>
        </div>
        <div>
            <label>Phone Number:</label>
            <input 
            type="text" 
            name="phoneNumber" 
            value={contact.phoneNumber} 
            onChange={handlePhoneChange} 
            maxLength={14} 
            required 
            />
            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
        <button type="submit">Save</button>
        </form>
    );
};

export default ContactForm;
