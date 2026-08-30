/*
 * @Author: czy0729
 * @Date: 2021-02-28 16:32:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-07 17:51:54
 */
import { useObserver } from 'mobx-react'

/** 订阅被访问的 observable, 使组件在数据变化时重新渲染 (原样导出 mobx-react 的实现) */
export default useObserver
