export type StringListData = {
  href?: string
  value?: string
  timestamp?: number
}

export type RelationshipItem = {
  title?: string
  string_list_data?: StringListData[]
}

export type FollowingExport = {
  relationships_following?: RelationshipItem[]
}

export type InstagramAccount = {
  username: string
  href: string
  timestamp?: number
}

export type DashboardView = "followers" | "following" | "notFollowingBack"

export type ViewContent = {
  title: string
  description: string
  statDescription: string
}

export type DashboardData = Record<DashboardView, InstagramAccount[]> & {
  fileName: string
}

export type StatSummary = {
  view: DashboardView
  value: number
  highlight?: boolean
}
