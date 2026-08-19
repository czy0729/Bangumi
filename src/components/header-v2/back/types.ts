/*
 * @Author: czy0729
 * @Date: 2023-12-04 14:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-25 12:29:22
 */
import type { Override, WithViewStyles } from '@types'
import type { TouchableProps } from '../../touchable'
import type { Props as ComponentProps } from '../types'

export type Props = WithViewStyles<
  Override<
    Pick<ComponentProps, 'color'>,
    {
      /** 点击回调 */
      onPress?: TouchableProps['onPress']
    }
  >
>
