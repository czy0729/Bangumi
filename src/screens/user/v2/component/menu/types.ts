/*
 * @Author: czy0729
 * @Date: 2025-08-23 16:11:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:37:12
 */
import type { DATA_ME, DATA_OTHER } from './ds'

export type MenuLabel = (typeof DATA_ME)[number] | (typeof DATA_OTHER)[number]
