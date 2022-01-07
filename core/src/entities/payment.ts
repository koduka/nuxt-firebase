import { Entity } from "./entity";
import { Product } from "./product";

export type Payment = Entity & {
    products: Product[],
}