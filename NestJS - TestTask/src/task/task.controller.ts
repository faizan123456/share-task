import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ObjectId } from 'mongoose';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Get('mytasks/:assigneeId')
  async getMyTasks(
    @Param('assigneeId')
    assigneeId: ObjectId
  ): Promise<Task[]> {
    return this.taskService.myTasks(assigneeId);
  }

  @Post()
  async createTask(
    @Body()
    task: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.create(task);
  }

  @Get(':id')
  async geTask(
    @Param('id')
    id: string,
  ): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Get('?search=')
  async searchTask(
    @Query('search')
    search: string,
  ): Promise<Task[]> {
    return this.taskService.searchByTitle(search);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }

}
