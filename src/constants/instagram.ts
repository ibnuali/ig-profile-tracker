import type { DashboardView, ViewContent } from "@/types/instagram"

export const FOLLOWERS_PATH = "connections/followers_and_following/followers_1.json"
export const FOLLOWING_PATH = "connections/followers_and_following/following.json"

export const VIEW_CONTENT = {
  followers: {
    title: "Followers",
    description: "Accounts that follow you.",
    statDescription: "Accounts that follow you",
  },
  following: {
    title: "Following",
    description: "Accounts you follow.",
    statDescription: "Accounts you follow",
  },
  notFollowingBack: {
    title: "Not following back",
    description: "Sorted by most recently followed first.",
    statDescription: "People you follow only",
  },
} satisfies Record<DashboardView, ViewContent>

export const ZIP_INSTRUCTIONS = [
  "Open Instagram, go to Settings and privacy, then find Your information and permissions.",
  "Choose Download your information, select your Instagram account, and request a download.",
  "Select Some of your information, then include Followers and following.",
  "Choose JSON as the format, submit the request, and wait until Instagram sends the download link.",
  "Download the ZIP file and upload it to this dashboard. Do not unzip it first.",
]
