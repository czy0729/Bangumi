package com.czy0729.bangumi.squircle;

import android.content.Context;
import android.graphics.Outline;
import android.graphics.Path;
import android.view.View;
import android.view.ViewOutlineProvider;

import com.facebook.react.views.view.ReactViewGroup;

/**
 * 超椭圆 (仿 iOS 平滑圆角) 裁剪容器
 *
 * 用系统级的 outline 裁剪实现: setClipToOutline(true) + ViewOutlineProvider 提供"凸路径"。
 * 加速画布只支持"单个非矩形裁剪、且必须是凸路径", 超椭圆正好满足, 于是:
 *  - 裁剪由渲染层完成, 没有离屏位图, 也没有 MaskedView 每帧 saveLayer 的开销
 *  - 不占用 MaskedView, 卡片内部 (封面底部的氛围色场) 可以照常用自己的遮罩做羽化
 *
 * 曲线参数 (圆角大小 + 圆润度) 由 JS 端计算后传入, 与 iOS 分支共用同一份定义, 保证三端形状一致:
 * 见 components/squircle/utils.ts 的 getRadius / getRoundness
 */
public class SquircleView extends ReactViewGroup {

    /**
     * 圆润度缺省值, 与 JS 端 utils.ts 的 DEFAULT_ROUNDNESS (0.176) 一致
     *  - JS 每次都会显式传值 (utils.getRoundness), 这里只是兜底
     *  - 注意别与 0.1765 混了: 那个是 iOS_PREST.r1 / iOS_PREST.r2, 是 iOS 遮罩路径用的比例,
     *    两者数值相近但来源不同
     * */
    private static final float DEFAULT_ROUNDNESS = 0.176f;

    private final Path outlinePath = new Path();

    /** 屏幕密度: JS 传进来的是 dp, 而 getWidth / Outline 用的都是像素 */
    private final float density;

    private float cornerRadius = 0f;

    /** 圆润度: 越大曲线越方, 越小越接近圆弧 */
    private float roundness = DEFAULT_ROUNDNESS;

    public SquircleView(Context context) {
        super(context);

        density = context.getResources().getDisplayMetrics().density;

        setClipToOutline(true);
        setOutlineProvider(new ViewOutlineProvider() {
            @Override
            public void getOutline(View view, Outline outline) {
                buildOutline(view, outline);
            }
        });
    }

    /** 圆角大小 (JS 端已按卡片尺寸算好, 与 iOS 分支是同一个值) */
    public void setCornerRadius(float radius) {
        if (cornerRadius == radius) return;

        cornerRadius = radius;
        invalidateOutline();
    }

    /** 圆润度 (JS 端 getRoundness 的结果) */
    public void setRoundness(float value) {
        if (roundness == value) return;

        roundness = value;
        invalidateOutline();
    }

    @Override
    protected void onSizeChanged(int w, int h, int oldw, int oldh) {
        super.onSizeChanged(w, h, oldw, oldh);

        invalidateOutline();
    }

    private void buildOutline(View view, Outline outline) {
        final float width = view.getWidth();
        final float height = view.getHeight();

        if (cornerRadius <= 0 || width <= 0 || height <= 0) {
            outline.setRect(0, 0, (int) width, (int) height);
            return;
        }

        // dp → 像素, 否则圆角会被缩小 density 倍 (看起来完全没有苹果圆角那种饱满感)
        final float maxRadius = Math.min(width, height) / 2f;
        final float radius = Math.min(cornerRadius * density, maxRadius);

        // 与 JS 端 getSquirclePath 一致: r1 是控制点偏移, r2 是圆角半径
        final float r2 = radius;
        final float r1 = Math.min(radius * roundness, r2);

        outlinePath.reset();
        outlinePath.moveTo(0f, r2);
        outlinePath.cubicTo(0f, r1, r1, 0f, r2, 0f);
        outlinePath.lineTo(width - r2, 0f);
        outlinePath.cubicTo(width - r1, 0f, width, r1, width, r2);
        outlinePath.lineTo(width, height - r2);
        outlinePath.cubicTo(width, height - r1, width - r1, height, width - r2, height);
        outlinePath.lineTo(r2, height);
        outlinePath.cubicTo(r1, height, 0f, height - r1, 0f, height - r2);
        outlinePath.close();

        outline.setConvexPath(outlinePath);
    }
}
