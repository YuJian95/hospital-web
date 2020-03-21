// 需要上传照片时用另外的接口，直接用axios进行传值
import axios from 'axios';
import { getToken } from "@/utils/auth";

export function uploadPicture(file) {
  // 将file数据封装在FormData中
  let formData = new FormData();
  formData.append('file', file);

  const url = 'http://localhost:8080/hospital/picture/upload';
  const config = {
    headers: {
      'Authorization': getToken(),
      'Content-Type': 'multipart/form-data'
    }
  };
  let imgUrl = '';
  axios.post(url, formData, config )
    .then(response => {
      imgUrl = response.data;
    });
  return imgUrl;
}
