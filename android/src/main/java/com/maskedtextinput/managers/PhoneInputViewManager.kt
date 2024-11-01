package com.maskedtextinput.managers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.common.MapBuilder
import com.facebook.react.common.MapBuilder.newHashMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.maskedtextinput.PhoneInputDecoratorViewManagerSpec
import com.maskedtextinput.events.EventNames
import com.maskedtextinput.mappers.AffinityCalculationStrategyMapper
import com.maskedtextinput.mappers.CountryMapper
import com.maskedtextinput.views.PhoneInputDecoratorView

class PhoneInputViewManager(
  private val callerContext: ReactApplicationContext,
) : PhoneInputDecoratorViewManagerSpec<PhoneInputDecoratorView>() {
  override fun getName() = NAME

  override fun setCustomCountries(
    view: PhoneInputDecoratorView,
    customCountries: ReadableArray?,
  ) {
    if (customCountries != null) {
      view.setCustomCountries(CountryMapper.fromReadableArray(customCountries))
    } else {
      view.setCustomCountries(null)
    }
  }

  override fun setDisableCountries(
    view: PhoneInputDecoratorView,
    disableCountries: ReadableArray?,
  ) {
    val disabledCountries: List<String>?
    if (disableCountries != null) {
      val list = mutableListOf<String>()

      for (i in 0 until disableCountries.size()) {
        val string = disableCountries.getString(i)

        list.add(string)
      }
      disabledCountries = list
    } else {
      disabledCountries = null
    }

    view.setDisableCountries(disabledCountries)
  }

  override fun setEnableCountries(
    view: PhoneInputDecoratorView,
    enableCountries: ReadableArray?,
  ) {
    val enabledCountries: List<String>?
    if (enableCountries != null) {
      val list = mutableListOf<String>()

      for (i in 0 until enableCountries.size()) {
        val string = enableCountries.getString(i)

        list.add(string)
      }
      enabledCountries = list
    } else {
      enabledCountries = null
    }

    view.setEnabledCountries(enabledCountries)
  }

  override fun createViewInstance(context: ThemedReactContext) = PhoneInputDecoratorView(context)

  @ReactProp(name = "defaultValue")
  override fun setDefaultValue(
    view: PhoneInputDecoratorView,
    defaultValue: String?,
  ) {
    view.setDefaultValue(defaultValue)
  }

  @ReactProp(name = "value")
  override fun setValue(
    view: PhoneInputDecoratorView,
    value: String?,
  ) {
    view.setValue(value)
  }

  @ReactProp(name = "affinityCalculationStrategy")
  override fun setAffinityCalculationStrategy(
    view: PhoneInputDecoratorView,
    affinityCalculationStrategy: Int,
  ) {
    view.setAffinityCalculationStrategy(AffinityCalculationStrategyMapper.fromInt(affinityCalculationStrategy))
  }

  @ReactProp(name = "isRTL")
  override fun setIsRTL(
    view: PhoneInputDecoratorView,
    isRTL: Boolean,
  ) {
    view.setIsRtl(isRTL)
  }

  @ReactProp(name = "autoSkip")
  override fun setAutoSkip(
    view: PhoneInputDecoratorView,
    autoSkip: Boolean,
  ) {
    view.setAutoSkip(autoSkip)
  }

  @ReactProp(name = "autocomplete")
  override fun setAutocomplete(
    view: PhoneInputDecoratorView,
    autocomplete: Boolean,
  ) {
    view.setAutoComplete(autocomplete)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    val export = super.getExportedCustomDirectEventTypeConstants() ?: newHashMap()

    export[EventNames.PHONE_CHANGE_TEXT_EVENT] = MapBuilder.of("registrationName", "onPhoneInputMaskChangeText")

    return export
  }

  override fun setAllowSuggestions(
    view: PhoneInputDecoratorView?,
    value: Boolean,
  ) {
  }

  override fun setAutocompleteOnFocus(
    view: PhoneInputDecoratorView?,
    value: Boolean,
  ) {
  }

  companion object {
    const val NAME = "PhoneInputMaskDecoratorView"
  }
}
