export const API_BASE_URL = "https://github-deploy-backend-4c1a3d096073.herokuapp.com";
export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI = "https://mohamedlrouabah1.github.io/oauth2/redirect";

export const GOOGLE_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL +
  "/oauth2/authorize/facebook?redirect_uri=" +
  OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + OAUTH2_REDIRECT_URI;
