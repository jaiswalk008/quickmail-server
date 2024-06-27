import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import User from "src/user/user.entity";

@Entity()
export default class Email {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.sentEmails)
    sender: User;

    @ManyToOne(() => User, user => user.receivedEmails)
    receiver: User;

    @Column({ nullable: true })
    subject: string;

    @Column('text', { nullable: true })
    body: string;

    @Column({ default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
