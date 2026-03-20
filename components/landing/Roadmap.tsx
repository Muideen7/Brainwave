import Image from "next/image";
import { roadmap } from "@/constants";

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-10 lg:py-16 xl:py-20">
      <div className="container md:pb-10">
        <div className="relative max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center">
          <h2 className="h2">What we&apos;re working on</h2>
          <p className="body-2 mt-4 text-n-4">
            Our roadmap is filled with exciting new features and improvements.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 md:gap-4 md:pb-[7rem]">
          {roadmap.map((item) => {
            const status = item.status === "done" ? "Done" : "In progress";

            return (
              <div
                className={`md:flex even:md:translate-y-[7rem] p-0.25 rounded-[2.5rem] ${
                  item.colorful ? "bg-linear-to-b from-color-1 to-color-2" : "bg-n-6"
                }`}
                key={item.id}
              >
                <div className="relative p-8 bg-n-8 rounded-[2.4375rem] overflow-hidden xl:p-15">
                  <div className="absolute top-0 left-0 max-w-full">
                    <Image
                      src="/assets/grid.png"
                      width={550}
                      height={550}
                      alt="Grid"
                    />
                  </div>
                  <div className="relative z-1">
                    <div className="flex items-center justify-between max-w-[27rem] mb-8 md:mb-20">
                      <div className="tagline">{item.date}</div>

                      <div className="flex items-center px-4 py-1 bg-n-1 rounded text-n-8">
                        <Image
                          className="mr-2.5"
                          src={
                            item.status === "done"
                              ? "/assets/check-02.svg"
                              : "/assets/loading-01.svg"
                          }
                          width={16}
                          height={16}
                          alt={status}
                        />
                        <div className="tagline">{status}</div>
                      </div>
                    </div>

                    <div className="mb-10 -my-10 -mx-15">
                      <Image
                        className="w-full"
                        src={item.imageUrl}
                        width={628}
                        height={426}
                        alt={item.title}
                      />
                    </div>
                    <h4 className="h4 mb-4">{item.title}</h4>
                    <p className="body-2 text-n-4">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
