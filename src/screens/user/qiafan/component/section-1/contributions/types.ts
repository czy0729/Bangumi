/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:49:54
 */
import type { RepoStats, Week } from '../../../github'

export type Props = Pick<
  RepoStats,
  'login' | 'avatarUrl' | 'commits' | 'additions' | 'deletions'
> & {
  /** 卡片宽度 */
  width: number

  weeks: Week[]
}
