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
import com.redmadrobot.inputmask.MaskedTextChangedListener
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
  private var maskedTextChangeListener: MaskedTextChangedListener? = null
  private var allowedKeys: String? = null

  private val valueListener =
    MaskedTextValueListener { _, extracted, formatted, tailPlaceholder ->
      val surfaceId = UIManagerHelper.getSurfaceId(context as ReactContext)
      UIManagerHelper.getEventDispatcherForReactTag(context, id)?.dispatchEvent(
        ChangeTextEvent(surfaceId, id, extracted, formatted, tailPlaceholder),
      )
    }

  private fun maybeUpdateText() {
    maskedTextChangeListener?.setText(textField?.text.toString())
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
            autocomplete = autocomplete,
            rightToLeft = isRtl,
            affineFormats = affineFormats,
            affinityCalculationStrategy = affinityCalculationStrategy,
            allowedKeys = allowedKeys
          )
      }
    }
  }

  fun setMask(format: String) {
    maskFormat = format
    maskedTextChangeListener?.primaryFormat = format
    maybeUpdateText()
  }

  fun setAffinityFormat(affinityFormat: List<String>) {
    affineFormats = affinityFormat
    maskedTextChangeListener?.affineFormats = affinityFormat
  }

  fun setAffinityCalculationStrategy(strategy: AffinityCalculationStrategy) {
    affinityCalculationStrategy = strategy
    maskedTextChangeListener?.affinityCalculationStrategy = strategy
  }

  fun setCustomNotations(notations: List<Notation>) {
    customNotations = notations
    maskedTextChangeListener?.customNotations = notations
  }

  fun setAutoSkip(value: Boolean) {
    autoSkip = value
    maskedTextChangeListener?.autoskip = value
  }

  fun setAutoComplete(value: Boolean) {
    autocomplete = value
    maskedTextChangeListener?.autocomplete = value
  }

  fun setIsRtl(rtl: Boolean) {
    isRtl = rtl
    maskedTextChangeListener?.rightToLeft = rtl
  }

  fun setDefaultValue(defaultValue: String?) {
    defaultValue?.let { maskedTextChangeListener?.setText(it, true) }
  }

  fun setValue(value: String?) {
    if (textField?.text.toString() != value) {
      value?.let { maskedTextChangeListener?.setText(it) }
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

  fun setAllowedKeys(allowedKeys: String?) {
    // TODO: if change in runtime update the delegate a well
    this.allowedKeys = allowedKeys
  }
}
