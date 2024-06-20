import { ACCESS_TOKEN } from "../../utils/constants";
import { useLocation, useNavigate } from "react-router-dom";
const OAuth2RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getUrlParameter = (name) => {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");

    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const token = getUrlParameter("token");
  const error = getUrlParameter("error");

  if (token) {
    localStorage.setItem(ACCESS_TOKEN, token);
    return navigate("/#/profile", { state: { from: location } });
  } else {
    return navigate("/#/login", {
      state: {
        from: location,
        error: error,
      },
    });
  }
};

export default OAuth2RedirectHandler;
