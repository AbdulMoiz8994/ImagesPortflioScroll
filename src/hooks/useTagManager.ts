import { useEffect } from 'react';
import TagManager from "react-gtm-module"
import { gdprCookiesName, googleTagManagerKey } from 'site-settings/site-credentials';
import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";

const useTagManager = () => {
  useEffect(() => {
    console.log({ test: getCookieConsentValue(gdprCookiesName) })
    const isAlreadyAvailable = getCookieConsentValue(gdprCookiesName);

    if (!isAlreadyAvailable) {
      console.log("Shouldn't show");
      return;
    }

    console.log("Should show");
    TagManager.initialize({ gtmId: googleTagManagerKey });
  }, [getCookieConsentValue(gdprCookiesName)])
}

export default useTagManager
