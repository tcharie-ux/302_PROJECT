package tg.ipnet.greenback.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tg.ipnet.greenback.entity.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByDestinataireUsernameOrderByDateEnvoieDesc(String username);
    List<Notification> findByEmetteurUsernameOrderByDateEnvoieDesc(String username);
}
