/*
 * @Author: czy0729
 * @Date: 2024-08-02 20:09:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 20:16:50
 */
import { lazy } from 'react'

export const ItemBlog = lazy(() => import('./index'))
export { Props as ItemBlogProps } from './types'
