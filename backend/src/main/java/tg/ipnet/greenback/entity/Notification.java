package tg.ipnet.greenback.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name="notification")
@jakarta.persistence.EntityListeners(AuditingEntityListener.class)
public class Notification {
 @Id
@GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;
private String message;
private Boolean statut;
private LocalDateTime dateEnvoie;
@ManyToOne
private Utilisateur utilisateur;
public int getId() {
    return id;
}
public void setId(int id) {
    this.id = id;
}
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
