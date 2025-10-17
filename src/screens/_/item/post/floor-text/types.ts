/*
 * @Author: czy0729
 * @Date: 2025-10-13 22:35:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 22:41:42
 */
import type { Override } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Required<
  Override<
    Pick<ComponentProps, 'floor' | 'time'>,
    {
      isNew: boolean
    }
  >
>
