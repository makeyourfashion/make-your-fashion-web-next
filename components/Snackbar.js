import React from 'react';
import { MDCSnackbar } from '@material/snackbar/dist/mdc.snackbar';

export default class Snackbar extends React.Component {
  componentDidMount() {
    this.snackbar = new MDCSnackbar(this.snackbarDom);
    const { message, actionText, onAction } = this.props;

    if (this.props.open) {
      this.snackbar.show({
        message,
        actionText,
        actionHandler: onAction,
        timeout: 4000,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      const { message, actionText, onAction } = nextProps;
      this.snackbar.show({
        message,
        actionText,
        actionHandler: onAction,
        timeout: 4000,
      });
    }
  }

  render() {
    return (
      <div
        ref={(r) => { this.snackbarDom = r; }}
        className="mdc-snackbar"
        aria-live="assertive"
        aria-atomic="true"
        aria-hidden="true"
      >
        <div className="mdc-snackbar__text" />
        <div className="mdc-snackbar__action-wrapper">
          <button type="button" className="mdc-button mdc-snackbar__action-button" />
        </div>
      </div>
    );
  }
}
