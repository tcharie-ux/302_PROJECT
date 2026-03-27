package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class NotificationDto {
    private Long idNotification;
    private String message;
    private String statut;
    private UUID idEmetteur;
    private String nomEmetteur;
    private UUID idDestinataire;
    private String nomDestinataire;
    private LocalDateTime dateEnvoie;
    private LocalDateTime dateReponse;

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

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public UUID getIdEmetteur() {
        return idEmetteur;
    }

    public void setIdEmetteur(UUID idEmetteur) {
        this.idEmetteur = idEmetteur;
    }

    public String getNomEmetteur() {
        return nomEmetteur;
    }

    public void setNomEmetteur(String nomEmetteur) {
        this.nomEmetteur = nomEmetteur;
    }

    public UUID getIdDestinataire() {
        return idDestinataire;
    }

    public void setIdDestinataire(UUID idDestinataire) {
        this.idDestinataire = idDestinataire;
    }

    public String getNomDestinataire() {
        return nomDestinataire;
    }

    public void setNomDestinataire(String nomDestinataire) {
        this.nomDestinataire = nomDestinataire;
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
}
