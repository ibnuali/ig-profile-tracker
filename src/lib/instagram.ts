import JSZip from "jszip"

import { FOLLOWERS_PATH, FOLLOWING_PATH } from "@/constants/instagram"
import type {
  DashboardData,
  FollowingExport,
  InstagramAccount,
  RelationshipItem,
  StringListData,
} from "@/types/instagram"

function getFirstStringData(item: RelationshipItem) {
  return item.string_list_data?.[0]
}

function normalizeUsername(username: string) {
  return username.trim().toLowerCase()
}

function createAccount(username: string, details?: StringListData): InstagramAccount {
  return {
    username,
    href: details?.href || `https://www.instagram.com/${username}`,
    timestamp: details?.timestamp,
  }
}

function toRelationshipItems(data: unknown): RelationshipItem[] {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>
    const relationships = record.relationships_followers ?? record.relationships_following

    if (Array.isArray(relationships)) {
      return relationships
    }

    // A single relationship item exported as a bare object.
    if (Array.isArray(record.string_list_data)) {
      return [record as unknown as RelationshipItem]
    }
  }

  return []
}

function parseFollowers(data: unknown) {
  const items = toRelationshipItems(data)

  if (!Array.isArray(data) && items.length === 0) {
    throw new Error("followers_1.json has an unexpected format.")
  }

  return items.flatMap((item) => {
    const details = getFirstStringData(item)
    const username = details?.value?.trim() || item.title?.trim()

    return username ? [createAccount(username, details)] : []
  })
}

function parseFollowing(data: unknown) {
  const relationships = (data as FollowingExport).relationships_following

  if (!Array.isArray(relationships)) {
    throw new Error("following.json has an unexpected format.")
  }

  return relationships.flatMap((item) => {
    const details = getFirstStringData(item)
    const username = item.title?.trim() || details?.value?.trim()

    return username ? [createAccount(username, details)] : []
  })
}

function findZipFile(zip: JSZip, path: string) {
  const fileName = Object.keys(zip.files).find((name) => name.endsWith(path))

  return fileName ? zip.file(fileName) : null
}

export function formatDate(timestamp?: number) {
  if (!timestamp) {
    return "Unknown date"
  }

  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(
    new Date(timestamp * 1000)
  )
}

export async function analyzeInstagramZip(file: File): Promise<DashboardData> {
  const zip = await JSZip.loadAsync(file)
  const followersFile = findZipFile(zip, FOLLOWERS_PATH)
  const followingFile = findZipFile(zip, FOLLOWING_PATH)

  if (!followersFile || !followingFile) {
    throw new Error(
      "Could not find followers_1.json and following.json inside the Instagram export ZIP."
    )
  }

  const [followersJson, followingJson] = await Promise.all([
    followersFile.async("string"),
    followingFile.async("string"),
  ])
  const followers = parseFollowers(JSON.parse(followersJson))
  const following = parseFollowing(JSON.parse(followingJson))
  const followerUsernames = new Set(
    followers.map((account) => normalizeUsername(account.username))
  )
  const notFollowingBack = following
    .filter((account) => !followerUsernames.has(normalizeUsername(account.username)))
    .sort((first, second) => (second.timestamp ?? 0) - (first.timestamp ?? 0))

  return {
    fileName: file.name,
    followers,
    following,
    notFollowingBack,
  }
}
