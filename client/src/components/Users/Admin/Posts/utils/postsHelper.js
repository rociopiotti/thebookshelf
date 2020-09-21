import React from "react";
import * as Yup from "yup";

export const BookSchema = Yup.object().shape({
  name: Yup.string()
  .required('Required'),
  author: Yup.string()
  .required('Required'),
  pages: Yup.number()
  .required('Required'),
  rating: Yup.number()
  .required('Required'),
  price: Yup.number()
  .required('Required'),
})

export const FormElement = ({
  elData,
  name,
  onHandleChange,
  onHandleBlur,
  placeholder,
  errors,
  touched,
  children,
}) => {
  let template = null;
  const { type, value } = elData;
  switch (elData.element) {
    case "input":
      template = (
        <div className='row'>
          <div className='twelve columns'>
            <input
              type={type}
              name={name}
              onChange={(e) => onHandleChange(e)}
              onBlur={(e) => onHandleBlur(e)}
              value={value}
              placeholder={placeholder}
              className='u-full-width'
            />
            {errors && touched ? (
              <div className='error_label'>{errors}</div>
            ) : null}
          </div>
        </div>
      );
      break;
    case "select":
      template = (
        <div className='row'>
          <div className='twelve columns'>
            <select
              name={name}
              onChange={(e) => onHandleChange(e)}
              onBlur={(e) => onHandleBlur(e)}
              value={value}
              className='u-full-width'>
              {children}
            </select>
            {errors && touched ? (
              <div className='error_label'>{errors}</div>
            ) : null}
          </div>
        </div>
      );
      break;
    default:
      return (template = null);
  }
  return template;
};
