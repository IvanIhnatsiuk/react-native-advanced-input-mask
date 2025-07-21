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
  // MARK: - Public Properties

  @objc var onAdvancedMaskTextChange: RCTDirectEventBlock?
  @objc weak var delegate: AdvancedTextInputMaskDecoratorViewDelegate?

  // MARK: - Private Properties

  private var textField: UITextField?
  private var maskInputListener: NotifyingAdvancedTexInputMaskListener?
  private var textFieldDelegate: UITextFieldDelegate?
  private weak var originalTextFieldDelegate: UITextFieldDelegate?

  @objc private var primaryMaskFormat: NSString = "" {
    didSet {
      guard let maskInputListener = maskInputListener else { return }
      maskInputListener.primaryMaskFormat = primaryMaskFormat as String

      guard let textField = textField else { return }
      let nextText = textField.allText

      guard let result = getMaskResultForText(text: nextText) else { return }
      if result.formattedText.string == nextText { return }

      let attributedText = NSAttributedString(string: result.formattedText.string)

      setText(textField: textField, text: attributedText)
    }
  }

  @objc private var autocomplete: Bool = true {
    didSet {
      maskInputListener?.autocomplete = autocomplete
    }
  }

  @objc private var autocompleteOnFocus: Bool = false {
    didSet {
      maskInputListener?.autocompleteOnFocus = autocompleteOnFocus
    }
  }

  @objc private var allowSuggestions: Bool = true {
    didSet {
      maskInputListener?.allowSuggestions = allowSuggestions
    }
  }

  @objc private var autoSkip: Bool = false {
    didSet {
      maskInputListener?.autoskip = autoSkip
    }
  }

  @objc private var isRTL: Bool = false {
    didSet {
      maskInputListener?.rightToLeft = isRTL

      maybeUpdateText(text: textField?.allText ?? "")
    }
  }

  @objc private var affinityFormat: [String] = [] {
    didSet {
      maskInputListener?.affineFormats = affinityFormat
    }
  }

  @objc private var affinityCalculationStrategy: NSNumber? = 0 {
    didSet {
      maskInputListener?.affinityCalculationStrategy =
        AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy)
    }
  }

  @objc private var customNotations: NSArray? {
    didSet {
      let customNotations = (customNotations as? [[String: Any]])?.compactMap { $0.toNotation() } ?? []

      maskInputListener?.customNotations = customNotations
    }
  }

  @objc private var allowedKeys: NSString? {
    didSet {
      let allowedKeys = (allowedKeys ?? "") as String
      maskInputListener?.allowedKeys = allowedKeys
      guard let textField = textField else { return }
      if !allowedKeys.isEmpty {
        let nextText = textField.allText.filter { allowedKeys.contains($0) }
        updateTextWithoutNotification(text: nextText)
      }
    }
  }

  @objc private var defaultValue: NSString = "" {
    didSet {
      updateTextWithoutNotification(text: defaultValue as String)
    }
  }

  @objc private var value: NSString? {
    didSet {
      guard let value = value else { return }
      updateTextWithoutNotification(text: value as String)
    }
  }

  @objc private var validationRegex: NSString? {
    didSet {
      maskInputListener?.validationRegex = getRegExFromString(string: validationRegex as String?)
    }
  }

  // MARK: - Event Handlers

  private func onAdvancedMaskTextChangedCallback(
    extracted: String,
    formatted: String,
    tailPlaceholder: String
  ) {
    let eventData: [String: String] = [
      "extracted": extracted,
      "formatted": formatted,
      "tailPlaceholder": tailPlaceholder,
    ]

    onAdvancedMaskTextChange?(eventData)
    delegate?.onAdvancedMaskTextChange(eventData: eventData as NSDictionary)
  }

  // MARK: - Utility Methods

  private func getRegExFromString(string: String?) -> NSRegularExpression? {
    guard let pattern = string else { return nil }

    return try? NSRegularExpression(pattern: pattern)
  }

  private func setText(textField: UITextField, text: NSAttributedString) {
    #if ADVANCE_INPUT_MASK_NEW_ARCH_ENABLED
      textField.attributedText = text
    #else
      textField.allText = text.string
    #endif
  }

  private func getMaskResultForText(text: String, autocomplete: Bool = false) -> Mask.Result? {
    guard let primaryMask = maskInputListener?.primaryMask else { return nil }
    let caretString = CaretString(
      string: text,
      caretPosition: text.endIndex,
      caretGravity: CaretString.CaretGravity.forward(autocomplete: autocomplete)
    )
    return primaryMask.apply(toText: caretString)
  }

  @objc private func updateTextWithoutNotification(text: String) {
    guard let textField = textField else { return }

    if text == textField.attributedText?.string {
      return
    }

    guard let result = getMaskResultForText(text: text) else { return }

    let attributedText = NSAttributedString(string: result.formattedText.string)

    setText(textField: textField, text: attributedText)
  }

  @objc func maybeUpdateText(text: String, autocomplete _: Bool = false) {
    guard (maskInputListener?.primaryMask) != nil else { return }
    guard let textField = textField else { return }

    if text == textField.attributedText?.string {
      return
    }

    guard let result = getMaskResultForText(text: text) else { return }

    if text == result.formattedText.string {
      return
    }

    let attributedText = NSAttributedString(string: result.formattedText.string)

    setText(textField: textField, text: attributedText)
    maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: textField, result: result)
  }

  private func getInitialText() -> String {
    let value = (value as? String) ?? ""
    return value.isEmpty ? (defaultValue as String) : value
  }

  // MARK: - Configuration Methods

  private func configureTextField() {
    findTextField()
    guard let textField = textField else { return }
    originalTextFieldDelegate = textField.delegate
    textFieldDelegate = AdvancedInputMaskDelegateWrapper(textFieldDelegate: textField.delegate)
    textField.delegate = textFieldDelegate
  }

  private func configureMaskInputListener() {
    guard let textField = textField else { return }

    maskInputListener = NotifyingAdvancedTexInputMaskListener(
      primaryFormat: primaryMaskFormat as String,
      autocomplete: autocomplete,
      autocompleteOnFocus: autocompleteOnFocus,
      autoskip: autoSkip,
      rightToLeft: isRTL,
      affineFormats: affinityFormat,
      affinityCalculationStrategy: AffinityCalculationStrategy.forNumber(number: affinityCalculationStrategy),
      customNotations: (customNotations as? [[String: Any]])?.compactMap { $0.toNotation() } ?? [],
      onMaskedTextChangedCallback: { [weak self] input, value, _, tailPlaceholder in
        self?.onAdvancedMaskTextChangedCallback(
          extracted: value,
          formatted: input.allText,
          tailPlaceholder: tailPlaceholder
        )
      },
      allowSuggestions: allowSuggestions,
      allowedKeys: (allowedKeys ?? "") as String,
      validationRegex: getRegExFromString(string: validationRegex as String?)
    )
    maskInputListener?.textFieldDelegate = textFieldDelegate
    textField.delegate = maskInputListener
  }

  @objc func cleanup() {
    textField?.delegate = originalTextFieldDelegate
    textField = nil
    maskInputListener?.textFieldDelegate = nil
    maskInputListener = nil
    originalTextFieldDelegate = nil
    textFieldDelegate = nil
  }

  @objc(setMaskedText:autocomplete:)
  func setMaskedText(text: NSString, autocomplete: Bool) {
    guard let result = getMaskResultForText(text: text as String, autocomplete: autocomplete) else { return }

    let attributedText = NSAttributedString(string: result.formattedText.string)
    guard let textField = textField else { return }

    setText(textField: textField, text: attributedText)
    maskInputListener?.notifyOnMaskedTextChangedListeners(forTextInput: textField, result: result)
  }

  // MARK: - View Lifecycle

  override func didMoveToWindow() {
    super.didMoveToWindow()
    if textField == nil {
      configureTextField()
      configureMaskInputListener()
      let initialText = getInitialText()
      updateTextWithoutNotification(text: initialText)
    }
  }
}

extension AdvancedTextInputMaskDecoratorView {
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

  private func findTextField() {
    #if ADVANCE_INPUT_MASK_NEW_ARCH_ENABLED
      if let parent = superview?.superview {
        for elementIndex in 1 ..< parent.subviews.count where parent.subviews[elementIndex] == superview {
          textField = findFirstTextField(in: parent.subviews[elementIndex - 1])
          break
        }
      }
    #else
      if let parent = superview {
        for elementIndex in 1 ..< parent.subviews.count where parent.subviews[elementIndex] == self {
          textField = findFirstTextField(in: parent.subviews[elementIndex - 1])
          break
        }
      }
    #endif
  }
}
