import {Entity , Column , PrimaryGeneratedColumn, Timestamp, CreateDateColumn, UpdateDateColumn} from "typeorm";
@Entity()
export default class User{

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string
    @Column()
    email:string

    @Column()
    password:string

    @CreateDateColumn({type:'timestamp'})
    createdAt: Date

    @UpdateDateColumn({type:'timestamp'})
    updatedAt:Date

}