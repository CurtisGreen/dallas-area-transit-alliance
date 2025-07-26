import Image from "next/image";
import { SubstackFeed } from "./_components/substack-feed";
import Link from "next/link";

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
                href="/"
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
                href="/"
                className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black"
              >
                Subscribe to our newsletter
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

      <div className="w-full my-10 p-12 bg-yellow-500 text-black rounded-sm flex justify-center items-center flex-col">
        <div className="text-2xl font-semibold my-4">DATA in the news</div>
        <div className="flex gap-6 flex-wrap justify-center">
          <div>
            <Image
              src="/assets/default/go-pass-tap-train.jpg"
              alt="Tap to pay terminal"
              width={450}
              height={250}
              className="rounded-sm"
            />
            <div>Article 1</div>
          </div>
          <div>
            <Image
              src="/assets/default/go-pass-tap-train.jpg"
              alt="Tap to pay terminal"
              width={450}
              height={250}
              className="rounded-sm"
            />
            <div>Article 2</div>
          </div>
          <div>
            <Image
              src="/assets/default/go-pass-tap-train.jpg"
              alt="Tap to pay terminal"
              width={450}
              height={250}
              className="rounded-sm"
            />
            <div>Article 3</div>
          </div>
        </div>
      </div>
    </>
  );
}
