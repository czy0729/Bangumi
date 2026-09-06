/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:53:34
 */
import { _ } from '@stores'

import type { StatusBarEventsType } from './types'

export const styles = _.create({
  headerLeftContainerStyle: {
    marginLeft: _.ios(-4, -9)
  },
  headerRightContainerStyle: {
    marginRight: _.ios(-12, -8)
  }
})

type GetColor = (fixed: boolean) => string

export const colors: Partial<Record<StatusBarEventsType, GetColor>> = {
  Subject: (fixed: boolean) => (_.isDark || !fixed ? '#fff' : '#000'),
  Tinygrail: () => _.colorTinygrailPlain
}

export const backgroundColors: Partial<Record<StatusBarEventsType, GetColor>> = {
  Tinygrail: () => _.colorTinygrailContainer
}

export const statusBarEventsTypes = {
  Subject: (fixed: boolean) => {
    return {
      barStyle: _.select(fixed ? 'dark-content' : 'light-content', 'light-content'),
      backgroundColor: 'transparent',
      action: 'onWillFocus'
    }
  },
  Topic: () => {
    return {
      barStyle: 'dark-content',
      backgroundColor: 'transparent',
      action: 'onWillFocus'
    }
  }
}
