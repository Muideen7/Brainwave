import Image from "next/image";
import { pricing } from "@/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Pricing = () => {
  return (
    <section id="pricing" className="overflow-hidden py-10 lg:py-16 xl:py-20">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <Image
            src="/assets/4-small.png"
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src="/assets/pricing/stars.svg"
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <h2 className="h2 mb-12 md:mb-16 lg:mb-20 text-center max-w-[50rem] mx-auto">
          Pay once, use forever
        </h2>

        <div className="flex gap-[1rem] max-lg:flex-wrap justify-center">
          {pricing.map((item) => (
            <div
              key={item.id}
              className="w-[19rem] max-lg:w-full h-full px-6 bg-n-8 border border-n-6 rounded-[2rem] lg:w-auto py-8 lg:py-12 even:py-14 [&>h4]:first:text-color-2 [&>h4]:even:text-color-1 [&>h4]:last:text-color-3"
            >
              <h4 className="h4 mb-4">{item.title}</h4>

              <p className="body-2 min-h-[4rem] mb-3 text-n-1/50">
                {item.description}
              </p>

              <div className="flex items-center h-[5.5rem] mb-6">
                {item.price && (
                  <>
                    <div className="h3">$</div>
                    <div className="text-[5.5rem] leading-none font-bold">
                      {item.price}
                    </div>
                  </>
                )}
              </div>

              <Link href="/login">
                <Button className="w-full mb-6">
                  {item.price ? "Get started" : "Contact us"}
                </Button>
              </Link>

              <ul>
                {item.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start py-5 border-t border-n-6"
                  >
                    <Image
                      src="/assets/check.svg"
                      width={24}
                      height={24}
                      alt="Check"
                    />
                    <p className="body-2 ml-4">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none">
          <Image
            src="/assets/pricing/lines.svg"
            width={1480}
            height={177}
            alt="Lines"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
