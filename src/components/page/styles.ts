/*
 * @Author: czy0729
 * @Date: 2023-04-14 14:06:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-14 14:07:20
 */
import { _ } from '@stores'

export const styles = _.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    minHeight: _.window.height * 0.8
  }
})
