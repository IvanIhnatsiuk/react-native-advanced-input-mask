import Mask from './helper/Mask';
import RTLMask from './helper/RTLMask';
import CaretString from './model/CaretString';
import { CaretGravityType } from './model/CartGravity';
import type { Notation } from '../types';
import type { MaskResult } from './model/types';
import { AFFINITY_CALCULATION_STRATEGY } from '../enums';
import { calculateAffinityOfMask } from './helper/affinityCalculationStrategy';

type Field = HTMLInputElement;

export default class MaskedTextChangedListener {
  primaryFormat: string;
  affineFormats: string[];
  customNotations: Notation[];
  affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY;
  autocomplete: boolean;
  autoskip: boolean;
  rightToLeft: boolean;

  private afterText: string = '';
  private readonly field: Field;

  constructor(
    primaryFormat: string,
    affineFormats: string[] | boolean | Field,
    customNotations?: string[] | Notation[] | number | Field,
    affinityCalculationStrategy?:
      | AFFINITY_CALCULATION_STRATEGY
      | boolean
      | Field,
    autocomplete?: boolean,
    autoskip?: boolean,
    field?: Field,
    rightToLeft?: boolean
  ) {
    if (
      typeof affineFormats === 'string' ||
      typeof affineFormats === 'undefined'
    ) {
      // Simplest convenience constructor
      this.primaryFormat = primaryFormat;
      this.affineFormats = [];
      this.customNotations = [];
      this.affinityCalculationStrategy =
        AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING;
      this.autocomplete = true;
      this.autoskip = false;
      this.field = (customNotations as Field) || ({} as Field);
      this.rightToLeft = false;
      return;
    }

    // If affineFormats is array
    if (Array.isArray(affineFormats)) {
      this.primaryFormat = primaryFormat;
      this.affineFormats = affineFormats;
      if (Array.isArray(customNotations)) {
        this.customNotations = customNotations as Notation[];
        this.affinityCalculationStrategy =
          (affinityCalculationStrategy as AFFINITY_CALCULATION_STRATEGY) ||
          AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING;
        this.autocomplete =
          typeof autocomplete === 'boolean' ? autocomplete : true;
        this.autoskip = typeof autoskip === 'boolean' ? autoskip : false;
        this.field = field || ({} as Field);
        this.rightToLeft = rightToLeft ?? false;
      } else {
        // Another convenience path
        this.customNotations = [];
        this.affinityCalculationStrategy =
          AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING;
        this.autocomplete = true;
        this.autoskip = false;
        this.field = customNotations as Field;
        this.rightToLeft = false;
      }
    } else {
      this.primaryFormat = primaryFormat;
      this.affineFormats = [];
      this.customNotations = [];
      this.affinityCalculationStrategy =
        AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING;
      this.autocomplete = true;
      this.autoskip = false;
      this.field = {} as Field;
      this.rightToLeft = false;
    }
  }

  private get primaryMask(): Mask {
    return this.maskGetOrCreate(this.primaryFormat, this.customNotations);
  }

  public setText(text: string, autocomplete?: boolean): MaskResult | null {
    if (!this.field) return null;
    const result = this.setTextOnField(text, autocomplete);
    this.afterText = result.formattedText.string;
    return result;
  }

  public setTextOnField(text: string, autocomplete?: boolean): MaskResult {
    const useAutocomplete =
      autocomplete !== undefined ? autocomplete : this.autocomplete;
    const textAndCaret = new CaretString(text, text.length, {
      type: CaretGravityType.Forward,
      autocomplete: useAutocomplete,
      autoskip: false,
    });

    const result: MaskResult = this.pickMask(textAndCaret).apply(textAndCaret);
    this.field.value = result.formattedText.string;

    try {
      this.field.setSelectionRange(
        result.formattedText.caretPosition,
        result.formattedText.caretPosition
      );
    } catch (error) {
      console.error(error);
    }

    return result;
  }

  public placeholder(): string {
    return this.primaryMask.placeholder();
  }

  public acceptableTextLength(): number {
    return this.primaryMask.acceptableTextLength();
  }

  public totalTextLength(): number {
    return this.primaryMask.totalTextLength();
  }

