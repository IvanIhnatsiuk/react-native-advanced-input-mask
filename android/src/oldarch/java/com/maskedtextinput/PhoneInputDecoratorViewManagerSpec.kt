package com.maskedtextinput

import android.view.View
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.uimanager.SimpleViewManager

abstract class PhoneInputDecoratorViewManagerSpec<T : View> : SimpleViewManager<T>() {
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

  abstract fun setAllowSuggestions(
    view: T?,
    value: Boolean,
  )

  abstract fun setAutocompleteOnFocus(
    view: T?,
    value: Boolean,
  )

  abstract fun setCustomCountries(
    view: T,
    customCountries: ReadableArray?,
  )

  abstract fun setDisableCountries(
    view: T,
    disableCountries: ReadableArray?,
  )

  abstract fun setEnableCountries(
    view: T,
    enableCountries: ReadableArray?,
  )
}
