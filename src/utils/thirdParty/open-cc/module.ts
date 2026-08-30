/*
 * @Author: czy0729
 * @Date: 2025-05-18 07:19:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 06:58:27
 */
import { ConverterFactory as createConverter } from 'opencc-js/core'
import CN from 'opencc-js/from/cn'
import HK from 'opencc-js/to/hk'
import TW from 'opencc-js/to/tw'

import type { ConverterFactoryArgument, ConverterFunction } from 'opencc-js/core'

export namespace OpenCC {
  export type Converter = ConverterFunction
  export function ConverterFactory(...args: ConverterFactoryArgument[]): Converter {
    return createConverter(...args)
  }
}

export { CN, HK, TW }
