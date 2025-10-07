import Image from "next/image";
import { SubstackFeed } from "./_components/substack-feed";
import Link from "next/link";

export const revalidate = 300;

export default async function Index() {
  return (
    <>
      <SubstackFeed />
      <div className="w-full my-10 p-12 bg-yellow-500 text-black rounded-sm flex justify-center">
        <div className="max-w-3xl flex gap-6 flex-wrap">
          <div className="flex-1">
            <div className="text-2xl font-semibold my-4">
              How to ride transit in North Texas
            </div>

            <div className="text-neutral-900">
              Want to ride transit but not sure where to get started? Here are
              some tips and tricks on how to navigate, pay, and get around in a
              convenient and safe way.
            </div>

            <div className="mt-6">
              <Link
                href="https://substack.com/home/post/p-169630364"
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-black"
              >
                Learn to ride
              </Link>
            </div>
          </div>

          <div>
            <Image
              src="/assets/default/go-pass-tap-train.jpg"
              alt="Tap to pay terminal"
              width={450}
              height={250}
              className="rounded-sm"
            />
          </div>
        </div>
      </div>

      <div className="w-full my-10 p-6 rounded-sm flex justify-center">
        <div className="max-w-3xl flex gap-6 flex-wrap">
          <div className="flex-1">
            <div className="text-2xl font-semibold my-4">Get involved</div>

            <div className="">
              See our{" "}
              <Link href="/calendar" className="text-blue-500">
                calendar
              </Link>{" "}
              page and for future events and subscribe to our newsletter so you
              can stay on top of what's happening.
            </div>

            <div className="mt-6">
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLSeE-SrnsbjniO7I0BkdHourNdQYO_MKaYhKa6iQjN63_eubBg/viewform"
                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-nowrap"
              >
                Subscribe to our newsletter
              </Link>
            </div>
          </div>

          <div>
            <Image
              src="/assets/blog/data-announces-formation/cover.jpg"
              alt="Tap to pay terminal"
              width={450}
              height={250}
              className="rounded-sm"
            />
          </div>
        </div>
      </div>

      <div className="w-full my-10 p-12 bg-yellow-500 text-black rounded-sm flex justify-center items-center flex-col">
        <div className="text-2xl font-semibold my-4">DATA in the news</div>
        <div className="flex gap-6 flex-wrap justify-center items-center">
          <Link
            href="https://www.dallasnews.com/news/transportation/2025/07/09/appalled-hundreds-decry-dart-cuts-fare-hikes-at-raucous-hearing"
            className="max-w-[400px]"
          >
            <Image
              src="/assets/default/no-caps-no-cuts.webp"
              alt="No caps no cuts"
              width={400}
              height={300}
              className="rounded-sm object-contain h-[300px] w-[400px]"
            />
            <div>Dallas Morning News - Amber Gaudet</div>
            <div className="text-neutral-600">
              'Appalled': Hundreds decry proposed DART cuts, fare hikes at
              raucous hearing
            </div>
          </Link>

          <Link
            href="https://www.dallasobserver.com/news/dart-says-texas-bill-will-kill-the-public-transit-system-22259069"
            className="max-w-[400px]"
          >
            <Image
              src="/assets/default/dart-train-airport.png"
              alt="Dart train"
              width={400}
              height={300}
              className="rounded-sm object-contain h-[300px] w-[400px]"
            />
            <div>Dallas Observer - Alyssa Fields</div>
            <div className="text-neutral-600">
              'DART Killer' Bill Would Immobilize Thousands of Dallasites
            </div>
          </Link>

          <Link
            href="https://www.keranews.org/news/2025-03-25/dart-advocates-oppose-funding-cuts-legislature"
            className="max-w-[400px]"
          >
            <Image
              src="/assets/default/data-press-conference.webp"
              alt="DATA press conference"
              width={400}
              height={300}
              className="rounded-sm object-contain h-[300px] w-[400px]"
            />
            <div>KERA - Pablo Arauz Peña</div>
            <div className="text-neutral-600">
              DART advocates speak out against proposed funding cuts
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
