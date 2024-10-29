package java.com.maskedtextinput

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.PhoneInputDecoratorViewManagerDeleagate
import com.facebook.react.viewmanagers.PhoneInputDecoratorViewManagerInterface

abstract class PhoneInputDecoratorViewManagerSpec<T : View> :
  SimpleViewManager<T>(),
  PhoneInputDecoratorViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T> = PhoneInputDecoratorViewManagerDeleagate(this)

  override fun getDelegate(): ViewManagerDelegate<T>? = mDelegate
}
