import {BaseModel} from "./BaseModel/BaseModel";
import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Purchase extends BaseModel {

    @Column({type: "double"})
    public total: number;

    @ManyToMany((type) => Product)
    @JoinTable()
    public products: Product[];

}