import React from "react";

export default function Alert(props) {
  return (
  <div
  className={`position-absolute w-100`}
  style={{
    top: "60px", // match navbar height
    zIndex: 999,
    left: 0,
  }}
>
  <div
    className={`container alert alert-${props.type} alert-dismissible fade show mx-auto text-center`}
    role="alert"
    style={{
      maxWidth: "800px", // adjust width
      borderRadius: "8px",
    }}
  >
    {props.message}
  </div>
</div>

  );
}
