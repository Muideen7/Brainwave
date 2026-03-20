import Image from "next/image";

interface SectionProps {
  id?: string;
  className?: string;
  crosses?: boolean;
  crossesOffset?: string;
  customPaddings?: string | boolean;
  children?: React.ReactNode;
}

const Section = ({
  id,
  className,
  crosses,
  crossesOffset,
  customPaddings,
  children,
}: SectionProps) => {
  return (
    <div
      id={id}
      className={`relative ${
        customPaddings && typeof customPaddings === 'string'
          ? customPaddings
          : customPaddings === true
          ? ""
          : `py-10 lg:py-16 xl:py-20 ${crosses ? "lg:py-32 xl:py-40" : ""}`
      } ${className || ""}`}
    >
      {children}

      <div className="hidden absolute top-0 left-5 w-0.25 h-full bg-n-6 pointer-events-none md:block lg:left-7.5 xl:left-10" />
      <div className="hidden absolute top-0 right-5 w-0.25 h-full bg-n-6 pointer-events-none md:block lg:right-7.5 xl:right-10" />

      {crosses && (
        <>
          <div
            className={`hidden absolute top-0 left-7.5 right-7.5 h-0.25 bg-n-6 ${
              crossesOffset && crossesOffset
            } pointer-events-none lg:block xl:left-10 xl:right-10`}
          />
          <div className="hidden absolute top-0 left-0 z-2 pointer-events-none lg:block xl:left-2.5">
            <svg
              width="11"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 5.5a5 5 0 11-10 0 5 5 0 0110 0zM5.5 11V0M11 5.5H0"
                fill="#ADA8C3"
              />
            </svg>
          </div>
          <div className="hidden absolute top-0 right-0 z-2 pointer-events-none lg:block xl:right-2.5">
            <svg
              width="11"
              height="11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 5.5a5 5 0 11-10 0 5 5 0 0110 0zM5.5 11V0M11 5.5H0"
                fill="#ADA8C3"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default Section;
