package tg.ipnet.greenback.security.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tg.ipnet.greenback.security.NotificationService;
import tg.ipnet.greenback.security.dto.NotificationCreateDTO;
import tg.ipnet.greenback.security.dto.NotificationResponseDTO;
import tg.ipnet.greenback.security.model.History;
import tg.ipnet.greenback.security.model.NotificationStatus;
import tg.ipnet.greenback.security.model.User;
import tg.ipnet.greenback.security.model.UserNotification;
import tg.ipnet.greenback.security.repository.HistoryRepository;
import tg.ipnet.greenback.security.repository.NotificationRepository;
import tg.ipnet.greenback.security.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;
    private final HistoryRepository historyRepository;

    public NotificationServiceImpl(NotificationRepository notificationRepository, UserRepository userRepository, HistoryRepository historyRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
    }

    @Override
    public NotificationResponseDTO sendNotification(NotificationCreateDTO request) {
        User sender = getCurrentUser();
        if (!isArchitectOrAdmin(sender)) {
            throw new BadCredentialsException("Seul un architecte ou un admin peut envoyer une notification");
        }

        User recipient = userRepository.findByPublicId(request.getRecipientId())
                .orElseThrow(() -> new ResourceNotFoundException("Destinataire introuvable"));

        UserNotification notification = new UserNotification();
        notification.setMessage(request.getMessage());
        notification.setStatus(NotificationStatus.PENDING);
        notification.setSender(sender);
        notification.setRecipient(recipient);

        UserNotification savedNotification = notificationRepository.save(notification);
        createHistory(sender, "Notification envoyee a " + recipient.getUsername());
        return map(savedNotification);
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getReceivedNotifications() {
        User currentUser = getCurrentUser();
        return notificationRepository.findByRecipientUsernameOrderByCreatedAtDesc(currentUser.getUsername())
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<NotificationResponseDTO> getSentNotifications() {
        User currentUser = getCurrentUser();
        return notificationRepository.findBySenderUsernameOrderByCreatedAtDesc(currentUser.getUsername())
                .stream()
                .map(this::map)
                .toList();
    }

    @Override
    public NotificationResponseDTO acceptNotification(Long notificationId) {
        User currentUser = getCurrentUser();
        UserNotification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification introuvable"));

        boolean isRecipient = notification.getRecipient().getId().equals(currentUser.getId());
        boolean isAdmin = isAdmin(currentUser);
        if (!isRecipient && !isAdmin) {
            throw new BadCredentialsException("Vous ne pouvez pas accepter cette notification");
        }

        notification.setStatus(NotificationStatus.ACCEPTED);
        notification.setRespondedAt(LocalDateTime.now());

        UserNotification savedNotification = notificationRepository.save(notification);
        createHistory(currentUser, "Notification acceptee #" + notificationId);
        return map(savedNotification);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null) {
            throw new BadCredentialsException("Utilisateur non authentifie");
        }

        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur connecte introuvable"));
    }

    private boolean isArchitectOrAdmin(User user) {
        return "ARCHITECTE".equalsIgnoreCase(user.getRoles()) || isAdmin(user);
    }

    private boolean isAdmin(User user) {
        return "ADMIN".equalsIgnoreCase(user.getRoles());
    }

    private void createHistory(User user, String action) {
        History history = new History();
        history.setName(action);
        history.setUser(user);
        history.setDateHistory(new Date());
        historyRepository.save(history);
    }

    private NotificationResponseDTO map(UserNotification notification) {
        NotificationResponseDTO response = new NotificationResponseDTO();
        response.setId(notification.getId());
        response.setMessage(notification.getMessage());
        response.setStatus(notification.getStatus().name());
        response.setSenderId(notification.getSender().getPublicId());
        response.setSenderUsername(notification.getSender().getUsername());
        response.setRecipientId(notification.getRecipient().getPublicId());
        response.setRecipientUsername(notification.getRecipient().getUsername());
        response.setCreatedAt(notification.getCreatedAt());
        response.setRespondedAt(notification.getRespondedAt());
        return response;
    }
}
