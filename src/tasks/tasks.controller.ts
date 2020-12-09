import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { identity } from 'rxjs';
import GetTasksFilterDto from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    @UsePipes(ValidationPipe)
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
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id:string):void{
        return this.taskService.deleteTask(id)
    }

    @Patch(':id/status')
    updateTaskStatus(
        @Param('id') id:string,
        @Body('status',new TaskStatusValidationPipe()) status:TaskStatus
    ):Task {
        return this.taskService.updateTaskStatus(id,status)
    }

    
}
