/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 19:25:48
 */
import { _ } from '@stores'

export const styles = _.create({
  headerLeftContainerStyle: {
    marginLeft: _.ios(-4, -9)
  },
  headerRightContainerStyle: {
    marginRight: _.ios(-13, -8)
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
