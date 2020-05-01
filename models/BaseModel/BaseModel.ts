import {BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    @CreateDateColumn()
    public createdDate: Date;
    @UpdateDateColumn()
    public updatedDate: Date;
}
