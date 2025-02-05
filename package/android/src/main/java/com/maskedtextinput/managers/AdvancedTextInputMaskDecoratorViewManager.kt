package com.maskedtextinput.managers

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.common.MapBuilder.newHashMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.maskedtextinput.AdvancedTextInputMaskDecoratorViewManagerSpec
import com.maskedtextinput.events.EventNames
import com.maskedtextinput.mappers.AffinityCalculationStrategyMapper
import com.maskedtextinput.mappers.NotationMapper
import com.maskedtextinput.views.AdvancedTextInputMaskDecoratorView

class AdvancedTextInputMaskDecoratorViewManager(
  private val callerContext: ReactApplicationContext,
) : AdvancedTextInputMaskDecoratorViewManagerSpec<AdvancedTextInputMaskDecoratorView>() {
  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext) = AdvancedTextInputMaskDecoratorView(context)

  @ReactProp(name = "primaryMaskFormat")
  override fun setPrimaryMaskFormat(
    view: AdvancedTextInputMaskDecoratorView,
    value: String?,
  ) {
    if (value != null) {
      view.setMask(value)
    }
  }

  @ReactProp(name = "customNotations")
  override fun setCustomNotations(
    view: AdvancedTextInputMaskDecoratorView,
    customNotation: ReadableArray?,
  ) {
    val notationsList = customNotation?.let { NotationMapper().fromReadableArray(it) }
    if (notationsList != null) {
      view.setCustomNotations(notationsList)
    }
  }

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

  @ReactProp(name = "affinityFormat")
  override fun setAffinityFormat(
    view: AdvancedTextInputMaskDecoratorView,
    affinityFormat: ReadableArray?,
  ) {
    if (affinityFormat != null) {
      val list = mutableListOf<String>()

      for (i in 0 until affinityFormat.size()) {
        val value = affinityFormat.getString(i)
        list.add(value as String)
      }
      view.setAffinityFormat(list)
    }
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

  @ReactProp(name = "customTransformation")
  override fun setCustomTransformation(
    view: AdvancedTextInputMaskDecoratorView,
    customTransformation: ReadableMap?,
  ) {
    view.setCustomTransformationMethod(customTransformation)
  }

  @ReactProp(name = "allowedKeys")
  override fun setAllowedKeys(
    view: AdvancedTextInputMaskDecoratorView,
    allowedKeys: String?,
  ) {
    view.setAllowedKeys(allowedKeys)
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

  override fun setValidationRegex(
    view: AdvancedTextInputMaskDecoratorView,
    validationRegex: String?,
  ) {
    view.setValidationRegex(validationRegex)
  }

  companion object {
    const val NAME = "AdvancedTextInputMaskDecoratorView"
  }
}
