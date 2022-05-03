/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 10:56:49
 */
import { _ } from '@stores'

export const styles = _.create({
  touch: {
    borderRadius: 20,
    overflow: 'hidden'
  },
  icon: {
    width: 36,
    height: 36
  }
})

export const colors = {
  Subject: (fixed: boolean) => (_.isDark || !fixed ? '#fff' : '#000'),
  Tinygrail: () => _.colorTinygrailPlain
}

export const backgroundColors = {
  Tinygrail: () => _.colorTinygrailContainer
}

export const statusBarEventsTypes = {
  Subject: (fixed: boolean) => {
    return {
      barStyle: _.isDark || fixed ? 'dark-content' : 'light-content',
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
