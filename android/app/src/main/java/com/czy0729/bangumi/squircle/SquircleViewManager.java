package com.czy0729.bangumi.squircle;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * 超椭圆裁剪容器 (见 SquircleView)
 *
 * 必须是 ViewGroupManager 而不是 SimpleViewManager:
 * 这是一个能装子视图的容器, RN 在 manageChildren 时会强转成 ViewGroupManager 来 addView/removeView,
 * 用 SimpleViewManager 会在挂载子视图时抛 ClassCastException 直接崩溃
 */
public class SquircleViewManager extends ViewGroupManager<SquircleView> {

    /** JS 端 requireNativeComponent 用的名字 */
    public static final String REACT_CLASS = "BangumiSquircle";

    @NonNull
    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @NonNull
    @Override
    protected SquircleView createViewInstance(@NonNull ThemedReactContext reactContext) {
        return new SquircleView(reactContext);
    }

    /** 圆角大小 (dp, JS 端已按卡片尺寸算好) */
    @ReactProp(name = "radius", defaultFloat = 0f)
    public void setRadius(SquircleView view, float radius) {
        view.setCornerRadius(radius);
    }

    /** 圆润度 (JS 端 getRoundness 的结果, 缺省与 utils.DEFAULT_ROUNDNESS 一致) */
    @ReactProp(name = "roundness", defaultFloat = 0.176f)
    public void setRoundness(SquircleView view, float roundness) {
        view.setRoundness(roundness);
    }
}
