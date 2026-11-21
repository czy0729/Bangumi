/*
 * @Author: czy0729
 * @Date: 2026-11-22 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-22 12:00:00
 *
 * 简介 props 定义
 */
import type { Override, WithViewStyles } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = WithViewStyles<
  Override<
    Required<Pick<ComponentProps, 'name' | 'nameCn' | 'numberOfLines'>>,
    {
      /** 简介内容 */
      value: string
    }
  >
>
