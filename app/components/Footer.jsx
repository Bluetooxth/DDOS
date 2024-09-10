import React from "react";

const Footer = () => {
  return (
    <section className="flex justify-center items-center w-full footer">
      <div className="flex justify-between items-center w-[95vw] lg:container gap-5 py-5">
        <div className="flex flex-col justify-center items-start gap-5">
          <h2 className="text-3xl font-semibold">Optimux</h2>
        </div>
        <div className="flex flex-col justify-start items-start gap-5">
          <h3 className="text-lg font-normal">
            All Rights Reserved &copy; 2024
          </h3>
        </div>
      </div>
    </section>
  );
};

export default Footer;