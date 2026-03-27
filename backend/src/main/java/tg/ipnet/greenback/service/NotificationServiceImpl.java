package tg.ipnet.greenback.service;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tg.ipnet.greenback.dto.NotificationCreationDTO;
import tg.ipnet.greenback.enums.Role;
import tg.ipnet.greenback.enums.StatutNotification;
import tg.ipnet.greenback.security.model.History;
import tg.ipnet.greenback.security.model.User;
import tg.ipnet.greenback.security.repository.HistoryRepository;
import tg.ipnet.greenback.security.repository.UserRepository;
import tg.ipnet.greenback.repository.NotificationRepository;
import tg.ipnet.greenback.utils.ResourceNotFoundException;

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
    public tg.ipnet.greenback.dto.NotificationDto envoyerNotification(NotificationCreationDTO demande) {
        User emetteur = getCurrentUser();
        if (!isArchitectOrAdmin(emetteur)) {
            throw new BadCredentialsException("Seul un architecte ou un admin peut envoyer une notification");
        }

        User destinataire = userRepository.findByPublicId(demande.getIdDestinataire())
                .orElseThrow(() -> new ResourceNotFoundException("Destinataire introuvable"));

        tg.ipnet.greenback.entity.Notification notification = new tg.ipnet.greenback.entity.Notification();
        notification.setMessage(demande.getMessage());
        notification.setStatut(StatutNotification.EN_ATTENTE);
        notification.setDateEnvoie(LocalDateTime.now());
        notification.setEmetteur(emetteur);
        notification.setDestinataire(destinataire);

        tg.ipnet.greenback.entity.Notification notificationSauvegardee = notificationRepository.save(notification);
        createHistory(emetteur, "Notification envoyee a " + destinataire.getUsername());
        return mapper(notificationSauvegardee);
    }

    @Override
    @Transactional(readOnly = true)
    public List<tg.ipnet.greenback.dto.NotificationDto> listerNotificationsRecues() {
        User utilisateurCourant = getCurrentUser();
        return notificationRepository.findByDestinataireUsernameOrderByDateEnvoieDesc(utilisateurCourant.getUsername())
                .stream()
                .map(this::mapper)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<tg.ipnet.greenback.dto.NotificationDto> listerNotificationsEnvoyees() {
        User utilisateurCourant = getCurrentUser();
        return notificationRepository.findByEmetteurUsernameOrderByDateEnvoieDesc(utilisateurCourant.getUsername())
                .stream()
                .map(this::mapper)
                .toList();
    }

    @Override
    public tg.ipnet.greenback.dto.NotificationDto accepterNotification(Long idNotification) {
        User utilisateurCourant = getCurrentUser();
        tg.ipnet.greenback.entity.Notification notification = notificationRepository.findById(idNotification)
                .orElseThrow(() -> new ResourceNotFoundException("Notification introuvable"));

        boolean estDestinataire = notification.getDestinataire().getId().equals(utilisateurCourant.getId());
        boolean estAdmin = isAdmin(utilisateurCourant);
        if (!estDestinataire && !estAdmin) {
            throw new BadCredentialsException("Vous ne pouvez pas accepter cette notification");
        }

        notification.setStatut(StatutNotification.ACCEPTEE);
        notification.setDateReponse(LocalDateTime.now());

        tg.ipnet.greenback.entity.Notification notificationSauvegardee = notificationRepository.save(notification);
        createHistory(utilisateurCourant, "Notification acceptee #" + idNotification);
        return mapper(notificationSauvegardee);
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
        return Role.ARCHITECTE.equals(user.getRoles()) || isAdmin(user);
    }

    private boolean isAdmin(User user) {
        return Role.ADMIN.equals(user.getRoles());
    }

    private void createHistory(User user, String action) {
        History history = new History();
        history.setName(action);
        history.setUser(user);
        history.setDateHistory(new Date());
        historyRepository.save(history);
    }

    private tg.ipnet.greenback.dto.NotificationDto mapper(tg.ipnet.greenback.entity.Notification notificationEntity) {
        tg.ipnet.greenback.dto.NotificationDto notification = new tg.ipnet.greenback.dto.NotificationDto();
        notification.setIdNotification(notificationEntity.getIdNotification());
        notification.setMessage(notificationEntity.getMessage());
        notification.setStatut(notificationEntity.getStatut().name());
        notification.setIdEmetteur(notificationEntity.getEmetteur().getPublicId());
        notification.setNomEmetteur(notificationEntity.getEmetteur().getUsername());
        notification.setIdDestinataire(notificationEntity.getDestinataire().getPublicId());
        notification.setNomDestinataire(notificationEntity.getDestinataire().getUsername());
        notification.setDateEnvoie(notificationEntity.getDateEnvoie());
        notification.setDateReponse(notificationEntity.getDateReponse());
        return notification;
    }
}
