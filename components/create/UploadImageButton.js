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
          .upload-button {
            padding: 10px 20px 10px 20px;
            border: solid 1px #ccc;
            background-color: #000;
            color: #fff;
          }
          @media (max-width: 600px) {
            .upload-button {
              padding: 3px 10px 3px 10px;
              font-size: 12px;
              border: solid 1px #ccc;
              background-color: #000;
              color: #fff;
            }
          }
        `}</style>
        <input className="input-hiddden" type="file" ref={(r) => { this.fileInput = r; }} onChange={this.uploadImage} />
        <button
          onClick={this.handleOpenFileUploadDialog}
          className="upload-button"
        >
          上传图片
        </button>
      </div>
    );
  }
}
