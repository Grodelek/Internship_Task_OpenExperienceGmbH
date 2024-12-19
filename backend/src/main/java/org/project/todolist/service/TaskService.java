package org.project.todolist.service;

import org.project.todolist.entity.Task;
import org.project.todolist.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAll(){
        return taskRepository.findAll();
    }

    public Optional<Task> findById(Long id){
        return taskRepository.findById(id);
    }

    public Task save(Task task){
        return taskRepository.save(task);
    }

    public void delete(Task task){
        taskRepository.delete(task);
    }

}
