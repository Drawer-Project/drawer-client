export type BaseError = {
  response: {
    data: {
      detail: string;
      message: string;
      status: number;
    };
  };
};
