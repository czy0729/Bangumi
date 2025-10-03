/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:51:02
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:51:02
 */
export interface HoldMenuProviderProps {
  /**
   * Theme of hold menu. Effects to backdrop and context menu styles. Optional.
   * @type "light" | "dark"
   * @default "light"
   * @examples
   * theme="light"
   */
  theme?: 'dark' | 'light'
  iconComponent?: any
  children: React.ReactElement | React.ReactElement[]

  /**
   * Set if you'd like to apply padding to bottom (safe area bottom inset in most case)
   * @type number
   * @default 0
   * @examples
   * paddingBottom={34}
   */
  paddingBottom?: number
}
