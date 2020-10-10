import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import TextError from "./TextError";

function YoutubeForm() {
  const initialValues = {
    name: "Formik",
    email: "",
    channel: "",
    comment: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumber: [],
    phNumbers: [],
  };
  const onSubmit = (formData) => {
    console.log(formData, "VVVVVV");
  };

  const validate = (values) => {
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
          <ErrorMessage name='name' component={TextError} />
        </div>

        <div className='form-control'>
          <label htmlFor='email'>E-mail</label>
          <Field type='email' id='email' name='email' />
          <ErrorMessage name='email'>
            {(errorMsg) => {
              return <div className='error'>{errorMsg}</div>;
            }}
          </ErrorMessage>
        </div>

        <div className='form-control'>
          <label htmlFor='channel'>Channel</label>
          <Field type='text' id='channel' name='channel' />
          <ErrorMessage name='channel' />
        </div>

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
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>
        </div>

        <div className='form-control'>
          <label htmlFor='facebook'>Facebook Profile</label>
          <Field type='text' id='facebook' name='social.facebook' />
        </div>
        <div className='form-control'>
          <label htmlFor='twitter'>Twitter Profile</label>
          <Field type='text' id='twitter' name='social.twitter' />
        </div>
        <div className='form-control'>
          <label htmlFor='PrimaryPhone'>Primary Phone</label>
          <Field type='text' id='PrimaryPhone' name='phoneNumber[0]' />
        </div>
        <div className='form-control'>
          <label htmlFor='SecondaryPhone'>Secondary Phone</label>
          <Field type='text' id='SecondaryPhone' name='phoneNumber[1]' />
        </div>
        <div>
          <label htmlFor='phoneNumbers'>Add List of Phone Numbers</label>
          <FieldArray name='phNumbers'>
            {(props) => {
              console.log(props, "FFFFFFFF");
              return <div>HIII</div>;
            }}
          </FieldArray>
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
}

export default YoutubeForm;

//For Custom Error message in ErrorMessage Component we have to pass component props to ErrorMessage Component
//we can use renderProps in ErrorComponent which receive error as props

//FieldArray component helps in dynamic form control
//It helps in common array and list manipulations
//collecting dynamic array and object is maintained through dynamic form control
//means intially we provide one field to user and give user option to add more
//As we are using dyamic array so we will not use Field instead will use "FieldArray" component of formik
//to use dynamic array we need to use render props methods
//it automatically receive some props
