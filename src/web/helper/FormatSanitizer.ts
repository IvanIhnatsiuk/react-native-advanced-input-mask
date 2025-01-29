import {
  CLOSE_CURLY_BRACKET,
  CLOSE_SQUARE_BRACKET,
  ESCAPE_CHARACTER,
  FIXED_ALPHA_NUMERIC_CHARACTER,
  FIXED_LITERAL_CHARACTER,
  OPEN_CURLY_BRACKET,
  OPEN_SQUARE_BRACKET,
  OPTIONAL_ALPHA_NUMERIC_CHARACTER,
  OPTIONAL_LITERAL_CHARACTER,
} from '../model/constants';
import FormatError from './FormatError';
import { sortString } from './string';

export default class FormatSanitizer {
  public static sanitize(formatString: string): string {
    FormatSanitizer.checkOpenBraces(formatString);
    const blocks = this.divideBlocksWithMixedCharacters(
      this.getFormatBlocks(formatString)
    );
    return FormatSanitizer.sortFormatBlocks(blocks).join('');
  }

  private static getFormatBlocks(formatString: string): string[] {
    const blocks: string[] = [];
    let currentBlock = '';
    let escape = false;

    for (const char of formatString) {
      if (char === ESCAPE_CHARACTER) {
        if (!escape) {
          escape = true;
          currentBlock += char;
          continue;
        }
      }

      if (
        (char === OPEN_CURLY_BRACKET || char === OPEN_SQUARE_BRACKET) &&
        !escape
      ) {
        if (currentBlock.length > 0) {
          blocks.push(currentBlock);
        }
        currentBlock = '';
      }

      currentBlock += char;

      if (
        (char === CLOSE_SQUARE_BRACKET || char === CLOSE_CURLY_BRACKET) &&
        !escape
      ) {
        blocks.push(currentBlock);
        currentBlock = '';
      }

      escape = false;
    }

    if (currentBlock.length > 0) {
      blocks.push(currentBlock);
    }

    return blocks;
  }

  private static processBlock = (block: string): string[] => {
    const results: string[] = [];
    let buffer = '';
    let i = 0;

    while (i < block.length) {
      const char = block.charAt(i);

      if (char === CLOSE_SQUARE_BRACKET) {
        buffer += char;
        i++;
        continue;
      }

      if (char === OPEN_SQUARE_BRACKET && !buffer.endsWith(ESCAPE_CHARACTER)) {
        buffer += char;
        results.push(buffer);
        break;
      }
      if (
        (/[09]/.test(char) && /[Aa_\\-]/.test(buffer)) ||
        (/[Aa]/.test(char) && /[0-9_\\-]/.test(buffer)) ||
        (/[_\\-]/.test(char) && /[0-9Aa]/.test(buffer))
      ) {
        buffer += CLOSE_SQUARE_BRACKET;
        results.push(buffer);
        buffer = OPEN_SQUARE_BRACKET + char;
        i++;
        continue;
      }

      buffer += char;
      i++;
    }

    return results.length ? results : [block];
  };

  private static divideBlocksWithMixedCharacters(blocks: string[]): string[] {
    const resultingBlocks: string[] = [];

    for (const block of blocks) {
      if (block.startsWith(OPEN_SQUARE_BRACKET)) {
        const processedBlock = this.processBlock(block);
        resultingBlocks.push(...processedBlock);
      } else {
        resultingBlocks.push(block);
      }
    }

    return resultingBlocks;
  }

  private static sortFormatBlocks(blocks: string[]): string[] {
    return blocks.map((block) => {
      if (block.startsWith(OPEN_SQUARE_BRACKET)) {
        const isSimpleBlock = /[09Aa]/.test(block);
        const preparedBlock = block
          .replace(OPEN_SQUARE_BRACKET, '')
          .replace(CLOSE_SQUARE_BRACKET, '');

        const sortedBlock = isSimpleBlock
          ? sortString(preparedBlock)
          : sortString(
              preparedBlock
                .replace(FIXED_ALPHA_NUMERIC_CHARACTER, FIXED_LITERAL_CHARACTER)
                .replace(
                  OPTIONAL_ALPHA_NUMERIC_CHARACTER,
                  OPTIONAL_LITERAL_CHARACTER
                )
            );
        return `${OPEN_SQUARE_BRACKET}${sortedBlock}${CLOSE_SQUARE_BRACKET}`;
      } else {
        return block;
      }
    });
  }

  private static checkOpenBraces(str: string): void {
    let escape = false;
    let squareBraceOpen = false;
    let curlyBraceOpen = false;

    for (const char of str) {
      if (char === ESCAPE_CHARACTER) {
        escape = !escape;
        continue;
      }
      if (char === OPEN_SQUARE_BRACKET) {
        if (squareBraceOpen) {
          throw new FormatError();
        }
        squareBraceOpen = !escape;
      }
      if (char === CLOSE_SQUARE_BRACKET && !escape) {
        squareBraceOpen = false;
      }
      if (char === OPEN_CURLY_BRACKET) {
        if (curlyBraceOpen) {
          throw new FormatError();
        }
        curlyBraceOpen = !escape;
      }
      if (char === CLOSE_CURLY_BRACKET && !escape) {
        curlyBraceOpen = false;
      }
      escape = false;
    }
  }
}
