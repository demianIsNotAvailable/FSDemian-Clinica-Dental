export { }

declare global {
  namespace Express {
    export interface Request {
      payload:{
        id: string,
        role: string
      };
    }
  }
}