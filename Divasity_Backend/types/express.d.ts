// types/express.d.ts
import { TokenPayload } from "../services/token"; // Adjust path as needed

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}