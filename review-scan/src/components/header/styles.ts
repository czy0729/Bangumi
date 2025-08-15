/*
 * @Author: czy0729
 * @Date: 2022-03-12 04:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-19 11:53:34
 */
import { _ } from '@stores'

export const styles = _.create({
  headerLeftContainerStyle: {
    marginLeft: _.ios(-4, -9)
  },
  headerRightContainerStyle: {
    marginRight: _.ios(-12, -8)
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
