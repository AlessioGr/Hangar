import { AxiosError } from "axios";
import { HangarApiException, HangarValidationException, MultiHangarApiException } from "hangar-api";
import { Composer, VueMessageType } from "vue-i18n";
import { Context } from "vite-ssr/vue";
import { useNotificationStore } from "~/store/notification";

export function handleRequestError(
  err: AxiosError,
  { writeResponse }: Context,
  i18n: Composer<unknown, unknown, unknown, VueMessageType>,
  msg: string | undefined = undefined
) {
  if (import.meta.env.SSR) {
    _handleRequestError(err, writeResponse, i18n);
    return;
  }
  const notfication = useNotificationStore();
  if (!err.isAxiosError) {
    // everything should be an AxiosError
    console.log(err);
  } else if (err.response) {
    if (err.response.data.isHangarApiException) {
      for (const errorMsg of collectErrors(err.response.data, i18n)) {
        notfication.error(msg ? `${i18n.t(msg)}: ${errorMsg}` : errorMsg);
      }
    } else if (err.response.data.isHangarValidationException) {
      const data: HangarValidationException = err.response.data;
      for (const fieldError of data.fieldErrors) {
        notfication.error(i18n.te(fieldError.errorMsg) ? i18n.t(fieldError.errorMsg) : fieldError.errorMsg);
      }
      if (msg) {
        notfication.error(i18n.t(msg));
      }
    } else {
      notfication.error(msg ? `${i18n.t(msg)}: ${err.response.statusText}` : err.response.statusText);
    }
    console.log("request error", err.response);
  } else {
    console.log(err);
  }
}

function _handleRequestError(err: AxiosError, writeResponse: Context["writeResponse"], i18n: Composer<unknown, unknown, unknown, VueMessageType>) {
  if (!err.isAxiosError) {
    // everything should be an AxiosError
    writeResponse({
      status: 500,
    });
    console.log(err);
  } else if (err.response) {
    if (err.response.data.isHangarApiException) {
      const data: HangarApiException = err.response.data.isMultiException ? err.response.data.exceptions[0] : err.response.data;
      writeResponse({
        status: data.httpError.statusCode,
        statusText: i18n.te(data.message) ? i18n.t(data.message) : data.message,
      });
    } else if (err.response.data.isHangarValidationException) {
      const data: HangarValidationException = err.response.data;
      writeResponse({
        status: data.httpError.statusCode,
        statusText: data.fieldErrors.map((f) => f.errorMsg).join(", "),
      });
    } else {
      writeResponse({
        status: err.response.status,
        statusText: err.response.statusText,
      });
    }
  } else {
    writeResponse({
      statusText: "This shouldn't happen...",
    });
    console.log(err);
  }
}

function collectErrors(exception: HangarApiException | MultiHangarApiException, i18n: Context["app"]["i18n"]): string[] {
  if (!exception.isMultiException) {
    return [i18n.te(exception.message) ? i18n.t(exception.message, [exception.messageArgs]) : exception.message];
  } else {
    const res: string[] = [];
    for (const ex of exception.exceptions) {
      res.push(i18n.te(ex.message) ? i18n.t(ex.message, ex.messageArgs) : ex.message);
    }
    return res;
  }
}