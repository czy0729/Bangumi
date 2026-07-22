export function shouldUseNativeTabs(isStandalone: boolean, tabCount: number) {
  return isStandalone && tabCount <= 5
}
