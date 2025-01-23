import { BlueskyIcon } from "@/app/_components/icons/bluesky-icon";
import { FacebookIcon } from "@/app/_components/icons/facebook-icon";
import { GitHubIcon } from "@/app/_components/icons/github-icon";
import { InstagramIcon } from "@/app/_components/icons/instagram-icon";
import { LinkedInIcon } from "@/app/_components/icons/linkedin-icon";
import { RedditIcon } from "@/app/_components/icons/reddit-icon";
import { XIcon } from "@/app/_components/icons/x-icon";
import { YoutubeIcon } from "@/app/_components/icons/youtube-icon";

type Props = {
  showGitHub?: boolean;
};

export function SocialIcons({ showGitHub }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      <a href="https://www.facebook.com/groups/7092451177524504">
        <FacebookIcon className="h-8" />
      </a>
      <a href="https://instagram.com/ridewithdata">
        <InstagramIcon className="h-8" />
      </a>
      <a href="https://bsky.app/profile/ridewithdata.org">
        <BlueskyIcon className="h-8" />
      </a>
      <a href="https://www.reddit.com/user/ridewithdata/">
        <RedditIcon className="h-8" />
      </a>
      <a href="https://www.linkedin.com/company/ridewithdata/">
        <LinkedInIcon className="h-8" />
      </a>
      <a href="https://youtube.com/@ridewithdata/">
        <YoutubeIcon className="h-8" />
      </a>
      {showGitHub && (
        <a href="https://github.com/CurtisGreen/dallas-area-transit-alliance">
          <GitHubIcon className="h-8" />
        </a>
      )}
    </div>
  );
}
