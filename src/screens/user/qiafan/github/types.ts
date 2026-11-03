/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 *
 * GitHub 接口数据与仓库统计模型
 */

/** 贡献者, https://api.github.com/repos/czy0729/Bangumi/contributors */
export type Contributor = {
  /** GitHub 账号名 */
  login: string

  /** 头像地址 */
  avatar_url: string

  /** 提交数 */
  contributions: number
}

/** 最近 52 周提交数, https://api.github.com/repos/czy0729/Bangumi/stats/participation */
export type Participation = {
  /** 全部作者合计 */
  all: number[]

  /** 仓库作者 */
  owner: number[]
}

/** 每周提交数 */
export type Week = {
  /** 周起始时间戳 (UTC 周日) */
  w: number

  /** 该周提交数 */
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

  /** 作者 GitHub 账号名 */
  login: string

  /** 作者头像地址 */
  avatarUrl: string

  /** 作者最近一年每周提交数 */
  authorWeeks: Week[]

  /** 全部作者合计的最近一年每周提交数 */
  weeks: Week[]
}
