/*
 * @Author: czy0729
 * @Date: 2025-10-13 06:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 06:36:40
 */
import type { Props as ComponentProps } from '../types'

export type Props = Required<
  Pick<ComponentProps, 'index' | 'inViewY' | 'userId' | 'userName' | 'avatar' | 'event'>
>
