import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export const your_jwt_secret = process.env.NEXT_PUBLIC_JWT_SECRET;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  var base64Url = response.credential.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  
  const { name, picture, sub } = JSON.parse(jsonPayload)
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  addUser(user);
  console.log(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};