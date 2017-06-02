import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import ShirtIcon from './ShirtIcon';
import SelectPictureModal from './SelectPictureModal';
import AddTextModal from './AddTextModal';


@inject('designStore') @observer
export default class Menu extends React.Component {
  state = {
    isSelectPicModalOpen: false,
    isAddTextModalOpen: false,
  }

  componentDidMount() {
    this.fileInput.style.display = 'none';
  }

  handleSelect = (id, imgUrl) => {
    this.props.designStore.addImage(id, imgUrl);

    this.setState({
      isSelectPicModalOpen: false,
    });
  }

  selectProduct = () => {
    Router.push('/shop?category=2');
  }

  handleSelectPicture = () => {
    this.setState({
      isSelectPicModalOpen: true,
    });
  }

  handleAddText = () => {
    this.setState({
      isAddTextModalOpen: true,
    });
  }

  handleClosePictureModal = () => {
    this.setState({
      isSelectPicModalOpen: false,
    });
  }

  handleCloseAddTextModal = () => {
    this.setState({
      isAddTextModalOpen: false,
    });
  }

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
          i {
            display: inline-table;
            vertical-align: middle;
          }
          .list-item {
            margin-bottom: 10px;
          }
        `}</style>
        <SelectPictureModal onSelect={this.handleSelect} onClose={this.handleClosePictureModal} open={this.state.isSelectPicModalOpen} />
        <AddTextModal open={this.state.isAddTextModalOpen} onClose={this.handleCloseAddTextModal} />
        <ul className="mdc-list">
          <li className="mdc-list-item list-item">
            <ShirtIcon />
            <button onClick={this.selectProduct} className="icon-button">
              选择产品
            </button>
          </li>
          <li className="mdc-list-item list-item">
            <i className="material-icons" aria-hidden="true">collections</i>
            <button onClick={this.handleSelectPicture} className="icon-button">
              选择设计
            </button>
          </li>
          <li className="mdc-list-item list-item">
            <i className="material-icons" aria-hidden="true">text_fields</i>
            <button onClick={this.handleAddText} className="icon-button">
              添加文字
            </button>
          </li>
          <li className="mdc-list-item list-item">
            <input type="file" ref={(r) => { this.fileInput = r; }} onChange={this.uploadImage} />
            <i className="material-icons">file_upload</i>
            <button onClick={this.handleOpenFileUploadDialog} className="icon-button">
              上传图片
            </button>
          </li>
        </ul>
      </div>
    );
  }
}
