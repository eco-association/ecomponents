import React from "react";

type LinkProps = {
  /** The display text */
  value: string;
  /** The url that the link component will direct to. */
  href: string;
  /** Should this link open in a new tab, i.e. target='_blank' */
  openInNewTab?: boolean;
};

const Link = ({ value, href, openInNewTab = true }: LinkProps) => {
  return (
    <a
      className="text-eco-blue-primary hover:underline underline-eco-blue-primary"
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      target={openInNewTab ? "_blank" : undefined}
      href={href}
    >
      {value}
    </a>
  );
};

export default Link;
