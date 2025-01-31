import ForkInputMask
import Foundation

extension Dictionary where Key == String, Value == Any {
  func toNotation() -> Notation? {
    guard let characterString = self["character"] as? String,
          let character = characterString.first,
          let characterSetString = self["characterSet"] as? String,
          let isOptional = self["isOptional"] as? Bool
    else {
      return nil
    }

    let characterSet = CharacterSet(charactersIn: characterSetString)
    return Notation(character: character, characterSet: characterSet, isOptional: isOptional)
  }
}
