//package com.example.taskmanagement.service;
//
//import com.example.taskmanagement.model.Task;
//import com.example.taskmanagement.model.TaskStatus;
//import com.example.taskmanagement.repository.TaskRepository;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class TaskService {
//
//    private final TaskRepository taskRepository;
//
//    public TaskService(TaskRepository taskRepository) {
//        this.taskRepository = taskRepository;
//    }
//
//    // Create a new task
//    public Task createTask(Task task) {
//        task.setStatus(TaskStatus.SAVED);
//        return taskRepository.save(task);
//    }
//
//    // Get all tasks
//    public List<Task> getAllTasks() {
//        return taskRepository.findAll();
//    }
//
//    // Get task by ID
//    public Optional<Task> getTaskById(Long id) {
//        return taskRepository.findById(id);
//    }
//
//    // Update a task
//    public Task updateTask(Long id, Task updatedTask) {
//        return taskRepository.findById(id).map(task -> {
//            task.setTitle(updatedTask.getTitle());
//            task.setDescription(updatedTask.getDescription());
//            task.setDueDate(updatedTask.getDueDate());
//            task.setStatus(updatedTask.getStatus());
//            return taskRepository.save(task);
//        }).orElseThrow(() -> new RuntimeException("Task not found"));
//    }
//
//    // Delete a task by ID
//    public void deleteTask(Long id) {
//        taskRepository.deleteById(id);
//    }
//
//    // Delete all tasks
//    public void deleteAllTasks() {
//        taskRepository.deleteAll();
//    }
//
//    // Find tasks by due date
//    public List<Task> findByDueDate(LocalDateTime dueDate) {
//        return taskRepository.findByDueDate(dueDate);
//    }
//
//    // Get latest created tasks
//    public List<Task> getLatestTasks() {
//        return taskRepository.findAllByOrderByCreatedAtDesc();
//    }
//
//    // Get oldest created tasks
//    public List<Task> getOldestTasks() {
//        return taskRepository.findAllByOrderByCreatedAtAsc();
//    }
//
//    // Get last modified tasks
//    public List<Task> getLastModifiedTasks() {
//        return taskRepository.findAllByOrderByUpdatedAtDesc();
//    }
//
//    // Get oldest modified tasks
//    public List<Task> getOldestModifiedTasks() {
//        return taskRepository.findAllByOrderByUpdatedAtAsc();
//    }
//}


package com.example.taskmanagement.service;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.model.TaskStatus;
import com.example.taskmanagement.model.User;
import com.example.taskmanagement.repository.TaskRepository;
import com.example.taskmanagement.repository.UserRepository;
//import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    // ✅ Correct constructor to initialize both repositories
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    // ✅ Get the currently authenticated user
    private User getAuthenticatedUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String username = ((UserDetails) principal).getUsername();
            return userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found: " + username));
        } else {
            throw new RuntimeException("Authentication error: Invalid user principal");
        }
    }

    // ✅ Create a new task
    public Task createTask(Task task) {
        task.setStatus(TaskStatus.SAVED);
        task.setUser(getAuthenticatedUser()); 
        return taskRepository.save(task);
    }

    // ✅ Get all tasks for authenticated user
    public List<Task> getAllTasks() {
        return taskRepository.findAllByUserOrderByCreatedAtDesc(getAuthenticatedUser());
    }

    // ✅ Get task by ID (only if it belongs to the authenticated user)
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findByIdAndUser(id, getAuthenticatedUser());
    }

    // ✅ Update a task (only if it belongs to the authenticated user)
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findByIdAndUser(id, getAuthenticatedUser()).map(task -> {
            task.setTitle(updatedTask.getTitle());
            task.setDescription(updatedTask.getDescription());
            task.setDueDate(updatedTask.getDueDate());
            task.setStatus(updatedTask.getStatus());
            return taskRepository.save(task);
        }).orElseThrow(() -> new RuntimeException("Task not found or not authorized"));
    }

    // ✅ Delete a task by ID (only if it belongs to the authenticated user)
    public void deleteTask(Long id) {
        Task task = taskRepository.findByIdAndUser(id, getAuthenticatedUser())
                .orElseThrow(() -> new RuntimeException("Task not found or not authorized"));
        taskRepository.delete(task);
    }

    // ✅ Delete all tasks for the authenticated user
    public void deleteAllTasks() {
        taskRepository.deleteByUser(getAuthenticatedUser());
    }

    // ✅ Find tasks by due date for the authenticated user
    public List<Task> findByDueDate(LocalDateTime dueDate) {
        return taskRepository.findByDueDateAndUser(dueDate, getAuthenticatedUser());
    }

    // ✅ Get latest created tasks for the authenticated user
    public List<Task> getLatestTasks() {
        return taskRepository.findAllByUserOrderByCreatedAtDesc(getAuthenticatedUser());
    }

    // ✅ Get oldest created tasks for the authenticated user
    public List<Task> getOldestTasks() {
        return taskRepository.findAllByUserOrderByCreatedAtAsc(getAuthenticatedUser());
    }

    // ✅ Get last modified tasks for the authenticated user
    public List<Task> getLastModifiedTasks() {
        return taskRepository.findAllByUserOrderByUpdatedAtDesc(getAuthenticatedUser());
    }

    // ✅ Get oldest modified tasks for the authenticated user
    public List<Task> getOldestModifiedTasks() {
        return taskRepository.findAllByUserOrderByUpdatedAtAsc(getAuthenticatedUser());
    }
}
