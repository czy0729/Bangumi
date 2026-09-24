/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */

/** 贡献者, https://api.github.com/repos/czy0729/Bangumi/contributors */
export type Contributor = {
  login: string
  avatar_url: string
  contributions: number
}

/** 最近 52 周提交数, https://api.github.com/repos/czy0729/Bangumi/stats/participation */
export type Participation = {
  all: number[]
  owner: number[]
}

/** 每周提交数 */
export type Week = {
  w: number
  c: number
}

/** 仓库统计 */
export type RepoStats = {
  /** 发布数 */
  releases: number

  /** 作者提交数 */
  commits: number

  /** 作者增加行数 */
  additions: number

  /** 作者删除行数 */
  deletions: number

  login: string
  avatarUrl: string

  /** 作者最近一年每周提交数 */
  authorWeeks: Week[]

  /** 全部作者合计的最近一年每周提交数 */
  weeks: Week[]
}
