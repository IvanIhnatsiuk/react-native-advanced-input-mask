//
//  FabricAdvanceTextInputMask.swift
//  react-native-advanced-input-mask
//
//  Created by Ivan Ignathuk on 24/10/2024.
//
import ForkInputMask
import Foundation
import UIKit

@objc protocol AdvancedTextInputMaskDecoratorViewDelegate {
  func onAdvancedMaskTextChange(eventData: NSDictionary)
}

@objc(AdvancedTextInputViewDecoratorView)
class AdvancedTextInputMaskDecoratorView: UIView {
  @objc var textView: UITextField?
  @objc var maskInputListener: MaskedTextInputListener?
  @objc var lastDispatchedEvent: [String: String] = [:]

  @objc weak var delegate: AdvancedTextInputMaskDecoratorViewDelegate?

  @objc var textFieldDelegate: UITextFieldDelegate?

  @objc var onAdvancedMaskTextChange: RCTDirectEventBlock?

  @objc var onAdvancedMaskTextChangedCallback: (
    _ extracted: String,
    _ formatted: String,
    _ tailPlaceholder: String
  ) -> Void {
    { [weak self] extracted, formatted, tailPlaceholder in
      guard let self = self else { return }

      let eventData: [String: String] = [
        "extracted": extracted,
        "formatted": formatted,
        "tailPlaceholder": tailPlaceholder,
      ]

      if NSDictionary(dictionary: eventData).isEqual(to: lastDispatchedEvent) {
        return
      }

      lastDispatchedEvent = eventData
      if self.onAdvancedMaskTextChange != nil {
        self.onAdvancedMaskTextChange!(eventData)
      }
      self.delegate?.onAdvancedMaskTextChange(eventData: eventData as NSDictionary)
    }
  }

  @objc var primaryMaskFormat: NSString = "" {
    didSet {
      maskInputListener?.primaryMaskFormat = primaryMaskFormat as String
      maybeUpdateText(text: textView?.allText ?? "")
    }
  }

  @objc var autocomplete: Bool = true {
    didSet {
      maskInputListener?.autocomplete = autocomplete
    }
  }

  @objc var autocompleteOnFocus: Bool = false {
    didSet {
      maskInputListener?.autocompleteOnFocus = autocompleteOnFocus
    }
  }

  @objc var allowSuggestions: Bool = true {
    didSet {
      maskInputListener?.allowSuggestions = allowSuggestions
    }
  }

  @objc var autoSkip: Bool = false {
    didSet {
      maskInputListener?.autoskip = autoSkip
    }
  }

  @objc var isRTL: Bool = false {
    didSet {
      maskInputListener?.rightToLeft = isRTL

      maybeUpdateText(text: textView?.allText ?? "")
    }
  }

  @objc var affinityFormat: [String] = [] {
    didSet {
      maskInputListener?.affineFormats = affinityFormat
    }
  }

  @objc var affinityCalculationStrategy: NSNumber? = 0 {
    didSet {
      maskInputListener?.affinityCalculationStrategy =
        AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy)
    }
  }

  @objc var customNotations: NSArray? {
    didSet {
      let customNotations = (customNotations as? [[String: Any]])?.compactMap { $0.toNotation() } ?? []

      maskInputListener?.customNotations = customNotations
    }
  }

  @objc var defaultValue: NSString = "" {
    didSet {
      updateTextWithoutNotification(text: defaultValue as String)
    }
  }

  @objc var value: NSString = "" {
    didSet {
      updateTextWithoutNotification(text: value as String)
    }
  }

  @objc private func updateTextWithoutNotification(text: String) {
    if text == textView?.allText {
      return
    }

    guard let primaryMask = maskInputListener?.primaryMask else { return }
    let caretString = CaretString(
      string: text,
      caretPosition: text.endIndex,
      caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    let result = primaryMask.apply(toText: caretString)

    textView?.allText = result.formattedText.string
  }

  @objc private func maybeUpdateText(text: String) {
    guard let primaryMask = maskInputListener?.primaryMask else { return }
    guard let textView = textView else { return }

    if text == textView.allText {
      return
    }

    let caretString = CaretString(
      string: text,
      caretPosition: text.endIndex,
      caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    let result = primaryMask.apply(toText: caretString)

    if text == result.formattedText.string {
      return
    }

    textView.allText = result.formattedText.string
    maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: textView, result: result)
  }

  private func findFirstTextField(in view: UIView) -> UITextField? {
    // Loop through each subview
    for subview in view.subviews {
      // If the subview is a UITextField, return it
      if let textField = subview as? UITextField {
        return textField
      }
    }
    // If no UITextField is found, return nil
    return nil
  }

  private func findTextFieldFabric() {
    if let parent = superview?.superview {
      for elementIndex in 1 ..< parent.subviews.count where parent.subviews[elementIndex] == superview {
        textView = findFirstTextField(in: parent.subviews[elementIndex - 1])
        break
      }
    }
  }

  private func findTextFieldPaper() {
    if let parent = superview {
      for elementIndex in 1 ..< parent.subviews.count where parent.subviews[elementIndex] == self {
        textView = findFirstTextField(in: parent.subviews[elementIndex - 1])
        break
      }
    }
  }

  private func finTextField() {
    #if ADVANCE_INPUT_MASK_NEW_ARCH_ENABLED
      findTextFieldFabric()
    #else
      findTextFieldPaper()
    #endif
  }

  @objc override func didMoveToWindow() {
    super.didMoveToWindow()

    finTextField()

    guard let textView = textView else { return }
    maskInputListener = MaskedTextInputListener(
      primaryFormat: primaryMaskFormat as String,
      autocomplete: autocomplete,
      autocompleteOnFocus: autocompleteOnFocus,
      autoskip: autoSkip,
      rightToLeft: isRTL,
      affineFormats: affinityFormat,
      affinityCalculationStrategy: AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy),
      customNotations: (customNotations as? [[String: Any]])?.compactMap { $0.toNotation() } ?? [],
      onMaskedTextChangedCallback: { input, value, _, tailPlaceholder in
        self.onAdvancedMaskTextChangedCallback(value, input.allText, tailPlaceholder)
      },
      allowSuggestions: allowSuggestions
    )

    textFieldDelegate = AdvancedInputMaskDelegateWrapper(textFieldDelegate: textView.delegate)
    maskInputListener?.textFieldDelegate = textFieldDelegate
    textView.delegate = maskInputListener

    updateTextWithoutNotification(text: defaultValue as String)
  }
}

class RCTMaskedTextFieldDelegateAdapter: RCTBackedTextViewDelegateAdapter {}
