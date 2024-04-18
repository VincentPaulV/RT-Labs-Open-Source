// app/page.tsx
'use client';
import { getProfile } from "@/sanity/sanity.query";
import type { ProfileType } from "@/types";
import Link from "next/link";
import { FormEvent } from 'react'

export default async function Home() {
  const profile: ProfileType[] = await getProfile();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/queues/email', {
      method: 'POST',
      body: formData,
    })
 
    // Handle response if necessary
    const data = await response.json()
    // ...
  }
  return (
    <main className="max-w-7xl mx-auto lg:px-16 px-6">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className="lg:max-w-2xl max-w-2xl">
              <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full">
                {data.Title}
              </h1>
            </div>
          ))}
      </section>
      
      <section className="grid xl:grid-cols-3 md:grid-cols-1 grid-cols-2 gap-5 mb-4">
          <Link
            href= "/projects"
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <div>
              <h2 className="font-semibold mb-1">Check out the new Vibrations RT-Labs!</h2>
              <div className="text-sm text-zinc-400">10 New Experiments added!</div>
            </div>
          </Link>

          <Link
            href= "/about"
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <div>
              <h2 className="font-semibold mb-1">Made with an Open Source Architecture</h2>
              <div className="text-sm text-zinc-400">An NITK Product</div>
            </div>
          </Link>

          <Link
            href= "/api/setupReminder"
            className="flex items-center gap-x-4 bg-[#1d1d20] border border-transparent hover:border-zinc-700 p-4 rounded-lg ease-in-out"
          >
            <div>
              <h2 className="font-semibold mb-1">Wanna know more about us?</h2>
              <div className="text-sm text-zinc-400">Click this box!</div>
            </div>
          </Link>
      </section>

      {/* <section>
          <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
          </a>
      </section>

      <section>
      <div className="flex flex-wrap justify-center mt-10">
        <div className="p-4 max-w-sm">
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                  <div
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                  </div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
              </div>
              <div className="flex flex-col justify-between flex-grow">
              <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                  <a href="#" className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center">Learn More
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                  </a>
              </div>
          </div>
        </div>

          <div className="p-4 max-w-sm">
          <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
              <div className="flex items-center mb-3">
                  <div
                      className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                  </div>
                  <h2 className="text-white dark:text-white text-lg font-medium">Feature 2</h2>
              </div>
              <div className ="flex flex-col justify-between flex-grow">
                  <p className="leading-relaxed text-base text-white dark:text-gray-300">
                      Lorem ipsum dolor sit amet. In quos laboriosam non neque eveniet 33 nihil molestias. Rem perspiciatis iure ut laborum inventore et maxime amet.
                  </p>
                  <a href="#" className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center">Learn More
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                  </a>
              </div>
          </div>
        </div>
      </div>
      </section> */}


      
    </main>
  );
}