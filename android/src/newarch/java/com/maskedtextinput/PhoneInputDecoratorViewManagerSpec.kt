package java.com.maskedtextinput

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PhoneInputMaskDecoratorViewManagerDelegate
import com.facebook.react.viewmanagers.PhoneInputMaskDecoratorViewManagerInterface

abstract class PhoneInputDecoratorViewManagerSpec<T : View> :
  SimpleViewManager<T>(),
  PhoneInputMaskDecoratorViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T> = PhoneInputMaskDecoratorViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<T>? = mDelegate
}
