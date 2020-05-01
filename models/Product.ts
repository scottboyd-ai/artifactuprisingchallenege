import {BaseModel} from "./BaseModel/BaseModel";
import {Column, Entity} from "typeorm";

@Entity()
export class Product extends BaseModel {

    @Column({type: "varchar", length: 100})
    public name: string;

    @Column({type: "double"})
    public price: number;

    @Column()
    public quantity: number;

    @Column({type: "double"})
    public rating: number;

}