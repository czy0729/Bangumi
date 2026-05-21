/*
 * @Author: czy0729
 * @Date: 2026-05-21 20:58:20
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-21 20:58:20
 */
export const AUTO_COMPLETE: Record<
  string,
  { key: 'autoCompleteEps' | 'autoCompleteBooks'; label: string }
> = {
  看: { key: 'autoCompleteEps', label: '看过时自动完成所有进度' },
  读: { key: 'autoCompleteBooks', label: '读过时自动完成所有已知话数、卷数' }
} as const
