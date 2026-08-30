/*
 * @Author: czy0729
 * @Date: 2025-05-18 07:18:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 06:58:06
 */
import { ConverterFactory as createConverter } from 'opencc-js/dist/esm-lib/core'
import CN from 'opencc-js/dist/esm-lib/from/cn'
import HK from 'opencc-js/dist/esm-lib/to/hk'
import TW from 'opencc-js/dist/esm-lib/to/tw'

import type { ConverterFactoryArgument, ConverterFunction } from 'opencc-js/dist/esm-lib/core'

export namespace OpenCC {
  export type Converter = ConverterFunction
  export function ConverterFactory(...args: ConverterFactoryArgument[]): Converter {
    return createConverter(...args)
  }
}

export { CN, HK, TW }
