package org.project.todolist.controller;

import org.project.todolist.entity.Task;
import org.project.todolist.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:3001")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAll(){
        return taskService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id){
        Optional<Task> optionalTask = taskService.findById(id);
        if(optionalTask.isPresent()){
            Task task = optionalTask.get();
            return ResponseEntity.ok(task);
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        try {
            task.setStatus("UNDONE");
            if (task.getStatus().isEmpty() || task.getStatus() == null) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok(taskService.save(task));
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/done/{id}")
    public ResponseEntity<Task> doneTask(@PathVariable Long id) {
        try {
            Optional<Task> optionalTask = taskService.findById(id);
            if (optionalTask.isPresent()) {
                Task foundTask = optionalTask.get();
                if (foundTask.getStatus().isEmpty() || foundTask.getStatus() == null) {
                    return ResponseEntity.badRequest().build();
                }
                if(foundTask.getStatus().equals("DONE")){
                    foundTask.setStatus("UNDONE");
                    taskService.save(foundTask);
                    return ResponseEntity.ok(foundTask);
                }
                foundTask.setStatus("DONE");
                taskService.save(foundTask);
                return ResponseEntity.ok(foundTask);
            }else{
                return ResponseEntity.notFound().build();
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/update/{id}")
    public ResponseEntity<Task> updateTaskView(@PathVariable Long id, @RequestBody Task updatedTask) {
        try {
            Optional<Task> optionalTask = taskService.findById(id);
            if (optionalTask.isPresent()) {
                Task foundTask = optionalTask.get();
                foundTask.setName(updatedTask.getName());
                foundTask.setDescription(updatedTask.getDescription());
                return ResponseEntity.ok(taskService.save(foundTask));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id,@RequestBody Task updatedTask){
        Optional<Task> optionalTask = taskService.findById(id);
        if(optionalTask.isEmpty()){
           return ResponseEntity.notFound().build();
        }
        Task taskToUpdate = optionalTask.get();
        taskToUpdate.setName(updatedTask.getName());
        taskToUpdate.setDescription(updatedTask.getDescription());
        Task task = taskService.save(taskToUpdate);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id){
        Optional<Task> optionalTask = taskService.findById(id);
        if(optionalTask.isPresent()){
            Task taskToDelete = optionalTask.get();
            taskService.delete(taskToDelete);
        }
    }
}
