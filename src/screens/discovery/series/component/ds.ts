/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:04:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 17:04:37
 *
 * 区块常量: 私有组件共享标识
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Component')
