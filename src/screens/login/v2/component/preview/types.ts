/*
 * @Author: czy0729
 * @Date: 2026-10-23 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 登录预览 Props
 */
import type { Props as PasskeyProps } from '../passkey/types'

export type Props = Pick<PasskeyProps, 'passkey' | 'blocked'> & {
  /** 账号登录 */
  onLogin: () => void

  /** 游客预览 */
  onTour: () => void
}
