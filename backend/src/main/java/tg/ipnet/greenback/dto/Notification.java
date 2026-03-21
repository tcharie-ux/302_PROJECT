package tg.ipnet.greenback.dto;

import java.time.LocalDateTime;

public class Notification {
private String message;
private Boolean statut;
private LocalDateTime dateEnvoie;
private Utilisateur utilisateur;
public String getMessage() {
    return message;
}
public void setMessage(String message) {
    this.message = message;
}
public Boolean getStatut() {
    return statut;
}
public void setStatut(Boolean statut) {
    this.statut = statut;
}
public LocalDateTime getDateEnvoie() {
    return dateEnvoie;
}
public void setDateEnvoie(LocalDateTime dateEnvoie) {
    this.dateEnvoie = dateEnvoie;
}
public Utilisateur getUtilisateur() {
    return utilisateur;
}
public void setUtilisateur(Utilisateur utilisateur) {
    this.utilisateur = utilisateur;
}
}
