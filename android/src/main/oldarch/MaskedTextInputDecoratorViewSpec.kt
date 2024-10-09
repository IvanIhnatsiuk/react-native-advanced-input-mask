package com.maskedtextinput

import android.view.View
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager

abstract class MaskedTextInputDecoratorViewManagerSpec<T : View?> : SimpleViewManager<T>() {
  abstract fun setMask(
    view: T,
    value: ReadableMap?,
  )
}
