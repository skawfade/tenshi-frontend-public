import {Spinner } from "@nextui-org/react";

const TenshiSpinner = (): JSX.Element => {
  return (
    <Spinner
      classNames={{
        circle1: "border-b-[#eb5628]",
        circle2: "border-b-[#eb5628]",
      }}
    />
  );
};

export default TenshiSpinner;
