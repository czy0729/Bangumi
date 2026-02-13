/*
 * @Author: czy0729
 * @Date: 2024-08-13 15:54:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:06:14
 */
import { Text } from '../text'

import type { KatakanaProviderProps } from './provider'
import type { Props as KatakanaProps } from './types'

export type { KatakanaProviderProps, KatakanaProps }

/** 片假名终结者在片 (网页版暂不实现) */
const Katakana = Text

// @ts-expect-error
Katakana.Provider = Text

export { Katakana }

export default Katakana
