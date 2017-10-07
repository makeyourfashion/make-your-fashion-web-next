const PHONE_REGEX = /^1[3|4|5|7|8][0-9]{9}$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) { byteString = atob(dataURI.split(',')[1]); } else { byteString = unescape(dataURI.split(',')[1]); }

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
}

function validatePhone(phone) {
  let phoneError = '';
  if (!phone) {
    phoneError = '请输入手机号';
  } else if (!PHONE_REGEX.test(phone)) {
    phoneError = '请输入正确手机号';
  }

  return phoneError;
}

function validatePassword(password) {
  let passwordError = '';
  if (!password) {
    passwordError = '请输入密码';
  } else if (password.length < 8) {
    passwordError = '密码应至少8位长';
  }

  return passwordError;
}

function validateEmail(email) {
  if (!email) {
    return '请输入电子邮件';
  } else if (!EMAIL_REGEX.test(email)) {
    return '请使用正确电子邮件格式';
  }
  return '';
}

function validateZipcode(zipcode) {
  if (!zipcode) {
    return '请输入邮编';
  } else if (zipcode.length !== 6) {
    return '请使用正确邮编格式';
  }

  return '';
}

let HOST;

if (typeof window !== 'undefined') {
  HOST = '/';
} else if (process.env.NODE_ENV === 'production') {
  HOST = 'http://59.110.141.38:9000/';
} else {
  HOST = 'http://localhost:9000/';
}

export {
  HOST,
  validatePhone,
  validatePassword,
  validateEmail,
  validateZipcode,
  dataURItoBlob,
};
