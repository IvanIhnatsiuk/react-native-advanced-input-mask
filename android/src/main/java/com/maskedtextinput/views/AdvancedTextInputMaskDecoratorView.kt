package com.maskedtextinput.views

import android.content.Context
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.util.ReactFindViewUtil
import com.facebook.react.views.text.ReactTextView
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
  private var isInitialMount = true
  private var tailPlaceholderView: ReactTextView? = null
  private var tailPlaceholderNativeID: String? = null
  private var tailPlaceholderFindViewListener: ReactFindViewUtil.OnViewFoundListener? = null

  private fun getOrFindTailPlaceHolderView(): ReactTextView? {
    return if(tailPlaceholderView != null) {
      tailPlaceholderView
    } else {
      findAndSetTailPlaceholder(this.tailPlaceholderNativeID)
    }
  }

  private val valueListener =
    MaskedTextValueListener { _, extracted, formatted, tailPlaceholder ->
      val surfaceId = UIManagerHelper.getSurfaceId(context as ReactContext)
      val tailPlaceholderPossibleView = getOrFindTailPlaceHolderView()

      val editText = textField
      val layout = textField?.layout

      if(tailPlaceholderPossibleView != null && editText != null && layout != null) {
        tailPlaceholderPossibleView.text =
          if (formatted.isEmpty()) "" else tailPlaceholder

        val editTextHeight = editText.height
        val textHeight = layout.height
        val gravity = editText.gravity and Gravity.VERTICAL_GRAVITY_MASK

        val topPosition =
          when (gravity) {
            Gravity.CENTER_VERTICAL -> editText.top + (editTextHeight - textHeight) / 2 + layout.getLineTop(0)
            Gravity.BOTTOM -> editTextHeight - textHeight
            // Default to Gravity.TOP or other cases
            else -> editText.paddingTop * 2
          }
        val leftPosition = textField?.let { it.paint.measureText(formatted) + layout.getPrimaryHorizontal(0) + it.paddingStart + it.left }



        tailPlaceholderPossibleView.left = leftPosition?.toInt() ?: 0
        tailPlaceholderPossibleView.top = topPosition
      }
      UIManagerHelper.getEventDispatcherForReactTag(context, id)?.dispatchEvent(
        ChangeTextEvent(surfaceId, id, extracted, formatted, tailPlaceholder),
      )
    }

  private fun maybeUpdateText() {
    val text = textField?.text.toString()
    if(!text.isNullOrEmpty()) {
      maskedTextChangeListener?.setText(text)
    }
  }

  private fun applyDefaultValue() {
    defaultValue?.let { maskedTextChangeListener?.setText(it, false) }
  }

  private fun findAndSetTailPlaceholder(tailPlaceholderNativeID: String?): ReactTextView? {
    if(tailPlaceholderNativeID != null && this.parent != null) {
      tailPlaceholderView = ReactFindViewUtil.findView(this.parent as View, tailPlaceholderNativeID) as ReactTextView?
    }

    return tailPlaceholderView
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()

    val listener = tailPlaceholderFindViewListener

    if(listener != null) {
      ReactFindViewUtil.removeViewListener(listener)
    }
  }

  override fun onAttachedToWindow() {
    super.onAttachedToWindow()

    val tailPlaceholderTag = tailPlaceholderNativeID;
    if(tailPlaceholderTag != null) {
      val findViewListener = object : ReactFindViewUtil.OnViewFoundListener {
        override fun getNativeId(): String = tailPlaceholderTag

        override fun onViewFound(view: View) {
          tailPlaceholderView = view as ReactTextView
        }
      }

      ReactFindViewUtil.addViewListener(findViewListener)
    }

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
            allowedKeys = allowedKeys,
          )

        if (isInitialMount) {
          applyDefaultValue()
          isInitialMount = false
        }
        findAndSetTailPlaceholder(tailPlaceholderNativeID)
      }
    }
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    textField?.removeTextChangedListener(maskedTextChangeListener)
    textField = null
    maskedTextChangeListener = null
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
    this.defaultValue = defaultValue
    applyDefaultValue()
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
    this.allowedKeys = allowedKeys
    maskedTextChangeListener?.allowedKeys = allowedKeys
    maybeUpdateText()
  }

  fun setTailPlaceholderNativeID(tailPlaceholderNativeID: String?) {
    this.tailPlaceholderNativeID = tailPlaceholderNativeID
    findAndSetTailPlaceholder(tailPlaceholderNativeID)
  }
}
