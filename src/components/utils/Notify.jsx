// utils/notify.js
export function notify({title, message,timeout,advanced,dark,url} = {}) {
  window.postMessage(
    {
      type: "notification",
      data: {
        id: Date.now(),   // identifiant unique
        title,
        message,
        timeout,
        advanced,
        dark,
        url
      }
    },
    "*"
  );
}
