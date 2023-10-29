import * as React from "react";

function IconUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill={props.fill || "currentColor"}
      height="1em"
      width="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 1l6 11H2z" />
    </svg>
  );
}

export default IconUp;
