import { observable, computed, action } from 'mobx';
import { keys } from 'lodash';

const STEP_NAME = {
  '-1': '开始设计',
  0: '选择产品',
  1: '选择设计',
  2: '添加文字',
  3: '选择数量尺码',
  4: '添加到购物车',
};

export default class ViewStore {
  @observable step;
  constructor(step = 0) {
    this.step = step;
  }

  @action preStep = () => {
    this.step = this.step - 1;
  }

  @action nextStep = () => {
    this.step = this.step + 1;
  }

  @computed get stepName() {
    return STEP_NAME[this.step];
  }

  @computed get nextStepName() {
    return STEP_NAME[this.step + 1];
  }

  @computed get preStepName() {
    return STEP_NAME[this.step - 1];
  }

  @computed get stepNames() {
    return keys(STEP_NAME).filter(k => +k >= 0).map(k => STEP_NAME[k]);
  }
}
