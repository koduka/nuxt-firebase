import { Entity } from "./entity";
import { Product } from "./product";
export declare type Payment = Entity & {
    products: Product[];
};
