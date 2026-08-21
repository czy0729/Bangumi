/*
 * @Author: czy0729
 * @Date: 2021-01-21 17:08:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 00:00:00
 */
import { memo } from 'react'
import { Component } from '../component'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { useBackAndroid } from './hooks'

/** 安卓退后拦截器 */
export const BackAndroid = memo(() => {
  r(COMPONENT)

  useBackAndroid()

  return <Component id='component-back-android' />
})

export default BackAndroid
