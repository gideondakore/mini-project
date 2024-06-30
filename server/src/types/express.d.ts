import "express";

declare module "express" {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  export interface Request {
    [key: string]: any;
  }
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
