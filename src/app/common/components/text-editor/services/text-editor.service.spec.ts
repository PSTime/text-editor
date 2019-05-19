import {TextEditorService} from './text-editor.service';
import {CommandTypes} from '../models/command-types';

describe('TextEditorService', () => {

  let service: TextEditorService;

  beforeEach(() => {
    service = new TextEditorService();
  });

  it('getSelectionStyles for one level', () => {
    const result = service.getSelectionStyles(<Selection> <unknown> {
      focusNode: {
        textContent: 'content',
        parentNode: {tagName: 'b', textContent: 'content'}
      }
    });

    expect(result).toEqual([CommandTypes.BOLD]);
  });

  it('getSelectionStyles for 2 levels', () => {
    const result: any = service.getSelectionStyles(<Selection> <unknown> {
      focusNode: {
        textContent: 'content',
        parentNode: {
          tagName: 'b', textContent: 'content', parentNode: {
            tagName: 'u', textContent: 'content'
          }
        }
      }
    });

    expect(result).toEqual([CommandTypes.BOLD, CommandTypes.UNDERLINE]);
  });

  it('getSelectionStyles for 3 levels', () => {
    const result: any = service.getSelectionStyles(<Selection> <unknown> {
      focusNode: {
        textContent: 'content',
        parentNode: {
          tagName: 'b',
          textContent: 'content',
          parentNode: {
            tagName: 'u', textContent: 'content', parentNode: {
              tagName: 'i', textContent: 'content'
            }
          }
        }
      }
    });

    expect(result).toEqual([CommandTypes.BOLD, CommandTypes.UNDERLINE, CommandTypes.ITALIC]);
  });


  it('getSelectionStyles incorrect parent node', () => {
    const result: any = service.getSelectionStyles(<Selection> <unknown> {
      focusNode: {
        textContent: 'content',
        parentNode: {
          tagName: 'b',
          textContent: 'content',
          parentNode: {
            tagName: 'u', textContent: 'content', parentNode: {
              tagName: 'i', textContent: 'wrong content'
            }
          }
        }
      }
    });

    expect(result).toEqual([CommandTypes.BOLD, CommandTypes.UNDERLINE]);
  });
});
