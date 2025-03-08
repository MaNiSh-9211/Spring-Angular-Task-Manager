//package com.example.taskmanagement.controller;
//
//import com.example.taskmanagement.model.Task;
//import com.example.taskmanagement.service.TaskService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//
//
//@RestController
//@RequestMapping("/api/tasks")
//public class TaskController {
//    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);  
//
//    private final TaskService taskService;
//
//    public TaskController(TaskService taskService) {
//        this.taskService = taskService;
//    }
//
//    // Create Task
//    @PostMapping
//    public ResponseEntity<Task> createTask(@RequestBody Task task) {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.createTask(task));
//    }
//
//    // Get All Tasks
//    @GetMapping
//    public ResponseEntity<List<Task>> getAllTasks() {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.getAllTasks());
//    }
//
//    // Get Task by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
//        logger.info("Request URL: /api/tasks");
//
//        return taskService.getTaskById(id)
//                .map(ResponseEntity::ok)
//                .orElse(ResponseEntity.notFound().build());
//    }
//
//    // Update Task
//    @PutMapping("/{id}")
//    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.updateTask(id, updatedTask));
//    }
//
//    // Delete Task by ID
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
//        logger.info("Request URL: /api/tasks");
//
//        taskService.deleteTask(id);
//        return ResponseEntity.ok("Task deleted successfully");
//    }
//
//    // Delete All Tasks
//    @DeleteMapping("/deleteAll")
//    public ResponseEntity<String> deleteAllTasks() {
//        logger.info("Request URL: /api/tasks");
//
//        taskService.deleteAllTasks();
//        return ResponseEntity.ok("All tasks deleted successfully");
//    }
//
//    // Get Tasks by Due Date
//    @GetMapping("/date/{date}")
//    public ResponseEntity<List<Task>> findByDueDate(@PathVariable LocalDateTime date) {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.findByDueDate(date));
//    }
//
//    // Get Latest Created Tasks
//    @GetMapping("/latest")
//    public ResponseEntity<List<Task>> getLatestTasks() {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.getLatestTasks());
//    }
//
//    // Get Oldest Created Tasks
//    @GetMapping("/oldest")
//    public ResponseEntity<List<Task>> getOldestTasks() {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.getOldestTasks());
//    }
//
//    // Get Last Modified Tasks
//    @GetMapping("/lastModified")
//    public ResponseEntity<List<Task>> getLastModifiedTasks() {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.getLastModifiedTasks());
//    }
//
//    // Get Oldest Modified Tasks
//    @GetMapping("/oldestModified")
//    public ResponseEntity<List<Task>> getOldestModifiedTasks() {
//        logger.info("Request URL: /api/tasks");
//
//        return ResponseEntity.ok(taskService.getOldestModifiedTasks());
//    }
//}



package com.example.taskmanagement.controller;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Create Task
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        logger.info("Request URL: /api/tasks");
        return ResponseEntity.ok(taskService.createTask(task));
    }

    // Get All Tasks for Authenticated User
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        logger.info("Request URL: /api/tasks");
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    // Get Task by ID
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        logger.info("Request URL: /api/tasks/" + id);
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Update Task
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        logger.info("Request URL: /api/tasks/" + id);
        return ResponseEntity.ok(taskService.updateTask(id, updatedTask));
    }

    // Delete Task by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        logger.info("Request URL: /api/tasks/" + id);
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }

    // Delete All Tasks for Authenticated User
    @DeleteMapping("/deleteAll")
    public ResponseEntity<String> deleteAllTasks() {
        logger.info("Request URL: /api/tasks/deleteAll");
        taskService.deleteAllTasks();
        return ResponseEntity.ok("All tasks deleted successfully");
    }

    // Get Tasks by Due Date
    @GetMapping("/date/{date}")
    public ResponseEntity<List<Task>> findByDueDate(@PathVariable LocalDateTime date) {
        logger.info("Request URL: /api/tasks/date/" + date);
        return ResponseEntity.ok(taskService.findByDueDate(date));
    }

    // Get Latest Created Tasks
    @GetMapping("/latest")
    public ResponseEntity<List<Task>> getLatestTasks() {
        logger.info("Request URL: /api/tasks/latest");
        return ResponseEntity.ok(taskService.getLatestTasks());
    }

    // Get Oldest Created Tasks
    @GetMapping("/oldest")
    public ResponseEntity<List<Task>> getOldestTasks() {
        logger.info("Request URL: /api/tasks/oldest");
        return ResponseEntity.ok(taskService.getOldestTasks());
    }

    // Get Last Modified Tasks
    @GetMapping("/lastModified")
    public ResponseEntity<List<Task>> getLastModifiedTasks() {
        logger.info("Request URL: /api/tasks/lastModified");
        return ResponseEntity.ok(taskService.getLastModifiedTasks());
    }

    // Get Oldest Modified Tasks
    @GetMapping("/oldestModified")
    public ResponseEntity<List<Task>> getOldestModifiedTasks() {
        logger.info("Request URL: /api/tasks/oldestModified");
        return ResponseEntity.ok(taskService.getOldestModifiedTasks());
    }
}
