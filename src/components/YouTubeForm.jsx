import React from "react";
import { useFormik } from "formik";

function YoutubeForm() {
  //intialValues field name,corresponds to name attributes of individual field
  //"formik.values" is a object that reflects the state of the form
  //this we are providing to form field
  //formik gives a helper method for form submission also
  //apart from intialValues ,we can specify another property ,"onSubmit" ,and this property is a method
  //which automatically receives form state as IT'S arguments

  const initialValues = {
    name: "",
    email: "",
    channel: "",
  };
  const onSubmit = (values) => {
    console.log(values, "VVVVVV");
  };

  const validate = (values) => {
    // values.name ,values.email,values,channel
    //errors.name,errors.email,errors.channel
    //errors.name='This field is required'
    let errors = {};
    if (!values.name) {
      errors.name = "Required field";
    }
    if (!values.email) {
      errors.email = "EMail is required field";
    }
    if (!values.channel) {
      errors.channel = "This is Required field";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  console.log(formik.values, "FOrm data");
  console.log(formik.errors, "Errors Data");
  console.log(formik.touched, "Fields visited");
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>name</label>
          <input
            type='text'
            id='name'
            name='name'
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className='error'>{formik.errors.name}</div>
          ) : null}
        </div>

        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            name='email'
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='error'>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <input
            type='text'
            id='channel'
            name='channel'
            {...formik.getFieldProps("channel")}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <div className='error'>{formik.errors.channel}</div>
          ) : null}
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default YoutubeForm;

//formik provides few component that uses "react context" internally ,and make code less verbose(remove boiler plate)
//Formik component :Formik,Form,Field,ErrorMessage
//Formik component is replace for useFormik hook ..the object we pass to useFormik hook
//will be passed to Formik component as props
