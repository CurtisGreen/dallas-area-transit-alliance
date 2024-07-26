import { DiscordIcon } from "@/app/_components/discord-icon";
import { GroupMeIcon } from "@/app/_components/groupme-icon";

export default function Index() {
  return (
    <>
      <h1 className="my-16 md:mb-12 text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Contact Us
      </h1>
      <div>
        <div className="pb-4">
          <a href="https://discord.gg/ZKwDE2s4qx">
            <DiscordIcon className="h-8 fill-slate-700 dark:fill-white hover:fill-blue-700 dark:hover:fill-blue-700" />
          </a>
        </div>

        <div>
          <a href="https://groupme.com/join_group/92468276/JsoCAH57">
            <GroupMeIcon className="h-9 fill-slate-700 dark:fill-white hover:fill-blue-700 dark:hover:fill-blue-700" />
          </a>
        </div>
      </div>
    </>
  );
}
