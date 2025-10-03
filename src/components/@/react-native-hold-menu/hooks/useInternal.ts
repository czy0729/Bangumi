/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:51:24
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-09-12 18:51:24
 */
import { useContext } from 'react'
import { InternalContext } from '../context'

export const useInternal = () => useContext(InternalContext)
