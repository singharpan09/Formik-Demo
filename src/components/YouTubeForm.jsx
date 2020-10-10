import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
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
    phNumbers: [""],
  };
  const onSubmit = (formData) => {
    console.log(formData, "VVVVVV");
  };

  const validate = (values) => {
    let errors = {};
    if (!values.name) {
      errors.name = "Required field";
    }
    // if (!values.comment) {
    //   errors.comment = "Comment is a Required Field";
    // }
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

  const validateComments = (values) => {
    // this functions automatically gets values of the Field for which it is speified
    let errors = {};
    if (!values) {
      errors = "Comment is a Required Field..you can't leave it";
    }
    return errors;
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        console.log(formik, "children Props");
        return (
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
              <Field
                as='textarea'
                id='comment'
                name='comment'
                validate={validateComments}
              />
              <ErrorMessage name='comment' component={TextError} />
            </div>
            <div className='form-control'>
              <label htmlFor='address'>Address</label>
              <FastField name='address'>
                {(props) => {
                  {
                    console.log(props, "FieldProps");
                  }
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
              </FastField>
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
                {(fieldArrayProps) => {
                  const { remove, form, push } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log(form.errors, "XXXX");
                  return (
                    <div>
                      {phNumbers.map((item, index) => {
                        return (
                          <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                              <button
                                type='button'
                                onClick={() => remove(index)}
                              >
                                -
                              </button>
                            )}
                            {/* remove button only if more than one present */}
                            <button type='button' onClick={() => push("")}>
                              +
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            <button
              type='button'
              onClick={() => formik.validateField("comment")}
            >
              Validate comments
            </button>
            <button type='button' onClick={() => formik.validateForm()}>
              Validate All
            </button>
            <button
              type='button'
              onClick={() => formik.setFieldTouched("comment")}
            >
              Visit comments
            </button>
            <button
              type='button'
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                })
              }
            >
              Visit Fields
            </button>

            <button type='submit'>Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;

//Manually Trigering Validations (at form level and Field level)
//Formik provides different helper functions for manually trigging validations

//for using this we need to use render props pattern on entire form
//this render props pattern we have function as children
//this method automatically recieves some props,then return some JSX

//*****Now we will have function as children at top level of Formik component******///
//this function will receive some props and return entire form component

//we can use both field level props and Component level props as per need
//if we want any opertion on total form use higher level render props and if we need something at field level use field level render props

//top level have two fucntion validate Field and Validate Form(validate Form don't have any validation)

//onCalling both validate errors object populated but touched object is empty
//error will not render as it renders only if Field is touched

//For customization we have setFieldTouched and setTouched methods
//setFieldTouched set touched for specific field
//setTouched set touched for multiple fields

//setTouched takes an object as argument which specify field names to be touched

//useCase of maually trgigging validations eg....validating if a username exists in database
