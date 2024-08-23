import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { publicIpv4 } from 'public-ip';
import TestDomain from '../component/TestDomain';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    companyName: '',
    city: '',
    domainURL: '',
    ipAddress: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [embedScript, setEmbedScript] = useState('');
  const [eid, setEid] = useState(''); // State to store eid

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const ip = await publicIpv4();
        setFormData(prevData => ({ ...prevData, ipAddress: ip }));
      } catch (error) {
        console.error("Failed to fetch IP address", error);
      }
    };
    fetchIpAddress();
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.mobile) tempErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.companyName) tempErrors.companyName = "Company name is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.domainURL) tempErrors.domainURL = "Domain URL is required";
    if (!formData.password) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/api/register', formData);
        console.log(response.data);
        setEmbedScript(response.data.script);
        setEid(response.data.eid); // Capture the eid from the response
        console.log('EID:', eid);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Mobile</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          {errors.mobile && <p>{errors.mobile}</p>}
        </div>
        <div>
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
          {errors.companyName && <p>{errors.companyName}</p>}
        </div>
        <div>
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          {errors.city && <p>{errors.city}</p>}
        </div>
        <div>
          <label>Domain URL</label>
          <input type="text" name="domainURL" value={formData.domainURL} onChange={handleChange} />
          {errors.domainURL && <p>{errors.domainURL}</p>}
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            autoComplete="current-password" 
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      {embedScript && (
        <div>
          <h3>Your Embed Code</h3>
          <textarea readOnly value={embedScript} rows={10} cols={50} />
        </div>
      )}
      
      {eid && <TestDomain eid={eid} />} {/* Pass eid as a prop */}
    </>
  );
};

export default Register;



// // frontend/src/pages/Register.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { publicIpv4 } from 'public-ip';
// import TestDomain from '../component/TestDomain'
// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     mobile: '',
//     companyName: '',
//     city: '',
//     domainURL: '',
//     ipAddress: '',
//     password: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [embedScript, setEmbedScript] = useState('');

//   useEffect(() => {
//     const fetchIpAddress = async () => {
//       try {
//         const ip = await publicIpv4();
//         setFormData(prevData => ({ ...prevData, ipAddress: ip }));
//       } catch (error) {
//         console.error("Failed to fetch IP address", error);
//       }
//     };
//     fetchIpAddress();
//   }, []);

//   const validate = () => {
//     let tempErrors = {};
//     if (!formData.name) tempErrors.name = "Name is required";
//     if (!formData.email) tempErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
//     if (!formData.mobile) tempErrors.mobile = "Mobile number is required";
//     else if (!/^\d{10}$/.test(formData.mobile)) tempErrors.mobile = "Mobile number must be 10 digits";
//     if (!formData.companyName) tempErrors.companyName = "Company name is required";
//     if (!formData.city) tempErrors.city = "City is required";
//     if (!formData.domainURL) tempErrors.domainURL = "Domain URL is required";
//     // else if (!/^(https?:\/\/)?([\w-]+)+([\w-]*)\.([a-z]{2,4})(\/.*)?$/.test(formData.domainURL)) tempErrors.domainURL = "Domain URL is invalid";
//     if (!formData.password) tempErrors.password = "Password is required";
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validate()) {
//       try {
//         const response = await axios.post('http://localhost:5000/api/register', formData);
//         console.log(response.data);
//         setEmbedScript(response.data.script);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name</label>
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         {errors.name && <p>{errors.name}</p>}
//       </div>
//       <div>
//         <label>Email</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         {errors.email && <p>{errors.email}</p>}
//       </div>
//       <div>
//         <label>Mobile</label>
//         <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
//         {errors.mobile && <p>{errors.mobile}</p>}
//       </div>
//       <div>
//         <label>Company Name</label>
//         <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
//         {errors.companyName && <p>{errors.companyName}</p>}
//       </div>
//       <div>
//         <label>City</label>
//         <input type="text" name="city" value={formData.city} onChange={handleChange} />
//         {errors.city && <p>{errors.city}</p>}
//       </div>
//       <div>
//         <label>Domain URL</label>
//         <input type="text" name="domainURL" value={formData.domainURL} onChange={handleChange} />
//         {errors.domainURL && <p>{errors.domainURL}</p>}
//       </div>
//       <div>
//         <label>Password</label>
//         <input 
//           type="password" 
//           name="password" 
//           value={formData.password} 
//           onChange={handleChange} 
//           autoComplete="current-password" 
//         />
//         {errors.password && <p>{errors.password}</p>}
//       </div>
//       <button type="submit">Register</button>
//     </form>
//     {embedScript && (
//       <div>
//         <h3>Your Embed Code</h3>
//         <textarea readOnly value={embedScript} rows={10} cols={50} />
//       </div>
//     )}
//     <TestDomain />
//     </>
//   );
// };

// export default Register;
