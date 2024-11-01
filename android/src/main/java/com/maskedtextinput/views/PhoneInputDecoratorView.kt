package com.maskedtextinput.views

import android.content.Context
import android.view.View
import android.view.ViewGroup
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.views.textinput.ReactEditText
import com.maskedtextinput.events.ChangeTextEvent
import com.maskedtextinput.events.EventNames
import com.maskedtextinput.listeners.MaskedTextValueListener
import com.maskedtextinput.listeners.ReactPhoneInputListener
import com.redmadrobot.inputmask.PhoneInputListener
import com.redmadrobot.inputmask.helper.AffinityCalculationStrategy
import com.redmadrobot.inputmask.model.Country

class PhoneInputDecoratorView(
  context: Context,
) : View(context) {
  private var textField: ReactEditText? = null
  private var affinityCalculationStrategy = AffinityCalculationStrategy.WHOLE_STRING
  private var autoSkip = false
  private var autocomplete = true
  private var isRtl = false
  private var phoneInputListener: PhoneInputListener? = null

  private val valueListener =
    MaskedTextValueListener { _, extracted, formatted, tailPlaceholder ->
      val surfaceId = UIManagerHelper.getSurfaceId(context as ReactContext)
      UIManagerHelper.getEventDispatcherForReactTag(context, id)?.dispatchEvent(
        ChangeTextEvent(surfaceId, id,  EventNames.PHONE_CHANGE_TEXT_EVENT, extracted, formatted, tailPlaceholder),
      )
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
        phoneInputListener =
          ReactPhoneInputListener.installOn(
            field = it,
            valueListener = valueListener,
            autoSkip = autoSkip,
            autocomplete = autocomplete,
            rightToLeft = isRtl,
            affinityCalculationStrategy = affinityCalculationStrategy,
          )
      }
    }
  }

  fun setAffinityCalculationStrategy(strategy: AffinityCalculationStrategy) {
    affinityCalculationStrategy = strategy
    phoneInputListener?.affinityCalculationStrategy = strategy
  }

  fun setAutoSkip(value: Boolean) {
    autoSkip = value
    phoneInputListener?.autoskip = value
  }

  fun setAutoComplete(value: Boolean) {
    autocomplete = value
    phoneInputListener?.autocomplete = value
  }

  fun setIsRtl(rtl: Boolean) {
    isRtl = rtl
    phoneInputListener?.rightToLeft = rtl
  }

  fun setDefaultValue(defaultValue: String?) {
    defaultValue?.let { phoneInputListener?.setText(it, true) }
  }

  fun setValue(value: String?) {
    if (textField?.text.toString() != value) {
      value?.let { phoneInputListener?.setText(it) }
    }
  }

  fun setDisableCountries(disableCountries: List<String>?) {
    phoneInputListener?.disableCountries = disableCountries
  }

  fun setEnabledCountries(enableCountries: List<String>?) {
    phoneInputListener?.enableCountries = enableCountries
  }

  fun setCustomCountries(customCountries: List<Country>?) {
    val countries = customCountries ?: Country.all

    phoneInputListener?.customCountries = countries
  }
}
