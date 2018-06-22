import React from 'react';
import validator from 'validator';

export const required = (value, props) => {
  let errorMessage = "The field is required";
  if (props['required-message']) {
    errorMessage = props['required-message'];
  }
  if (!value || (props.isCheckable && !props.checked)) {
    return <span className="form-error is-visible">{errorMessage}</span>;
  }
};

export const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};

export const phoneNumber = value =>
  value && !/^(0|[1-9][0-9]{9})$/i.test(value)
    ? 'Invalid phone number, must be 10 digits'
    : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const minValue = (value, props, components) => {

  return value && value.length < props.minvalue ? `Must be at least ${props.minvalue}` : undefined;
}

export const maxValue = (value, props, components) => {

  return value && value.length > props.maxvalue ? `Must be at most ${props.maxvalue}` : undefined;
}

export const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return <span className="error">The value exceeded {props.maxLength} symbols.</span>;
  }
};

export const isEqual = (value, props, components) => {
  console.log("equal", components);
  const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
  const bothChanged = components.password[0].isChanged && components.confirm[0].isChanged;

  if (bothChanged && bothUsed && components.password[0].value !== components.confirm[0].value) {
    return <span className="form-error is-visible">Passwords are not equal.</span>;
  }
};


export const checkEqual = (value, props, components) => {
  let otherField = components[props['compare-field']][0];
  //const bothUsed = components.password[0].isUsed && components.confirm[0].isUsed;
  const bothChanged = props.isChanged && otherField.isChanged;
  let checkValue = otherField.value;
  let compareMessage = "Fields are not equal.";
  if (props['compare-message']) {
    compareMessage = props['compare-message'];
  }

  if (bothChanged && value !== checkValue && checkValue != '') {
    return <span className="form-error is-visible">{compareMessage}</span>;
  }
};

export const password = (value, props, components) => {
  console.log("equal", value, props, components);
  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>
  }
};