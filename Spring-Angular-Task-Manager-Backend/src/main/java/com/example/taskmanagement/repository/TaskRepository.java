//package com.example.taskmanagement.repository;
//
//import com.example.taskmanagement.model.Task;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Repository
//public interface TaskRepository extends JpaRepository<Task, Long> {
//
//    List<Task> findByDueDate(LocalDateTime dueDate);
//
//    List<Task> findAllByOrderByCreatedAtDesc();
//
//    List<Task> findAllByOrderByCreatedAtAsc();
//
//    List<Task> findAllByOrderByUpdatedAtDesc();
//
//    List<Task> findAllByOrderByUpdatedAtAsc();
//}


package com.example.taskmanagement.repository;

import com.example.taskmanagement.model.Task;
import com.example.taskmanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByDueDate(LocalDateTime dueDate); // Matches the old function name

    List<Task> findAllByOrderByCreatedAtDesc(); // Matches the old function name

    List<Task> findAllByOrderByCreatedAtAsc(); // Matches the old function name

    List<Task> findAllByOrderByUpdatedAtDesc(); // Matches the old function name

    List<Task> findAllByOrderByUpdatedAtAsc(); // Matches the old function name

    // New methods for authentication but keeping old names
    List<Task> findByDueDateAndUser(LocalDateTime dueDate, User user);

    List<Task> findAllByUserOrderByCreatedAtDesc(User user);

    List<Task> findAllByUserOrderByCreatedAtAsc(User user);

    List<Task> findAllByUserOrderByUpdatedAtDesc(User user);

    List<Task> findAllByUserOrderByUpdatedAtAsc(User user);

    Optional<Task> findByIdAndUser(Long id, User user);

    void deleteByUser(User user);
}
