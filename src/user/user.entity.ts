import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from "typeorm";
import Email from "src/email/email.entity";

@Entity()
@Index('email_index', ['email'])
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Email, email => email.sender)
    sentEmails: Email[];

    @OneToMany(() => Email, email => email.receiver)
    receivedEmails: Email[];
}
