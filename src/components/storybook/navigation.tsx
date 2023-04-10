/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:55:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-09 10:24:36
 */
const navigate = (routeName: string) => {
  const url = `iframe.html?viewMode=story&id=screens-${routeName.toLocaleLowerCase()}`
  window.location.href = url

  // window.history.pushState(null, null, url)
  // window.dispatchEvent(new PopStateEvent('popstate'))
}

export const StorybookNavigation = {
  getState() {
    return {
      index: 1
    }
  },
  navigate(routeName) {
    navigate(routeName)
  },
  push(routeName) {
    navigate(routeName)
  },
  replace(routeName) {
    navigate(routeName)
  },
  goBack() {},
  addListener() {}
}
