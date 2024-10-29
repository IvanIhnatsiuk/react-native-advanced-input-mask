package com.maskedtextinput.managers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.common.MapBuilder
import com.facebook.react.common.MapBuilder.newHashMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.maskedtextinput.events.EventNames
import com.maskedtextinput.mappers.AffinityCalculationStrategyMapper
import com.maskedtextinput.views.AdvancedTextInputMaskDecoratorView
import com.maskedtextinput.views.PhoneInputDecoratorView
import java.com.maskedtextinput.PhoneInputDecoratorViewManagerSpec

class PhoneInputViewManager(
  private val callerContext: ReactApplicationContext,
) : PhoneInputDecoratorViewManagerSpec<PhoneInputDecoratorView>(){
  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext) = PhoneInputDecoratorView(context)

  @ReactProp(name = "defaultValue")
  override fun setDefaultValue(
    view: AdvancedTextInputMaskDecoratorView,
    defaultValue: String?,
  ) {
    view.setDefaultValue(defaultValue)
  }

  @ReactProp(name = "value")
  override fun setValue(
    view: AdvancedTextInputMaskDecoratorView,
    value: String?,
  ) {
    view.setValue(value)
  }

  @ReactProp(name = "affinityCalculationStrategy")
  override fun setAffinityCalculationStrategy(
    view: AdvancedTextInputMaskDecoratorView,
    affinityCalculationStrategy: Int,
  ) {
    view.setAffinityCalculationStrategy(AffinityCalculationStrategyMapper().fromInt(affinityCalculationStrategy))
  }

  @ReactProp(name = "isRTL")
  override fun setIsRTL(
    view: AdvancedTextInputMaskDecoratorView,
    isRTL: Boolean,
  ) {
    view.setIsRtl(isRTL)
  }

  @ReactProp(name = "autoSkip")
  override fun setAutoSkip(
    view: AdvancedTextInputMaskDecoratorView,
    autoSkip: Boolean,
  ) {
    view.setAutoSkip(autoSkip)
  }

  @ReactProp(name = "autocomplete")
  override fun setAutocomplete(
    view: AdvancedTextInputMaskDecoratorView,
    autocomplete: Boolean,
  ) {
    view.setAutoComplete(autocomplete)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    val export = super.getExportedCustomDirectEventTypeConstants() ?: newHashMap()

    export[EventNames.CHANGE_TEXT_EVENT] = MapBuilder.of("registrationName", "onAdvancedMaskTextChange")

    return export
  }

  override fun setAllowSuggestions(
    view: AdvancedTextInputMaskDecoratorView?,
    value: Boolean,
  ) {
  }

  override fun setAutocompleteOnFocus(
    view: AdvancedTextInputMaskDecoratorView?,
    value: Boolean,
  ) {
  }

  companion object {
    const val NAME = "PhoneInputMaskDecoratorView"
  }
}
