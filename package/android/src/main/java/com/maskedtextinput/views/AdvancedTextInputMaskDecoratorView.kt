package com.maskedtextinput.views

import android.content.Context
import android.view.View
import android.view.ViewGroup
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.views.textinput.ReactEditText
import com.maskedtextinput.events.ChangeTextEvent
import com.maskedtextinput.listeners.MaskedTextValueListener
import com.maskedtextinput.listeners.ReactMaskedTextChangeListener
import com.maskedtextinput.transformation.CustomTransformationMethod
import com.redmadrobot.inputmask.helper.AffinityCalculationStrategy
import com.redmadrobot.inputmask.model.Notation

class AdvancedTextInputMaskDecoratorView(
  context: Context,
) : View(context) {
  private var textField: ReactEditText? = null
  private var maskFormat: String = ""
  private var affinityCalculationStrategy = AffinityCalculationStrategy.WHOLE_STRING
  private var affineFormats = emptyList<String>()
  private var customNotations = emptyList<Notation>()
  private var autoSkip = false
  private var autocomplete = true
  private var isRtl = false
  private var customTransformationMethod: CustomTransformationMethod? = null
  private var maskedTextChangeListener: ReactMaskedTextChangeListener? = null
  private var allowedKeys: String? = null
  private var defaultValue: String? = null
  private var value: String? = null
  private var isInitialMount = true
  private var autocompleteOnFocus = false
  private var validationRegex: Regex? = null

  private val valueListener =
    MaskedTextValueListener { complete, extracted, formatted, tailPlaceholder ->
      val surfaceId = UIManagerHelper.getSurfaceId(context as ReactContext)
      UIManagerHelper.getEventDispatcherForReactTag(context, id)?.dispatchEvent(
        ChangeTextEvent(surfaceId, id, extracted, formatted, tailPlaceholder, complete),
      )
    }

  private fun maybeUpdateText() {
    maskedTextChangeListener?.setText(textField?.text.toString())
  }

  private fun applyDefaultValue() {
    val nextDefaultValue = value ?: defaultValue
    nextDefaultValue?.let { maskedTextChangeListener?.setText(it, false) }
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()

    var previousSibling: View? = null
    val parent = this.parent
    if (parent is ViewGroup) {
      for (i in 1 until parent.childCount) {
        if (parent.getChildAt(i) == this) {
          previousSibling = parent.getChildAt(i - 1)
          break
        }
      }
    }

    if (previousSibling is ReactEditText) {
      textField = previousSibling
      textField?.let {
        if (customTransformationMethod != null) {
          it.transformationMethod = customTransformationMethod
        }
        maskedTextChangeListener =
          ReactMaskedTextChangeListener.installOn(
            field = it,
            customNotations = customNotations,
            primaryFormat = maskFormat,
            valueListener = valueListener,
            autoSkip = autoSkip,
            autocomplete = false,
            rightToLeft = isRtl,
            affineFormats = affineFormats,
            affinityCalculationStrategy = affinityCalculationStrategy,
            allowedKeys = allowedKeys,
            autocompleteOnFocus = autocompleteOnFocus,
            validationRegex = validationRegex,
          )

        if (isInitialMount) {
          applyDefaultValue()
          maskedTextChangeListener?.autocomplete = autocomplete
          isInitialMount = false
        }
      }
    }
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    maskedTextChangeListener?.let {
      textField?.removeTextChangedListener(it)
    }
    textField = null
    maskedTextChangeListener = null
  }

  fun setMask(format: String) {
    if (maskFormat == format) return
    maskFormat = format
    maskedTextChangeListener?.primaryFormat = format
    maybeUpdateText()
  }

  fun setAffinityFormat(affinityFormat: List<String>) {
    if (affineFormats == affinityFormat) return
    affineFormats = affinityFormat
    maskedTextChangeListener?.affineFormats = affinityFormat
  }

  fun setAffinityCalculationStrategy(strategy: AffinityCalculationStrategy) {
    if (affinityCalculationStrategy == strategy) return
    affinityCalculationStrategy = strategy
    maskedTextChangeListener?.affinityCalculationStrategy = strategy
  }

  fun setCustomNotations(notations: List<Notation>) {
    if (customNotations == notations) return
    customNotations = notations
    maskedTextChangeListener?.customNotations = notations
  }

  fun setAutoSkip(value: Boolean) {
    if (autoSkip == value) return
    autoSkip = value
    maskedTextChangeListener?.autoskip = value
  }

  fun setAutoComplete(value: Boolean) {
    if (autocomplete == value) return
    autocomplete = value
    maskedTextChangeListener?.autocomplete = value
  }

  fun setAutocompleteOnFocus(value: Boolean) {
    if (autocompleteOnFocus == value) return
    autocompleteOnFocus = value
    maskedTextChangeListener?.autocompleteOnFocus = value
  }

  fun setIsRtl(rtl: Boolean) {
    if (isRtl == rtl) return
    isRtl = rtl
    maskedTextChangeListener?.rightToLeft = rtl
  }

  fun setDefaultValue(defaultValue: String?) {
    if (this.defaultValue == defaultValue) return
    this.defaultValue = defaultValue
    applyDefaultValue()
  }

  fun setValue(value: String?) {
    this.value = value
    if (textField?.text.toString() != value) {
      value?.let { maskedTextChangeListener?.setText(it, false) }
    }
  }

  fun setCustomTransformationMethod(transformationMethod: ReadableMap?) {
    val transformationChar = transformationMethod?.getString("transformationChar")?.first()
    val transformationString = transformationMethod?.getString("transformationString")
    customTransformationMethod =
      if (transformationChar != null && transformationString != null) {
        CustomTransformationMethod(transformationString, transformationChar)
      } else {
        null
      }

    textField?.transformationMethod = customTransformationMethod
  }

  fun setValidationRegex(validationRegex: String?) {
    if (this.validationRegex.toString() == validationRegex) return
    val regex =
      validationRegex?.let {
        Regex(it)
      }
    this.validationRegex = regex
    maskedTextChangeListener?.validationRegex = regex
  }

  fun setAllowedKeys(allowedKeys: String?) {
    if (this.allowedKeys == allowedKeys) return
    this.allowedKeys = allowedKeys
    maskedTextChangeListener?.allowedKeys = allowedKeys
    maybeUpdateText()
  }

  fun setText(
    text: String,
    autocomplete: Boolean = false,
  ) {
    maskedTextChangeListener?.let {
      val prevAutocomplete = it.autocomplete
      it.autocomplete = autocomplete
      it.setText(text, autocomplete)
      it.autocomplete = prevAutocomplete
    }
  }
}
