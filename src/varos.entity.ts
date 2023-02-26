import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Varos {
    @PrimaryGeneratedColumn()
    id : number
    @Column()
    varos : string
    @Column()
    lakossag : Number
    
}