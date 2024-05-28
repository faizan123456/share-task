import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return await createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async myTasks(assigneeId: ObjectId): Promise<Task[]> {
    const tasks = await this.taskModel.find({ assignedTo: assigneeId });
    return tasks;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new Error('Task not found.');
    }
    return task;
  }

  async searchByTitle(search: string): Promise<Task[]> {
    const tasks = await this.taskModel.find({ 'title': new RegExp(search, 'i') });
    return tasks;
  }

  async update(_id: string, updateTaskDto: UpdateTaskDto): Promise<any> {
    const task = await this.taskModel.updateOne({ _id }, updateTaskDto);
    return task;
  }

  async remove(_id: string): Promise<any> {
    const task = await this.taskModel.deleteOne({ _id });
    return task;
  }



}
