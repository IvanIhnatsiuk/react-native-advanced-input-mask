package com.maskedtextinput.listeners

import android.content.Context
import android.text.Editable
import android.view.View
import android.view.inputmethod.InputMethodManager
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
    if (prevText == field.text.toString()) return

    val newText = allowedKeys?.run { text.filter { it in this } } ?: text
    if (!isValidText(text.toString())) {
      this.cursorPosition = cursorPosition
      return
    }

    super.onTextChanged(newText, cursorPosition, before, count)
  }

  override fun afterTextChanged(edit: Editable?) {
    if (prevText == field.text.toString()) return

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
    if (hasFocus) {
      requestShowSoftInput()
    }
  }

  // ReactEditText's programmatic focus (autoFocus/ref.focus()) requests the IME synchronously
  // right after requestFocus, but with the mask listeners installed that request is dropped
  // before the IME session starts, so the keyboard never appears (a tap still works via the
  // framework's touch handler). Re-request on the next frame. No-op when the keyboard is
  // already visible (e.g. focus by tap).
  fun requestShowSoftInput() {
    if (!field.isInTouchMode || !field.showSoftInputOnFocus) return
    field.post {
      if (field.hasFocus()) {
        val imm = field.context.getSystemService(Context.INPUT_METHOD_SERVICE) as? InputMethodManager
        imm?.showSoftInput(field, 0)
      }
    }
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

      // autoFocus fires before this listener is installed (the EditText attaches to the
      // window before the decorator does), so onFocusChange never sees the mount-time
      // focus - re-request the IME here when the field is already focused.
      if (field.hasFocus()) {
        listener.requestShowSoftInput()
      }

      return listener
    }
  }
}
