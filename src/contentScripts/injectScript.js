import browser from "./browser";

const addonUrl = browser.runtime.getURL("./");

let main = `function() {
  let ajaxCompleteEvent = document.createEvent("Event");
  ajaxCompleteEvent.initEvent("AjaxComplete", true, true);

  let chargeInfoDossierEvent = document.createEvent("Event");
  chargeInfoDossierEvent.initEvent("ChargeInfoDossierComplete", true, true);

  let chargeInfoClientEvent = document.createEvent("Event");
  chargeInfoClientEvent.initEvent("ChargeInfoClientComplete", true, true);

  function fireAjaxComplete() {
    document.body.dispatchEvent(ajaxCompleteEvent);
  }

  function fireChargeInfoDossierComplete() {
    document.body.dispatchEvent(chargeInfoDossierEvent);
  }

  function fireChargeInfoClientComplete() {
    document.body.dispatchEvent(chargeInfoClientEvent);
  }

  jQuery(document).ajaxComplete(function(event, request, settings) {
    fireAjaxComplete();

    if (settings.url.includes("/ChargeInfosDossier.php"))
      fireChargeInfoDossierComplete();

    if (settings.url.includes("/ChargeInfoClient.php"))
      fireChargeInfoClientComplete();
  });

}`;

export function injectJS() {
  let injectedJS = document.createElement("script");
  injectedJS.type = "text/javascript";
  injectedJS.text = "(" + main + ')("");';
  document.head.appendChild(injectedJS);
}

let injectedCss = document.createElement("link");
injectedCss.rel = "stylesheet";
injectedCss.type = "text/css";
injectedCss.media = "screen";
injectedCss.href = `${addonUrl}css/dark-theme.css`;

export function injectCSS() {
  document.head.appendChild(injectedCss);
}

export function removeCSS() {
  injectedCss.remove();
}
