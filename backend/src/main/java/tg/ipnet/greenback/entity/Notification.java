package tg.ipnet.greenback.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import tg.ipnet.greenback.enums.StatutNotification;
import tg.ipnet.greenback.security.model.User;

@Entity
@Table(name="notification")
@jakarta.persistence.EntityListeners(AuditingEntityListener.class)
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long idNotification;

    private String message;

    @Enumerated(EnumType.STRING)
    private StatutNotification statut;

    private LocalDateTime dateEnvoie;

    private LocalDateTime dateReponse;

    @ManyToOne
    @JoinColumn(name = "emetteur_id", nullable = false)
    private User emetteur;

    @ManyToOne
    @JoinColumn(name = "destinataire_id", nullable = false)
    private User destinataire;

    public Long getIdNotification() {
        return idNotification;
    }

    public void setIdNotification(Long idNotification) {
        this.idNotification = idNotification;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public StatutNotification getStatut() {
        return statut;
    }

    public void setStatut(StatutNotification statut) {
        this.statut = statut;
    }

    public LocalDateTime getDateEnvoie() {
        return dateEnvoie;
    }

    public void setDateEnvoie(LocalDateTime dateEnvoie) {
        this.dateEnvoie = dateEnvoie;
    }

    public LocalDateTime getDateReponse() {
        return dateReponse;
    }

    public void setDateReponse(LocalDateTime dateReponse) {
        this.dateReponse = dateReponse;
    }

    public User getEmetteur() {
        return emetteur;
    }

    public void setEmetteur(User emetteur) {
        this.emetteur = emetteur;
    }

    public User getDestinataire() {
        return destinataire;
    }

    public void setDestinataire(User destinataire) {
        this.destinataire = destinataire;
    }
}
