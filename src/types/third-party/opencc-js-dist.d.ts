/*
 * opencc-js dist/esm-lib 子路径类型声明 (Android 平台使用)
 * 与上游 opencc-js/types/core.d.ts 保持一致, 字典真实形状为 [[DictLike, DictLike]]
 *
 * @Author: czy0729
 * @Date: 2026-08-30 06:52:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 08:20:00
 */
declare module 'opencc-js/dist/esm-lib/core' {
  export type DictLike = string | readonly (readonly [string, string])[]
  export type DictGroup = readonly DictLike[]
  export type ConverterFactoryArgument = DictGroup | readonly DictGroup[]
  export type ConverterFunction = (text: string) => string

  export function ConverterFactory(...dictGroups: ConverterFactoryArgument[]): ConverterFunction
}

declare module 'opencc-js/dist/esm-lib/from/cn' {
  import type { DictGroup } from 'opencc-js/dist/esm-lib/core'

  const CN: readonly DictGroup[]
  export default CN
}

declare module 'opencc-js/dist/esm-lib/to/hk' {
  import type { DictGroup } from 'opencc-js/dist/esm-lib/core'

  const HK: readonly DictGroup[]
  export default HK
}

declare module 'opencc-js/dist/esm-lib/to/tw' {
  import type { DictGroup } from 'opencc-js/dist/esm-lib/core'

  const TW: readonly DictGroup[]
  export default TW
}

declare module 'opencc-js/from/cn' {
  const CN: readonly (readonly (readonly (readonly [string, string])[] | string)[])[]
  export default CN
}

declare module 'opencc-js/to/hk' {
  const HK: readonly (readonly (readonly (readonly [string, string])[] | string)[])[]
  export default HK
}

declare module 'opencc-js/to/tw' {
  const TW: readonly (readonly (readonly (readonly [string, string])[] | string)[])[]
  export default TW
}
