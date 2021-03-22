// import { UserEntity } from '../users/user.entity';
import {
  Entity,
  Column,
  AfterLoad,
  // OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

class CredentialsJSON {
  encryptedPassword: string
};

export enum CredentialType {
  DEFAULT="username/password",
  GOOGLE="google"
}

@Entity('users_credentials')
export class UserCredentialsEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ default: CredentialType.DEFAULT })
  credential: string = CredentialType.DEFAULT;

  @Column()
  email: string;

  @Column()
  // @OneToMany(() => UserEntity, user => user.id)
  userId: number

  @Column('json')
  json?: CredentialsJSON

  @AfterLoad()
  public setValuesFromJson (): any {
    const json = this.json ?? {}
    for (const key in json) {
      if (!(key in this)) {
        this[key] = json[key]
      }
    }
  }

  constructor (email: string, credential:CredentialType = CredentialType.DEFAULT, userId: number = 0, json: CredentialsJSON = { encryptedPassword: '' }) {
    this.email = email
    this.credential = credential
    this.userId = userId
    this.json = json
  }
}
