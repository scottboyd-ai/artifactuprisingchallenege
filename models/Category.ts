import {BaseModel} from "./BaseModel/BaseModel";
import {Column, Entity} from "typeorm";

@Entity()
export class Category extends BaseModel {

    @Column()
    public name: string;
}