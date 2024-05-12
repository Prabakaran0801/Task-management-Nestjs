import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status';
import { CreateTaskDto } from './dto/create-task.dto';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.DONE,
    });

    await this.save(task);
    return task;
  }
}
