export const createToken = () => Math.random().toString(36).substring(2, 11);

export const userdb: { [key: string]: { email: string } } = {};

export const bookmarkdb: Array<{
  bookmarkId: number;
  url: string;
  title: string;
}> = [
  {
    bookmarkId: 1,
    url: "www.example1.com",
    title: "ex title 1",
  },
  {
    bookmarkId: 2,
    url: "www.example2.com",
    title: "ex title 2",
  },
];
