package tg.ipnet.greenback.security;

import tg.ipnet.greenback.security.dto.NotificationCreateDTO;
import tg.ipnet.greenback.security.dto.NotificationResponseDTO;

import java.util.List;

public interface NotificationService {
    NotificationResponseDTO sendNotification(NotificationCreateDTO request);
    List<NotificationResponseDTO> getReceivedNotifications();
    List<NotificationResponseDTO> getSentNotifications();
    NotificationResponseDTO acceptNotification(Long notificationId);
}
