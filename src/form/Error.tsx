import React from "react";

import { FieldError } from "react-hook-form";

type ErrorProps = {
  error: FieldError;
};

const Error = ({ error }: ErrorProps) => {
  if (!error) {
    return null;
  } else {
    return <div className="text-xs text-eco-red-danger">{error.message}</div>;
  }
};

export default Error;
