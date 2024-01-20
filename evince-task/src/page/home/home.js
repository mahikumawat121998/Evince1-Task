import { useState } from "react";
import "../../app.css";
import FormInput from "../../components/FormInput";
import axios from "axios";
const Home = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    employee_id: "",
    mobile: "",
    age: "",
    other_mobile: "",
  });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "employee_id",
      type: "text",
      placeholder: "Employee Id",
      errorMessage: "Alphanumeric value of length 10",
      label: "Employee Id",
      pattern: "[0-9a-zA-Z]{1,10}$",
      required: true,
    },
    {
      id: 4,
      name: "mobile",
      type: "number",
      placeholder: "Mobile",
      errorMessage: "Please Provide valid mobile number",
      label: "Mobile",
      pattern: "^+91[6-9]d{9}$",
      required: true,
    },
    {
      id: 5,
      name: "age",
      type: "number",
      placeholder: "Age",
      errorMessage: "Please Provide age between 18 years to 60 years",
      label: "Age",
      pattern: "^(1[89]|[2-5]d|60)$",
      required: true,
    },
    {
      id: 6,
      name: "other_mobile",
      type: "text",
      placeholder: "Second Contact Number",
      errorMessage:
        "employee id should be 3-16 characters and shouldn't include any special character!",
      label: "Second Contact Number",
      pattern: "^+91[6-9]d{9}$",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = axios
        .post("http://localhost:8800/api/auth/register", values)
        .then((data) => console.log("Data submitted successfully" + data))
        .catch((err) => "some err has occurred during submitting" + err);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;
