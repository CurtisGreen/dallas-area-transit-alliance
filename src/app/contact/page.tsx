import { DiscordIcon } from "@/app/_components/discord-icon";
import { GroupMeIcon } from "@/app/_components/groupme-icon";
import { FacebookIcon } from "@/app/_components/facebook-icon";
import { InstagramIcon } from "@/app/_components/instagram-icon";
import { XIcon } from "@/app/_components/x-icon";
import { BlueskyIcon } from "@/app/_components/bluesky-icon";

export default function Index() {
  return (
    <>
      <h1 className="my-16 md:mb-12 text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        Contact Us
      </h1>
      <div className="text-lg">
        <div className="mb-2">Follow us on social media</div>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/groups/7092451177524504">
            <FacebookIcon className="h-8" />
          </a>
          <a href="https://instagram.com/ridewithdata">
            <InstagramIcon className="h-8" />
          </a>
          <a href="https://x.com/ridewithdata">
            <XIcon className="h-8" />
          </a>
          <a href="https://bsky.app/profile/ridewithdata.org">
            <BlueskyIcon className="h-8" />
          </a>
        </div>

        <div className="mb-2 mt-10">Or join the conversation!</div>
        <div className="mb-4 flex gap-6">
          <a href="https://groupme.com/join_group/92468276/JsoCAH57">
            <GroupMeIcon className="h-9 fill-slate-700 dark:fill-white hover:fill-blue-700 dark:hover:fill-blue-700" />
          </a>
          <a href="https://discord.gg/ZKwDE2s4qx">
            <DiscordIcon className="h-8 fill-slate-700 dark:fill-white hover:fill-blue-700 dark:hover:fill-blue-700" />
          </a>
        </div>

        <div className="mb-2 mt-10">Press Contact</div>
        <div className="font-semibold dark:text-white dark:font-normal">
        <a href="mailto:info@ridewithdata.org">info@ridewithdata.org</a>
        </div>
        
        <div className="mb-2 mt-10">Contact Us</div>
        <div>
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeE-SrnsbjniO7I0BkdHourNdQYO_MKaYhKa6iQjN63_eubBg/viewform?embedded=true"
            width="640"
            height="2875"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0">
          </iframe>
        </div>
      </div>
    </>
  );
}
