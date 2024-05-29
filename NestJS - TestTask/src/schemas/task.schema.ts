import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from './user.schema';


export type TaskDocument = HydratedDocument<Task>;

@Schema({ timestamps: true })
export class Task {
  @Prop()
  title: string;

  @Prop({
    type: [String],
    enum: [String],
    default: String
  })
  status: {
    type: string,
    enum: ['created', 'complete', 'incomplete'],
    default: 'created',
  };

  @Prop({ type: [String], enum: ['view', 'edit'] })
  permissions: string[];

  @Prop({ type: 'ObjectId', ref: 'User' })
  assignedTo: User;

  @Prop({ type: 'ObjectId', ref: 'User' })
  createdBy: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
