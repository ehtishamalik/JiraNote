import { memo } from 'react';
import { ViewTextProps } from './types';
import { generateEpicSummary, generateRecipientSummary } from '../../utils';

const areEqual = (prevProps: ViewTextProps, nextProps: ViewTextProps) => {
  return prevProps.showText === nextProps.showText;
};

export const ViewText = memo(
  ({ showText, recipients, title, closeCallback }: ViewTextProps) => {
    const recipientSummary = generateRecipientSummary(recipients);
    const { summaryLines, overallTotal } = generateEpicSummary(recipients);
    const header = '\n\n**** Epics Summary ****\nTotal: ';

    return (
      showText && (
        <section className="viewtext">
          <div className="viewtext__container">
            <button
              type="button"
              className="viewtext__close"
              onClick={closeCallback}
            >
              &times;
            </button>
            <textarea
              name="recipient-summary"
              id="recipient-summary-textarea"
              placeholder="Recipient Summary..."
              defaultValue={`${title}\n\n${recipientSummary}${header}${overallTotal}\n\n${summaryLines}\n`}
            ></textarea>
          </div>
        </section>
      )
    );
  },
  areEqual
);
