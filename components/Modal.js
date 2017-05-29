import React from 'react';
import { MDCDialog } from '@material/dialog/dist/mdc.dialog';

export default class Modal extends React.Component {
  componentDidMount() {
    this.modal = new MDCDialog(this.modalDom);
    this.lastFocusedTarget = null;

    if (this.props.open) {
      this.modal.show();
    }

    this.modal.listen('MDCDialog:cancel', this.props.onClose);
    this.modal.listen('MDCDialog:accept', this.props.onAccept);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      if (nextProps.open) {
        this.modal.show();
      } else if (this.modal.open) {
        this.modal.close();
      }
    }
  }

  render() {
    return (
      <aside
        ref={(r) => { this.modalDom = r; }}
        className="mdc-dialog"
        role="alertdialog"
        aria-labelledby="mdc-dialog-with-list-label"
        aria-describedby="mdc-dialog-with-list-description"
      >
        <style jsx>{`
          .modal-body {
            height: 80%;
            max-height: 600px;
          }
        `}</style>
        <div className="mdc-dialog__surface">
          <header className="mdc-dialog__header">
            <h2 id="mdc-dialog-with-list-label" className="mdc-dialog__header__title">
              {this.props.title}
            </h2>
          </header>
          <section id="mdc-dialog-with-list-description" className="modal-body mdc-dialog__body mdc-dialog__body--scrollable">
            {this.props.children}
          </section>
          <footer className="mdc-dialog__footer">
            {
              this.props.onAccept ? <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept">确定</button> : null
            }
            <button type="button" className="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">返回</button>
          </footer>
        </div>
        <div className="mdc-dialog__backdrop" />
      </aside>
    );
  }
}
