import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('designStore') @observer
export default class UploadImageButton extends React.Component {
  handleOpenFileUploadDialog = (e) => {
    e.preventDefault();
    this.fileInput.click();
  }

  uploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.props.designStore.addImage(new Date().getTime(), event.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  render() {
    return (
      <div>
        <style jsx>{`
          .input-hiddden {
            display: none;
          }
        `}</style>
        <input className="input-hiddden" type="file" ref={(r) => { this.fileInput = r; }} onChange={this.uploadImage} />
        <button
          onClick={this.handleOpenFileUploadDialog}
          className="mdc-button mdc-button--raised"
        >
          上传图片
        </button>
      </div>
    );
  }
}
