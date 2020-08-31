import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuidv1'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks : Task[] = [];

    getAllTasks() : Task[] {
        return this.tasks;
    }

    getTaskById(id:string):Task{
        return this.tasks.find(task => task.id == id)
    }

    createTask(createTaskDto : CreateTaskDto) : Task{
        const {title , description} = createTaskDto
        const task: Task = {
            id:uuid(),
            title,
            description,
            status:TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task;
    }

    deleteTask(id:string): Task {
        const index = this.tasks.findIndex(task => task.id == id)
        return this.tasks.splice(index,1)[0]
    }

    updateTaskStatus(id:string,status:TaskStatus):Task{
        const task = this.getTaskById(id)
        task.status = status
        return task;
    }
    
}
