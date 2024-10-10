import { DiscordIcon } from "@/app/_components/icons/discord-icon";
import { GroupMeIcon } from "@/app/_components/icons/groupme-icon";
import { SocialIcons } from "@/app/_components/social-icons";

export default function Index() {
  return (
    <>
      <h1 className="my-16 md:mb-12 text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        Contact Us
      </h1>
      <div className="text-lg">
        <div className="mb-2">Follow us on social media</div>
        <SocialIcons />
        <div className="mb-2 mt-10">Or join the conversation!</div>
        <div className="mb-4 flex flex-wrap gap-6">
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
        <div className="mb-2 mt-10">Subscribe to our Newsletter</div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeE-SrnsbjniO7I0BkdHourNdQYO_MKaYhKa6iQjN63_eubBg/viewform?embedded=true"
          className="block dark:invert dark:brightness-75 dark:grayscale w-[350px] md:w-[600px] h-[2100px] md:h-[1800px] ml-[-15px] md:ml-[-30px]"
        />
      </div>
    </>
  );
}
