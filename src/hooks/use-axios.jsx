import axios from "axios";
import { toast } from "sonner";
import useApp from "./use-app";
import useAuth from "./use-auth";

const baseUrl = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { setIsLoading, token, setToken } = useApp();
  const { userInfo, getItem, setItem, logout } = useAuth();

  const savedToken = getItem("token");
  const refreshToken = getItem("refresh_token");

  const request = async (obj = {}) => {
    const {
      method = "GET",
      url = "",
      headers = {},
      body = {},
      params = {},
      show_error = false,
      show_loading = false,
      responseType = "json",
      show_success = false,
      success_message = "Success",
      error_message = "An error occurred",
      require_token = true,
      custom_token = token,
    } = obj;

    try {
      if (!method || !url) {
        throw { custom: true, message: "Method and URL are required" };
      }

      if (show_loading) setIsLoading(true);

      if (require_token) {
        let jwt = custom_token || savedToken || getItem("token");

        if (jwt) {
          headers.Authorization = `Bearer ${jwt}`;
        }
      }

      const res = await axios({
        headers,
        method,
        url: `${baseUrl}/${url}`,
        data: body,
        params,
        responseType,
      });

      if (show_success) {
        toast.success(res?.data?.detail || success_message || "Success");
      }

      return res.data;
    } catch (e) {
      const status = e?.response?.status;
      const resData = e?.response?.data || {};
      const rawErrors = resData.errors;

      // Handle token refresh and retry once
      if (status == 401) {
        logout();
        window.location.replace("/");
      }

      let customMessage = error_message;

      if (typeof rawErrors === "string") {
        customMessage = rawErrors;
      } else if (Array.isArray(rawErrors)) {
        customMessage = rawErrors
          .map((err) =>
            typeof err === "string"
              ? err
              : err?.message
              ? `${err?.field ? `${err.field}: ` : ""}${err.message}`
              : JSON.stringify(err)
          )
          .join(", ");
      } else if (typeof resData === "object" && resData?.message) {
        customMessage = resData.message;
      }

      if (show_error) {
        toast.error(error_message, {
          description: <p className="text-red-500">{customMessage}</p>,
        });
      }

      return {
        error: true,
        errors: rawErrors || resData?.errors,
        message: customMessage,
        status: status || null,
      };
    } finally {
      if (show_loading) setIsLoading(false);
    }
  };

  return request;
};

export default useAxios;
