import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

function YoutubeForm() {
  const initialValues = {
    name: "",
    email: "",
    channel: "",
    comment: "",
    address: "",
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
    >
      <Form>
        <div className='form-control'>
          <label htmlFor='name'>name</label>
          <Field type='text' id='name' name='name' />
          <ErrorMessage name='name' />
        </div>

        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <Field type='email' id='email' name='email' />
          <ErrorMessage name='email' />
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <Field type='text' id='channel' name='channel' />
          <ErrorMessage name='channel' />
          <div className='form-control'>
            <label htmlFor='comment'>Comment</label>
            <Field as='textarea' id='comment' name='comment' />
          </div>

          <div className='form-control'>
            <label htmlFor='address'>Comment</label>
            <Field name='address'>
              {(props) => {
                //   {console.log(props)}
                const { field, meta, form } = props;
                return (
                  <div>
                    <input type='text' id='address' {...field} />
                    {meta.touched && meta.error ? (
                      <div>{meta.error}</div>
                    ) : null}
                  </div>
                );
              }}
              {/* But this input element is not hooked into Formik 
              so we need props for this,To hook input with formik we need to spread field props to input attribute
            meta props will be used to handle errors
            */}
            </Field>
          </div>

          <button type='submit'>Submit</button>
        </div>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;

//formik provides few component that uses "react context" internally ,and make code less verbose(remove boiler plate)
//Formik component :Formik,Form,Field,ErrorMessage
//Formik component is replace for useFormik hook ..the object we pass to useFormik hook
//will be passed to Formik component as props

//Formik component behave like context provided component that provides properties and helper methods
//for other component
//steps: 1-import Formik 2-pass it desired prosp 3-import Form 4-replace html form with Form component
//Form component automatically hooks(pass) "handleSubmit" to "onSubmit" method
// Form Component automatically links "onSubmit" method with "handleSubmit"

//Field component simplify code for form field
//right now we were passing getFieldsProps to every field

//steps: 1-import Field ,2-replace input TAG  with Field component(we don't need getFieldProps now)
//Field component does three things 1-it hooks up input to Top level Formik component
// 2-It use name attribute to  matchup with the formik state
// 3-Default it renders a input Field

//ErrorMessage component steps 1:import ErrorMessage 2-use Error Component and pass it name props
//which is equal to name attribute for Field component
//ErrorMessage take care of error message and show error if a field is visted and have error message

//Field as props have "input" as default ,,as can also be replaced with "component"

//RenderProps pattern
//In this we use a function as children to the component
//the function will be arrow function which will return JSX
