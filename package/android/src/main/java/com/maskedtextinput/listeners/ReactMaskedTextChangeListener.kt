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
  var autocompleteOnFocus: Boolean,
  var validationRegex: Regex?,
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

  private fun isValidText(text: String): Boolean = this.validationRegex?.matches(text) ?: true

  override fun onFocusChange(
    view: View?,
    hasFocus: Boolean,
  ) {
    if (autocompleteOnFocus) {
      val prevAutocomplete = this.autocomplete
      this.autocomplete = autocompleteOnFocus
      super.onFocusChange(view, hasFocus)
      this.autocomplete = prevAutocomplete
    }
    focusChangeListener.onFocusChange(view, hasFocus)
  }

  companion object {
    fun installOn(
      primaryFormat: String,
      affineFormats: List<String>,
      customNotations: List<Notation>,
      affinityCalculationStrategy: AffinityCalculationStrategy,
      autocomplete: Boolean,
      autoSkip: Boolean,
      field: ReactEditText,
      rightToLeft: Boolean,
      valueListener: MaskedTextValueListener,
      allowedKeys: String?,
      autocompleteOnFocus: Boolean,
      validationRegex: Regex?,
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
          autocompleteOnFocus = autocompleteOnFocus,
        )
      field.addTextChangedListener(listener)
      field.onFocusChangeListener = listener

      return listener
    }
  }
}
