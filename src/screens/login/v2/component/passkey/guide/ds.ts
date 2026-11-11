/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:17:38
 *
 * 本地说明图顺序：系统设置、Bitwarden 信任提示、KeePassDX 特权应用
 */
import type { GuideImageSlot } from '../types'

export const GUIDE_IMAGES: readonly GuideImageSlot[] = [
  { id: 1, source: require('@assets/images/passkey-guide/settings.jpg') as number },
  { id: 2, source: require('@assets/images/passkey-guide/bitwarden.jpg') as number },
  { id: 3, source: require('@assets/images/passkey-guide/keepassdx.jpg') as number }
]
