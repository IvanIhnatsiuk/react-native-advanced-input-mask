package com.maskedtextinput

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.AdvancedTextInputMaskDecoratorViewManagerDelegate
import com.facebook.react.viewmanagers.AdvancedTextInputMaskDecoratorViewManagerInterface

abstract class AdvancedTextInputMaskDecoratorViewManagerSpec<T : View> :
  SimpleViewManager<T>(),
  AdvancedTextInputMaskDecoratorViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T> = AdvancedTextInputMaskDecoratorViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<T>? = mDelegate
}
