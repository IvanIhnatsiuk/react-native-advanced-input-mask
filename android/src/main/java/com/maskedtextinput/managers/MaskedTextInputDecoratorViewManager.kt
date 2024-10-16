package com.maskedtextinput.managers

import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.common.MapBuilder.newHashMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.maskedtextinput.events.EventNames
import com.maskedtextinput.mappers.AffinityCalculationStrategyMapper
import com.maskedtextinput.mappers.NotationMapper
import com.maskedtextinput.views.MaskedTextInputDecoratorView

class MaskedTextInputDecoratorViewManager(
  private val callerContext: ReactApplicationContext,
) : SimpleViewManager<View>() {
  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext) = MaskedTextInputDecoratorView(context)

  @ReactProp(name = "primaryMaskFormat")
  fun setMask(
    view: MaskedTextInputDecoratorView,
    mask: String,
  ) {
    view.setMask(mask)
  }

  @ReactProp(name = "customNotations")
  fun setCustomNotations(
    view: MaskedTextInputDecoratorView,
    customNotation: ReadableArray?,
  ) {
    val notationsList = customNotation?.let { NotationMapper().fromReadableArray(it) }
    if (notationsList != null) {
      view.setCustomNotations(notationsList)
    }
  }

  @ReactProp(name = "defaultValue")
  fun setDefaultValue(
    view: MaskedTextInputDecoratorView,
    defaultValue: String?,
  ) {
    view.setDefaultValue(defaultValue)
  }

  @ReactProp(name = "value")
  fun setValue(
    view: MaskedTextInputDecoratorView,
    value: String?,
  ) {
    view.setValue(value)
  }

  @ReactProp(name = "affinityCalculationStrategy")
  fun setAffinityCalculationStrategy(
    view: MaskedTextInputDecoratorView,
    affinityCalculationStrategy: Int?,
  ) {
    if (affinityCalculationStrategy != null) {
      view.setAffinityCalculationStrategy(AffinityCalculationStrategyMapper().fromInt(affinityCalculationStrategy))
    }
  }

  @ReactProp(name = "affinityFormat")
  fun setAffinityFormat(
    view: MaskedTextInputDecoratorView,
    affinityFormat: ReadableArray?,
  ) {
    if (affinityFormat != null) {
      val list = mutableListOf<String>()

      for (i in 0 until affinityFormat.size()) {
        val value = affinityFormat.getString(i)
        list.add(value)
      }
      view.setAffinityFormat(list)
    }
  }

  @ReactProp(name = "isRTL")
  fun setRTL(
    view: MaskedTextInputDecoratorView,
    isRTL: Boolean?,
  ) {
    if (isRTL != null) {
      view.setIsRtl(isRTL)
    }
  }

  @ReactProp(name = "autoSkip")
  fun setAutoSkip(
    view: MaskedTextInputDecoratorView,
    autoSkip: Boolean = false,
  ) {
    view.setAutoSkip(autoSkip)
  }

  @ReactProp(name = "autocomplete")
  fun setAutoComplete(
    view: MaskedTextInputDecoratorView,
    autocomplete: Boolean = false,
  ) {
    view.setAutoComplete(autocomplete)
  }

  @ReactProp(name = "customTransformation")
  fun setCustomTransformation(
    view: MaskedTextInputDecoratorView,
    customTransformation: ReadableMap? = null,
  ) {
    view.setCustomTransformationMethod(customTransformation)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    val export = super.getExportedCustomDirectEventTypeConstants() ?: newHashMap()

    export[EventNames.CHANGE_TEXT_EVENT] = MapBuilder.of("registrationName", "onAdvancedMaskTextChange")

    return export
  }

  companion object {
    const val NAME = "MaskedTextInputDecoratorView"
  }
}
