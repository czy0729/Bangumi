package com.czy0729.bangumi.blur;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * 模糊层 (见 BangumiBlurView)
 *
 * 用 ViewGroupManager: 现库的用法是 BlurView 内再放一个定尺寸的子 View, 需要能装子视图
 */
public class BangumiBlurViewManager extends ViewGroupManager<BangumiBlurView> {

  /** JS 端 requireNativeComponent 用的名字 */
  public static final String REACT_CLASS = "BangumiBlurView";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected BangumiBlurView createViewInstance(@NonNull ThemedReactContext reactContext) {
    return new BangumiBlurView(reactContext);
  }

  /** 关联的根节点名称 */
  @ReactProp(name = "blurNode")
  public void setBlurNode(BangumiBlurView view, String blurNode) {
    view.setBlurNode(blurNode);
  }

  /** 模糊半径 (0~25) */
  @ReactProp(name = "radius", defaultFloat = 10f)
  public void setRadius(BangumiBlurView view, float radius) {
    view.setRadius(radius);
  }

  /** 叠加色 (ARGB int), 用于代替 tint */
  @ReactProp(name = "overlayColor", defaultInt = 0)
  public void setOverlayColor(BangumiBlurView view, int overlayColor) {
    view.setOverlayColor(overlayColor);
  }
}
