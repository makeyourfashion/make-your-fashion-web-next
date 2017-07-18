import React from 'react';
import { observable, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import Router from 'next/router';
import AppBar from '../../AppBar';
import Footer from '../../Footer';
import Snackbar from '../../Snackbar';

@inject('identityStore', 'pictureStore') @observer
export default class Designs extends React.Component {
  componentDidMount() {
    if (!this.props.identityStore.isLoggedIn) {
      Router.push(`/login?redirect=${encodeURIComponent('/admin/designs')}`);
    }
  }

  @observable images = [
    {
      imgUrl: 'http://www.ufunk.net/wp-content/uploads/2016/08/Xavier-Portela-Tokyo-1.jpg',
      count: 5,
      status: '通过审核',
    },
    {
      imgUrl: 'http://img02.tooopen.com/images/20150504/tooopen_sy_121674864715.jpg',
      count: 16,
      status: '通过审核',
    },
    {
      imgUrl: 'http://img02.tooopen.com/images/20150521/tooopen_sy_125443297259.jpg',
      count: 103,
      status: '通过审核',
    },
  ];

  @observable newImages = [];

  @observable showSuccessMessage = false;
  @observable showInvalidImageFormat = false;

  handleOpenFileUploadDialog = (e) => {
    e.preventDefault();
    this.fileInput.click();
  }

  @action uploadImage = (e) => {
    // if (!e.target.files[0].type.startsWith('image')) {
    //   this.showInvalidImageFormat = true;
    //   return;
    // }
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = (event) => {
      this.newImages.push({
        file,
        imgUrl: event.target.result,
        count: 0,
        status: '通过审核',
        tag: [''],
        des: '',
      });
    };
    reader.readAsDataURL(file);
  }

  @action handleSaveImages = async () => {
    await Promise.all(this.newImages.map(design => this.props.pictureStore.uploadImage(design)));

    this.images = this.images.slice().concat(this.newImages.slice());
    this.newImages = [];
    this.showSuccessMessage = true;
  }

  @action handleSelectTag = (e) => {
    this.newImages[e.target.getAttribute('data-index')].tag[0] = e.target.value;
  }

  @action handleDesChange = (e) => {
    this.newImages[e.target.getAttribute('data-index')].des = e.target.value;
  }

  render() {
    return (
      <div>
        <style jsx>{`
          .img-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            border-bottom: 1px solid #dedede;
            font-size: 0.9em;
            font-weight: bold;
          }
          .uploaded-image {
            max-width: 96%;
            max-height: 75%;
            margin: 2% 2% 2% 2%;
          }
          .image-card {
            margin-right: 1%;
            width: 32%;
            min-width: 100px;
            max-width: 350px;
            height: 350px;
            margin-bottom: 40px;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .upload-label {
            font-weight: bold;
          }
          .upload-icon {
            vertical-align: middle;
          }
          .action-area {
            max-width: 600px;
            margin: auto;
            margin-top: 40px;
          }
          h2 {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
            text-align: center;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          h3 {
            padding-bottom: 5px;
            text-align: center;
            padding-bottom: 20px;
            margin-bottom: 20px;
          }
          .summary {
            font-weight: bold;
          }
          .label-list {
            display: flex;
            padding-bottom: 10px;
            justify-content: space-between;
          }
          .form-field {
            margin: 5px 0 5px 0;
          }
          .sum-income {
            padding-top: 10px;
            margin-top: 10px;
            border-top: 1px solid #dedede;
          }
          select {
            width: 150px;
          }
          @media (max-width: 599px) {
            .image-card {
              width: 48%;
              margin-right: 2%;
              height: 250px;
            }
            .form-field {
              width: 100%;
            }
            select {
              max-width: 70%;
            }
            input {
              max-width: 50%;
            }
          }
        `}</style>
        <AppBar />
        <div className="container">
          <div className="mdc-layout-grid">
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-9 mdc-layout-grid__cell--span-12-phone mdc-layout-grid__cell--span-12-tablet">
              <h2>您的设计</h2>
              <h3>上传新设计</h3>
              <div className="img-list">
                <div className="image-card mdc-elevation--z2">
                  <input style={{ display: 'none' }} type="file" ref={(r) => { this.fileInput = r; }} onChange={this.uploadImage} />
                  <button onClick={this.handleOpenFileUploadDialog} className="icon-button">
                    <i className="material-icons upload-icon">file_upload</i>
                    <span className="upload-label">上传新图片</span>
                  </button>
                </div>
                {
                  this.newImages.map((img, i) => (
                    <div key={i} className="image-card mdc-elevation--z2">
                      <img alt="图片" className="uploaded-image" src={img.imgUrl} />
                      <div className="form-field">
                        <label>
                          <span>类别：</span>
                          <select
                            data-index={i}
                            value={img.tag[0]}
                            onChange={this.handleSelectTag}
                          >
                            <option value="" />
                            {
                              this.props.pictureStore.allTags.map(tag => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                              ))
                            }
                          </select>
                        </label>
                      </div>
                      <div className="form-field">
                        <label>
                          <span>描述：</span>
                          <input
                            data-index={i}
                            label=""
                            onChange={this.handleDesChange}
                            value={img.des}
                          />
                        </label>
                      </div>
                    </div>
                  ))
                }
              </div>
              <h3>已经上传的设计</h3>
              <div className="img-list">
                {
                  this.images.map((img, i) => (
                    <div key={i} className="image-card mdc-elevation--z2">
                      <img alt="图片" className="uploaded-image" src={img.imgUrl} />
                      <div>使用次数: <span>{img.count}</span></div>
                      <div>状态: <span>{img.status}</span></div>
                    </div>
                  ))
                }
              </div>
              <div className="action-area">
                <button onClick={this.handleSaveImages} className="mdc-button mdc-button--raised mdc-button--accent button-full-width">
                  确认保存图片
                </button>
              </div>
            </div>
            <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--span-12-phone mdc-layout-grid__cell--span-12-tablet">
              <h2>总结</h2>
              <div className="summary">
                <div className="label-list">
                  <div>设计分成：</div>
                  <div>¥134.12</div>
                </div>
                <div className="label-list">
                  <div>服装分成：</div>
                  <div>¥110.44</div>
                </div>
                <div className="sum-income">
                  <div className="label-list">
                    <div>总计：</div>
                    <div>¥244.56</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Snackbar
          open={this.showSuccessMessage}
          message="成功保存图片，您的图片已经加入图片库"
        />
        <Snackbar
          open={this.showInvalidImageFormat}
          message="请选择正确图片格式"
        />
        <Footer />
      </div>
    );
  }
}
