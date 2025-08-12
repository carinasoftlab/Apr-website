import Image from "next/image";

export default function Page() {
  return (
    <main className="min-h-screen w-full bg">
      <section className="mx-auto max-w-full px-4 lg:px-16 py-10 md:py-16">
        {/* Top: Chief Minister */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center">
          {/* Portrait */}
          <div className="flex flex-col items-center md:items-center">
            <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full ring-5 ring-[#87541D] md:h-64 md:w-64 lg:h-80 lg:w-80 xl:h-80 xl:w-80">
              <Image
                src="/images/img1.svg"
                alt="Portrait of the Hon'ble Chief Minister"
                className="object-cover h-full w-full"
                priority
                fill
              />
            </div>
            <div className="mt-4 text-center items-center md:text-center">
              <p className="font-extrabold uppercase text-lg tracking-wide text-black">
                Shri Pema Khandu
              </p>
              <p className="text-sm text-black">Hon'ble, Chief Minister</p>
            </div>
          </div>

          {/* Message content */}
          <article className="flex-1 max-w-fit text-center md:text-start">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight text-zinc-800 xl:text-[2.6rem]">
              Message from Hon'ble Chief Minister
            </h2>
            <p className="mt-5 max-w-4xl text-sm  text-justify leading-relaxed text-zinc-800 md:text-sm xl:text-[1rem]">
              The Department of Panchayati Raj was established in the Year 1985.
              Since then, the functions of the Department as per Allocation of
              Business Rules were limited with the conduct of Panchayati Raj
              Election and promulgation of Acts, Laws, Bye-Laws, Guidelines etc.
              of Panchayati Raj Department and Its relevant matters. The work
              load of the Department has increased manifold and despite shortage
              of man power the department of Panchayati Raj had to implement the
              various flagship programmes in mission mode with limited man
              powers. As per implementation strategy of the Department, in all
              the respective.
            </p>
          </article>
        </div>
        {/* Divider */}
        <hr className="my-10 border-amber-500 h-2 md:my-6 md:mt-6 xl:mt-1 w-auto xl:w-5xl  ml-auto" />
        {/* Middle: Minister */}
        <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center  justify-end">
          {/* Message content */}
          <article className="flex-1 max-w-fit text-center md:text-start lg:text-start">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-tight text-zinc-800 xl:text-[2.6rem]">
              Message from Hon'ble Minister
            </h2>
            <p className="mt-5 max-w-3xl text-sm text-justify leading-relaxed text-zinc-800 md:text-sm xl:text-[1rem]">
              The Department of Panchayati Raj was established in the year 1985.
              Since then, the functions of the Department as per Allocation of
              Business Rules were limited to the conduct of Panchayati Raj
              Election and promulgation of Acts, Laws, Bye-Laws, and Guidelines
              of Panchayati Raj Department and its relevant matters. The work
              load of the Department has increased manifold.
            </p>
          </article>

          {/* Portrait */}
          <div className="flex flex-col items-center md:items-center">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full ring-5 ring-[#87541D] md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-65 xl:w-65">
              <Image
                src="/images/img2.svg"
                alt="Portrait of the Hon'ble Chief Minister"
                className="object-cover h-full w-full"
                priority
                fill
              />
            </div>
            <div className="mt-4 text-center md:text-center">
              <p className="font-extrabold uppercase text-lg tracking-wide text-black">
                Shri Ojing Tasing
              </p>
              <p className="text-sm text-black">
                Hon'ble Minister, Panchayati Raj
              </p>
            </div>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-10 border-amber-500 h-2 md:my-6 md:mt-6 w-auto xl:w-5xl  ml-auto" />
        {/* Bottom: Two officials */}
        {/*  */}
        <div className="max-w-5xl ml-auto">
          <div className="flex justify-center lg:justify-start gap-12">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-[#87541D] md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48">
                <Image
                  src="/images/img3.svg"
                  alt="Portrait of the Hon'ble Chief Minister"
                  className="object-cover h-full w-full"
                  priority
                  fill
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs lg:text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                  Shri Manish K Gupta
                </p>
                <p className="text-sm text-black">Chief Secretary</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-5 ring-[#87541D] md:h-32 md:w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48">
                <Image
                  src="/images/img4.svg"
                  alt="Portrait of the Hon'ble Chief Minister"
                  className="object-cover h-full w-full"
                  priority
                  fill
                />
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs lg:text-sm font-extrabold uppercase tracking-wide text-neutral-900">
                  Dr. Sonal Swaroop, IAS
                </p>
                <p className="text-sm text-black">Secretary Panchayati Raj</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
