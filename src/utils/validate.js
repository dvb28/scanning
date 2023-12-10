// Validate Email
export const validateEmail = (value, callback) => {
  // Validate Email
  if (!value) {
    callback('Vui lòng nhập email');
  } else if (!/\S+@\S+\.\S+/.test(value)) {
    callback('Email không hợp lệ');
  } else {
    callback('');
  }
};

// Validate Password
export const validatePassword = (value, callback) => {
  // Validate Password
  if (!value) {
    callback('Vui lòng nhập mật khẩu');
  } else if (value.split('').length < 8) {
    callback('Mật khẩu phải có ít nhất 8 ký tự');
  } else {
    callback('');
  }
};
