package tg.ipnet.greenback.service;
 
import tg.ipnet.greenback.dto.NotificationCreationDTO;
import tg.ipnet.greenback.dto.NotificationDto;

import java.util.List;

public interface NotificationService {
    NotificationDto envoyerNotification(NotificationCreationDTO demande);
    List<NotificationDto> listerNotificationsRecues();
    List<NotificationDto> listerNotificationsEnvoyees();
    NotificationDto accepterNotification(Long idNotification);
}
