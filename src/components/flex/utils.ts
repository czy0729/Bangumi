/*
 * @Author: czy0729
 * @Date: 2026-03-18 05:09:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-03-18 05:09:34
 */
import { FLEX_MAP } from './ds'

export const getFlexValue = (val: string | undefined) => (val ? FLEX_MAP[val] || val : val)
