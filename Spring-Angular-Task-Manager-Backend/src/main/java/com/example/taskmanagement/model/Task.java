//package com.example.taskmanagement.model;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "tasks")
//public class Task {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    private String title;
////    private String description;
//    @Lob
//    @Column(columnDefinition = "LONGTEXT") // Stores extremely large text data
//    private String description;
//    private LocalDateTime dueDate;
//    
//    @Enumerated(EnumType.STRING)
//    private TaskStatus status; // SAVED, IN_PROGRESS, COMPLETED
//
//    private LocalDateTime createdAt;
//    private LocalDateTime updatedAt;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user; // Add this field to associate tasks with a user
//    @PrePersist
//    protected void onCreate() {
//        this.createdAt = LocalDateTime.now();
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    @PreUpdate
//    protected void onUpdate() {
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    // Constructors
//    public Task() {}
//
//    public Task(String title, String description, LocalDateTime dueDate, TaskStatus status) {
//        this.title = title;
//        this.description = description;
//        this.dueDate = dueDate;
//        this.status = status;
//        this.createdAt = LocalDateTime.now();
//        this.updatedAt = LocalDateTime.now();
//    }
//
//    // Getters and Setters
//    public Long getId() { return id; }
//
//    public void setId(Long id) { this.id = id; }
//
//    public String getTitle() { return title; }
//
//    public void setTitle(String title) { this.title = title; }
//
//    public String getDescription() { return description; }
//
//    public void setDescription(String description) { this.description = description; }
//
//    public LocalDateTime getDueDate() { return dueDate; }
//
//    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }
//
//    public TaskStatus getStatus() { return status; }
//
//    public void setStatus(TaskStatus status) { this.status = status; }
//
//    public LocalDateTime getCreatedAt() { return createdAt; }
//
//    public LocalDateTime getUpdatedAt() { return updatedAt; }
//}

package com.example.taskmanagement.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Lob
    @Column(columnDefinition = "LONGTEXT") // Stores extremely large text data
    private String description;

    private LocalDateTime dueDate;
    
    @Enumerated(EnumType.STRING)
    private TaskStatus status; // SAVED, IN_PROGRESS, COMPLETED

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Associate tasks with a user

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Constructors
    public Task() {}

    public Task(String title, String description, LocalDateTime dueDate, TaskStatus status, User user) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.status = status;
        this.user = user;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }

    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }

    public void setDescription(String description) { this.description = description; }

    public LocalDateTime getDueDate() { return dueDate; }

    public void setDueDate(LocalDateTime dueDate) { this.dueDate = dueDate; }

    public TaskStatus getStatus() { return status; }

    public void setStatus(TaskStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }

    public User getUser() { return user; } // ✅ Added missing getter

    public void setUser(User user) { this.user = user; } // ✅ Added missing setter
}

