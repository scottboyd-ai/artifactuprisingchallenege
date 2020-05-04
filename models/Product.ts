import {BaseModel} from "./BaseModel/BaseModel";
import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {Category} from "./Category";

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

    @ManyToMany((type) => Category)
    @JoinTable()
    public categories: Category[];
}