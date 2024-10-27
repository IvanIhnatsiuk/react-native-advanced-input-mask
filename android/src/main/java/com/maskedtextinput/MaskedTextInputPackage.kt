package com.maskedtextinput

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import com.maskedtextinput.managers.AdvancedTextInputMaskDecoratorViewManager

class MaskedTextInputPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> = emptyList()

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
    listOf(AdvancedTextInputMaskDecoratorViewManager(reactContext))
}
