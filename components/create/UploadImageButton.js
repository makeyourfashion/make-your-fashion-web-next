import React from 'react';
import { inject, observer } from 'mobx-react';
import fx from 'glfx';
import Modal from '../Modal';
import TagButton from '../TagButton';

@inject('designStore') @observer
export default class UploadImageButton extends React.Component {
  state = {
    openEdit: false,
    image: null,
    originalImage: null,
    eff: 'origin',
  }

  handleOpenFileUploadDialog = (e) => {
    e.preventDefault();
    this.fileInput.click();
  }

  handleClose = () => {
    this.setState({
      openEdit: false,
    });
  }

  handleAccept = () => {
    this.props.designStore.addImage(new Date().getTime(), this.state.image);
    this.setState({
      openEdit: false,
    });
  }

  uploadImage = (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.setState({
        image: event.target.result,
        originalImage: event.target.result,
        openEdit: true,
      });
      // const image = new Image();
      // image.src = event.target.result;
      // const canvas = fx.canvas();
      // image.onload = () => {
      //   canvas.draw(canvas.texture(image)).ink(0.25).update();
      //   this.props.designStore.addImage(new Date().getTime(), canvas.toDataURL());
      // };
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  handleEff1 = () => {
    this.setState({
      eff: 'eff1',
    });
    const canvas = fx.canvas();
    canvas.draw(canvas.texture(this.imageDom)).ink(0.25).update();
    this.setState({
      image: canvas.toDataURL(),
    });
  }
  handleEff2 = () => {
    this.setState({
      eff: 'eff2',
    });
    const canvas = fx.canvas();
    canvas.draw(canvas.texture(this.imageDom)).denoise(20).update();
    this.setState({
      image: canvas.toDataURL(),
    });
  }
  handleEff3 = () => {
    this.setState({
      eff: 'eff3',
    });
    const canvas = fx.canvas();
    canvas.draw(canvas.texture(this.imageDom)).hueSaturation(-0.8, 0).update();
    this.setState({
      image: canvas.toDataURL(),
    });
  }
  handleEff4 = () => {
    this.setState({
      eff: 'eff4',
    });
    const canvas = fx.canvas();
    canvas.draw(canvas.texture(this.imageDom)).vibrance(-0.5).update();
    this.setState({
      image: canvas.toDataURL(),
    });
  }
  handleEff5 = () => {
    this.setState({
      eff: 'eff5',
    });
    const canvas = fx.canvas();
    canvas.draw(canvas.texture(this.imageDom)).vibrance(0.5).update();
    this.setState({
      image: canvas.toDataURL(),
    });
  }

  handleReset = () => {
    this.setState({
      image: this.state.originalImage,
      eff: 'origin',
    });
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
          .modal-content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
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
          .buttons {
            margin-top: 12px;
          }
          .modal-content {
            margin-top: 12px;
          }
        `}</style>
        <input className="input-hiddden" type="file" ref={(r) => { this.fileInput = r; }} onChange={this.uploadImage} />
        <button
          onClick={this.handleOpenFileUploadDialog}
          className="upload-button"
        >
          上传图片
        </button>
        <Modal
          title="编辑图片"
          open={this.state.openEdit}
          onClose={this.handleClose}
          onAccept={this.handleAccept}
        >
          <div className="modal-content">
            <img style={{ display: 'none' }} width={500} height={500} ref={(r) => { this.imageDom = r; }} alt="上传图片" src={this.state.originalImage} />
            <img width={400} height={400} alt="上传图片" src={this.state.image} />
            <div className="buttons">
              <TagButton isActive={this.state.eff === 'origin'} onClick={this.handleReset}>原图</TagButton>
              <TagButton isActive={this.state.eff === 'eff1'} onClick={this.handleEff1}>效果1</TagButton>
              <TagButton isActive={this.state.eff === 'eff2'} onClick={this.handleEff2}>效果2</TagButton>
              <TagButton isActive={this.state.eff === 'eff3'} onClick={this.handleEff3}>效果3</TagButton>
              <TagButton isActive={this.state.eff === 'eff4'} onClick={this.handleEff4}>效果4</TagButton>
              <TagButton isActive={this.state.eff === 'eff5'} onClick={this.handleEff5}>效果5</TagButton>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
