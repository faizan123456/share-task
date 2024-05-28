import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';


export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop()
  status: string;

  @Prop()
  permissions: [string];

  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedTo: User;

  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedFrom: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
