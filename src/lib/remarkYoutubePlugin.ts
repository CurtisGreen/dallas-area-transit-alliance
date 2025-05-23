// Copied and modified from https://github.com/pkolt/remark-youtube
import type { Root, Text } from "mdast";
import { visit } from "unist-util-visit";

const URL_PATTERN =
  /^https:\/\/(?:youtu\.be\/|www\.youtube\.com\/watch\?v=)([0-9A-Za-z_-]+)$/;

const remarkYoutubePlugin = () => (tree: Root) => {
  visit(tree, "paragraph", (node) => {
    let videoId = "";
    let videoUrl = "";
    for (const child of node.children) {
      if (child.type === "link") {
        const url = child?.url;
        const isYoutube = (child.children[0] as Text)?.value == "youtube";
        const match = url.match(URL_PATTERN);
        if (isYoutube && match?.[1]) {
          videoId = match[1];
          videoUrl = url;
          break;
        }
      }
    }

    if (videoId && videoUrl) {
      const text: Text = {
        type: "text",
        value: videoUrl,
        data: {
          hName: "iframe",
          hProperties: {
            width: "100%",
            src: `https://www.youtube.com/embed/${videoId}`,
            // allow:
            //   "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowfullscreen: true,
            style: "height:40vh", // Height only takes effect through style for some reason
          },
          hChildren: [],
        },
      };
      node.children = [text];
    }
  });
};

export default remarkYoutubePlugin;
