export const openBackofficeLink = (url?: string): void => {
  if (url) {
    if (url.startsWith("/")) {
      window.open(window.location.origin + url, "_self");
    } else {
      if (!url.startsWith("https://")) {
        url = "https://" + url;
      }
      window.open(url, "_blank");
    }
  } else {
    console.error("url is empty");
  }
};
