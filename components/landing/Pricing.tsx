import Image from "next/image";
import { stars, lines } from "@/public/assets";
import Heading from "./Heading";
import PricingList from "./PricingList";
import Section from "./Section";

const Pricing = () => {
  return (
    <Section className="overflow-hidden" id="pricing">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <Image
            src={stars}
            className="w-full"
            width={950}
            height={400}
            alt="Stars"
          />
        </div>

        <Heading
          tag="Get started with Brainwave"
          title="Pay once, use forever"
        />

        <div className="relative">
          <PricingList />
          <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={lines}
              className="w-full"
              width={1480}
              height={177}
              alt="Lines"
            />
          </div>
          <div className="hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={lines}
              className="w-full"
              width={1480}
              height={177}
              alt="Lines"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            href="/pricing"
          >
            See the full details
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Pricing;
