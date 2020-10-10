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
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='name'>name</label>
        <input
          type='text'
          id='name'
          name='name'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}

        <label htmlFor='channel'>Channel</label>
        <input
          type='text'
          id='channel'
          name='channel'
          onChange={formik.handleChange}
          value={formik.values.channel}
        />
        {formik.errors.name ? <div>{formik.errors.name}</div> : null}
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default YoutubeForm;

//useformik hooks help in mananging form state,Handling form submission,validation and error messages
//useformik is a hook(function) ,we need to call it in our component
//it takes an object as parameter...This hook return object which contain varity of useful properties
//and methods which can be used with our form
//we can give any name to return object
//we do everything with this returned object

//when we write something in form the value of the field changes..we normally manage this through react state
//example we need this state for name,email and channel name ....this is called form state
//form state is a object which manage all form changes

//step 1:pass a intialvalue(props) in the object we pass to useformik hook
//initalValues property is an object

//step2 :add onchange and value props to each of field value(this ensures that form fields in react is tracks by "formik")
//useformik returned object have a lot of useful methods
//for onChange, formik have "formik.handleChange"
//for values ,formik have "formik.values.name"
//after this formik will automatically manage and track form field values for you...

//     value={formik.values.channel} ...here channel refer to name attribute in input field

//valiadtion......a validation function need to be defined to a validate function which altumatically gets values OBJECT as it's argument
//in the object that we pass to useFormik hook

//$$$$ validate function should satisfy some conditions for formik to work as intended

//1.this validate function should return a object
//eg: validate :values=>{
//     let errors={}

//     return errors;
// }
//2:Keys of the error object should be similar to that of values object && also key corresponds to name attribute for form field

//3:VALUES of that key should be a string indicating what the error message should be for that particular field

//"formik.errors" is a error objects with validations

//formik runs the validate function "onChange" of the form .,then populate "formik.errors" object
