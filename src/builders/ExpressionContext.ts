import { ExpressionAttributeMap } from "../util/ExpressionAttributeMap.js";

export interface ExpressionContext {
  names: ExpressionAttributeMap<string>;
  values: ExpressionAttributeMap<any>;
}
