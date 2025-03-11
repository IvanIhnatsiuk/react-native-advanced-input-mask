import { AFFINITY_CALCULATION_STRATEGY } from "../../enums";

import type { Mask } from "./Mask";
import type CaretString from "../model/CaretString";

/**
 * Calculates an affinity score based on the specified strategy.
 */
export function calculateAffinityOfMask(
  strategy: AFFINITY_CALCULATION_STRATEGY,
  mask: Mask,
  text: CaretString,
): number {
  switch (strategy) {
    case AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING: {
      const result = mask.apply(text);

      return result.affinity;
    }
    case AFFINITY_CALCULATION_STRATEGY.PREFIX: {
      const result = mask.apply(text);

      return prefixIntersection(result.formattedText.string, text.string)
        .length;
    }
    case AFFINITY_CALCULATION_STRATEGY.CAPACITY: {
      if (text.string.length > mask.totalTextLength()) {
        return Number.MIN_SAFE_INTEGER;
      }

      return text.string.length - mask.totalTextLength();
    }
    case AFFINITY_CALCULATION_STRATEGY.EXTRACTED_VALUE_CAPACITY: {
      const result = mask.apply(text);
      const extractedValueLength = result.extractedValue.length;

      if (extractedValueLength > mask.totalValueLength()) {
        return Number.MIN_SAFE_INTEGER;
      }

      return extractedValueLength - mask.totalValueLength();
    }
    default:
      return 0;
  }
}

/**
 * Finds common prefix between two strings.
 */
function prefixIntersection(str1: string, str2: string): string {
  if (!str1 || !str2) {
    return "";
  }
  let endIndex = 0;

  while (endIndex < str1.length && endIndex < str2.length) {
    if (str1[endIndex] !== str2[endIndex]) {
      break;
    }
    endIndex++;
  }

  return str1.substring(0, endIndex);
}
