package com.maskedtextinput.listeners

import android.text.Editable
import android.view.View
import com.facebook.react.views.textinput.ReactEditText
import com.redmadrobot.inputmask.MaskedTextChangedListener
import com.redmadrobot.inputmask.helper.AffinityCalculationStrategy
import com.redmadrobot.inputmask.model.Notation

class ReactMaskedTextChangeListener(
  primaryFormat: String,
  affineFormats: List<String>,
  customNotations: List<Notation>,
  affinityCalculationStrategy: AffinityCalculationStrategy,
  autocomplete: Boolean,
  autoSkip: Boolean,
  val field: ReactEditText,
  rightToLeft: Boolean,
  valueListener: MaskedTextValueListener,
  var allowedKeys: String?,
  private val focusChangeListener: View.OnFocusChangeListener,
  var validationRegex: String?,
) : MaskedTextChangedListener(
    primaryFormat = primaryFormat,
    affineFormats = affineFormats,
    customNotations = customNotations,
    affinityCalculationStrategy = affinityCalculationStrategy,
    autocomplete = autocomplete,
    autoskip = autoSkip,
    field = field,
    rightToLeft = rightToLeft,
    valueListener = valueListener,
  ) {
  private var cursorPosition = 0
  private var prevText = ""

  override fun onTextChanged(
    text: CharSequence,
    cursorPosition: Int,
    before: Int,
    count: Int,
  ) {
    val newText = allowedKeys?.run { text.filter { it in this } } ?: text
    if (!isValidText(text.toString())) {
      this.cursorPosition = cursorPosition
      return
    }

    super.onTextChanged(newText, cursorPosition, before, count)
  }

  override fun afterTextChanged(edit: Editable?) {
    val stringText = edit.toString()
    if (!isValidText(stringText)) {
      field.setText(prevText)
      field.setSelection(cursorPosition)
      return
    }

    prevText = stringText
    super.afterTextChanged(edit)
  }

  private fun isValidText(text: String): Boolean {
    val validationRegex = this.validationRegex

    return if (validationRegex == null) {
      true
    } else {
      Regex(validationRegex).matches(text)
    }
  }

  override fun onFocusChange(
    view: View?,
    hasFocus: Boolean,
  ) {
    super.onFocusChange(view, hasFocus)
    focusChangeListener.onFocusChange(view, hasFocus)
  }

  companion object {
    fun installOn(
      primaryFormat: String,
      affineFormats: List<String> = emptyList(),
      customNotations: List<Notation> = emptyList(),
      affinityCalculationStrategy: AffinityCalculationStrategy = AffinityCalculationStrategy.WHOLE_STRING,
      autocomplete: Boolean = true,
      autoSkip: Boolean = false,
      field: ReactEditText,
      rightToLeft: Boolean = false,
      valueListener: MaskedTextValueListener,
      allowedKeys: String?,
      validationRegex: String?,
    ): ReactMaskedTextChangeListener {
      val listener =
        ReactMaskedTextChangeListener(
          primaryFormat = primaryFormat,
          affineFormats = affineFormats,
          customNotations = customNotations,
          affinityCalculationStrategy = affinityCalculationStrategy,
          autocomplete = autocomplete,
          autoSkip = autoSkip,
          field = field,
          rightToLeft = rightToLeft,
          focusChangeListener = field.onFocusChangeListener,
          valueListener = valueListener,
          allowedKeys = allowedKeys,
          validationRegex = validationRegex,
        )
      field.addTextChangedListener(listener)
      field.onFocusChangeListener = listener

      return listener
    }
  }
}
