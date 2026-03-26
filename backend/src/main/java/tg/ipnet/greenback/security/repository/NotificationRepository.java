package tg.ipnet.greenback.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tg.ipnet.greenback.security.model.UserNotification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<UserNotification, Long> {
    List<UserNotification> findByRecipientUsernameOrderByCreatedAtDesc(String username);
    List<UserNotification> findBySenderUsernameOrderByCreatedAtDesc(String username);
}
