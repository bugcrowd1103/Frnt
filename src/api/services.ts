// src/api/services.ts

import axios from 'axios';
import { API_URLS } from './apiUrls';

// Register the user


export interface RegisterUserPayload {
  user_name: string;
  full_name: string;
  first_name: string;
  last_name: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  password: string;
  age: number;
  status: string;
  role_type: 'user';
  is_active: boolean;
}

export interface RegisterResponse {
  status: number;
  message: string;
  data: any[]; // or User[] if you want to type strictly
}

export async function registerUser(payload: RegisterUserPayload): Promise<RegisterResponse> {
  const response = await axios.post(
    API_URLS.REGISTER,
    payload,
    {
      headers: {
        ReferrerPolicy: 'no-referrer',
      },
      withCredentials: true,
    }
  );
  return response.data;
}


export interface LoginResponse {
  data: {
    token: string;
    user: any;
  };
}

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await axios.post(
    API_URLS.LOGIN,
    { email, password },
    {
      headers: {
        ReferrerPolicy: 'no-referrer',
      },
      withCredentials: true, // if you want to send/receive HTTP-only cookies
    }
  );
  return response.data;
}



export interface CurrentUserResponse {
  status: number;
  message: string;
  data: {
    user: any;
  };
}

export async function fetchCurrentUser(): Promise<CurrentUserResponse> {
  const response = await axios.get(API_URLS.CURRENT_USER, {
    withCredentials: true, // important to send cookies
  });
  return response.data;
}


export async function logoutUser(): Promise<void> {
  await axios.post(API_URLS.LOGOUT, {}, { withCredentials: true });
}

// You can add other services here: registerUser, logoutUser, fetchProfile etc.
