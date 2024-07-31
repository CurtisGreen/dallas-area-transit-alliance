export type Banner = {
  /** Text to show on the banner */
  text: string;
  /** Target when banner is clicked. Defaults to the source post. */
  href?: string;
  /**
   * If true, banner will be hidden unless a newer post sets a banner.
   * Defaults to false.
   */
  hide?: boolean;
};
