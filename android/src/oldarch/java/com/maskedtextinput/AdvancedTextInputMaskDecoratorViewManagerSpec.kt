package com.maskedtextinput

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager

abstract class AdvancedTextInputMaskDecoratorViewManagerSpec<T : View> : SimpleViewManager<T>() {
  abstract fun setPrimaryMaskFormat(
    view: T,
    mask: String?,
  )

  abstract fun setCustomNotations(
    view: T,
    customNotation: ReadableArray?,
  )

  abstract fun setDefaultValue(
    view: T,
    defaultValue: String?,
  )

  abstract fun setValue(
    view: T,
    value: String?,
  )

  abstract fun setAffinityCalculationStrategy(
    view: T,
    affinityCalculationStrategy: Int,
  )

  abstract fun setAffinityFormat(
    view: T,
    affinityFormat: ReadableArray?,
  )

  abstract fun setIsRTL(
    view: T,
    isRTL: Boolean = false,
  )

  abstract fun setAutoSkip(
    view: T,
    autoSkip: Boolean = false,
  )

  abstract fun setAutocomplete(
    view: T,
    autocomplete: Boolean = false,
  )

  abstract fun setCustomTransformation(
    view: T,
    customTransformation: ReadableMap? = null,
  )

  abstract fun setAllowSuggestions(
    view: T?,
    value: Boolean,
  )

  abstract fun setAutocompleteOnFocus(
    view: T?,
    value: Boolean,
  )
}
