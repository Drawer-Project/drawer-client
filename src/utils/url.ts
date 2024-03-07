export const getCollectionPath = (pathname: string) => {
  const parts = pathname.split("/");
  return parts.length > 1 ? parts[parts.length - 1] : "";
};

export const getDomainFromUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch (err) {
    return url;
  }
};