  public acceptableValueLength(): number {
    return this.primaryMask.acceptableValueLength();
  }

  public totalValueLength(): number {
    return this.primaryMask.totalValueLength();
  }

  onTextChanged(
    text: string,
    cursorPosition: number,
    before: number,
    count: number
  ): MaskResult {
    const isDeletion = before > 0 && count === 0;
    const useAutocomplete = isDeletion ? false : this.autocomplete;
    const useAutoskip = isDeletion ? this.autoskip : false;

    const caretGravity = isDeletion
      ? {
          type: CaretGravityType.Backward,
          autoskip: useAutoskip,
          autocomplete: false,
        }
      : {
          type: CaretGravityType.Forward,
          autocomplete: useAutocomplete,
          autoskip: false,
        };

    const newCaretPosition = isDeletion
      ? cursorPosition
      : cursorPosition + count;

    const textAndCaret = new CaretString(text, newCaretPosition, caretGravity);
    const mask = this.pickMask(textAndCaret);
    const result = mask.apply(textAndCaret);

    this.afterText = result.formattedText.string;

    return result;
  }

  // OnFocusChangeListener override
  onFocusChange(hasFocus: boolean): void {
    if (this.autocomplete && hasFocus) {
      const text =
        this.field.value && this.field.value.length > 0 ? this.field.value : '';
      const textAndCaret = new CaretString(text, text.length, {
        type: CaretGravityType.Forward,
        autocomplete: this.autocomplete,
        autoskip: false,
      });
      const result = this.pickMask(textAndCaret).apply(textAndCaret);

      this.afterText = result.formattedText.string;
      this.field.value = this.afterText;

      try {
        this.field.setSelectionRange(
          result.formattedText.caretPosition,
          result.formattedText.caretPosition
        );
      } catch (error: unknown) {
        console.error(error);
      }
    }
  }

  pickMask(text: CaretString): Mask {
    if (!this.affineFormats || this.affineFormats.length === 0) {
      return this.primaryMask;
    }

    // Local helper type
    type MaskAffinity = { mask: Mask; affinity: number };

    const primaryAffinity = this.calculateAffinity(this.primaryMask, text);
    const masksAndAffinities: MaskAffinity[] = [];

    for (const format of this.affineFormats) {
      const candidateMask = this.maskGetOrCreate(format, this.customNotations);
      const affinity = this.calculateAffinity(candidateMask, text);
      masksAndAffinities.push({ mask: candidateMask, affinity });
    }

    masksAndAffinities.sort((a, b) => b.affinity - a.affinity);

    let insertIndex = -1;
    for (let i = 0; i < masksAndAffinities.length; i++) {
      const affinity = masksAndAffinities[i]?.affinity;
      if (affinity && primaryAffinity === affinity) {
        insertIndex = i;
        break;
      }
    }

    if (insertIndex >= 0) {
      masksAndAffinities.splice(insertIndex, 0, {
        mask: this.primaryMask,
        affinity: primaryAffinity,
      });
    } else {
      masksAndAffinities.push({
        mask: this.primaryMask,
        affinity: primaryAffinity,
      });
    }

    return masksAndAffinities[0]!.mask;
  }

  private maskGetOrCreate(format: string, customNotations: Notation[]): Mask {
    return this.rightToLeft
      ? RTLMask.getOrCreate(format, customNotations)
      : Mask.getOrCreate(format, customNotations);
  }

  private calculateAffinity(mask: Mask, text: CaretString): number {
    return calculateAffinityOfMask(
      this.affinityCalculationStrategy,
      mask,
      text
    );
  }

  static installOn(
    field: Field,
    primaryFormat: string,
    affineFormats: string[] = [],
    customNotations: Notation[] = [],
    affinityCalculationStrategy: AFFINITY_CALCULATION_STRATEGY = AFFINITY_CALCULATION_STRATEGY.WHOLE_STRING,
    autocomplete: boolean = true,
    autoskip: boolean = false
  ): MaskedTextChangedListener {
    const maskedListener = new MaskedTextChangedListener(
      primaryFormat,
      affineFormats,
      customNotations,
      affinityCalculationStrategy,
      autocomplete,
      autoskip,
      field
    );

    return maskedListener;
  }
}
