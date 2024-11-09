import Image from "next/image";
import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import { PortableText } from "@portabletext/react";

export default async function About() {
  const profile: ProfileType[] = await getProfile();

  return (
    <main className="lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      {profile &&
        profile.map((data) => (
          <div key={data._id}>
            <section className="grid lg:grid-cols-2 grid-cols-1 gap-x-6 justify-items-center">
              <div className="order-2 lg:order-none">
                <h1 className="lg:text-5xl text-4xl lg:leading-tight basis-1/2 font-bold mb-8">
                  We are the developers of {data.Title}!
                </h1>

                <div className="flex flex-col gap-y-3 text-zinc-400 leading-relaxed">
                  <PortableText value={data.fullBio} />
                </div>
              </div>
            </section>

            <section className="mt-24 max-w-2xl">
              <h2 className="font-semibold text-4xl mb-4">Introduction</h2>
              <p className="text-zinc-400 max-w-lg">
                We have put in our efforts over the past 2 semesters working on this and this is the glimpse of our work.
              </p>

              <section className="mt-24 max-w-2xl">
              <h2 className="font-semibold text-4xl mb-4">Contact</h2>
              <p className="text-zinc-400 max-w-lg">
                {data.email}
              </p>
              </section>


              {/* <ul className="flex flex-wrap items-center gap-3 mt-8">
                {data.skills.map((skill, id) => (
                  <li
                    key={id}
                    className="bg-[#1d1d20] border border-transparent hover:border-zinc-700 rounded-md px-2 py-1"
                  >
                    {skill}
                  </li>
                ))}
              </ul> */}
            </section>
          </div>
        ))}
    </main>
  );
}