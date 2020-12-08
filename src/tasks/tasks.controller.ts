import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { identity } from 'rxjs';
import GetTasksFilterDto from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks(@Query() filterDto : GetTasksFilterDto):Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTasksWithFilter(filterDto)
        }else{
            return this.taskService.getAllTasks()
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id:string):Task {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):Task{
        return this.taskService.deleteTask(id)
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status') status:TaskStatus
    ):Task {
        return this.taskService.updateTaskStatus(id,status)
    }

    
}
