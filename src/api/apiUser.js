import axios from "axios";

export class RequestDefaults {
  static baseUrl = "http://localhost:8080/user";
 
  static changeBaseUrl(bu) {
    RequestDefaults.baseUrl = bu;
  }
}

const headers = {
  "Access-Control-Allow-Origin": "*"
}

const parseError = (errText) => {
  try {
    let err = JSON.parse(errText);
    console.log("Parsed Error: ",err);
    return (err && err.error) || err || [];
  } catch (e) {
    return [];
  }
};
export const Get = async (path, json) => {
  let response = {};
  try {
    response.result = await axios.get(
      `${RequestDefaults.baseUrl}${path}`,
      json
    );
  } catch (e) {
    response.err = parseError(e.text);
    response.status = e.status;  
  }
  return response;
};

export const Post = async (path, json) => {
  let response = {};
  try {
    response.result = await axios.post(
      `${RequestDefaults.baseUrl}${path}`,
      json,
      {
        headers: headers
      }
    );
  } catch (e) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Login = async (path, json) => {
  let response = {};

  try {
    response.result = await axios.post(
      `${RequestDefaults.baseUrl}${path}`,
      json
    );
    console.log("Server Response: ",response);
  } catch (e) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Patch = async (path, json) => {
  let response = {};
  try {
    response.result = await axios.patch(
      `${RequestDefaults.baseUrl}${path}`,
      json
    );
  } catch (e) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Delete = async (path, json) => {
  let response = {};
  try {
    response.result = await axios.delete(
      `${RequestDefaults.baseUrl}${path}`,
      json
    );
  } catch (e) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};

export const Put = async (path, json) => {
  let response = {};
  try {
    response.result = await axios.put(
      `${RequestDefaults.baseUrl}${path}`,
      json
    );
  } catch (e) {
    response.err = parseError(e.text);
    response.status = e.status;
  }
  return response;
};